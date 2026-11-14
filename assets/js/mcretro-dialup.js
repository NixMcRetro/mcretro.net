/* McRetro.net's local Australian dial-up simulation. Nothing is dialled or sent.
   AU PSTN tone: 425 Hz amplitude-modulated at 25 Hz (AS/CA S002 Appendix A).
   DTMF key pairs use standard 697/770/852/941 + 1209/1336/1477 Hz.
   The handshake is resynthesised in-browser from recording-derived frequency and
   noise envelopes. The older synthetic handshake remains as an error fallback. */
(() => {
  'use strict';

  const MODEM_ROUTE = '/homepages/modem/';
  const DIAL_NUMBER = '0293735100';
  const HANDSHAKE_PROFILE = '/assets/data/mcretro-handshake-profile.json';
  const AUDIO_LEAD = 0.03;
  const OUTPUT_GAIN = 0.90;
  const HANDSHAKE_GAIN = 1.75;
  const DIAL_TONE_SECONDS = 2.61;
  const PRE_DIAL_SILENCE = 0.50;
  const DIALLING_START = DIAL_TONE_SECONDS + PRE_DIAL_SILENCE;
  const DIGIT_SECONDS = 0.120;
  const DIGIT_GAP = 0.060;
  const DIGIT_PERIOD = DIGIT_SECONDS + DIGIT_GAP;
  const DIALLING_END = DIALLING_START + (DIAL_NUMBER.length - 1) * DIGIT_PERIOD + DIGIT_SECONDS;
  const RING_START = DIALLING_END + 1.00;
  const RING_COUNT = 2;
  const RING_BURST = 0.40;
  const RING_INNER_GAP = 0.20;
  const RING_PAIR = 2 * RING_BURST + RING_INNER_GAP;
  const RING_PERIOD = RING_PAIR + 2.00;
  const ANSWER_LEAD = 0.30; // Answer just before the next ring would start.
  const CALLING_START = RING_START + RING_COUNT * RING_PERIOD - ANSWER_LEAD;
  const CALLING_COUNT = 3;
  const CALLING_FREQUENCY = 1300;
  const CALLING_SECONDS = 0.60;
  const CALLING_PERIOD = 2.35; // 0.60 seconds on, 1.75 seconds off in the reference.
  const CALLING_GAIN = 0.247; // Reference level scaled to the approved handshake mix.
  const CALLING_SEQUENCE_SECONDS = 6.34;
  const HANDSHAKE_START = CALLING_START + CALLING_SEQUENCE_SECONDS;
  const TOTAL_MS = Math.round((AUDIO_LEAD + HANDSHAKE_START + 16.30 + 0.07) * 1000);
  const SITES = Object.freeze([
    Object.freeze({slug:'frank',name:'Frank the Snake',path:'/homepages/frank/'}),
    Object.freeze({slug:'pepper',name:'Pepper the Dog Blog',path:'/homepages/pepper/'}),
    Object.freeze({slug:'sonic',name:'Sonic the Hedgehog Homepage',path:'/homepages/sonic/'}),
    Object.freeze({slug:'space',name:'Space / Planets Webpage',path:'/homepages/space/'}),
    Object.freeze({slug:'nature',name:'Super Nature World',path:'/homepages/nature/'})
  ]);
  const BLOG_RANDOM = Object.freeze({
    slug: 'blog-random',
    name: 'Random McRetro blog post',
    path: '/blog/'
  });
  let blogUrlsPromise = null;

  // Share the same generated article list as the primary Random navigation.
  // An unavailable or empty list must never trap visitors in the dial-up UI.
  function pickBlogPost() {
    if (!blogUrlsPromise) {
      blogUrlsPromise = fetch('/assets/data/random-post-urls.json', { credentials: 'same-origin' })
        .then(response => {
          if (!response.ok) throw new Error('Random blog post list unavailable');
          return response.json();
        })
        .then(urls => {
          if (!Array.isArray(urls)) throw new Error('Invalid blog post list');
          return urls.filter(url => typeof url === 'string' &&
            /^\/(?![\/\\])/.test(url) && !/[\r\n]/.test(url));
        })
        .catch(() => []);
    }
    return blogUrlsPromise.then(urls =>
      urls.length ? urls[Math.floor(Math.random() * urls.length)] : '/blog/');
  }

  const destinationPath = site =>
    site.slug === BLOG_RANDOM.slug ? pickBlogPost() : Promise.resolve(site.path);

  const DTMF = Object.freeze({
    '0':[941,1336], '1':[697,1209], '2':[697,1336], '3':[697,1477],
    '4':[770,1209], '5':[770,1336], '6':[770,1477],
    '7':[852,1209], '8':[852,1336], '9':[852,1477]
  });

  const findSite = slug => slug === BLOG_RANDOM.slug
    ? BLOG_RANDOM : (SITES.find(site => site.slug === slug) || null);
  const randomSite = () => SITES[Math.floor(Math.random()*SITES.length)];
  const resolveSite = slug => slug === 'random' ? randomSite() : findSite(slug);
  const modemURL = site => MODEM_ROUTE+'?site='+encodeURIComponent(site.slug);
  let currentRun = null;

  function endRun() {
    if (!currentRun) return;
    const run=currentRun;
    currentRun=null;
    run.timers.forEach(window.clearTimeout);
    if (run.sound) run.sound.stop();
  }

  // All oscillator nodes are scheduled from the actual Connect button click.
  function makeSound(root) {
    const Context=window.AudioContext || window.webkitAudioContext;
    if (!Context) return null;
    try {
      const context=new Context();
      const master=context.createGain();
      const muted=root.dataset.muted==='true';
      master.gain.value=muted ? 0 : OUTPUT_GAIN;
      master.connect(context.destination);
      const time=context.currentTime+AUDIO_LEAD;

      function tone(freq,offset,duration,volume=0.2,type='sine',attack=0.012,release=0.025) {
        const osc=context.createOscillator(), envelope=context.createGain();
        const from=time+offset, until=from+duration;
        osc.type=type;
        osc.frequency.setValueAtTime(freq,from);
        envelope.gain.setValueAtTime(0,from);
        envelope.gain.linearRampToValueAtTime(volume,from+attack);
        envelope.gain.setValueAtTime(volume,until-release);
        envelope.gain.linearRampToValueAtTime(0,until);
        osc.connect(envelope);
        envelope.connect(master);
        osc.start(from);
        osc.stop(until+0.01);
      }
      // Australian 425 x 25 Hz dial tone, continuous for the first 2.61 seconds.
      const start=time, length=DIAL_TONE_SECONDS;
      const carrier=context.createOscillator(), lfo=context.createOscillator();
      const amplitude=context.createGain(), modulation=context.createGain();
      const dialEnvelope=context.createGain();
      carrier.frequency.value=425;
      lfo.frequency.value=25;
      modulation.gain.value=0.32;
      amplitude.gain.value=0.65;
      // Fade the complete modulated signal so the 25 Hz component also reaches silence.
      dialEnvelope.gain.setValueAtTime(0,start);
      dialEnvelope.gain.linearRampToValueAtTime(0.50,start+0.015);
      dialEnvelope.gain.setValueAtTime(0.50,start+length-0.025);
      dialEnvelope.gain.linearRampToValueAtTime(0,start+length);
      lfo.connect(modulation);
      modulation.connect(amplitude.gain);
      carrier.connect(amplitude);
      amplitude.connect(dialEnvelope);
      dialEnvelope.connect(master);
      carrier.start(start);
      lfo.start(start);
      carrier.stop(start+length+0.01);
      lfo.stop(start+length+0.01);

      // Ten real DTMF pairs for 02 9373 5100. Short fades keep each digit distinct.
      Array.from(DIAL_NUMBER).forEach((digit,index) => {
        const when=DIALLING_START+index*DIGIT_PERIOD;
        DTMF[digit].forEach(freq=>tone(freq,when,DIGIT_SECONDS,0.26,'sine',0.006,0.012));
      });

      // Australian ringback: 0.4s on, 0.2s off, 0.4s on, 2s off.
      // 400+425+450Hz is an accepted Australian PSTN ringback frequency combination.
      for(let ring=0;ring<RING_COUNT;ring++) {
        const first=RING_START+ring*RING_PERIOD;
        const second=first+RING_BURST+RING_INNER_GAP;
        for(const offset of [first,second]) {
          for(const freq of [400,425,450]) tone(freq,offset,RING_BURST,0.16);
        }
      }

      // Begin calling during silence after the second double ring, before an omitted third ring.
      // V.25 calling tone: three procedural 1300 Hz bursts, with gentle click-free edges.
      for(let call=0;call<CALLING_COUNT;call++) {
        tone(CALLING_FREQUENCY,CALLING_START+call*CALLING_PERIOD,
          CALLING_SECONDS,CALLING_GAIN,'sine',0.008,0.012);
      }

      // Preserve the approved exchange after the calling sequence, including the final 1.04s pause.
      // The 16.3-second handshake is generated from spectral parameters.
      let stopped=false;
      const fallbackHandshake=()=>{
        if(stopped || context.currentTime > time+HANDSHAKE_START+7.40) return;
        // Previous synthetic handshake, retained for unsupported codecs or failed loads.
        for(let i=0;i<6;i++) tone(2100,HANDSHAKE_START+i*0.46,0.43,0.12);
        tone(1300,HANDSHAKE_START+2.85,0.36,0.15);
        tone(1750,HANDSHAKE_START+3.30,0.36,0.15);
        tone(980,HANDSHAKE_START+3.75,0.3,0.13);
        for(let i=0;i<24;i++){
          const at=HANDSHAKE_START+4.20+i*0.095;
          tone(700+(i*317)%2050,at,0.086,0.10,i%4===0?'triangle':'sine');
          if(i%3===0) tone(1150+(i*213)%1300,at,0.074,0.065);
        }
        tone(1800,HANDSHAKE_START+6.60,0.5,0.11);
      };
      context.resume().catch(()=>{});
      Promise.all([
        import('/assets/js/mcretro-handshake-synth.js'),
        fetch(HANDSHAKE_PROFILE).then(response=>{
          if(!response.ok) throw new Error('Handshake profile unavailable');
          return response.json();
        })
      ])
        .then(([synth,profile])=>{
          if(stopped) return;
          // Render ordinary PCM locally from oscillator and noise envelopes.
          // No original recording or decoded audio is downloaded.
          const buffer=synth.renderHandshake(context,profile);
          if(stopped) return;
          const handshake=context.createBufferSource();
          handshake.buffer=buffer;
          const handshakeLevel=context.createGain();
          handshakeLevel.gain.value=HANDSHAKE_GAIN;
          handshake.connect(handshakeLevel);
          handshakeLevel.connect(master);
          const scheduled=time+HANDSHAKE_START;
          const startsAt=Math.max(scheduled,context.currentTime+0.02);
          const offset=startsAt-scheduled;
          if(offset<buffer.duration) handshake.start(startsAt,offset);
        })
        .catch(fallbackHandshake);
      return {
        mute(value) { master.gain.setTargetAtTime(value?0:OUTPUT_GAIN,context.currentTime,0.02); },
        stop() { stopped=true; context.close().catch(()=>{}); }
      };
    } catch(error) {
      return null; // Audio errors must never prevent navigating a homepage.
    }
  }

  function setStage(root, stage) {
    const setup=root.querySelector('[data-modem-setup]');
    const progress=root.querySelector('[data-modem-progress]');
    if(setup) setup.hidden=stage!=='setup';
    if(progress) progress.hidden=stage!=='progress';
    root.querySelector('[data-modem-title]').textContent =
      stage==='progress' ? 'Connecting to '+(root._mcretroSite?.name||'McRetro Network') : 'Connect To';
    root.dataset.modemStage=stage;
  }

  function setDestination(root,site) {
    endRun();
    root._mcretroSite=site;
    root.dataset.muted='false';
    const mute=root.querySelector('[data-modem-mute]');
    mute.textContent='Mute';
    mute.setAttribute('aria-pressed','false');
    root.querySelector('[data-modem-destination]').textContent=site?site.name:'Unknown homepage';
    root.querySelector('[data-modem-connect]').disabled=!site;
    root.querySelector('[data-modem-skip]').disabled=!site;
    root.querySelector('[data-modem-status]').textContent=site?'Ready to dial.':'Unknown homepage.';
    setStage(root,'setup');
  }

  function startConnection(root) {
    const site=root._mcretroSite;
    if(!site || root.dataset.modemStage==='progress') return;
    endRun();
    setStage(root,'progress');
    const status=root.querySelector('[data-modem-status]');
    const sound=makeSound(root);
    const run={root,site,sound,timers:[],destinationPromise:destinationPath(site)};
    currentRun=run;
    const steps=[
      [0,'Initialising modem...'],
      [Math.round((AUDIO_LEAD+DIALLING_START)*1000),'Dialling 02 9373 5100...'],
      [Math.round((AUDIO_LEAD+DIALLING_END)*1000),'Waiting for answer...'],
      [Math.round((AUDIO_LEAD+CALLING_START)*1000),'Calling remote modem...'],
      [Math.round((AUDIO_LEAD+HANDSHAKE_START)*1000),'Negotiating protocols...'],
      [Math.round((AUDIO_LEAD+HANDSHAKE_START+3.07)*1000),'Handshaking with remote modem...'],
      [Math.round((AUDIO_LEAD+HANDSHAKE_START+14.17)*1000),'Verifying user name and password...'],
      [Math.round((AUDIO_LEAD+HANDSHAKE_START+15.67)*1000),'Connected at 33600 bps.']
    ];
    steps.forEach(([delay,message])=>{
      run.timers.push(window.setTimeout(()=>{
        if(currentRun===run) status.textContent=message;
      },delay));
    });
    run.timers.push(window.setTimeout(()=>{
      if(currentRun!==run) return;
      endRun();
      run.destinationPromise.then(path => window.location.replace(path));
    },TOTAL_MS));
  }

  function initModemRoot(root,modal) {
    root.dataset.muted='false';
    root.querySelector('[data-modem-connect]').addEventListener('click',()=>startConnection(root));
    root.querySelector('[data-modem-skip]').addEventListener('click',()=>{
      const site=root._mcretroSite;
      if(!site) return;
      const destinationPromise = currentRun?.root === root
        ? currentRun.destinationPromise : destinationPath(site);
      endRun();
      destinationPromise.then(path => window.location.replace(path));
    });
    root.querySelector('[data-modem-mute]').addEventListener('click',event=>{
      const muted=root.dataset.muted!=='true';
      root.dataset.muted=String(muted);
      const button=event.currentTarget;
      button.textContent=muted?'Unmute':'Mute';
      button.setAttribute('aria-pressed',String(muted));
      if(currentRun?.sound) currentRun.sound.mute(muted);
    });

    if(modal) {
      const close=event=>{
        event.preventDefault();
        endRun();
        root.close();
        window.history.back();
      };
      root.querySelector('[data-modem-cancel]').addEventListener('click',close);
      root.querySelector('[data-modem-progress-cancel]').addEventListener('click',close);
      root.querySelector('[data-modem-close]').addEventListener('click',close);
      root.addEventListener('cancel',close);
    } else {
      // On the standalone route, Cancel and X are real links to the homepage.
      root.querySelector('[data-modem-progress-cancel]').href='/';
    }
  }

  const dialog=document.getElementById('mcretro-modem-dialog');
  const standalone=document.getElementById('mcretro-modem-page');
  if(dialog) initModemRoot(dialog,true);
  if(standalone) {
    initModemRoot(standalone,false);
    const params=new URLSearchParams(window.location.search);
    const requested=params.get('site');
    // The clean modem URL defaults to a random restored homepage. Preserve
    // the old ?site=... deep links, including links to individual homepages.
    setDestination(standalone,resolveSite(requested||'random')||randomSite());

    // Destination choices live on this page, not as separate Goodies links.
    // Switching modes updates the existing dialler without a page reload.
    standalone.querySelectorAll('[data-modem-choice]').forEach(choice=>{
      choice.checked=choice.value===(requested==='blog-random'?'blog-random':'random');
      choice.addEventListener('change',()=>{
        if(!choice.checked) return;
        const site=resolveSite(choice.value);
        if(!site) return;
        setDestination(standalone,site);
        window.history.replaceState(null,'',choice.value==='random'
          ? MODEM_ROUTE : modemURL(site));
      });
    });
  }
  // In-page dial links, such as the sidebar shortcut, can still open the modal.
  // Modified clicks and browsers without <dialog> keep the standalone URL.
  document.querySelectorAll('a[data-dial-site]').forEach(link=>{
    link.addEventListener('click',event=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||
         event.shiftKey||event.altKey||!dialog||typeof dialog.showModal!=='function') return;
      const site=resolveSite(link.dataset.dialSite);
      if(!site) return;
      event.preventDefault();
      setDestination(dialog,site);
      window.history.pushState({mcretroModem:site.slug},'',modemURL(site));
      dialog.showModal(); // The visitor presses Connect to start the actual sound.
    });
  });
  if(dialog) {
    window.addEventListener('popstate',event=>{
      endRun();
      const site=event.state&&findSite(event.state.mcretroModem);
      if(site&&window.location.pathname===MODEM_ROUTE){
        setDestination(dialog,site);
        if(!dialog.open) dialog.showModal();
      } else if(dialog.open) dialog.close();
    });
  }
})();

