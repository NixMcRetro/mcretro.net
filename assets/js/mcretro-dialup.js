/* McRetro.net's local Australian dial-up simulation. Nothing is dialled or sent.
   AU PSTN tone: 425 Hz amplitude-modulated at 25 Hz (AS/CA S002 Appendix A).
   DTMF key pairs use standard 697/770/852/941 + 1209/1336/1477 Hz.
   The handshake is resynthesised in-browser from recording-derived frequency and
   noise envelopes. The older synthetic handshake remains as an error fallback. */
(() => {
  'use strict';

  const MODEM_ROUTE = '/homepages/modem/';
  const DEFAULT_DIAL_NUMBER = '0293735100';
  const MAX_DIAL_DIGITS = 20;
  const CONNECTION_STORAGE = 'mcretro-dialup-connected-v1';
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
  // V6.7 stays unchanged for the default 10 digits: three beep / double-ring cycles.
  const CALLING_FREQUENCY = 1300;
  const CALLING_SECONDS = 0.60;
  const CALLING_GAIN = 0.247;
  const CALLING_TO_RING_GAP = 0.20;
  const RING_COUNT = 3;
  const RING_BURST = 0.40;
  const RING_INNER_GAP = 0.20;
  const RING_PAIR = 2 * RING_BURST + RING_INNER_GAP;
  const RING_PERIOD = RING_PAIR + 2.00;
  const ANSWER_LEAD = 0.30; // Start handshake before a hypothetical fourth double ring.

  function timingFor(digits) {
    const diallingEnd = DIALLING_START + (digits.length - 1) * DIGIT_PERIOD + DIGIT_SECONDS;
    const callingStart = diallingEnd + 1.00;
    const ringStart = callingStart + CALLING_SECONDS + CALLING_TO_RING_GAP;
    const handshakeStart = ringStart + RING_COUNT * RING_PERIOD - ANSWER_LEAD;
    const totalMs = Math.round((AUDIO_LEAD + handshakeStart + 16.30 + 0.07) * 1000);
    return { diallingEnd, callingStart, ringStart, handshakeStart, totalMs };
  }
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
  function makeSound(root, dialDigits, timing) {
    // The only variable sound section is DTMF. Everything following retains V6.7.
    const CALLING_START = timing.callingStart;
    const RING_START = timing.ringStart;
    const HANDSHAKE_START = timing.handshakeStart;
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

      // Dial each entered digit as real DTMF pairs, preserving the V6.7 cadence.
      Array.from(dialDigits).forEach((digit,index) => {
        const when=DIALLING_START+index*DIGIT_PERIOD;
        DTMF[digit].forEach(freq=>tone(freq,when,DIGIT_SECONDS,0.26,'sine',0.006,0.012));
      });

      // V6.7: beep, double ring, beep, double ring, beep, double ring, then handshake.
      // The calling beeps do not overlap the rings: 0.6s at 1300 Hz, then 0.2s quiet.
      // Australian ringback: 0.4s on, 0.2s off, 0.4s on, then 2s off.
      // 400+425+450Hz is an accepted Australian PSTN ringback frequency combination.
      for(let cycle=0;cycle<RING_COUNT;cycle++) {
        tone(CALLING_FREQUENCY,CALLING_START+cycle*RING_PERIOD,
          CALLING_SECONDS,CALLING_GAIN,'sine',0.008,0.012);
        const first=RING_START+cycle*RING_PERIOD;
        const second=first+RING_BURST+RING_INNER_GAP;
        for(const offset of [first,second]) {
          for(const freq of [400,425,450]) tone(freq,offset,RING_BURST,0.16);
        }
      }

      // Preserve the approved handshake PCM and its final 1.04s pause unchanged.
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

  const taskbar = document.getElementById('mcretro-modem-taskbar');
  const dialog = document.getElementById('mcretro-modem-dialog');
  const standalone = document.getElementById('mcretro-modem-page');
  let durationTicker = null;

  function readConnected() {
    try {
      const raw = window.sessionStorage && window.sessionStorage.getItem(CONNECTION_STORAGE);
      if (!raw) return null;
      const data = JSON.parse(raw);
      return data && typeof data.name === 'string' &&
        typeof data.phone === 'string' && Number.isFinite(data.startedAt) ? data : null;
    } catch (_) {
      return null; // Storage blocked: connecting and navigating still work.
    }
  }

  function saveConnected(data) {
    try { window.sessionStorage?.setItem(CONNECTION_STORAGE, JSON.stringify(data)); }
    catch (_) { /* Session storage may be unavailable. */ }
  }

  function clearConnected() {
    try { window.sessionStorage?.removeItem(CONNECTION_STORAGE); } catch (_) {}
  }

  function stopDuration() {
    if (durationTicker !== null) {
      window.clearInterval(durationTicker);
      durationTicker = null;
    }
  }

  function formatDuration(startedAt) {
    const seconds = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor(seconds % 3600 / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return h + ':' + m + ':' + s;
  }

  function setStage(root, stage) {
    const setup = root.querySelector('[data-modem-setup]');
    const progress = root.querySelector('[data-modem-progress]');
    const connected = root.querySelector('[data-modem-connected]');
    if (setup) setup.hidden = stage !== 'setup';
    if (progress) progress.hidden = stage !== 'progress';
    if (connected) connected.hidden = stage !== 'connected';
    root.querySelector('[data-modem-minimize]').hidden = stage !== 'connected';
    root.querySelector('[data-modem-title]').textContent =
      stage === 'connected' ? 'Connected To McRetro.net' :
      stage === 'progress' ? 'Connecting To ' + (root._mcretroSite?.name || 'McRetro.net') : 'Connect To';
    root.dataset.modemStage = stage;
  }

  function setDestination(root, site) {
    endRun();
    root._mcretroSite = site;
    root.dataset.muted = 'false';
    const mute = root.querySelector('[data-modem-mute]');
    mute.textContent = 'Mute';
    mute.setAttribute('aria-pressed', 'false');
    root.querySelector('[data-modem-destination]').textContent = site ? site.name : 'Unknown Homepage';
    root.querySelector('[data-modem-connect]').disabled = !site;
    root.querySelector('[data-modem-skip]').disabled = !site;
    root.querySelector('[data-modem-status]').textContent = site ? 'Ready To Dial.' : 'Unknown Homepage.';
    root.querySelectorAll('[data-modem-choice]').forEach(choice => {
      choice.checked = choice.value === (site?.slug === BLOG_RANDOM.slug ? 'blog-random' : 'random');
    });
    setStage(root, 'setup');
  }

  function displayConnected(root, data) {
    root.querySelector('[data-modem-connected-number]').textContent = data.phone;
    root.querySelector('[data-modem-connected-destination]').textContent = data.name;
    root.querySelector('[data-modem-visit]').href = data.path || MODEM_ROUTE;
    const duration = root.querySelector('[data-modem-duration]');
    const update = () => { duration.textContent = formatDuration(data.startedAt); };
    setStage(root, 'connected');
    if (root.open) root.close();
    if (typeof root.show === 'function') root.show(); // Modeless: users can browse behind it.
    else if (typeof root.showModal === 'function') root.showModal();
    if (taskbar) taskbar.hidden = true;
    stopDuration();
    update();
    durationTicker = window.setInterval(update, 1000);
  }

  function minimiseConnected(root) {
    if (root.dataset.modemStage !== 'connected') return;
    const data = readConnected();
    if (data) {
      data.minimised = true;
      saveConnected(data);
    }
    stopDuration();
    if (root.open) root.close();
    if (taskbar) taskbar.hidden = false;
  }

  function disconnectConnected(root) {
    clearConnected();
    stopDuration();
    endRun();
    if (taskbar) taskbar.hidden = true;
    if (root?.open) root.close();
    if (root) setStage(root, 'setup');
  }

  function restoreConnected() {
    const data = readConnected();
    if (!data || !dialog) return;
    dialog._mcretroSite = { name: data.name, slug: 'saved' };
    setStage(dialog, 'connected');
    dialog.querySelector('[data-modem-connected-number]').textContent = data.phone;
    dialog.querySelector('[data-modem-connected-destination]').textContent = data.name;
    dialog.querySelector('[data-modem-visit]').href = data.path || MODEM_ROUTE;
    if (data.minimised) {
      if (taskbar) taskbar.hidden = false;
    } else {
      displayConnected(dialog, data);
    }
  }

  function startConnection(root) {
    const site = root._mcretroSite;
    if (!site || root.dataset.modemStage === 'progress') return;
    const input = root.querySelector('[data-modem-number]');
    const phone = String(input.value || '').trim();
    const dialDigits = phone.replace(/[^0-9]/g, '');
    if (!/^[0-9()+. -]+$/.test(phone) || !dialDigits.length || dialDigits.length > MAX_DIAL_DIGITS) {
      if (typeof input.setCustomValidity === 'function') {
        input.setCustomValidity('Enter a Phone Number With 1 To 20 Digits.');
        input.reportValidity();
      }
      return;
    }
    if (typeof input.setCustomValidity === 'function') input.setCustomValidity('');
    const timing = timingFor(dialDigits);
    clearConnected();
    stopDuration();
    if (dialog && dialog !== root && dialog.open && dialog.dataset.modemStage === 'connected') dialog.close();
    if (taskbar) taskbar.hidden = true;
    endRun();
    setStage(root, 'progress');
    const status = root.querySelector('[data-modem-status]');
    const sound = makeSound(root, dialDigits, timing);
    const run = { root, site, sound, phone, timers: [], destinationPromise: destinationPath(site) };
    currentRun = run;
    const steps = [
      [0, 'Initialising Modem...'],
      [Math.round((AUDIO_LEAD + DIALLING_START) * 1000), 'Dialling ' + phone + '...'],
      [Math.round((AUDIO_LEAD + timing.diallingEnd) * 1000), 'Waiting For Answer...'],
      [Math.round((AUDIO_LEAD + timing.callingStart) * 1000), 'Calling Remote Modem...'],
      [Math.round((AUDIO_LEAD + timing.handshakeStart) * 1000), 'Negotiating Protocols...'],
      [Math.round((AUDIO_LEAD + timing.handshakeStart + 3.07) * 1000), 'Handshaking With Remote Modem...'],
      [Math.round((AUDIO_LEAD + timing.handshakeStart + 14.17) * 1000), 'Verifying User Name And Password...'],
      [Math.round((AUDIO_LEAD + timing.handshakeStart + 15.67) * 1000), 'Connected At 28,800 bps.']
    ];
    steps.forEach(([delay, message]) => {
      run.timers.push(window.setTimeout(() => {
        if (currentRun === run) status.textContent = message;
      }, delay));
    });
    run.timers.push(window.setTimeout(() => {
      if (currentRun !== run) return;
      run.destinationPromise.then(path => {
        if (currentRun !== run) return;
        const data = { name: site.name, phone, path, startedAt: Date.now(), minimised: false };
        endRun();
        saveConnected(data);
        // Keep the connection window in this tab. Some restored homepages are
        // standalone historical HTML without the shared McRetro layout, so an
        // automatic redirect would make the Connected window disappear.
        // The Visit Site link opens the selected destination in a new tab.
        displayConnected(root, data);
      });
    }, timing.totalMs));
  }

  function closeWindow(root) {
    if (root.dataset.modemStage === 'connected') {
      disconnectConnected(root);
      return;
    }
    endRun();
    if (root.open) root.close();
    if (root === dialog && root._mcretroHistoryEntry) {
      root._mcretroHistoryEntry = false;
      window.history.back();
    }
  }

  function initModemRoot(root) {
    root.dataset.muted = 'false';
    root.querySelector('[data-modem-connect]').addEventListener('click', () => startConnection(root));
    root.querySelector('[data-modem-skip]').addEventListener('click', () => {
      const site = root._mcretroSite;
      if (!site) return;
      const destinationPromise = currentRun?.root === root
        ? currentRun.destinationPromise : destinationPath(site);
      endRun();
      destinationPromise.then(path => window.location.replace(path));
    });
    root.querySelector('[data-modem-mute]').addEventListener('click', event => {
      const muted = root.dataset.muted !== 'true';
      root.dataset.muted = String(muted);
      const button = event.currentTarget;
      button.textContent = muted ? 'Unmute' : 'Mute';
      button.setAttribute('aria-pressed', String(muted));
      if (currentRun?.sound) currentRun.sound.mute(muted);
    });
    const close = event => {
      if (event) event.preventDefault();
      closeWindow(root);
    };
    root.querySelector('[data-modem-cancel]').addEventListener('click', close);
    root.querySelector('[data-modem-progress-cancel]').addEventListener('click', close);
    root.querySelector('[data-modem-close]').addEventListener('click', close);
    root.addEventListener('cancel', close);
    root.querySelector('[data-modem-minimize]').addEventListener('click', () => minimiseConnected(root));
    root.querySelector('[data-modem-connected-ok]').addEventListener('click', () => minimiseConnected(root));
    root.querySelector('[data-modem-disconnect]').addEventListener('click', () => disconnectConnected(root));
    root.querySelector('[data-modem-details]').addEventListener('click', event => {
      const panel = root.querySelector('[data-modem-details-panel]');
      panel.hidden = !panel.hidden;
      event.currentTarget.textContent = panel.hidden ? 'Details >>' : 'Details <<';
      event.currentTarget.setAttribute('aria-expanded', String(!panel.hidden));
    });
    root.querySelectorAll('[data-modem-choice]').forEach(choice => {
      choice.addEventListener('change', () => {
        if (!choice.checked) return;
        const site = resolveSite(choice.value);
        if (!site) return;
        setDestination(root, site);
        if (root === standalone) {
          window.history.replaceState(null, '', choice.value === 'random'
            ? MODEM_ROUTE : modemURL(site));
        }
      });
    });
    root.querySelector('[data-modem-number]').addEventListener('input', event => {
      if (typeof event.currentTarget.setCustomValidity === 'function') event.currentTarget.setCustomValidity('');
    });
  }

  if (dialog) initModemRoot(dialog);
  if (standalone) {
    initModemRoot(standalone);
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('site');
    setDestination(standalone, resolveSite(requested || 'random') || randomSite());
    document.querySelectorAll('[data-modem-launch]').forEach(link => {
      link.addEventListener('click', event => {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
            event.ctrlKey || event.shiftKey || event.altKey ||
            typeof standalone.showModal !== 'function') return;
        event.preventDefault();
        disconnectConnected(dialog);
        if (standalone.open) standalone.close();
        standalone.showModal();
      });
    });
  }

  // Sidebar links still open the same dialler in a Windows 95 modal.
  // Modified clicks and unsupported browsers keep the ordinary URL.
  document.querySelectorAll('a[data-dial-site]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
          event.ctrlKey || event.shiftKey || event.altKey ||
          !dialog || typeof dialog.showModal !== 'function') return;
      const site = resolveSite(link.dataset.dialSite);
      if (!site) return;
      event.preventDefault();
      disconnectConnected(dialog);
      setDestination(dialog, site);
      window.history.pushState({ mcretroModem: site.slug }, '', modemURL(site));
      dialog._mcretroHistoryEntry = true;
      dialog.showModal();
    });
  });

  if (taskbar) taskbar.addEventListener('click', () => {
    const data = readConnected();
    if (!data || !dialog) { taskbar.hidden = true; return; }
    data.minimised = false;
    saveConnected(data);
    displayConnected(dialog, data);
  });

  if (dialog) {
    window.addEventListener('popstate', event => {
      if (dialog.dataset.modemStage === 'connected') return;
      endRun();
      const site = event.state && findSite(event.state.mcretroModem);
      if (site && window.location.pathname === MODEM_ROUTE) {
        setDestination(dialog, site);
        if (!dialog.open) dialog.showModal();
      } else if (dialog.open) {
        dialog.close();
      }
    });
  }
  restoreConnected();
})();
