import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const code = readFileSync(new URL('../../assets/js/mcretro-dialup.js', import.meta.url), 'utf8');

function makeControl(value = '') {
  const listeners = {};
  return {
    listeners, textContent: '', value,
    disabled: false, hidden: false,
    style: {}, children: [],
    className: '', type: 'button', attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    setCustomValidity(message) { this.validationMessage = message; },
    reportValidity() { this.reportedInvalid = true; return false; },
    addEventListener(type, handler) { listeners[type] = handler; },
    appendChild(element) { this.children.push(element); },
    click(event = null) {
      const e = event || { button: 0, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } };
      if (listeners.click) listeners.click(e);
      return e.defaultPrevented;
    }
  };
}
function makeRoot() {
  const controls = new Map();
  function control(selector) {
    if (!controls.has(selector)) {
      const initial = {
        '[data-modem-number]': '02 9373 5100',
        '[data-modem-new-name]': 'My Connection',
        '[data-modem-new-target]': 'random',
        '[data-modem-new-number]': '02 9373 5100'
      }[selector] || '';
      controls.set(selector, makeControl(initial));
    }
    return controls.get(selector);
  }
  const style = {};
  const root = {
    dataset: {}, open: false, style, control,
    querySelector: control,
    querySelectorAll(selector) {
      if (selector === '[data-modem-new-cancel]') return [control('[data-modem-new-cancel-a]'),control('[data-modem-new-cancel-b]')];
      assert.fail('Unexpected root selector: ' + selector);
    },
    getBoundingClientRect() {
      return { left: parseFloat(style.left) || 18, top: parseFloat(style.top) || 18, width: 430, height: 225 };
    },
    addEventListener() {},
    showModal() { this.open = true; },
    show() { this.open = true; },
    close() { this.open = false; }
  };
  return root;
}
function makeLink(dataset = {}) {
  const link = makeControl();
  link.dataset = dataset;
  return link;
}

function fixture({ site = 'blog-random', urls = ['/first-post/', '/second-post/'],
                   fetchFails = false, withDialog = true, withStandalone = true,
                   captureAudio = false, storage = new Map(), local = new Map() } = {}) {
  const dialog = withDialog ? makeRoot() : null;
  const standalone = withStandalone ? makeRoot() : null;
  const newDialog = withStandalone ? makeRoot() : null;
  const navigations = [], pushes = [], replacements = [], requests = [], timers = [], intervals = [];
  const audioEvents = [];
  const taskbar = makeControl();
  taskbar.hidden = true;
  const links = ['blog-random', 'random'].map(dialSite => makeLink({ dialSite }));
  const launches = ['blog-random', 'random'].map(modemTarget => makeLink({ modemTarget }));
  const newButton = makeControl(), folder = makeControl(), count = makeControl();
  const document = {
    querySelectorAll(selector) {
      if (selector === 'a[data-dial-site]') return links;
      if (selector === '[data-modem-launch]') return withStandalone ? launches : [];
      assert.fail('Unexpected document selector: ' + selector);
    },
    querySelector(selector) {
      if (selector === '[data-modem-shortcut-list]') return withStandalone ? folder : null;
      if (selector === '[data-modem-explorer-count]') return withStandalone ? count : null;
      if (selector === '[data-modem-new]') return withStandalone ? newButton : null;
      return null;
    },
    createElement() { return makeControl(); },
    getElementById(id) {
      if (id === 'mcretro-modem-dialog') return dialog;
      if (id === 'mcretro-modem-page') return standalone;
      if (id === 'mcretro-modem-taskbar') return taskbar;
      if (id === 'mcretro-modem-new-connection') return newDialog;
      return null;
    }
  };
  const window = {
    innerWidth: 1024, innerHeight: 768,
    location: {
      search: '?site=' + encodeURIComponent(site),
      pathname: '/homepages/modem/',
      replace(path) { navigations.push(path); }
    },
    sessionStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      setItem(key, value) { storage.set(key, value); },
      removeItem(key) { storage.delete(key); }
    },
    localStorage: {
      getItem(key) { return local.get(key) ?? null; },
      setItem(key, value) { local.set(key, value); },
      removeItem(key) { local.delete(key); }
    },
    history: {
      pushState(state, _title, path) { pushes.push({ state, path }); },
      replaceState(_state, _title, path) { replacements.push(path); },
      back() {}
    },
    setTimeout(callback, delay) { timers.push({ callback, delay }); return timers.length; },
    clearTimeout() {},
    setInterval(callback, delay) { intervals.push({ callback, delay }); return intervals.length; },
    clearInterval() {},
    addEventListener() {}
  };
  if (captureAudio) {
    window.AudioContext = class {
      currentTime = 0;
      destination = {};
      createGain() {
        return {
          gain: {
            value: 0,
            setValueAtTime() {}, linearRampToValueAtTime() {}, setTargetAtTime() {}
          },
          connect() {}
        };
      }
      createOscillator() {
        return {
          frequency: {
            value: 0,
            setValueAtTime(frequency, at) { audioEvents.push({ frequency, at }); }
          },
          connect() {}, start() {}, stop() {}
        };
      }
      resume() { return Promise.resolve(); }
      close() { return Promise.resolve(); }
    };
  }
  function fetch(url, init) {
    requests.push({ url, init });
    if (fetchFails) return Promise.reject(new Error('Offline'));
    return Promise.resolve({ ok: true, json: () => Promise.resolve(urls) });
  }
  runInNewContext(code, {
    document, window, fetch, URLSearchParams, Promise, Date,
    Math: { floor: Math.floor, round: Math.round, max: Math.max, min: Math.min, random: () => 0 }
  });
  return { dialog, standalone, newDialog, newButton, folder, count,
    taskbar, launches, storage, local, links,
    navigations, pushes, replacements, requests, timers, intervals, audioEvents };
}

const tick = () => new Promise(resolve => setImmediate(resolve));

test('standalone blog dialler picks an internal post using the existing URL index', async () => {
  const f = fixture();
  assert.equal(f.standalone.control('[data-modem-destination]').textContent,
    'Random McRetro blog post');
  f.standalone.control('[data-modem-skip]').listeners.click();
  await tick();
  assert.deepEqual(f.navigations, ['/first-post/']);
  assert.equal(f.requests.length, 1);
  assert.equal(f.requests[0].url, '/assets/data/random-post-urls.json');
  assert.equal(f.requests[0].init.credentials, 'same-origin');
});

test('blog dialler falls back to /blog/ if its random-post index is unavailable', async () => {
  const f = fixture({ fetchFails: true });
  f.standalone.control('[data-modem-skip]').listeners.click();
  await tick();
  assert.deepEqual(f.navigations, ['/blog/']);
});

test('a malicious or empty random-post list cannot redirect off-site', async () => {
  const f = fixture({ urls: ['//other.example/', '/\\evil/', '\r\n/evil/', '/safe-post/'] });
  f.standalone.control('[data-modem-skip]').listeners.click();
  await tick();
  assert.deepEqual(f.navigations, ['/safe-post/']);
  const empty = fixture({ urls: [] });
  empty.standalone.control('[data-modem-skip]').listeners.click();
  await tick();
  assert.deepEqual(empty.navigations, ['/blog/']);
});

test('Goodies link opens the modal and Connect then Skip keeps its chosen post', async () => {
  const f = fixture({ withStandalone: false });
  assert.equal(f.links[0].click(), true);
  assert.equal(f.dialog.open, true);
  assert.equal(f.pushes[0].path, '/homepages/modem/?site=blog-random');
  assert.equal(f.dialog.control('[data-modem-destination]').textContent,
    'Random McRetro blog post');
  f.dialog.control('[data-modem-connect]').listeners.click();
  assert.ok(f.timers.length > 0, 'The original timed connection remains available');
  f.dialog.control('[data-modem-skip]').listeners.click();
  await tick();
  assert.deepEqual(f.navigations, ['/first-post/']);
  assert.equal(f.requests.length, 1);
});

test('random homepage mode still selects only a restored homepage', async () => {
  const f = fixture({ site: 'random' });
  assert.equal(f.standalone.control('[data-modem-destination]').textContent, 'Frank the Snake');
  f.standalone.control('[data-modem-skip]').listeners.click();
  await tick();
  assert.deepEqual(f.navigations, ['/homepages/frank/']);
  assert.equal(f.requests.length, 0);
});

test('links preserve normal navigation if a modal dialog is unavailable', () => {
  const f = fixture({ withDialog: false, withStandalone: false });
  assert.equal(f.links[0].click(), false);
  assert.equal(f.pushes.length, 0);
});

test('the clean modem URL defaults to a restored homepage', () => {
  const f = fixture({ site: '', withDialog: false });
  assert.equal(f.standalone.control('[data-modem-connect]').disabled, false);
  assert.equal(f.standalone.control('[data-modem-destination]').textContent, 'Frank the Snake');
  assert.equal(f.count.textContent, '3 Object(s)');
});

test('Explorer icons open the right destination without changing the default number', () => {
  const f = fixture({ site: 'random', withDialog: false });
  assert.equal(f.launches[0].click(), true);
  assert.equal(f.standalone.open, true);
  assert.equal(f.standalone.control('[data-modem-destination]').textContent, 'Random McRetro blog post');
  assert.equal(f.standalone.control('[data-modem-number]').value, '02 9373 5100');
  assert.equal(f.launches[1].click(), true);
  assert.equal(f.standalone.control('[data-modem-destination]').textContent, 'Frank the Snake');
});

test('Make New Connection saves a real editable shortcut and opens its dialler', () => {
  const local = new Map();
  const f = fixture({ site: 'random', withDialog: false, local });
  f.newButton.click();
  assert.equal(f.newDialog.open, true);
  f.newDialog.control('[data-modem-new-name]').value = 'My Old ISP';
  f.newDialog.control('[data-modem-new-number]').value = '555 1234';
  f.newDialog.control('[data-modem-new-target]').value = 'blog-random';
  f.newDialog.control('[data-modem-create-form]').listeners.submit({ preventDefault() {} });
  assert.equal(f.newDialog.open, false);
  assert.equal(f.count.textContent, '4 Object(s)');
  assert.equal(f.folder.children.length, 1);
  assert.equal(f.standalone.control('[data-modem-number]').value, '555 1234');
  assert.equal(f.standalone.control('[data-modem-destination]').textContent, 'My Old ISP');
  assert.equal(JSON.parse(local.get('mcretro-dialup-presets-v1'))[0].target, 'blog-random');
  const reloaded = fixture({ withDialog: false, local });
  assert.equal(reloaded.folder.children.length, 1);
  reloaded.folder.children[0].click();
  assert.equal(reloaded.standalone.control('[data-modem-number]').value, '555 1234');
  assert.equal(reloaded.standalone.control('[data-modem-destination]').textContent, 'My Old ISP');
});

test('Goodies and Explorer preserve approved dial destinations', () => {
  const goodies = readFileSync(new URL('../../goodies.md', import.meta.url), 'utf8');
  const modem = readFileSync(new URL('../../homepages/modem/index.html', import.meta.url), 'utf8');
  const connection = readFileSync(new URL('../../_includes/modem-connection.html', import.meta.url), 'utf8');
  assert.match(goodies, /\\[Dial-Up Networking\\]\\(\\/homepages\\/modem\\/\\)/);
  assert.match(modem, /data-modem-new/);
  assert.match(modem, /data-modem-target="blog-random"/);
  assert.match(modem, /data-modem-target="random"/);
  assert.match(modem, /Make New Connection/);
  assert.match(modem, /Random Blog Post/);
  assert.match(modem, /Retro Homepage/);
  assert.match(connection, /data-modem-number[^>]+value="02 9373 5100"/);
  assert.doesNotMatch(connection, /data-modem-choice/);
  assert.ok(connection.includes('Connected At:</dt><dd>28,800 bps</dd>'));
  assert.match(connection, /target="_blank" rel="noopener" data-modem-visit/);
  assert.match(connection, /data-modem-bytes-received/);
  assert.match(connection, /data-modem-bytes-sent/);
});

test('V6.7 schedules three complete beep then double-ring cycles before handshake', () => {
  const f = fixture({ site: 'random', withDialog: false, captureAudio: true });
  f.standalone.control('[data-modem-connect]').listeners.click();

  const atHz = frequency => f.audioEvents
    .filter(event => event.frequency === frequency)
    .map(event => Math.round(event.at * 1000));

  // Three 1300 Hz beeps each lead complete Australian 400/425/450 Hz double rings.
  assert.deepEqual(atHz(1300), [5880, 8880, 11880]);
  assert.deepEqual(atHz(400), [6680, 7280, 9680, 10280, 12680, 13280]);
  assert.deepEqual(atHz(450), [6680, 7280, 9680, 10280, 12680, 13280]);
  const expectedSequence = [
    ['beep', 5880], ['ring', 6680], ['ring', 7280],
    ['beep', 8880], ['ring', 9680], ['ring', 10280],
    ['beep', 11880], ['ring', 12680], ['ring', 13280]
  ];
  const actualSequence = [
    ...atHz(1300).map(at => ['beep', at]),
    ...atHz(400).map(at => ['ring', at])
  ].sort((a, b) => a[1] - b[1]);
  assert.deepEqual(actualSequence, expectedSequence);
  // The last 400 ms ring burst ends before the original 16.3 s handshake begins.
  assert.ok(13280 + 400 < 15380);
  assert.ok(f.timers.some(timer => timer.delay === 15380));
  assert.ok(f.timers.some(timer => timer.delay === 31750));
});

test('Windows 95 shortcuts open the editable dialler on one click', () => {
  const f = fixture({ site: 'random' });
  assert.equal(f.standalone.open, false);
  assert.equal(f.launches[1].click(), true);
  assert.equal(f.standalone.open, true);
  assert.equal(f.standalone.dataset.modemStage, 'setup');
  assert.equal(f.standalone.control('[data-modem-number]').value, '02 9373 5100');
});

test('entered digits change DTMF duration without changing the V6.7 sound order', () => {
  const f = fixture({ site: 'random', captureAudio: true });
  f.standalone.control('[data-modem-number]').value = '555 1234';
  f.standalone.control('[data-modem-connect]').listeners.click();
  const atHz = frequency => f.audioEvents
    .filter(event => event.frequency === frequency)
    .map(event => Math.round(event.at * 1000));
  // Seven DTMF digits instead of ten shorten only the dialling section by 540 ms.
  assert.equal(atHz(1336).length, 4);
  assert.deepEqual(atHz(1300), [5340, 8340, 11340]);
  assert.deepEqual(atHz(400), [6140, 6740, 9140, 9740, 12140, 12740]);
  assert.ok(f.timers.some(timer => timer.delay === 31210));
  assert.ok(f.timers.some(timer => timer.delay === 14840));
});

test('invalid or empty dial numbers cannot start a connection', () => {
  const f = fixture({ site: 'random', captureAudio: true });
  const input = f.standalone.control('[data-modem-number]');
  input.value = 'abc';
  f.standalone.control('[data-modem-connect]').listeners.click();
  assert.equal(f.standalone.dataset.modemStage, 'setup');
  assert.equal(f.timers.length, 0);
  assert.equal(input.reportedInvalid, true);
  input.value = '123456789012345678901';
  f.standalone.control('[data-modem-connect]').listeners.click();
  assert.equal(f.timers.length, 0);
});

test('connected window keeps the visit link, survives navigation, minimises and disconnects', async () => {
  const storage = new Map();
  const f = fixture({ site: 'random', storage });
  f.standalone.control('[data-modem-connect]').listeners.click();
  f.timers.find(timer => timer.delay === 31750).callback();
  await tick();
  assert.deepEqual(f.navigations, []); // The status must remain visible.
  assert.equal(f.standalone.control('[data-modem-visit]').href, '/homepages/frank/');
  assert.equal(f.standalone.dataset.modemStage, 'connected');
  const saved = JSON.parse(storage.get('mcretro-dialup-connected-v1'));
  assert.equal(saved.name, 'Frank the Snake');
  assert.equal(saved.phone, '02 9373 5100');
  assert.equal(saved.minimised, false);
  const destination = fixture({ withStandalone: false, storage });
  assert.equal(destination.dialog.open, true);
  assert.equal(destination.dialog.dataset.modemStage, 'connected');
  assert.equal(destination.dialog.control('[data-modem-connected-number]').textContent, '02 9373 5100');
  destination.dialog.control('[data-modem-minimize]').listeners.click();
  assert.equal(destination.dialog.open, false);
  assert.equal(destination.taskbar.hidden, false);
  assert.equal(JSON.parse(storage.get('mcretro-dialup-connected-v1')).minimised, true);
  destination.taskbar.click();
  assert.equal(destination.dialog.open, true);
  assert.equal(destination.taskbar.hidden, true);
  destination.dialog.control('[data-modem-disconnect]').listeners.click();
  assert.equal(destination.dialog.open, false);
  assert.equal(storage.size, 0);
});

test('Connected window can be dragged and stays inside the viewport', async () => {
  const f = fixture({ site: 'random' });
  f.standalone.control('[data-modem-connect]').listeners.click();
  f.timers.find(timer => timer.delay === 31750).callback();
  await tick();
  const title = f.standalone.control('.mcretro-modem-titlebar');
  const baseEvent = {
    pointerId: 3, pointerType: 'mouse', button: 0,
    clientX: 38, clientY: 38,
    target: { closest() { return null; } },
    preventDefault() {}
  };
  title.listeners.pointerdown(baseEvent);
  title.listeners.pointermove({ ...baseEvent, clientX: 212, clientY: 190 });
  title.listeners.pointerup(baseEvent);
  assert.equal(f.standalone.style.left, '192px');
  assert.equal(f.standalone.style.top, '170px');
  const data = JSON.parse(f.storage.get('mcretro-dialup-connected-v1'));
  assert.equal(data.x, 192);
  assert.equal(data.y, 170);
  title.listeners.pointerdown({ ...baseEvent, clientX: 212, clientY: 190 });
  title.listeners.pointermove({ ...baseEvent, clientX: 9000, clientY: 9000 });
  title.listeners.pointerup(baseEvent);
  assert.equal(f.standalone.style.left, '594px');
  assert.equal(f.standalone.style.top, '543px');
});

test('Connected byte counters increase with simulated bursts and pause when minimised', async () => {
  const f = fixture({ site: 'random' });
  f.standalone.control('[data-modem-connect]').listeners.click();
  f.timers.find(timer => timer.delay === 31750).callback();
  await tick();
  const rx = f.standalone.control('[data-modem-bytes-received]');
  const tx = f.standalone.control('[data-modem-bytes-sent]');
  assert.equal(f.intervals.at(-1).delay, 250);
  const first = Number(rx.textContent.replace(/,/g, ''));
  const second = Number(tx.textContent.replace(/,/g, ''));
  const stored = JSON.parse(f.storage.get('mcretro-dialup-connected-v1'));
  stored.startedAt = Date.now() - 5000;
  f.storage.set('mcretro-dialup-connected-v1', JSON.stringify(stored));
  f.standalone.control('[data-modem-minimize]').listeners.click();
  f.taskbar.click();
  const newRx = Number(f.dialog.control('[data-modem-bytes-received]').textContent.replace(/,/g, ''));
  const newTx = Number(f.dialog.control('[data-modem-bytes-sent]').textContent.replace(/,/g, ''));
  assert.ok(newRx > first);
  assert.ok(newTx > second);
  assert.equal(f.intervals.at(-1).delay, 250);
});
