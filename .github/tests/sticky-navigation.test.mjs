import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../../assets/js/sticky-navigation.js', import.meta.url), 'utf8');
const css = readFileSync(new URL('../../assets/css/sticky-navigation.css', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../../_layouts/default.html', import.meta.url), 'utf8');

function fixture({ mobile = false, position = 0 } = {}) {
  const events = {};
  const attrs = {};
  const styles = {};
  const classes = new Set();
  const media = { matches: mobile };
  let observed = false;
  const brand = {};
  const header = {
    querySelector(s) { return s === '.logo-area' ? brand : null; },
    getBoundingClientRect() { return { top: position }; },
    setAttribute(k, v) { attrs[k] = v; },
    removeAttribute(k) { delete attrs[k]; },
    style: { setProperty(k, v) { styles[k] = v; } },
    classList: { add(k) { classes.add(k); } }
  };
  const nav = { getBoundingClientRect() { return { top: position + 120 }; } };
  const document = {
    fonts: {},
    querySelector(k) {
      if (k === '.site-header') return header;
      if (k === '#primary-navigation') return nav;
      return null;
    }
  };
  const window = {
    scrollY: 0,
    matchMedia(s) { assert.equal(s, '(max-width: 750px)'); return media; },
    addEventListener(type, fn) { events[type] = fn; }
  };
  class ResizeObserver {
    constructor(fn) { this.fn = fn; }
    observe(node) { assert.equal(node, brand); observed = true; }
  }
  runInNewContext(source, { document, window, ResizeObserver });
  return { window, media, events, attrs, styles, classes, observed };
}

test('sticky primary nav stays inside the shared header with no cloned links', () => {
  assert.match(layout, /assets\/css\/sticky-navigation\.css/);
  assert.match(layout, /assets\/js\/sticky-navigation\.js/);
  assert.match(css, /\.site-header\.has-sticky-navigation/);
  assert.match(css, /position: sticky/);
  assert.doesNotMatch(source, /cloneNode|innerHTML|insertAdjacentHTML/);
});

test('desktop only keeps the primary navigation visible above the scroll', () => {
  const f = fixture();
  assert.ok(f.classes.has('has-sticky-navigation'));
  assert.equal(f.styles['--sticky-nav-top'], '-120px');
  assert.equal(f.attrs['data-nav-condensed'], undefined);
  assert.ok(f.observed);
  f.window.scrollY = 500;
  f.events.scroll();
  assert.equal(f.attrs['data-nav-condensed'], undefined);
});

test('mobile keeps logo and menu controls and condenses tagline after scrolling', () => {
  const f = fixture({ mobile: true });
  assert.equal(f.styles['--sticky-nav-top'], '0px');
  f.window.scrollY = 180;
  f.events.scroll();
  assert.equal(f.attrs['data-nav-condensed'], 'true');
  f.window.scrollY = 100;
  f.events.scroll();
  assert.equal(f.attrs['data-nav-condensed'], 'true', 'hysteresis prevents jumping');
  f.window.scrollY = 20;
  f.events.scroll();
  assert.equal(f.attrs['data-nav-condensed'], undefined);
  assert.match(css, /max-width: 750px/);
  assert.match(css, /\[data-nav-condensed="true"\] \.textcycle/);
});

test('resizing from mobile to desktop recalculates sticky offset', () => {
  const f = fixture({ mobile: true });
  f.media.matches = false;
  f.events.resize();
  assert.equal(f.styles['--sticky-nav-top'], '-120px');
});
