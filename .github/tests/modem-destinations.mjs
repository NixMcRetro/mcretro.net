import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const code = readFileSync(new URL('../../assets/js/mcretro-dialup.js', import.meta.url), 'utf8');

function makeRoot() {
  const controls = new Map();
  function control(selector) {
    if (!controls.has(selector)) {
      const listeners = {};
      controls.set(selector, {
        listeners,
        textContent: '',
        disabled: false,
        hidden: false,
        setAttribute() {},
        addEventListener(type, handler) { listeners[type] = handler; }
      });
    }
    return controls.get(selector);
  }
  const choices = ['blog-random', 'random'].map(value => {
    const listeners = {};
    return {
      value, checked: false, listeners,
      addEventListener(type, handler) { listeners[type] = handler; },
      select() { choices.forEach(choice => { choice.checked = choice === this; }); this.listeners.change(); }
    };
  });
  return {
    dataset: {},
    open: false,
    control,
    choices,
    querySelector: control,
    querySelectorAll(selector) {
      assert.equal(selector, '[data-modem-choice]');
      return choices;
    },
    addEventListener() {},
    showModal() { this.open = true; },
    close() { this.open = false; }
  };
}

function fixture({ site = 'blog-random', urls = ['/first-post/', '/second-post/'],
                   fetchFails = false, withDialog = true, withStandalone = true,
                   captureAudio = false } = {}) {
  const dialog = withDialog ? makeRoot() : null;
  const standalone = withStandalone ? makeRoot() : null;
  const navigations = [], pushes = [], replacements = [], requests = [], timers = [];
  const audioEvents = [];
  const links = ['blog-random', 'random'].map(dialSite => {
    const listeners = {};
    return {
      dataset: { dialSite },
      listeners,
      addEventListener(type, fn) { listeners[type] = fn; },
      click() {
        const event = {
          button: 0,
          defaultPrevented: false,
          preventDefault() { this.defaultPrevented = true; }
        };
        listeners.click(event);
        return event.defaultPrevented;
      }
    };
  });
  const document = {
    querySelectorAll(selector) {
      assert.equal(selector, 'a[data-dial-site]');
      return links;
    },
    getElementById(id) {
      if (id === 'mcretro-modem-dialog') return dialog;
      if (id === 'mcretro-modem-page') return standalone;
      return null;
    }
  };
  const window = {
    location: {
      search: '?site=' + encodeURIComponent(site),
      pathname: '/homepages/modem/',
      replace(path) { navigations.push(path); }
    },
    history: {
      pushState(state, _title, path) { pushes.push({ state, path }); },
      replaceState(_state, _title, path) { replacements.push(path); },
      back() {}
    },
    setTimeout(callback, delay) { timers.push({ callback, delay }); return timers.length; },
    clearTimeout() {},
    addEventListener() {}
  };
  if (captureAudio) {
    // Record the Web Audio oscillator schedule, not just its visual/status timers.
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
    document, window, fetch, URLSearchParams, Promise,
    Math: { floor: Math.floor, round: Math.round, random: () => 0 }
  });
  return { dialog, standalone, links, navigations, pushes, replacements, requests, timers, audioEvents };
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

test('the clean modem URL defaults to the restored-homepage choice', () => {
  const f = fixture({ site: '', withDialog: false });
  assert.equal(f.standalone.choices[1].checked, true);
  assert.equal(f.standalone.choices[0].checked, false);
  assert.equal(f.standalone.control('[data-modem-connect]').disabled, false);
  assert.equal(f.standalone.control('[data-modem-destination]').textContent, 'Frank the Snake');
});

test('standalone destination choices switch modes without opening another page', async () => {
  const f = fixture({ site: 'random', withDialog: false });
  assert.equal(f.standalone.choices[1].checked, true);
  f.standalone.choices[0].select();
  assert.equal(f.standalone.control('[data-modem-destination]').textContent,
    'Random McRetro blog post');
  assert.deepEqual(f.replacements, ['/homepages/modem/?site=blog-random']);
  f.standalone.control('[data-modem-skip]').listeners.click();
  await tick();
  assert.deepEqual(f.navigations, ['/first-post/']);
  assert.equal(f.pushes.length, 0);
});

test('the homepage choice restores the clean modem URL', () => {
  const f = fixture({ site: 'blog-random', withDialog: false });
  assert.equal(f.standalone.choices[0].checked, true);
  f.standalone.choices[1].select();
  assert.equal(f.standalone.control('[data-modem-destination]').textContent, 'Frank the Snake');
  assert.deepEqual(f.replacements, ['/homepages/modem/']);
});

test('Goodies links to the modem page rather than separately listing dial modes', () => {
  const goodies = readFileSync(new URL('../../goodies.md', import.meta.url), 'utf8');
  const modem = readFileSync(new URL('../../homepages/modem/index.html', import.meta.url), 'utf8');
  assert.match(goodies, /\[Dial-Up Networking\]\(\/homepages\/modem\/\)/);
  assert.doesNotMatch(goodies, /data-dial-site="(?:blog-random|random)"/);
  assert.match(modem, /value="blog-random" data-modem-choice/);
  assert.match(modem, /value="random" data-modem-choice/);
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
