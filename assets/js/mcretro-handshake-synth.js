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
function renderHandshakeV4(context, profile) {
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

/* V5 EXPERIMENT, 13 November 2026. V4 remains the rollback renderer above.
   The added controls are symbol patterns, timing, carrier frequencies and
   pulse-shaping coefficients. There are no recorded waveform samples.
   The opening and the complete [7.38, 8.67) probe interval are copied from V4. */
function renderHandshakeV5(context, profile) {
  const audio=renderHandshakeV4(context,profile);
  const samples=audio.getChannelData(0), rate=16000;
  const smooth=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
  const gate=(t,a,b,attack=.004,release=.004)=>
    smooth((t-a)/attack)*smooth((b-t)/release);
  const middle=new Float32Array(samples.length);
  const lineGain=2.6; // The approved V4 middle-stage listening level.
  // Two 90-symbol cycles measured from the repeated frequency-shift exchange.
  // These are binary data, not sampled audio; the carriers retain continuous phase.
  const fsk=[{"start":4.861153,"end":6.895,"baud":294.482,"frequencies":[980.12,1179.326],"cycle":"000000000011111100001011111000101011001010011011101110101100110101011010100111101000110110","peak":0.054},{"start":5.674855,"end":6.875,"baud":294.466,"frequencies":[1649.685,1849.628],"cycle":"110000000000011111100001011111000101011001010011011101110101100110101011010100111101000110","peak":0.041}];
  for(const d of fsk){
    let phase=.37, frequency=d.frequencies[0];
    const first=Math.floor((d.start-.004)*rate),last=Math.ceil(d.end*rate);
    for(let n=first;n<last;n++){
      const t=n/rate, symbol=Math.max(0,Math.floor((t-d.start)*d.baud));
      const bit=Number(d.cycle[symbol%d.cycle.length]);
      frequency+=(d.frequencies[bit]-frequency)*.24;
      phase+=2*Math.PI*frequency/rate;
      middle[n]+=d.peak*Math.sin(phase)*gate(t,d.start-.003,d.end,.003,.004);
    }
  }
  // Retain the answering carrier until the second frequency-shift stream enters.
  for(let n=Math.floor(4.82*rate);n<Math.ceil(6.97*rate);n++){
    const t=n/rate;
    middle[n]+=answerToneV6(t);
  }
  // V6.1: omit the 22 ms changeover impulse at 6.898-6.920 s.
  // The existing FSK release reaches zero first; silence follows until the pilot.

  // Short return to the existing pilot section before the protected probes.
  for(let n=Math.floor(6.960*rate);n<Math.ceil(6.98*rate);n++){
    const t=n/rate;
    middle[n]+=(.054*Math.sin(2*Math.PI*1200*t+.73)+
      .031*Math.sin(2*Math.PI*2400*t+.21)+
      .017*Math.sin(2*Math.PI*1800*t+1.4))*gate(t,6.960,7.0,.005,.004);
  }
  for(let n=Math.floor(4.82*rate);n<Math.ceil(6.98*rate);n++){
    const t=n/rate;
    const mix=smooth((t-4.82)/.025)*smooth((6.98-t)/.018);
    samples[n]=samples[n]*(1-mix)+lineGain*middle[n]*mix;
  }

  // Root-raised-cosine pulse shaping: coherent phase-coded symbols instead of
  // frequency sweeps or random wobbling oscillators.
  const rrc=(x,beta)=>{
    if(Math.abs(x)<1e-8)return 1+beta*(4/Math.PI-1);
    if(Math.abs(Math.abs(x)-1/(4*beta))<1e-6){
      return beta/Math.SQRT2*((1+2/Math.PI)*Math.sin(Math.PI/(4*beta))+
        (1-2/Math.PI)*Math.cos(Math.PI/(4*beta)));
    }
    return (Math.sin(Math.PI*x*(1-beta))+4*beta*x*Math.cos(Math.PI*x*(1+beta)))/
      (Math.PI*x*(1-16*beta*beta*x*x));
  };
  const post=new Float32Array(samples.length);
  const bursts=[{"carrier":1200,"start":8.672492,"end":8.868,"baud":599.7,"bits":"0101001011100011111111111110000111001111111110000011000111011000111001000111101011010101011000110011111000101010000000","peak":0.052,"phase":0.3},{"carrier":2400,"start":8.880313,"end":9.034,"baud":599.35,"bits":"0000000010101010101010110100011111111111111111000010100100110000000000101011011111011010101101010101","peak":0.032,"phase":0.7}];
  for(const d of bursts){
    const first=Math.floor(d.start*rate),last=Math.ceil(d.end*rate);
    for(let n=first;n<last;n++){
      const t=n/rate,position=(t-d.start)*d.baud-.5,centre=Math.floor(position);
      let symbol=0;
      for(let k=centre-6;k<=centre+6;k++){
        if(k<0||k>=d.bits.length)continue;
        symbol+=(Number(d.bits[k])*2-1)*rrc(position-k,.5);
      }
      post[n]+=d.peak*symbol*Math.cos(2*Math.PI*d.carrier*t+d.phase)*
        gate(t,d.start-.001,d.end,.002,.003);
    }
  }
  for(let n=Math.floor(8.67*rate);n<Math.ceil(9.146*rate);n++){
    const t=n/rate;
    // 2400 Hz stays clean until its phase-coded passage; 1800 Hz is a pilot.
    post[n]+=.038*Math.cos(2*Math.PI*2400*t+.7)*gate(t,8.665,8.881,.003,.003);
    post[n]+=.018*Math.cos(2*Math.PI*1800*t+1.4)*gate(t,8.665,9.034,.003,.003);
    post[n]+=.005*Math.cos(2*Math.PI*245*t+.2)*gate(t,9.034,9.146,.008,.010);
    post[n]+=.025*Math.cos(2*Math.PI*1959*t+.4)*gate(t,9.100,9.146,.005,.008);
  }

  // Late training: deterministic scrambled complex symbols on a fixed carrier.
  // Two measured amplitude distributions across the training stages. This is a perceptual
  // model, not a standards-compliant modem or a recovered original bit stream.
  const trainingStart=9.135, trainingEnd=16.27, baud=3200, carrier=1850;
  const span=10,beta=.12, count=Math.ceil((trainingEnd-trainingStart)*baud)+2*span;
  const si=new Float64Array(count),sq=new Float64Array(count);
  let seed=0x5a17babe;
  const rand=()=>{seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;return(seed>>>0)/4294967296;};
  for(let k=0;k<count;k++){
    const t=trainingStart+(k-span)/baud;
    if(t<13.32){
      si[k]=(2*Math.floor(rand()*8)-7)/Math.sqrt(21);
      sq[k]=(2*Math.floor(rand()*8)-7)/Math.sqrt(21);
    } else {
      // Sum three independently scrambled symbol layers, with a smaller third
      // layer, to match the broader late-training amplitude distribution.
      let i=0,q=0;
      for(const weight of [1,1,.4]){
        i+=weight*(2*Math.floor(rand()*8)-7);
        q+=weight*(2*Math.floor(rand()*8)-7);
      }
      si[k]=i/Math.sqrt(21*2.16);sq[k]=q/Math.sqrt(21*2.16);
    }
  }
  // 3200 symbols/s at 16 kHz is exactly five samples per symbol.
  const pulses=Array.from({length:5},(_,j)=>
    Float64Array.from({length:2*span+1},(_,k)=>rrc(j/5-(k-span),beta)));
  const raw=new Float64Array(samples.length);
  let energy=0,energyCount=0;
  const firstTraining=Math.floor(trainingStart*rate),lastTraining=Math.ceil(trainingEnd*rate);
  for(let n=firstTraining;n<lastTraining;n++){
    const rel=n-firstTraining,centre=Math.floor(rel/5)+span,coeff=pulses[rel%5];
    let i=0,q=0;
    for(let k=-span;k<=span;k++){
      const j=centre+k;
      if(j<0||j>=count)continue;
      const c=coeff[k+span];i+=si[j]*c;q+=sq[j]*c;
    }
    const t=n/rate,phi=2*Math.PI*carrier*t;
    raw[n]=i*Math.cos(phi)-q*Math.sin(phi);
    if(t>9.3&&t<11.1){energy+=raw[n]*raw[n];energyCount++;}
  }
  // A compact analytic telephone filter removes out-of-band splatter. The FIR
  // values are generated from filter design parameters, never a reference waveform.
  const taps=193,half=(taps-1)/2, fir=new Float64Array(taps);
  const sinc=x=>Math.abs(x)<1e-8?1:Math.sin(Math.PI*x)/(Math.PI*x);
  for(let k=0;k<taps;k++){
    const m=k-half,w=.42-.5*Math.cos(2*Math.PI*k/(taps-1))+.08*Math.cos(4*Math.PI*k/(taps-1));
    fir[k]=w*((2*3470/rate)*sinc(2*3470*m/rate)-(2*235/rate)*sinc(2*235*m/rate));
  }
  const referenceRms=.0204,normal=referenceRms/Math.sqrt(energy/energyCount);
  for(let n=firstTraining;n<lastTraining;n++){
    let v=0;
    for(let k=0;k<taps;k++){
      const j=n+k-half;
      if(j>=firstTraining&&j<lastTraining)v+=raw[j]*fir[k];
    }
    const t=n/rate;
    const level=1+.535*smooth((t-11.265)/.017)+.275*smooth((t-13.315)/.014);
    const settling=1+.15*Math.exp(-Math.max(0,t-11.28)/.06)*smooth((t-11.265)/.012)+
      .10*Math.exp(-Math.max(0,t-13.33)/.05)*smooth((t-13.315)/.012);
    post[n]+=v*normal*level*settling*gate(t,trainingStart,trainingEnd,.012,.024);
  }
  // Copy the approved probing sequence exactly up to 8.670 s, then change over.
  for(let n=Math.ceil(8.67*rate);n<samples.length;n++){
    const t=n/rate,mix=smooth((t-8.67)/.003);
    samples[n]=samples[n]*(1-mix)+lineGain*post[n]*mix;
  }
  return audio;
}


/* V6 fresh reconstruction experiment. The compact parameter objects contain
   oscillator controls, binary symbols and phase-reversal events, never PCM.
   V4 probe samples [7.38,8.67) remain exactly unchanged before playback gain. */
const openingV6 = {"fsk":[{"start":1.478901,"end":2.383,"baud":300.02,"frequencies":[979.7391,1180.184],"bits":"00000000000000000000000000000000000000000000000000000000000000000000000000001000000110000001100000011000000110110111011111001111111011111110011111101001110001101111010100101011111111111111110101100111111000111110001111110001110101011110010001001000101110000001100000011000","peak":0.036025,"coherence":0.98247},{"start":2.768976,"end":3.137,"baud":299.975,"frequencies":[1650.0394,1850.1863],"bits":"000000000000000000000000000000000010000001100000011000000110000001011001111110001101000001110000001100000011000","peak":0.041213,"coherence":0.99117}],"answer":{"start":3.395,"end":5.673,"carrier":2099.87325,"phase":1.334631,"reversals":[3.850188,4.300188,4.751062,5.204438],"peak":0.035428,"amDepth":0.17135,"amHz":14.95073,"amPhase":1.115},"preprobe":[{"carrier":1200,"start":6.97921,"end":7.061,"baud":600.0,"bits":"10001101010101000001111000010101001000101011111111","phase":1.30711,"peak":0.05656,"coherence":0.98649},{"carrier":2400,"start":6.980278,"end":7.061,"baud":599.6,"bits":"0101101000110101010100000111100001010100100010101","phase":0.8772,"peak":0.03461,"coherence":0.99334}],"pilots":[{"carrier":1200,"peak":0.05496,"phase":1.31723,"reversals":[7.313875]},{"carrier":1800,"peak":0.01718,"phase":-0.48548,"reversals":[]},{"carrier":2400,"peak":0.03493,"phase":0.79575,"reversals":[7.134812]}]};
const smoothV6=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x);};
const gateV6=(t,a,b,attack=.003,release=.003)=>smoothV6((t-a)/attack)*smoothV6((b-t)/release);
function answerToneV6(t){
  const d=openingV6.answer; let polarity=1;
  // Smooth bipolar transition represents band-limited phase reversal, not a gap.
  for(const at of d.reversals)polarity*=1-2*smoothV6((t-at+.0015)/.003);
  return d.peak*(1+d.amDepth*Math.cos(2*Math.PI*d.amHz*t+d.amPhase))*
    Math.cos(2*Math.PI*d.carrier*t+d.phase)*polarity*gateV6(t,d.start,d.end,.003,.004);
}
export function renderHandshake(context,profile){
  const audio=renderHandshakeV5(context,profile),y=audio.getChannelData(0),rate=16000;
  const fresh=new Float32Array(y.length),gain=2.6;
  // Clear early blocks: stable dual tones and single tones, with explicit pauses.
  // The first two quiet signals receive +6 dB for practical audibility.
  const tones=[
    [.075,.474,1375.04589,.006004,-2.80835,2],
    [.075,.474,2002.03763,.005621,.55784,2],
    [.480,.569,400.01755,.010055,3.03791,2],
    [.736,1.124,1528.97502,.036392,-2.59330,1],
    [.736,1.124,2224.95267,.031623,.42307,1],
    [1.125,1.232,1899.92366,.04827,1.03997,1],
    [1.264,1.295,1649.66651,.042571,.67928,1]
  ];
  for(const [a,b,f,amp,phase,boost] of tones){
    for(let n=Math.floor(a*rate);n<Math.ceil(b*rate);n++){
      const t=n/rate;fresh[n]+=amp*boost*Math.cos(2*Math.PI*f*t+phase)*gateV6(t,a,b);
    }
  }
  for(const d of openingV6.fsk){
    let phase=.4,frequency=d.frequencies[0];
    for(let n=Math.floor(d.start*rate);n<Math.ceil(d.end*rate);n++){
      const t=n/rate,k=Math.max(0,Math.min(d.bits.length-1,Math.floor((t-d.start)*d.baud)));
      frequency+=(d.frequencies[Number(d.bits[k])]-frequency)*.38;
      phase+=2*Math.PI*frequency/rate;
      fresh[n]+=d.peak*Math.cos(phase)*gateV6(t,d.start,d.end,.003,.004);
    }
  }
  for(let n=0;n<Math.ceil(4.86*rate);n++){
    const t=n/rate;fresh[n]+=answerToneV6(t);
    const mix=1-smoothV6((t-4.82)/.025);
    y[n]=gain*fresh[n]*mix+y[n]*(1-mix);
  }
  const rrc=(x,b)=>{
    if(Math.abs(x)<1e-8)return 1+b*(4/Math.PI-1);
    if(Math.abs(Math.abs(x)-1/(4*b))<1e-6)return b/Math.SQRT2*((1+2/Math.PI)*Math.sin(Math.PI/(4*b))+(1-2/Math.PI)*Math.cos(Math.PI/(4*b)));
    return (Math.sin(Math.PI*x*(1-b))+4*b*x*Math.cos(Math.PI*x*(1+b)))/(Math.PI*x*(1-16*b*b*x*x));
  };
  for(const d of openingV6.preprobe){
    for(let n=Math.floor(d.start*rate);n<Math.ceil(d.end*rate);n++){
      const t=n/rate,pos=(t-d.start)*d.baud-.5,centre=Math.floor(pos);let symbol=0;
      for(let k=centre-6;k<=centre+6;k++)if(k>=0&&k<d.bits.length)symbol+=(2*Number(d.bits[k])-1)*rrc(pos-k,.5);
      fresh[n]+=d.peak*symbol*Math.cos(2*Math.PI*d.carrier*t+d.phase)*gateV6(t,d.start,d.end,.002,.002);
    }
  }
  for(const d of openingV6.pilots){
    const start=d.carrier===1800?6.978:7.059;
    for(let n=Math.floor(start*rate);n<Math.ceil(7.38*rate);n++){
      const t=n/rate;let polarity=1;
      for(const at of d.reversals)polarity*=1-2*smoothV6((t-at+.001)/.002);
      fresh[n]+=d.peak*Math.cos(2*Math.PI*d.carrier*t+d.phase)*polarity*gateV6(t,start,7.40,.002,.002);
    }
  }
  for(let n=Math.floor(6.970*rate);n<Math.ceil(7.38*rate);n++){
    const t=n/rate,mix=smoothV6((t-6.970)/.005)*(1-smoothV6((t-7.368)/.012));
    y[n]=y[n]*(1-mix)+gain*fresh[n]*mix;
  }
  return audio;
}
