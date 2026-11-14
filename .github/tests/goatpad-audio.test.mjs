import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../../homepages/goatpad/main.js', import.meta.url), 'utf8');
const markup = readFileSync(new URL('../../homepages/goatpad/index.html', import.meta.url), 'utf8');

class ClassList {
  constructor(...names) { this.items = new Set(names); }
  add(...names) { names.forEach(name => this.items.add(String(name))); }
  remove(...names) { names.forEach(name => this.items.delete(String(name))); }
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
    this.disabled = false;
    this.offsetWidth = 480;
    this.textContent = '';
    this.style = { values: {}, setProperty(key, value) { this.values[key] = value; } };
  }
  addEventListener(type, handler) { this.listeners[type] = handler; }
  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }
  get nextElementSibling() {
    if (!this.parentElement) return null;
    return this.parentElement.children[this.parentElement.children.indexOf(this) + 1] || null;
  }
  querySelectorAll(selector) {
    const nodes = [];
    function visit(node) {
      for (const child of node.children) {
        if (selector === 'button' && child.tagName === 'button') nodes.push(child);
        visit(child);
      }
    }
    visit(this);
    return nodes;
  }
}

function makeFixture({ failOnce = null } = {}) {
  const loadingScreen = new Element();
  const loadingMessage = new Element('p');
  const startAudio = new Element('button');
  const buttonArea = new Element();
  const soundboard = new Element();
  const counterContainer = new Element();
  const counters = Array.from({ length: 8 }, (_, index) => {
    const el = new Element();
    el.classList.add('counter');
    if (index === 0) el.classList.add('active');
    counterContainer.appendChild(el);
    return el;
  });
  const root = new Element('html');
  const windowListeners = {};
  const requests = [], decodes = [], started = [], tickers = [];
  let resumeCount = 0;
  let audioContextCount = 0;
  let failureUsed = false;

  class MockAudioContext {
    constructor() {
      audioContextCount++;
      this.state = 'suspended';
      this.destination = {};
    }
    async resume() { resumeCount++; this.state = 'running'; }
    async decodeAudioData(bytes) {
      const key = new Uint8Array(bytes)[0];
      decodes.push(key);
      return { key };
    }
    createBufferSource() {
      return {
        buffer: null,
        connect(destination) { assert.ok(destination); },
        start() {
          assert.ok(this.buffer, 'Cannot play an undecoded sample');
          started.push(this.buffer.key);
        }
      };
    }
  }

  const document = {
    documentElement: root,
    createElement(tag) { return new Element(tag); },
    getElementById(id) {
      return { loadingScreen, loadingMessage, startAudio }[id] ?? null;
    },
    querySelector(selector) {
      if (selector === '.buttonArea') return buttonArea;
      if (selector === '.counter') return counters[0];
      if (selector === '.soundboard') return soundboard;
      throw new Error('Unexpected selector: ' + selector);
    },
    querySelectorAll(selector) {
      if (selector === '.buttonArea button') return buttonArea.querySelectorAll('button');
      if (selector === '.counter.active') return counters.filter(x => x.classList.contains('active'));
      if (selector === 'button.active') return buttonArea.querySelectorAll('button').filter(x => x.classList.contains('active'));
      throw new Error('Unexpected selector: ' + selector);
    }
  };
  const window = {
    AudioContext: MockAudioContext,
    innerHeight: 900,
    innerWidth: 1440,
    addEventListener(event, handler) { windowListeners[event] = handler; }
  };
  async function fetch(url) {
    requests.push(url);
    const match = /^\.\/audio\/([1-8][1-8])\.ogg$/.exec(url);
    assert.ok(match, 'Unexpected audio URL: ' + url);
    const sample = Number(match[1]);
    if (sample === failOnce && !failureUsed) {
      failureUsed = true;
      return { ok: false, status: 404 };
    }
    return { ok: true, arrayBuffer: async () => Uint8Array.of(sample).buffer };
  }
  runInNewContext(source, {
    document, window, fetch, Promise, console,
    setInterval(fn, milliseconds) {
      assert.equal(milliseconds, 860);
      tickers.push(fn);
    }
  }, { timeout: 3000 });
  return {
    document, windowListeners, startAudio, loadingMessage, loadingScreen,
    counters, requests, decodes, started,
    pads: document.querySelectorAll('.buttonArea button'),
    start: () => startAudio.listeners.click(),
    tick: () => tickers[0](),
    get resumeCount() { return resumeCount; },
    get audioContextCount() { return audioContextCount; }
  };
}

test('historical app has a real start control and makes no audio requests on load', () => {
  assert.match(markup, /id="startAudio"/);
  assert.match(markup, /id="loadingMessage"[^>]*role="status"/);
  const app = makeFixture();
  assert.equal(app.pads.length, 64);
  assert.ok(app.pads.every(pad => pad.disabled));
  assert.equal(app.requests.length, 0);
  assert.equal(app.audioContextCount, 0);
  app.tick();
  assert.equal(app.started.length, 0);
});

test('one user gesture resumes Web Audio, loads all 64 samples and enables the pads', async () => {
  const app = makeFixture();
  await app.start();
  assert.equal(app.audioContextCount, 1);
  assert.equal(app.resumeCount, 1);
  assert.equal(app.requests.length, 64);
  assert.equal(new Set(app.requests).size, 64);
  assert.equal(app.decodes.length, 64);
  assert.equal(app.loadingMessage.textContent, 'Loading original sounds: 64/64');
  assert.ok(app.pads.every(pad => !pad.disabled));
  assert.ok(app.loadingScreen.classList.contains('hidden'));
});

test('a failed sample keeps pads disabled and permits a complete retry', async () => {
  const app = makeFixture({ failOnce: 33 });
  await app.start();
  assert.equal(app.startAudio.disabled, false);
  assert.ok(app.pads.every(pad => pad.disabled));
  assert.equal(app.loadingScreen.classList.contains('hidden'), false);
  assert.match(app.loadingMessage.textContent, /Unable to load sounds/);
  await app.start();
  assert.ok(app.pads.every(pad => !pad.disabled));
  assert.ok(app.loadingScreen.classList.contains('hidden'));
  assert.equal(app.audioContextCount, 1, 'Retry must reuse the audio context');
});

test('the eight-step sequencer plays the selected original sample', async () => {
  const app = makeFixture();
  await app.start();
  await app.pads[0].listeners.click();
  assert.ok(app.pads[0].classList.contains('active'));
  for (let index = 0; index < 7; index++) app.tick();
  assert.equal(app.started.length, 0, 'Sequencer must not play prematurely');
  app.tick();
  assert.deepEqual(app.started, [11]);
  assert.equal(app.counters.filter(counter => counter.classList.contains('active')).length, 1);
  await app.pads[0].listeners.click();
  assert.ok(!app.pads[0].classList.contains('active'), 'Clicking a selected pad toggles it off');
  for (let index = 0; index < 8; index++) app.tick();
  assert.deepEqual(app.started, [11], 'Deselected pads must not play');
});

test('selecting another pad in the same column replaces the previous sound', async () => {
  const app = makeFixture();
  await app.start();
  await app.pads[0].listeners.click();
  await app.pads[1].listeners.click();
  assert.ok(!app.pads[0].classList.contains('active'));
  assert.ok(app.pads[1].classList.contains('active'));
  for (let index = 0; index < 8; index++) app.tick();
  assert.deepEqual(app.started, [12]);
});

test('Goodies links preserve the restored destination pages', () => {
  const goodies = readFileSync(new URL('../../goodies.md', import.meta.url), 'utf8');
  assert.match(goodies, /\[GOATPAD 1337\]\(\/homepages\/goatpad\/\)/);
  assert.match(goodies, /\[Fish Tank World\]\(\/homepages\/fishtankworld\/\)/);
});
