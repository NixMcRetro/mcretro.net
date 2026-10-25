/* McRetro Webring and locally synthesised dial-up Easter egg.
   No external audio, links or services. HTML is usable without JavaScript.
   An authentic mono MP3 can replace the synth: set AUDIO_RECORDING to
   '/assets/audio/modem-dialup.mp3' after adding the file to the repository. */
(() => {
  'use strict';

  const MODEM_ROUTE = '/homepages/modem/';
  const AUDIO_RECORDING = '';
  const CONNECT_MS = 6300;
  const SITES = Object.freeze([
    Object.freeze({ slug: 'frank', name: 'Frank the Snake', path: '/homepages/frank/' }),
    Object.freeze({ slug: 'pepper', name: 'Pepper the Dog Blog', path: '/homepages/pepper/' }),
    Object.freeze({ slug: 'sonic', name: 'Sonic the Hedgehog Homepage', path: '/homepages/sonic/' }),
    Object.freeze({ slug: 'space', name: 'Space / Planets Webpage', path: '/homepages/space/' }),
    Object.freeze({ slug: 'nature', name: 'Super Nature World', path: '/homepages/nature/' })
  ]);

  function findSite(slug) {
    return SITES.find(site => site.slug === slug) || null;
  }

  function modemURL(site) {
    return MODEM_ROUTE + '?site=' + encodeURIComponent(site.slug);
  }

  let currentRun = null;

  function finishSound(sound) {
    if (sound && sound.stop) sound.stop();
  }

  function endRun() {
    if (!currentRun) return;
    const old = currentRun;
    currentRun = null;
    old.timers.forEach(window.clearTimeout);
    finishSound(old.sound);
    const button = old.root.querySelector('[data-modem-connect]');
    if (button) button.disabled = false;
  }

  function makeSound(root) {
    const muted = root.dataset.muted === 'true';
    if (AUDIO_RECORDING) {
      const audio = new Audio(AUDIO_RECORDING);
      audio.volume = 0.24;
      audio.muted = muted;
      audio.play().catch(() => {}); // Direct URL requires the Connect gesture.
      return {
        mute(value) { audio.muted = value; },
        stop() { audio.pause(); audio.currentTime = 0; }
      };
    }

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;

    try {
      // Only called from a real click. Kept intentionally quiet.
      const context = new AudioContextClass();
      const master = context.createGain();
      master.gain.value = muted ? 0 : 0.055;
      master.connect(context.destination);
      const time = context.currentTime + 0.02;

      function tone(freq, offset, duration, level = 0.22, type = 'sine') {
        const oscillator = context.createOscillator();
        const envelope = context.createGain();
        oscillator.type = type;
        oscillator.frequency.setValueAtTime(freq, time + offset);
        envelope.gain.setValueAtTime(0, time + offset);
        envelope.gain.linearRampToValueAtTime(level, time + offset + 0.012);
        envelope.gain.setValueAtTime(level, time + offset + duration - 0.02);
        envelope.gain.linearRampToValueAtTime(0, time + offset + duration);
        oscillator.connect(envelope);
        envelope.connect(master);
        oscillator.start(time + offset);
        oscillator.stop(time + offset + duration + 0.01);
      }

      // Familiar American-style dial tone and DTMF sequence.
      tone(350, 0, 0.58, 0.18);
      tone(440, 0, 0.58, 0.18);
      const keys = [[770,1336],[770,1336],[770,1336],
                    [697,1336],[852,1477],[770,1336],[852,1336]];
      keys.forEach((pair, index) => {
        const offset = 0.72 + index * 0.13;
        tone(pair[0], offset, 0.105, 0.2);
        tone(pair[1], offset, 0.105, 0.2);
      });

      // Stylised carrier negotiation, not a sampled historic modem recording.
      tone(2100, 1.85, 0.75, 0.17);
      tone(1300, 2.72, 0.3, 0.14);
      tone(1750, 3.03, 0.29, 0.14);
      tone(990, 3.35, 0.28, 0.14);
      for (let n = 0; n < 16; n += 1) {
        tone(700 + (n * 389) % 1750, 3.75 + n * 0.106, 0.092, 0.12, n % 3 ? 'sine' : 'triangle');
      }
      tone(1800, 5.57, 0.35, 0.1);
      context.resume().catch(() => {});
      return {
        mute(value) {
          master.gain.setTargetAtTime(value ? 0 : 0.055, context.currentTime, 0.015);
        },
        stop() {
          context.close().catch(() => {});
        }
      };
    } catch (error) {
      // A denied audio context must not prevent navigating the Webring.
      return null;
    }
  }

  function setDestination(root, site) {
    root._mcretroSite = site;
    const label = root.querySelector('[data-modem-destination]');
    if (label) label.textContent = site ? site.name : 'Unknown homepage';
    const skip = root.querySelector('[data-modem-skip]');
    const connect = root.querySelector('[data-modem-connect]');
    if (skip) skip.disabled = !site;
    if (connect) connect.disabled = !site;
    const status = root.querySelector('[data-modem-status]');
    if (status) status.textContent = site
      ? 'READY\nPress Connect to dial, or Skip to visit immediately.'
      : 'ERROR: Unknown homepage destination.\nReturn to McRetro.net and select a homepage.';
  }

  function startConnection(root) {
    const site = root._mcretroSite;
    if (!site) return;
    endRun();
    const status = root.querySelector('[data-modem-status]');
    const connect = root.querySelector('[data-modem-connect]');
    if (connect) connect.disabled = true;

    const sound = makeSound(root);
    const run = { root, site, sound, timers: [] };
    currentRun = run;
    const steps = [
      [0, 'ATDT 555-0199\nDialling McRetro Network...'],
      [1250, 'RINGING...\nPlease do not pick up the telephone.'],
      [2350, 'HANDSHAKING...\nNegotiating connection...'],
      [4100, 'VERIFYING...\nChecking the SCSI terminator...'],
      [5500, 'CONNECT 33600\nTransferring you to ' + site.name + '...']
    ];
    steps.forEach(([delay, message]) => {
      run.timers.push(window.setTimeout(() => {
        if (currentRun === run && status) status.textContent = message;
      }, delay));
    });
    run.timers.push(window.setTimeout(() => {
      if (currentRun !== run) return;
      endRun();
      window.location.replace(site.path);
    }, CONNECT_MS));
  }

  function initModemRoot(root, dialog) {
    root.dataset.muted = 'false';
    const mute = root.querySelector('[data-modem-mute]');
    if (mute) {
      mute.addEventListener('click', () => {
        const muted = root.dataset.muted !== 'true';
        root.dataset.muted = muted ? 'true' : 'false';
        mute.textContent = muted ? 'Unmute' : 'Mute';
        mute.setAttribute('aria-pressed', muted ? 'true' : 'false');
        if (currentRun && currentRun.root === root && currentRun.sound) {
          currentRun.sound.mute(muted);
        }
      });
    }

    root.querySelector('[data-modem-connect]').addEventListener('click', () => startConnection(root));
    root.querySelector('[data-modem-skip]').addEventListener('click', () => {
      const site = root._mcretroSite;
      if (!site) return;
      endRun();
      window.location.replace(site.path);
    });

    const cancel = root.querySelector('[data-modem-cancel]');
    if (dialog) {
      const closeDialog = event => {
        event.preventDefault();
        endRun();
        root.close();
        window.history.back();
      };
      cancel.addEventListener('click', closeDialog);
      root.querySelector('[data-modem-close]').addEventListener('click', closeDialog);
      root.addEventListener('cancel', closeDialog);
    }
    // The standalone page's Cancel is a regular home link, even without JS.
  }

  const widget = document.querySelector('[data-dial-homepage]');
  const dialog = document.getElementById('mcretro-modem-dialog');
  const standalone = document.getElementById('mcretro-modem-page');
  const randomSite = () => SITES[Math.floor(Math.random() * SITES.length)];
  const resolveSite = slug => slug === 'random' ? randomSite() : findSite(slug);

  if (dialog) initModemRoot(dialog, true);
  if (standalone) {
    initModemRoot(standalone, false);
    const params = new URLSearchParams(window.location.search);
    setDestination(standalone, resolveSite(params.get('site')));
  }

  if (widget) {
    widget.querySelectorAll('[data-dial-site]').forEach(link => {
      link.addEventListener('click', event => {
        // Modified clicks retain the real interstitial URL, including random.
        if (event.defaultPrevented || event.button !== 0 || event.metaKey ||
            event.ctrlKey || event.shiftKey || event.altKey ||
            !dialog || typeof dialog.showModal !== 'function') return;
        const site = resolveSite(link.dataset.dialSite);
        if (!site) return;
        event.preventDefault();
        setDestination(dialog, site);
        window.history.pushState({ mcretroModem: site.slug }, '', modemURL(site));
        dialog.showModal();
        startConnection(dialog);
      });
    });
  }

  if (dialog) {
    window.addEventListener('popstate', event => {
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
})();
