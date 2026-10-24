import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const prideJS = read('assets/js/confetti.js');
const navJS = read('assets/js/mobile-navigation.js');
const colours = [
  '#E40303', '#FF8C00', '#FFED00', '#008026', '#004DFF', '#750787',
  '#000000', '#784F17', '#5BCEFA', '#F5A9B8', '#FFFFFF'
];

function fixture({ width = 1280, path = '/', reduced = false, missing = false } = {}) {
  let observer;
  const particles = [], timers = [];
  function element(rect, textRect = rect) {
    const listeners = new Map(), attrs = new Map(), classes = new Set();
    const styles = new Map();
    const el = {
      rect, textRect, listeners, styles, removed: false,
      style: { setProperty(key, val) { styles.set(key, val); } },
      classList: {
        add(name) { classes.add(name); },
        remove(name) { classes.delete(name); },
        toggle(name, state) { if (state) classes.add(name); else classes.delete(name); },
        contains(name) { return classes.has(name); }
      },
      addEventListener(type, fn) {
        if (!listeners.has(type)) listeners.set(type, []);
        listeners.get(type).push(fn);
      },
      fire(type, event = {}) {
        for (const fn of listeners.get(type) || []) fn(event);
      },
      setAttribute(key, val) {
        attrs.set(key, String(val));
        if (observer?.target === el && key === 'aria-expanded') observer.callback([]);
      },
      getAttribute(key) { return attrs.get(key) ?? null; },
      getBoundingClientRect() { return rect; },
      contains(node) { return node === el; },
      remove() { el.removed = true; },
      focus() { el.fire('focus'); }
    };
    return el;
  }
  const random = element({ left: 390, top: 90, width: 120, height: 30 },
                         { left: 400, top: 93, width: 100, height: 25 });
  const menu = element({ left: 280, top: 22, width: 44, height: 44 });
  const logo = element({ left: 20, top: 20, width: 190, height: 50 });
  const nav = element({ left: 0, top: 80, width: width, height: 300 });
  menu.setAttribute('aria-expanded', 'false');
  nav.setAttribute('data-nav', '');
  const doc = element({ left: 0, top: 0, width, height: 1000 });
  doc.querySelector = selector => ({
    '#random-post-link': random, '.nav-toggle': menu, '.site-logo': logo, '[data-nav]': nav
  })[selector] ?? null;
  if (missing) doc.querySelector = () => null;
  doc.createRange = () => {
    let target;
    return {
      selectNodeContents(node) { target = node; },
      getBoundingClientRect() { return target.textRect; }
    };
  };
  doc.createElement = () => element({ left: 0, top: 0, width: 0, height: 0 });
  doc.body = { appendChild(el) { particles.push(el); } };
  const window = {
    location: { pathname: path },
    matchMedia(q) {
      if (q === '(prefers-reduced-motion: reduce)') return { matches: reduced };
      if (q === '(max-width: 750px)') return { matches: width <= 750 };
      throw Error('Unexpected query ' + q);
    }
  };
  const context = {
    document: doc, window,
    MutationObserver: class {
      constructor(callback) { this.callback = callback; observer = this; }
      observe(target, options) {
        assert.deepEqual([...options.attributeFilter], ['aria-expanded']);
        this.target = target;
      }
    },
    setTimeout(fn, time) { timers.push({ fn, time }); },
    Math
  };
  // Run the real navigation controller too: the Pride effect must not change it.
  runInNewContext(navJS, context);
  runInNewContext(prideJS, context);
  doc.fire('DOMContentLoaded');
  return { random, menu, logo, nav, doc, particles, timers };
}

function verifyColours(particles, each) {
  assert.equal(particles.length, 11 * each);
  const counts = new Map();
  for (const p of particles) {
    const c = p.styles.get('--pride-colour');
    counts.set(c, (counts.get(c) || 0) + 1);
    assert.equal(p.getAttribute('aria-hidden'), 'true');
    assert.equal(p.classList.contains('pride-star-particle'), true);
    assert.ok(parseFloat(p.style.animationDuration) >= 3.9);
    assert.ok(parseFloat(p.style.animationDuration) <= 5.4);
  }
  assert.deepEqual([...counts.keys()].sort(), [...colours].sort());
  for (const colour of colours) assert.equal(counts.get(colour), each, colour);
}

test('desktop home: one Random welcome, hover and keyboard focus, no logo triggers', () => {
  const f = fixture();
  verifyColours(f.particles, 3);
  for (const star of f.particles) {
    const centre = parseFloat(star.style.left) + parseFloat(star.style.width) / 2;
    assert.equal(centre, 450); // rendered Random text, not nav item or logo
  }
  f.logo.fire('mouseenter');
  f.logo.fire('focus');
  assert.equal(f.particles.length, 33);
  f.random.fire('mouseenter');
  assert.equal(f.particles.length, 66);
  verifyColours(f.particles.slice(33), 3);
  f.random.fire('focus');
  assert.equal(f.particles.length, 99);
  f.menu.fire('click', { stopPropagation() {} });
  assert.equal(f.particles.length, 99);
});

test('mobile home: one hamburger welcome, another only when menu opens', () => {
  const f = fixture({ width: 375 });
  verifyColours(f.particles, 2);
  for (const star of f.particles) {
    const centre = parseFloat(star.style.left) + parseFloat(star.style.width) / 2;
    assert.equal(centre, 302);
  }
  f.random.fire('mouseenter');
  f.random.fire('focus');
  f.logo.fire('mouseenter');
  assert.equal(f.particles.length, 22);
  f.menu.fire('click', { stopPropagation() {} }); // open
  assert.equal(f.nav.getAttribute('data-nav'), 'open');
  assert.equal(f.menu.getAttribute('aria-expanded'), 'true');
  verifyColours(f.particles.slice(22), 2);
  f.menu.fire('click', { stopPropagation() {} }); // close
  assert.equal(f.particles.length, 44);
  f.menu.fire('click', { stopPropagation() {} }); // open again
  assert.equal(f.particles.length, 66);
});

test('inner routes do not automatically burst; random desktop and menu mobile do', () => {
  const d = fixture({ width: 1280, path: '/about/' });
  assert.equal(d.particles.length, 0);
  d.random.fire('mouseenter');
  assert.equal(d.particles.length, 33);
  const m = fixture({ width: 320, path: '/blog/' });
  assert.equal(m.particles.length, 0);
  m.menu.fire('click', { stopPropagation() {} });
  assert.equal(m.particles.length, 22);
});

test('nav breakpoint is consistent at 750px and 751px', () => {
  const m = fixture({ width: 750 });
  verifyColours(m.particles, 2);
  const d = fixture({ width: 751 });
  verifyColours(d.particles, 3);
});

test('index.html welcome, reduced motion suppression, and missing-element safety', () => {
  assert.equal(fixture({ path: '/index.html' }).particles.length, 33);
  const f = fixture({ reduced: true });
  f.random.fire('mouseenter');
  f.menu.fire('click', { stopPropagation() {} });
  assert.equal(f.particles.length, 0);
  assert.equal(fixture({ missing: true }).particles.length, 0);
});

test('particles are cleaned up on animationend or fallback timeout', () => {
  const f = fixture({ width: 375 });
  assert.equal(f.timers.length, 22);
  const p0 = f.particles[0], p1 = f.particles[1];
  p0.fire('animationend');
  assert.equal(p0.removed, true);
  assert.equal(p1.removed, false);
  assert.equal(f.timers[1].time, 6600);
  f.timers[1].fn();
  assert.equal(p1.removed, true);
});

test('source and CSS keep external scripting and existing animation keyframes', () => {
  const css = read('assets/css/style.css');
  const layout = read('_layouts/default.html');
  assert.match(css, /\.pride-star-particle\s*\{/);
  for (const step of ['20%', '65%', '85%', '100%']) assert.ok(css.includes(step));
  assert.ok(layout.includes("'/assets/js/confetti.js' | relative_url"));
  assert.ok(!prideJS.includes("querySelector('.site-logo')"));
});
