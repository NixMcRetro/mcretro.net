import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../../homepages/goatpad/main.js', import.meta.url), 'utf8');
const markup = readFileSync(new URL('../../homepages/goatpad/index.html', import.meta.url), 'utf8');

class ClassList {
  constructor(...names) { this.items = new Set(names); }
  add(...names) { names.forEach(x => this.items.add(String(x))); }
  remove(...names) { names.forEach(x => this.items.delete(String(x))); }
  contains(name) { return this.items.has(String(name)); }
  [Symbol.iterator]() { return this.items[Symbol.iterator](); }
}
class Element {
  constructor(tag = 'div') {
    this.tagName = tag;
    this.classList = new ClassList();
    this.children = [];
    this.parentElement = null;
    this.listeners = {};
    this.dataset = {};
    this.disabled = false;
    this.offsetWidth = 480;
    this.textContent = '';
    this.style = { setProperty() {} };
  }
  setAttribute(name, value) { this[name] = value; }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  appendChild(child) { child.parentElement = this; this.children.push(child); }
  get nextElementSibling() {
    if (!this.parentElement) return null;
    return this.parentElement.children[this.parentElement.children.indexOf(this) + 1] || null;
  }
  querySelectorAll(selector) {
    assert.equal(selector, 'button');
    const output = [];
    const visit = node => {
      node.children.forEach(child => {
        if (child.tagName === 'button') output.push(child);
        visit(child);
      });
    };
    visit(this);
    return output;
  }
}
function fixture({ failOnce = null } = {}) {
  const loadingScreen = new Element();
  const loadingMessage = new Element('p');
  const startAudio = new Element('button');
  const audioStatus = new Element('p');
  const buttonArea = new Element();
  const counters = Array.from({ length: 8 }, (_, i) => {
    const counter = new Element();
    counter.classList.add('counter');
    if (i === 0) counter.classList.add('active');
    return counter;
  });
  const counterHolder = new Element();
  counters.forEach(x => counterHolder.appendChild(x));
  const root = new Element('html');
  const requests = [], decoded = [], played = [];
  const timers = new Map();
  let nextTimerId = 0, audioContexts = 0, resumes = 0, failed = false;
  let clock = 0;
  class AudioContext {
    constructor() { audioContexts++; this.state = 'suspended'; this.destination = {}; }
    get currentTime() { return clock; }
    async resume() { resumes++; this.state = 'running'; }
    async decodeAudioData(data) {
      const key = new Uint8Array(data)[0];
      decoded.push(key);
      return { key };
    }
    createBufferSource() {
      return {
        buffer: null,
        connect(destination) { assert.ok(destination); },
        start() { assert.ok(this.buffer); played.push(this.buffer.key); }
      };
    }
  }
  const document = {
    documentElement: root,
    createElement: tag => new Element(tag),
    getElementById(id) {
      return { loadingScreen, loadingMessage, startAudio, audioStatus }[id] || null;
    },
    querySelector(selector) {
      if (selector === '.buttonArea') return buttonArea;
      if (selector === '.counter') return counters[0];
      throw Error('Unknown selector: ' + selector);
    },
    querySelectorAll(selector) {
      if (selector === '.buttonArea button') return buttonArea.querySelectorAll('button');
      if (selector === '.counter.active') return counters.filter(x => x.classList.contains('active'));
      if (selector === 'button.active')
        return buttonArea.querySelectorAll('button').filter(x => x.classList.contains('active'));
      throw Error('Unknown selector: ' + selector);
    }
  };
  async function fetch(url) {
    requests.push(url);
    const match = /^\.\/audio\/([1-8][1-8])\.opus$/.exec(url);
    assert.ok(match, 'Only numbered Opus files are permitted: ' + url);
    const key = Number(match[1]);
    if (key === failOnce && !failed) {
      failed = true;
      return { ok: false, status: 503 };
    }
    return { ok: true, arrayBuffer: async () => Uint8Array.of(key).buffer };
  }
  const window = {
    AudioContext, innerHeight: 900, innerWidth: 1400,
    addEventListener() {}
  };
  runInNewContext(source, {
    document, window, fetch, Promise, console,
    setTimeout(callback, ms) {
      assert.ok(ms >= 0 && ms <= 2 * (60000 / 69), '69 BPM scheduler drifted: ' + ms);
      const id = ++nextTimerId;
      timers.set(id, { callback, ms });
      return id;
    },
    clearTimeout(id) { timers.delete(id); }
  }, { timeout: 4000 });
  return {
    start: () => startAudio.listeners.click(),
    click: index => buttonArea.querySelectorAll('button')[index].listeners.click(),
    tick() {
      const first = timers.entries().next().value;
      if (!first) return;
      const [id, timer] = first;
      timers.delete(id);
      clock += timer.ms / 1000;
      timer.callback();
    },
    advance(ms) { clock += ms / 1000; },
    get nextDelay() { return timers.values().next().value?.ms ?? null; },
    get pads() { return buttonArea.querySelectorAll('button'); },
    get requests() { return requests; },
    get decoded() { return decoded; },
    get played() { return played; },
    get timers() { return timers; },
    get audioContexts() { return audioContexts; },
    get resumes() { return resumes; },
    startAudio, loadingScreen, loadingMessage, audioStatus, counters
  };
}

test('only Opus is referenced, PNG favicon used, and page load is network-idle', () => {
  assert.match(markup, /id="startAudio"/);
  assert.match(markup, /id="audioStatus"/);
  assert.match(markup, /href="\.\/icon\.png"/);
  assert.match(source, /\.opus/);
  assert.doesNotMatch(source, /\.(ogg|mp3|wav)/);
  const app = fixture();
  assert.equal(app.pads.length, 64);
  assert.ok(app.pads.every(button => button.disabled));
  assert.equal(app.requests.length, 0);
  assert.equal(app.audioContexts, 0);
  assert.equal(app.timers.size, 0);
});

test('responsive soundboard preserves all 64 full accessible names and short mobile labels', () => {
  const styles = readFileSync(new URL('../../homepages/goatpad/styles.css', import.meta.url), 'utf8');
  assert.match(markup, /class="sequence-viewport"[^>]+tabindex="0"/);
  assert.match(markup, /class="mobile-scroll-hint"/);
  assert.match(styles, /overflow-x:\s*auto;/);
  assert.match(styles, /width:\s*44px;/);
  assert.match(styles, /overflow-y:\s*auto;/);

  const app = fixture();
  const labels = new Map([
    ['DRUMS', 'DRM'], ['FX', 'FX'], ['BASS', 'BASS'],
    ['GOAT SOUL', 'SOUL'], ['MELODY', 'MEL']
  ]);
  assert.equal(app.pads.length, 64);
  for (const button of app.pads) {
    const [category, sample] = button['aria-label'].split(', sample ');
    assert.ok(labels.has(category), 'Original accessible category is retained');
    assert.equal(button.children[0].dataset.short, labels.get(category));
    assert.equal(Number(sample), Number(button.dataset.sample));
  }
});

test('Start loads eight Opus files, not all 64, with user-gesture audio', async () => {
  const app = fixture();
  await app.start();
  assert.equal(app.audioContexts, 1);
  assert.equal(app.resumes, 1);
  assert.equal(app.requests.length, 8);
  assert.equal(new Set(app.requests).size, 8);
  assert.equal(app.decoded.length, 8);
  assert.ok(app.pads.every(button => !button.disabled));
  assert.ok(app.loadingScreen.classList.contains('hidden'));
  assert.equal(app.timers.size, 0, 'Idle sequencer must not poll in the background');
});

test('a failed initial sound can be retried with the same AudioContext', async () => {
  const app = fixture({ failOnce: 11 });
  await app.start();
  assert.equal(app.startAudio.disabled, false);
  assert.ok(app.pads.every(button => button.disabled));
  assert.ok(!app.loadingScreen.classList.contains('hidden'));
  await app.start();
  assert.ok(app.pads.every(button => !button.disabled));
  assert.equal(app.audioContexts, 1);
  assert.equal(app.requests.filter(x => x === './audio/11.opus').length, 2);
});

test('an unvisited pad fetches its sample on demand, then plays after eight steps', async () => {
  const app = fixture();
  await app.start();
  await app.click(27); // pad 44, not among the initial eight
  assert.equal(app.requests.length, 9);
  assert.equal(app.requests.at(-1), './audio/44.opus');
  assert.ok(app.pads[27].classList.contains('active'));
  assert.equal(app.timers.size, 1);
  for (let i = 0; i < 7; i++) app.tick();
  assert.equal(app.played.length, 0);
  app.tick();
  assert.deepEqual(app.played, [44]);
  assert.equal(app.counters.filter(x => x.classList.contains('active')).length, 1);
  await app.click(27);
  assert.equal(app.timers.size, 0);
  for (let i = 0; i < 8; i++) app.tick();
  assert.deepEqual(app.played, [44]);
});

test('byte-identical pad aliases reuse the same decoded Opus sound', async () => {
  const app = fixture();
  await app.start();
  await app.click(5); // pad 16, preloaded
  await app.click(15); // pad 28 aliases pad 16
  assert.equal(app.requests.length, 8);
  assert.equal(app.timers.size, 1);
  for (let i = 0; i < 8; i++) app.tick();
  assert.deepEqual(app.played, [16, 16]);
});

test('one failed on-demand request does not poison the cache; pad retries on click', async () => {
  const app = fixture({ failOnce: 54 });
  await app.start();
  await app.click(35); // pad 54, not in initial preload
  assert.ok(!app.pads[35].classList.contains('active'));
  assert.match(app.audioStatus.textContent, /retry/);
  await app.click(35);
  assert.ok(app.pads[35].classList.contains('active'));
  assert.equal(app.requests.filter(x => x === './audio/54.opus').length, 2);
});

test('same-column selection is exclusive and the original alternating rhythm remains', async () => {
  const app = fixture();
  await app.start();
  await app.click(0);
  await app.click(1);
  assert.ok(!app.pads[0].classList.contains('active'));
  assert.ok(app.pads[1].classList.contains('active'));
  for (let i = 0; i < 8; i++) app.tick();
  assert.deepEqual(app.played, [12]);
  for (let i = 0; i < 8; i++) app.tick();
  assert.deepEqual(app.played, [12], 'Full-length sounds skip the alternate bar');
});

test('upstream 69 BPM scheduler corrects drift after tab throttling', async () => {
  const app = fixture();
  await app.start();
  await app.click(0);
  assert.ok(Math.abs(app.nextDelay - 60000 / 69) < 0.001, 'Should use 69 BPM');
  app.advance(16000); // Simulate a tab suspended for sixteen seconds
  app.tick();
  assert.ok(Math.abs(app.nextDelay - 60000 / 69) < 0.001,
    'Throttling should not produce rapid catch-up beats');
  await app.click(0);
  assert.equal(app.timers.size, 0, 'Deselected pads stop the clock entirely');
});

test('historical Goodies links remain intact', () => {
  const goodies = readFileSync(new URL('../../goodies.md', import.meta.url), 'utf8');
  assert.match(goodies, /\[GOATPAD 1337\]\(\/homepages\/goatpad\/\)/);
  assert.match(goodies, /\[Fish Tank World\]\(\/homepages\/fishtankworld\/\)/);
});
