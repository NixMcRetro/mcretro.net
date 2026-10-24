import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync('assets/js/confetti.js', 'utf8');
const css = readFileSync('assets/css/style.css', 'utf8');
const sprite = readFileSync('assets/images/effects/retro-tech-particles.svg', 'utf8');
assert.match(css, /\.retro-tech-particle\s*\{/);
assert.match(css, /\.retro-tech-icon\s*\{/);
assert.match(css, /linear-gradient\(90deg/);
assert.match(css, /mask-image:\s*linear-gradient/);
assert.match(css, /@keyframes retro-tech-cross/);
assert.match(css, /prefers-reduced-motion:\s*reduce/);
assert.doesNotMatch(css, /@keyframes confetti-star-spin|confetti-glitter-flash/);
assert.doesNotMatch(css.match(/@keyframes retro-tech-cross\s*\{[\s\S]*?\n\}/)?.[0] || '', /opacity|rotate/);
for (const id of ['floppy-35','floppy-525','crt','keyboard','cdrom']) {
  assert.ok(sprite.includes('<symbol id="' + id + '"'), 'missing sprite ' + id);
}
assert.ok(!script.includes('makeStar'), 'previous stars must be replaced');
assert.match(script, /floppy-35.*weight:\s*60/);
assert.match(script, /sprite \+ chooseHardware\(\)/);

function boot(pathname, reduced = false, width = 1280, height = 840, forcedRandom = 0.25) {
  const docEvents = new Map();
  const logoEvents = new Map();
  const allParticles = [];
  const timers = [];
  const logo = { addEventListener(event, fn) { logoEvents.set(event, fn); } };

  function node(tag) {
    const listeners = new Map();
    const obj = {
      tag,
      attrs: {},
      children: [],
      styles: {},
      className: '',
      setAttribute(k, v) { this.attrs[k] = v; },
      classList: { add(k) { obj.className = k; } },
      style: { setProperty(k, v) { obj.styles[k] = v; } },
      appendChild(child) { this.children.push(child); },
      addEventListener(event, callback) { listeners.set(event, callback); },
      remove() { this.removed = true; },
      listeners
    };
    for (const field of ['left','top','width','height','animationDelay','animationDuration']) {
      Object.defineProperty(obj.style, field, { set(value) { obj.styles[field] = value; }, get() { return obj.styles[field]; } });
    }
    return obj;
  }
  const document = {
    addEventListener(name, fn) { docEvents.set(name, fn); },
    querySelector() { return logo; },
    createElement(tag) { return node(tag); },
    createElementNS(uri, tag) { assert.equal(uri, 'http://www.w3.org/2000/svg'); return node(tag); },
    body: { appendChild(p) { allParticles.push(p); } }
  };
  const window = {
    innerWidth: width, innerHeight: height,
    location: { pathname },
    matchMedia() { return { matches: reduced }; }
  };
  const fakeMath = Object.assign(Object.create(Math), { random: () => forcedRandom });
  runInNewContext(script, { document, window, Math: fakeMath, setTimeout(fn, delay) { timers.push({ fn, delay }); } });
  docEvents.get('DOMContentLoaded')();
  return { particles: allParticles, timers, logoEvents };
}

for (const [randomVal, expectedIcon] of [
  [0.25,'floppy-35'], [0.63,'floppy-525'], [0.80,'crt'],
  [0.88,'keyboard'], [0.99,'cdrom']
]) {
  const home = boot('/', false, 1280, 840, randomVal);
  assert.equal(home.particles.length, 38, 'desktop homepage count');
  for (const p of home.particles) {
    assert.equal(p.className, 'retro-tech-particle');
    assert.equal(p.attrs['aria-hidden'], 'true');
    assert.equal(p.children.length, 1);
    assert.equal(p.children[0].tag, 'svg');
    assert.equal(p.children[0].children[0].tag, 'use');
    assert.equal(p.children[0].children[0].attrs.href,
      '/assets/images/effects/retro-tech-particles.svg#' + expectedIcon);
    assert.ok(p.styles['--trail-length'].endsWith('px'));
    assert.ok(p.styles['--trail-angle'].endsWith('deg'));
    assert.ok(p.styles['--move-x'].endsWith('px'));
    assert.ok(p.styles['--move-y'].endsWith('px'));
    assert.ok(Number.parseFloat(p.styles.animationDelay) < 0);
    assert.ok(-Number.parseFloat(p.styles.animationDelay) <= Number.parseFloat(p.styles.animationDuration) * 0.58, 'startup offset scales with flight duration');
    assert.ok(Number.parseFloat(p.styles.animationDuration) >= 5.8);
    assert.ok(Number.parseFloat(p.styles.animationDuration) <= 9.0);
    const x0 = Number.parseFloat(p.styles.left);
    const y0 = Number.parseFloat(p.styles.top);
    const x1 = x0 + Number.parseFloat(p.styles['--move-x']);
    const y1 = y0 + Number.parseFloat(p.styles['--move-y']);
    const s = Number.parseFloat(p.styles.width);
    const offscreenStart = x0 <= -s || x0 >= 1280+s || y0 <= -s || y0 >= 840+s;
    const offscreenEnd = x1 <= -s || x1 >= 1280+s || y1 <= -s || y1 >= 840+s;
    assert.ok(offscreenStart && offscreenEnd, 'objects enter and leave viewport');
  }
  home.logoEvents.get('mouseenter')();
  assert.equal(home.particles.length, 60, 'logo adds 22 more');
  home.particles[0].listeners.get('animationend')();
  assert.equal(home.particles[0].removed, true, 'animation cleans up');
  assert.equal(home.timers.length, 60, 'fallback cleanup scheduled');
  home.timers[1].fn();
  assert.equal(home.particles[1].removed, true);
}
const mobile = boot('/', false, 320, 690);
assert.equal(mobile.particles.length, 20, 'mobile homepage smaller burst');
mobile.logoEvents.get('mouseenter')();
assert.equal(mobile.particles.length, 32, 'mobile logo adds 12');
const inner = boot('/goodies/');
assert.equal(inner.particles.length, 0, 'no load effect on inner pages');
inner.logoEvents.get('mouseenter')();
assert.equal(inner.particles.length, 22, 'hover works site-wide');
const reduced = boot('/', true);
assert.equal(reduced.particles.length, 0, 'reduced-motion suppresses homepage');
reduced.logoEvents.get('mouseenter')();
assert.equal(reduced.particles.length, 0, 'reduced-motion suppresses hover');
console.log('PASS: five retro hardware sprites, weighted mix, offscreen flight, no fading/spin, rainbow exhaust, hover, mobile, cleanup, reduced motion');
