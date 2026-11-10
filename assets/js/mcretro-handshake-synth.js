/* Recording-guided spectral resynthesis of a modem handshake.
   Input is a compact sequence of measured spectral envelopes and tonal peaks,
   NOT audio samples. All PCM is generated locally using oscillators and
   filtered deterministic noise after the visitor clicks Connect. */
function renderHandshakeBase(context, profile) {
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
  // Telephone-network bandwidth, applied after tones/noise are mixed.
  // The analogue line does not carry an unrestricted white-noise spectrum.
  const biquad = (frequency, highpass = false) => {
    const w = 2*Math.PI*frequency/rate, c=Math.cos(w), si=Math.sin(w);
    const alpha = si / Math.SQRT2;
    const a0=1+alpha;
    const b0=(1+(highpass?1:-1)*c)/2;
    const b1=highpass ? -(1+c) : 1-c;
    const b2=b0;
    return {b0:b0/a0,b1:b1/a0,b2:b2/a0,a1:-2*c/a0,a2:(1-alpha)/a0,x1:0,x2:0,y1:0,y2:0};
  };
  const highpass = biquad(260,true), lowpass=biquad(3200);
  const filter = (sample,c)=>{
    const y=c.b0*sample+c.b1*c.x1+c.b2*c.x2-c.a1*c.y1-c.a2*c.y2;
    c.x2=c.x1;c.x1=sample;c.y2=c.y1;c.y1=y;
    return y;
  };
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
    // The first several seconds of the recorded negotiation are predominantly
    // answer tones and chirps, not static. Noise-like data training develops
    // after approximately 9 seconds of the handshake, not at its onset.
    const seconds = n / rate;
    const ramp = x => {
      const v = Math.max(0, Math.min(1, x));
      return v * v * (3 - 2 * v);
    };
    const noiseMix = seconds < 8.65
      ? 0.015 + 0.105 * ramp((seconds - 5.0) / 1.3)
      : 0.12 + 0.40 * ramp((seconds - 8.65) / 1.2);
    for (let k=0;k<bands;k++) {
      const s=states[k], c=coefficients[k];
      const filtered = c.b*white-c.b*s.x2-c.a1*s.y1-c.a2*s.y2;
      s.x2=s.x1; s.x1=white; s.y2=s.y1; s.y1=filtered;
      value += noiseMix * filtered * (noise[k]+(nextNoise[k]-noise[k])*fraction);
    }
    const fadeIn = Math.min(1,n/(rate*0.01));
    const fadeOut = Math.min(1,(durationSamples-1-n)/(rate*0.03));
    samples[n] = Math.max(-0.95,Math.min(0.95,filter(filter(value,highpass),lowpass)*8*fadeIn*fadeOut));
  }
  return audio;
}


/* Version 4 experiment: replace only the 5–9 s handshake training passages.
   This procedural stage is derived from the reference's observed transitions:
   narrow-band calling/data signals, 1200/2400 Hz pilots and two bursts
   of approximately 150 Hz-spaced probing carriers. No audio is stored. */
export function renderHandshake(context, profile) {
  const audio=renderHandshakeBase(context,profile);
  const samples=audio.getChannelData(0);
  const rate=16000;
  const start=4.68, end=9.20;
  const middle=new Float32Array(samples.length);
  const smooth=x=>{const v=Math.max(0,Math.min(1,x));return v*v*(3-2*v);};
  const gate=(t,a,b,attack=.018,release=.025)=>
    smooth((t-a)/attack)*smooth((b-t)/release);
  let seed=0x6e697800;
  const rand=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return(seed>>>0)/4294967296;};
  // Four-level data symbols, softened to telephone bandwidth. This is
  // deliberately NOT unrestricted white noise.
  const digital=[
    {frequency:1052,baud:180,volume:.070,phase:0.2,i:0,q:0,i2:0,q2:0,di:0,dq:0,step:0},
    {frequency:1742,baud:180,volume:.060,phase:1.5,i:0,q:0,i2:0,q2:0,di:0,dq:0,step:0},
    {frequency:1168,baud:260,volume:.052,phase:2.2,i:0,q:0,i2:0,q2:0,di:0,dq:0,step:0}
  ];
  const combFrequencies=[300,450,600,750,1050,1350,1500,1650,1950,2100,2250,2550,2700,2850,3000,3150,3300,3450];
  const combAmplitudes=[1,1,1,.95,.98,.96,.92,.86,.75,.80,.80,.83,.75,.70,.60,.53,.43,.26];
  const combPhase=combFrequencies.map(()=>rand()*Math.PI*2);
  const first=Math.floor(start*rate), last=Math.min(samples.length,Math.ceil(end*rate));
  for(let n=first;n<last;n++){
    const t=n/rate;
    let output=0;
    // Full 2100 Hz answering tone survives into the first data burst.
    output+=0.075*Math.sin(2*Math.PI*2100*t+.2)*gate(t,4.1,5.64,.018,.025);
    for(let k=0;k<digital.length;k++){
      const d=digital[k];
      const sym=Math.floor(t*d.baud);
      if(sym!==d.step){
        d.step=sym;
        d.di=(rand()>.5?1:-1)*(rand()>.5?1:.34);
        d.dq=(rand()>.5?1:-1)*(rand()>.5?1:.34);
      }
      const alpha=.062; // two-pole, narrow telephone-bandwidth symbol shaping
      d.i+=(d.di-d.i)*alpha;d.q+=(d.dq-d.q)*alpha;
      d.i2+=(d.i-d.i2)*alpha;d.q2+=(d.q-d.q2)*alpha;
      const phi=2*Math.PI*d.frequency*t+d.phase;
      const use=k===0?gate(t,4.84,6.96,.035,.030):
        k===1?gate(t,5.66,6.98,.028,.026):gate(t,8.67,9.09,.03,.026);
      output+=d.volume*(d.i2*Math.cos(phi)-d.q2*Math.sin(phi))*use;
    }
    // Calibrated clean pilots and phase-change section before probing.
    output+=.090*Math.sin(2*Math.PI*1200*t+.73)*(
      gate(t,6.95,7.42,.015,.014)+gate(t,7.83,8.18,.015,.020));
    output+=.038*Math.sin(2*Math.PI*2400*t+.21)*(
      gate(t,7.00,7.39,.015,.014)+gate(t,8.68,9.04,.015,.02));
    output+=.026*Math.sin(2*Math.PI*1800*t+1.4)*(
      gate(t,7.00,7.40,.015,.014)+gate(t,8.68,9.08,.015,.02));
    // The two probing bursts: all carriers are simultaneous, stable and
    // 150 Hz apart, unlike the old four-frequency wobbly sequence.
    const probe=gate(t,7.38,7.88,.011,.018)+gate(t,8.115,8.675,.012,.018);
    if(probe>0){
      let comb=0;
      for(let k=0;k<combFrequencies.length;k++){
        comb+=combAmplitudes[k]*Math.sin(2*Math.PI*combFrequencies[k]*t+combPhase[k]);
      }
      output+=.0195*probe*comb;
    }
    middle[n]=output;
  }
  // Match the reference's measured time-dependent amplitude, not its samples.
  // Quantised 100 ms RMS reference measurements are small perceptual controls.
  const targetRms=[0.0234, 0.0268, 0.0466, 0.0459, 0.0453, 0.0459, 0.0485, 0.0447, 0.0463, 0.0446, 0.0458, 0.0492, 0.0476, 0.0481, 0.0486, 0.0477, 0.0488, 0.0487, 0.0477, 0.0487, 0.0486, 0.0482, 0.0403, 0.0468, 0.0474, 0.0475, 0.0436, 0.0452, 0.0556, 0.0310, 0.0282, 0.0283, 0.0461, 0.0401, 0.0414, 0.0685, 0.0548, 0.0339, 0.0391, 0.0434, 0.0493, 0.0496, 0.0300, 0.0254, 0.0132, 0.0200, 0.0199];
  const t0=4.7,dt=.1;
  const gain=new Float32Array(targetRms.length);
  for(let k=0;k<targetRms.length;k++){
    const loc=Math.round((t0+k*dt)*rate);
    const half=Math.round(.05*rate);let sq=0;
    for(let n=Math.max(first,loc-half);n<Math.min(last,loc+half);n++)
      sq+=middle[n]*middle[n];
    const rms=Math.sqrt(sq/Math.max(1,Math.min(last,loc+half)-Math.max(first,loc-half)));
    gain[k]=Math.max(.5,Math.min(6.0,2.6*targetRms[k]/Math.max(.008,rms)));
  }
  for(let n=first;n<last;n++){
    const t=n/rate;
    const i=Math.max(0,Math.min(gain.length-2,Math.floor((t-t0)/dt)));
    const mix=Math.max(0,Math.min(1,(t-t0)/dt-i));
    const g=gain[i]+(gain[i+1]-gain[i])*mix;
    const blend=smooth((t-4.79)/.11)*smooth((9.13-t)/.13);
    samples[n]=Math.max(-.95,Math.min(.95,samples[n]*(1-blend)+middle[n]*g*blend));
  }
  return audio;
}