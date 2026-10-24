import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync('assets/js/confetti.js', 'utf8');
const styles = readFileSync('assets/css/style.css', 'utf8');

assert.match(styles, /\.pride-star-particle\s*\{/);
assert.match(styles, /clip-path:\s*polygon\(/);
assert.match(styles, /@keyframes pride-star-burst/);
assert.match(styles, /20%\s*\{/);
assert.match(styles, /--fall-y/);
assert.match(styles, /65%/);
assert.match(styles, /85%/);
assert.match(styles, /opacity:\s*\.55;/);
assert.match(styles, /prefers-reduced-motion:\s*reduce/);
assert.doesNotMatch(styles, /retro-tech-cross|\.retro-tech-particle|\.retro-tech-icon/);
assert.doesNotMatch(script, /retro-tech-particles\.svg|launchHardware|flyPast|window\.location\.pathname/);

function boot(width = 1200, reduced = false, collapsedTextRange = false, textWidth = 160, pathname = '/about/') {
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
            : { left: 67, top: 20, width: textWidth, height: 28 };
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
    location: { pathname },
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
assert.equal(desktop.stars.length, 30, 'desktop burst count');
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
  assert.ok(Number.parseFloat(s.style.animationDuration) >= 3.2);
  assert.ok(Number.parseFloat(s.style.animationDuration) <= 4.5);
  allColours.add(s.style['--pride-colour']);
}
assert.equal(allColours.size, 11, 'all Progress Pride colours appear in one burst');
assert.ok(allColours.has('#000000') && allColours.has('#FFFFFF') && allColours.has('#F5A9B8') && allColours.has('#5BCEFA'));
desktop.stars[0].handlers.get('animationend')();
assert.equal(desktop.stars[0].removed, true);
desktop.timers[1].fn();
assert.equal(desktop.stars[1].removed, true, 'fallback cleanup');
desktop.logoEvents.get('focus')();
assert.equal(desktop.stars.length, 60, 'focus triggers a new burst');
const collapsed = boot(1280, false, true);
collapsed.logoEvents.get('mouseenter')();
assertTextSpan(collapsed, 240, false);
for (const s of collapsed.stars) {
  const size = Number.parseFloat(s.style.width);
  assert.equal(Number.parseFloat(s.style.left) + size / 2, 180, 'empty text range uses link centre fallback');
  assert.equal(Number.parseFloat(s.style.top) + size / 2, 36, 'empty text range uses link vertical fallback');
}
// The rightward and leftward stars must travel a little beyond the rendered text.
function assertTextSpan(booted, textWidth, mobile) {
  const radius = textWidth / 2 + (mobile ? 12 : 20);
  const count = mobile ? 18 : 30;
  const right = Number.parseFloat(booted.stars[0].style['--burst-x']);
  const left = Number.parseFloat(booted.stars[count / 2].style['--burst-x']);
  assert.ok(right >= radius * 1.02 - 0.001, 'right-side burst clears the logo text');
  assert.ok(left <= -radius * 1.02 + 0.001, 'left-side burst clears the logo text');
  const upper = booted.stars.slice(1, count / 2);
  const lower = booted.stars.slice(count / 2 + 1, count);
  assert.ok(upper.some(s => Number.parseFloat(s.style['--burst-y']) > 0), 'stars also burst downward');
  assert.ok(lower.some(s => Number.parseFloat(s.style['--burst-y']) < 0), 'stars also burst upward');
}
assertTextSpan(desktop, 160, false);
const wide = boot(1200, false, false, 300);
wide.logoEvents.get('mouseenter')();
assertTextSpan(wide, 300, false);
assert.ok(Number.parseFloat(wide.stars[0].style['--burst-x']) > Number.parseFloat(desktop.stars[0].style['--burst-x']), 'wider logo produces wider burst');
const narrow = boot(1200, false, false, 90);
narrow.logoEvents.get('mouseenter')();
assertTextSpan(narrow, 90, false);
const mobile = boot(320);
assert.equal(mobile.stars.length, 0, 'no automatic mobile burst');
mobile.logoEvents.get('mouseenter')();
assert.equal(mobile.stars.length, 18, 'mobile burst count');
assertTextSpan(mobile, 160, true);
const homepage = boot(1200, false, false, 160, '/');
assert.equal(homepage.stars.length, 30, 'homepage welcomes desktop visitor once');
assertTextSpan(homepage, 160, false);
const homeIndex = boot(1200, false, false, 160, '/index.html');
assert.equal(homeIndex.stars.length, 30, 'index.html welcomes visitor once');
const homeMobile = boot(320, false, false, 160, '/');
assert.equal(homeMobile.stars.length, 18, 'homepage mobile welcome');
const reducedHomepage = boot(1280, true, false, 160, '/');
assert.equal(reducedHomepage.stars.length, 0, 'reduced motion suppresses homepage welcome');
const reduced = boot(1280, true);
reduced.logoEvents.get('mouseenter')();
reduced.logoEvents.get('focus')();
assert.equal(reduced.stars.length, 0, 'reduced-motion preference disables effects');
console.log('PASS: 30/18 Pride stars, homepage welcome, slower fall and fade, text-spanning burst, mobile and reduced motion');
