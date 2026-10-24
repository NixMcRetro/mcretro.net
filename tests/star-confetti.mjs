import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync('assets/js/confetti.js', 'utf8');
const css = readFileSync('assets/css/style.css', 'utf8');
const overrides = readFileSync('assets/css/overrides.css', 'utf8');
assert.match(overrides, /border-left:\s*3px solid #018281;/);
assert.match(css, /filter:\s*drop-shadow\(/);
assert.match(css, /\.confetti-particle::after\s*\{/);
assert.match(css, /background:\s*linear-gradient\(90deg/);
assert.match(css, /\.confetti-particle--glitter::before/);
assert.match(css, /confetti-glitter-flash/);
assert.match(script, /#000000/);
assert.match(script, /#784F17/);
assert.match(script, /#FFFFFF/);
assert.match(script, /#F5A9B8/);
assert.match(script, /#5BCEFA/);
assert.match(css, /clip-path:\s*polygon\(/);
assert.doesNotMatch(css.match(/\.confetti-particle\s*\{[^}]*\}/s)?.[0] || '', /clip-path/, 'container cannot clip the rainbow trail');
assert.match(css, /prefers-reduced-motion:\s*reduce/);
assert.doesNotMatch(css.match(/\.confetti-particle\s*\{[^}]*\}/s)?.[0] || '', /border-radius:\s*50%/);

function boot(pathname, reduced = false, width = 1280, height = 900, forcedRandom = null) {
  const documentEvents = new Map();
  const logoEvents = new Map();
  const particles = [];
  const logo = {
    addEventListener(name, fn) { logoEvents.set(name, fn); },
    getBoundingClientRect() { return { left: 20, top: 12, width: 220, height: 45 }; }
  };
  const document = {
    addEventListener(name, fn) { documentEvents.set(name, fn); },
    querySelector(selector) { assert.equal(selector, '.site-logo'); return logo; },
    createElement(tag) {
      assert.equal(tag, 'span');
      const handlers = new Map();
      const el = {
        classList: { add(cls) { el.className = el.className ? el.className + ' ' + cls : cls; } },
        style: { setProperty(name, value) { this[name] = value; } },
        setAttribute(name, value) { el[name] = value; },
        addEventListener(name, fn) { handlers.set(name, fn); },
        remove() { el.removed = true; },
        handlers
      };
      particles.push(el);
      return el;
    },
    body: { appendChild(p) { p.appended = true; } }
  };
  const window = { innerWidth: width, innerHeight: height, location: { pathname }, matchMedia: () => ({ matches: reduced }) };
  const seededMath = forcedRandom === null ? Math : Object.assign(Object.create(Math), { random: () => forcedRandom });
  runInNewContext(script, { document, window, Math: seededMath, setTimeout() {} });
  documentEvents.get('DOMContentLoaded')();
  return { particles, logoEvents };
}
const home = boot('/');
assert.equal(home.particles.length, 64, 'homepage desktop welcome has richer coverage');
for (const p of home.particles) {
  assert.equal(p.appended, true);
  assert.equal(p['aria-hidden'], 'true');
  assert.ok(p.className === 'confetti-particle' || p.className === 'confetti-particle confetti-particle--glitter');
  assert.ok(Number.parseFloat(p.style.width) >= 12 && Number.parseFloat(p.style.width) <= 42, 'star size is bounded');
  assert.ok(p.style['--trail-length'].endsWith('px'), 'rainbow tail has length');
  assert.ok(p.style['--trail-angle'].endsWith('deg'), 'tail has direction');
  assert.ok(p.style['--star-color'].startsWith('#'), 'Progress Pride star colour assigned');
  assert.ok(p.style['--duration'].endsWith('s'), 'spin duration set');
  assert.ok(Number.parseFloat(p.style.left) >= 0 && Number.parseFloat(p.style.left) <= 1280);
  assert.ok(Number.parseFloat(p.style.top) >= 0 && Number.parseFloat(p.style.top) <= 900);
}
home.logoEvents.get('mouseenter')();
assert.equal(home.particles.length, 106, 'logo hover adds 42 stars across the page');
const hoverStars = home.particles.slice(64);
assert.ok(hoverStars.some(p => Number.parseFloat(p.style.left) > 300), 'logo hover stars spread beyond logo width');
assert.ok(hoverStars.some(p => Number.parseFloat(p.style.top) > 300), 'logo hover stars spread down the page');
home.particles[0].handlers.get('animationend')();
assert.equal(home.particles[0].removed, true, 'particles cleaned after animation');
const mobile = boot('/', false, 320, 730);
assert.equal(mobile.particles.length, 32, 'mobile has a smaller welcome burst');
mobile.logoEvents.get('mouseenter')();
assert.equal(mobile.particles.length, 56, 'mobile hover adds 24 stars');
const glitter = boot('/', false, 1280, 900, 0.02);
assert.ok(glitter.particles.every(p => p.className === 'confetti-particle confetti-particle--glitter'), 'forced low randomness makes glitter');
assert.ok(glitter.particles.every(p => Number.parseFloat(p.style.width) >= 28 && Number.parseFloat(p.style.width) <= 42), 'glitter stars oversized');
const article = boot('/about/');
assert.equal(article.particles.length, 0, 'inner pages do not auto-scatter');
article.logoEvents.get('mouseenter')();
assert.equal(article.particles.length, 42, 'logo hover works on inner pages');
const reducedHome = boot('/', true);
assert.equal(reducedHome.particles.length, 0, 'reduced motion disables welcome stars');
reducedHome.logoEvents.get('mouseenter')();
assert.equal(reducedHome.particles.length, 0, 'reduced motion disables hover stars');
console.log('PASS: Progress Pride palette, rainbow trails, oversized glitter, teal panel border, homepage and hover, reduced motion');
