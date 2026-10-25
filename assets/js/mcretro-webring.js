/* McRetro.net's local Australian dial-up simulation. Nothing is dialled or sent.
   AU PSTN tone: 425 Hz amplitude-modulated at 25 Hz (AS/CA S002 Appendix A).
   DTMF key pairs use standard 697/770/852/941 + 1209/1336/1477 Hz.
   The late-1990s modem handshake is deliberately an approximation, not an archive recording. */
(() => {
  'use strict';

  const MODEM_ROUTE = '/homepages/modem/';
  const DIAL_NUMBER = '0293735100';
  const TOTAL_MS = 20000;
  const SITES = Object.freeze([
    Object.freeze({slug:'frank',name:'Frank the Snake',path:'/homepages/frank/'}),
    Object.freeze({slug:'pepper',name:'Pepper the Dog Blog',path:'/homepages/pepper/'}),
    Object.freeze({slug:'sonic',name:'Sonic the Hedgehog Homepage',path:'/homepages/sonic/'}),
    Object.freeze({slug:'space',name:'Space / Planets Webpage',path:'/homepages/space/'}),
    Object.freeze({slug:'nature',name:'Super Nature World',path:'/homepages/nature/'})
  ]);
  const DTMF = Object.freeze({
    '0':[941,1336], '1':[697,1209], '2':[697,1336], '3':[697,1477],
    '4':[770,1209], '5':[770,1336], '6':[770,1477],
    '7':[852,1209], '8':[852,1336], '9':[852,1477]
  });

  const findSite = slug => SITES.find(site => site.slug === slug) || null;
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
      master.gain.value=muted ? 0 : 0.05;
      master.connect(context.destination);
      const time=context.currentTime+0.03;

      function tone(freq,offset,duration,volume=0.2,type='sine') {
        const osc=context.createOscillator(), envelope=context.createGain();
        const from=time+offset, until=from+duration;
        osc.type=type;
        osc.frequency.setValueAtTime(freq,from);
        envelope.gain.setValueAtTime(0,from);
        envelope.gain.linearRampToValueAtTime(volume,from+0.012);
        envelope.gain.setValueAtTime(volume,until-0.025);
        envelope.gain.linearRampToValueAtTime(0,until);
        osc.connect(envelope);
        envelope.connect(master);
        osc.start(from);
        osc.stop(until+0.01);
      }
      // Australian 425 x 25 Hz dial tone, continuous for the first 1.7 seconds.
      const start=time, length=1.7;
      const carrier=context.createOscillator(), lfo=context.createOscillator();
      const amplitude=context.createGain(), modulation=context.createGain();
      carrier.frequency.value=425;
      lfo.frequency.value=25;
      modulation.gain.value=0.32;
      amplitude.gain.setValueAtTime(0,start);
      amplitude.gain.setValueAtTime(0.65,start+0.015);
      amplitude.gain.setValueAtTime(0.65,start+length-0.025);
      amplitude.gain.linearRampToValueAtTime(0,start+length);
      lfo.connect(modulation);
      modulation.connect(amplitude.gain);
      carrier.connect(amplitude);
      amplitude.connect(master);
      carrier.start(start);
      lfo.start(start);
      carrier.stop(start+length+0.01);
      lfo.stop(start+length+0.01);

      // Ten real DTMF digit pairs for 02 9373 5100, 190 ms per key + 95 ms gap.
      Array.from(DIAL_NUMBER).forEach((digit,index) => {
        const when=1.95+index*0.285;
        DTMF[digit].forEach(freq=>tone(freq,when,0.19,0.22));
      });

      // Australian ringback: 0.4s on, 0.2s off, 0.4s on, 2s off.
      // 400+425+450Hz is an accepted Australian PSTN ringback frequency combination.
      for(const offset of [5.35,5.95,8.35]) {
        for(const freq of [400,425,450]) tone(freq,offset,0.4,0.09);
      }

      // Approximate 33.6 kbps negotiation: answer tone, phase breaks, short training
      // chirps and a rising/noisy sequence (not intended as exact V.34 waveforms).
      for(let i=0;i<6;i++) tone(2100,10.6+i*0.46,0.43,0.12);
      tone(1300,13.45,0.36,0.15);
      tone(1750,13.9,0.36,0.15);
      tone(980,14.35,0.3,0.13);
      for(let i=0;i<24;i++){
        const at=14.8+i*0.095;
        tone(700+(i*317)%2050,at,0.086,0.10,i%4===0?'triangle':'sine');
        if(i%3===0) tone(1150+(i*213)%1300,at,0.074,0.065);
      }
      tone(1800,17.2,0.5,0.11);
      context.resume().catch(()=>{});
      return {
        mute(value) { master.gain.setTargetAtTime(value?0:0.05,context.currentTime,0.02); },
        stop() { context.close().catch(()=>{}); }
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
    root.querySelector('[data-modem-help]').hidden=stage==='progress';
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
    root.querySelector('[data-modem-note]').hidden=true;
    setStage(root,'setup');
  }

  function startConnection(root) {
    const site=root._mcretroSite;
    if(!site || root.dataset.modemStage==='progress') return;
    endRun();
    setStage(root,'progress');
    const status=root.querySelector('[data-modem-status]');
    const note=root.querySelector('[data-modem-note]');
    note.hidden=false;
    const sound=makeSound(root);
    const run={root,site,sound,timers:[]};
    currentRun=run;
    const steps=[
      [0,'Initialising modem...'],
      [1000,'Dialling 02 9373 5100...'],
      [5200,'Waiting for answer...'],
      [10200,'Negotiating protocols...'],
      [13700,'Handshaking with remote modem...'],
      [17800,'Verifying user name and password...'],
      [19300,'Connected at 33600 bps.']
    ];
    steps.forEach(([delay,message])=>{
      run.timers.push(window.setTimeout(()=>{
        if(currentRun===run) status.textContent=message;
      },delay));
    });
    run.timers.push(window.setTimeout(()=>{
      if(currentRun!==run) return;
      endRun();
      window.location.replace(site.path);
    },TOTAL_MS));
  }

  function initModemRoot(root,modal) {
    root.dataset.muted='false';
    root.querySelector('[data-modem-connect]').addEventListener('click',()=>startConnection(root));
    root.querySelector('[data-modem-skip]').addEventListener('click',()=>{
      const site=root._mcretroSite;
      if(!site) return;
      endRun();
      window.location.replace(site.path);
    });
    root.querySelector('[data-modem-mute]').addEventListener('click',event=>{
      const muted=root.dataset.muted!=='true';
      root.dataset.muted=String(muted);
      const button=event.currentTarget;
      button.textContent=muted?'Unmute':'Mute';
      button.setAttribute('aria-pressed',String(muted));
      if(currentRun?.sound) currentRun.sound.mute(muted);
    });
    root.querySelector('[data-modem-help]').addEventListener('click',()=>{
      const note=root.querySelector('[data-modem-note]');
      note.hidden=!note.hidden;
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

  const widget=document.querySelector('[data-dial-homepage]');
  const dialog=document.getElementById('mcretro-modem-dialog');
  const standalone=document.getElementById('mcretro-modem-page');
  if(dialog) initModemRoot(dialog,true);
  if(standalone) {
    initModemRoot(standalone,false);
    const params=new URLSearchParams(window.location.search);
    setDestination(standalone,resolveSite(params.get('site')));
  }
  if(widget) {
    widget.querySelectorAll('[data-dial-site]').forEach(link=>{
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
  }
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
