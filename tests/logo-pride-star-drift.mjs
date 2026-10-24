import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync('assets/js/confetti.js', 'utf8');
const styles = readFileSync('assets/css/style.css', 'utf8');

assert.match(styles, /\.pride-star-particle\s*\{/);
assert.match(styles, /clip-path:\s*polygon\(/);
assert.match(styles, /@keyframes pride-star-burst/);
assert.match(styles, /28%\s*\{/);
assert.match(styles, /--fall-y/);
assert.match(styles, /prefers-reduced-motion:\s*reduce/);
assert.doesNotMatch(styles, /retro-tech-cross|\.retro-tech-particle|\.retro-tech-icon/);
assert.doesNotMatch(script, /retro-tech-particles\.svg|launchHardware|flyPast|window\.location\.pathname/);

function boot(width = 1200, reduced = false, collapsedTextRange = false) {
  const documentEvents = new Map();
  const logoEvents = new Map();
  const stars = [];
  const timers = [];
  const logo = {
    getBoundingClientRect() { return { left: 60, top: 12, width: 240, height: 48 }; },
    addEventListener(name, fn) { logoEvents.set(name, fn); }
  };
  const document = {
    addEventListener(name, fn) { documentEvents.set(name, fn); },
    querySelector(selector) {
      assert.equal(selector, '.site-logo');
      return logo;
    },
    createRange() {
      return {
        selectNodeContents(node) { assert.equal(node, logo, 'measure the logo text'); },
        getBoundingClientRect() {
          return collapsedTextRange
            ? { left: 60, top: 12, width: 0, height: 0 }
            : { left: 67, top: 20, width: 160, height: 28 };
        }
      };
    },
    createElement(tag) {
      assert.equal(tag, 'span');
      const handlers = new Map();
      const el = {
        className: '',
        attrs: {},
        style: { setProperty(k, v) { this[k] = v; } },
        classList: { add(k) { el.className = k; } },
        setAttribute(k,v) { this.attrs[k] = v; },
        addEventListener(name, fn) { handlers.set(name, fn); },
        remove() { el.removed = true; },
        handlers
      };
      return el;
    },
    body: { appendChild(el) { stars.push(el); } }
  };
  const window = {
    innerWidth: width,
    matchMedia() { return { matches: reduced }; }
  };
  runInNewContext(script, { document, window, Math, setTimeout(fn, ms) { timers.push({ fn, ms }); } });
  documentEvents.get('DOMContentLoaded')();
  return { stars, logoEvents, timers };
}
const desktop = boot();
assert.equal(desktop.stars.length, 0, 'no automatic burst on load');
assert.ok(desktop.logoEvents.has('mouseenter'), 'hover triggers confetti');
assert.ok(desktop.logoEvents.has('focus'), 'keyboard focus triggers confetti');
desktop.logoEvents.get('mouseenter')();
assert.equal(desktop.stars.length, 20, 'desktop burst count');
const allColours = new Set();
for (const s of desktop.stars) {
  assert.equal(s.className, 'pride-star-particle');
  assert.equal(s.attrs['aria-hidden'], 'true');
  const size = Number.parseFloat(s.style.width);
  assert.equal(Number.parseFloat(s.style.left) + size / 2, 147, 'burst centre tracks the text, not the stretched link');
  assert.equal(Number.parseFloat(s.style.top) + size / 2, 34, 'burst vertical centre tracks rendered text');
  assert.ok(Number.parseFloat(s.style.width) >= 9 && Number.parseFloat(s.style.width) <= 16);
  assert.ok(s.style['--burst-x'].endsWith('px'));
  assert.ok(s.style['--burst-y'].endsWith('px'));
  assert.ok(s.style['--drift-x'].endsWith('px'));
  assert.ok(Number.parseFloat(s.style['--fall-y']) > 0);
  assert.ok(Number.parseFloat(s.style.animationDuration) >= 1.9);
  assert.ok(Number.parseFloat(s.style.animationDuration) <= 2.8);
  allColours.add(s.style['--pride-colour']);
}
assert.equal(allColours.size, 11, 'all Progress Pride colours appear in one burst');
assert.ok(allColours.has('#000000') && allColours.has('#FFFFFF') && allColours.has('#F5A9B8') && allColours.has('#5BCEFA'));
desktop.stars[0].handlers.get('animationend')();
assert.equal(desktop.stars[0].removed, true);
desktop.timers[1].fn();
assert.equal(desktop.stars[1].removed, true, 'fallback cleanup');
desktop.logoEvents.get('focus')();
assert.equal(desktop.stars.length, 40, 'focus triggers a new burst');
const collapsed = boot(1280, false, true);
collapsed.logoEvents.get('mouseenter')();
for (const s of collapsed.stars) {
  const size = Number.parseFloat(s.style.width);
  assert.equal(Number.parseFloat(s.style.left) + size / 2, 180, 'empty text range uses link centre fallback');
  assert.equal(Number.parseFloat(s.style.top) + size / 2, 36, 'empty text range uses link vertical fallback');
}
const mobile = boot(320);
assert.equal(mobile.stars.length, 0, 'no automatic mobile burst');
mobile.logoEvents.get('mouseenter')();
assert.equal(mobile.stars.length, 12, 'mobile burst count');
const reduced = boot(1280, true);
reduced.logoEvents.get('mouseenter')();
reduced.logoEvents.get('focus')();
assert.equal(reduced.stars.length, 0, 'reduced-motion preference disables effects');
console.log('PASS: logo text-centred Pride stars, accurate range and fallback, downward drift, 11 colours, mobile, keyboard, cleanup, reduced motion');
