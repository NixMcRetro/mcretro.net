/* Recording-guided spectral resynthesis of a modem handshake.
   Input is a compact sequence of measured spectral envelopes and tonal peaks,
   NOT audio samples. All PCM is generated locally using oscillators and
   filtered deterministic noise after the visitor clicks Connect. */
export function renderHandshake(context, profile) {
  const rate = 16000;
  const hop = 400;
  const tracks = 4;
  const bands = 14;
  const stride = tracks * 3 + bands;
  if (profile.version !== 1 || profile.sampleRate !== rate ||
      profile.frameHop !== hop || profile.tracks !== tracks ||
      profile.bands !== bands || typeof profile.envelopes !== 'string') {
    throw new Error('Unsupported handshake profile');
  }
  const packed = atob(profile.envelopes);
  if (packed.length % stride !== 0 || packed.length < stride * 600 ||
      packed.length > stride * 700) throw new Error('Invalid handshake frames');
  const frames = packed.length / stride;
  const durationSamples = Math.round(16.3 * rate);
  const audio = context.createBuffer(1, durationSamples, rate);
  const samples = audio.getChannelData(0);
  const phase = new Float64Array(tracks);
  const states = Array.from({length:bands}, () => ({x1:0,x2:0,y1:0,y2:0}));
  const coefficients = Array.from({length:bands}, (_, i) => {
    const centre = 350 + i * 260;
    const w = 2 * Math.PI * centre / rate;
    const beta = Math.tan(Math.PI * 260 / rate);
    const gain = 1 / (1 + beta);
    return {b:1-gain, a1:-2*gain*Math.cos(w), a2:2*gain-1};
  });
  let randomState = 0x31415926;
  const peak = new Float64Array(tracks), freq = new Float64Array(tracks);
  const noise = new Float64Array(bands);
  const nextPeak = new Float64Array(tracks), nextFreq = new Float64Array(tracks);
  const nextNoise = new Float64Array(bands);
  let currentFrame = -1;
  for (let n=0;n<durationSamples;n++) {
    const frame = Math.min(Math.floor(n/hop), frames-2);
    if (frame !== currentFrame) {
      currentFrame = frame;
      const offset = frame * stride, nextOffset = offset + stride;
      for (let k=0;k<tracks;k++) {
        const pos = offset + k*3, next = nextOffset + k*3;
        freq[k] = 2 * (packed.charCodeAt(pos) + 256*packed.charCodeAt(pos+1));
        nextFreq[k] = 2 * (packed.charCodeAt(next) + 256*packed.charCodeAt(next+1));
        const q = packed.charCodeAt(pos+2)/255;
        const nq = packed.charCodeAt(next+2)/255;
        peak[k] = q*q*0.075;
        nextPeak[k] = nq*nq*0.075;
      }
      for (let k=0;k<bands;k++) {
        const q=packed.charCodeAt(offset+tracks*3+k)/255;
        const nq=packed.charCodeAt(nextOffset+tracks*3+k)/255;
        noise[k]=q*q*0.2;
        nextNoise[k]=nq*nq*0.2;
      }
    }
    const fraction = (n % hop) / hop;
    let value = 0;
    for (let k=0;k<tracks;k++) {
      const f0=freq[k], f1=nextFreq[k];
      const frequency = f0>0 && f1>0 ? f0+(f1-f0)*fraction : (f0 || f1);
      phase[k] += 2*Math.PI*frequency/rate;
      if (phase[k]>2*Math.PI) phase[k] -= 2*Math.PI;
      value += Math.sin(phase[k]+k*0.51)*(peak[k]+(nextPeak[k]-peak[k])*fraction);
    }
    randomState ^= randomState << 13;
    randomState ^= randomState >>> 17;
    randomState ^= randomState << 5;
    const white = ((randomState & 65535)/32768)-1;
    for (let k=0;k<bands;k++) {
      const s=states[k], c=coefficients[k];
      const filtered = c.b*white-c.b*s.x2-c.a1*s.y1-c.a2*s.y2;
      s.x2=s.x1; s.x1=white; s.y2=s.y1; s.y1=filtered;
      value += filtered*(noise[k]+(nextNoise[k]-noise[k])*fraction);
    }
    const fadeIn = Math.min(1,n/(rate*0.01));
    const fadeOut = Math.min(1,(durationSamples-1-n)/(rate*0.03));
    samples[n] = Math.max(-0.95,Math.min(0.95,value*8*fadeIn*fadeOut));
  }
  return audio;
}