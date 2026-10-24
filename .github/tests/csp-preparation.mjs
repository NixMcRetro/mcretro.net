import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const read = file => readFileSync(new URL('../../' + file, import.meta.url), 'utf8');
const layout = read('_layouts/default.html');
const searchHTML = read('search/index.html');
const navJS = read('assets/js/mobile-navigation.js');
const searchJS = read('assets/js/search-page.js');

function element() {
  const handlers = {};
  const attrs = {};
  const classes = new Set();
  const el = {
    addEventListener(type, fn) { handlers[type] = fn; },
    fire(type, event = {}) { handlers[type]?.(event); },
    setAttribute(key, value) { attrs[key] = String(value); },
    getAttribute(key) { return attrs[key] ?? null; },
    classList: {
      toggle(name, on) { if (on) classes.add(name); else classes.delete(name); },
      remove(name) { classes.delete(name); },
      contains(name) { return classes.has(name); }
    },
    contains(target) { return target === el; },
    focus() { el.focused = true; }
  };
  return el;
}

test('HTML loads the new scripts without changing random-post wiring', () => {
  assert.ok(layout.includes("'/assets/js/mobile-navigation.js' | relative_url"));
  assert.ok(layout.includes("'/assets/js/random-post.js' | relative_url"));
  assert.ok(!layout.includes('random-post-urls.html'));
  assert.ok(!layout.includes("document.querySelector('.nav-toggle')"));
  assert.ok(searchHTML.includes('<script src="/assets/js/search-page.js"></script>'));
  assert.ok(searchHTML.indexOf('/pagefind/pagefind-ui.js') < searchHTML.indexOf('/assets/js/search-page.js'));
  assert.ok(!searchHTML.includes('new PagefindUI('));
});

test('navigation retains toggle, outside-click, Escape and focus behaviour', () => {
  const toggle = element(), nav = element(), doc = element();
  doc.querySelector = selector => selector === '.nav-toggle' ? toggle : selector === '[data-nav]' ? nav : null;
  runInNewContext(navJS, { document: doc });
  let stopped = false;
  toggle.fire('click', { stopPropagation() { stopped = true; } });
  assert.equal(stopped, true);
  assert.equal(nav.getAttribute('data-nav'), 'open');
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  doc.fire('click', { target: {} });
  assert.equal(nav.getAttribute('data-nav'), '');
  toggle.fire('click', { stopPropagation() {} });
  doc.fire('keydown', { key: 'Escape' });
  assert.equal(nav.getAttribute('data-nav'), '');
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(toggle.focused, true);
});

test('navigation script ignores pages lacking navigation', () => {
  const doc = element();
  doc.querySelector = () => null;
  assert.doesNotThrow(() => runInNewContext(navJS, { document: doc }));
});

function searchFixture(query) {
  const win = element(), input = element();
  win.location = { search: query };
  input.value = '';
  input.dispatchEvent = event => { input.event = event; };
  let config, timerCount = 0;
  runInNewContext(searchJS, {
    window: win,
    document: { querySelector: () => input },
    URLSearchParams,
    PagefindUI: class { constructor(arg) { config = arg; } },
    Event: class { constructor(type, opts) { this.type = type; this.bubbles = opts.bubbles; } },
    setTimeout(fn, delay) { assert.equal(delay, 300); timerCount++; fn(); }
  });
  win.fire('DOMContentLoaded');
  return { config, input, timerCount };
}

test('search applies URL query and dispatches input event', () => {
  const { config, input, timerCount } = searchFixture('?q=potato');
  assert.equal(config.element, '#search');
  assert.equal(config.showSubResults, true);
  assert.equal(config.excerptLength, 60);
  assert.equal(config.showImages, false);
  assert.equal(timerCount, 1);
  assert.equal(input.value, 'potato');
  assert.equal(input.focused, true);
  assert.equal(input.event.type, 'input');
  assert.equal(input.event.bubbles, true);
});

test('search without a query leaves the input unchanged', () => {
  const { input, timerCount } = searchFixture('');
  assert.equal(timerCount, 0);
  assert.equal(input.value, '');
});
