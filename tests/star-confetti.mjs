import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync('assets/js/confetti.js', 'utf8');
const css = readFileSync('assets/css/style.css', 'utf8');
assert.match(css, /clip-path:\s*polygon\(/);
assert.match(css, /prefers-reduced-motion:\s*reduce/);
assert.doesNotMatch(css.match(/\.confetti-particle\s*\{[^}]*\}/s)?.[0] || '', /border-radius:\s*50%/);

function boot(pathname, reduced = false, width = 1280, height = 900) {
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
        classList: { add(cls) { el.className = cls; } },
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
  runInNewContext(script, { document, window, Math, setTimeout() {} });
  documentEvents.get('DOMContentLoaded')();
  return { particles, logoEvents };
}
const home = boot('/');
assert.equal(home.particles.length, 48, 'homepage desktop welcome is viewport-wide');
for (const p of home.particles) {
  assert.equal(p.appended, true);
  assert.equal(p['aria-hidden'], 'true');
  assert.equal(p.className, 'confetti-particle');
  assert.ok(Number.parseFloat(p.style.left) >= 0 && Number.parseFloat(p.style.left) <= 1280);
  assert.ok(Number.parseFloat(p.style.top) >= 0 && Number.parseFloat(p.style.top) <= 900);
}
home.logoEvents.get('mouseenter')();
assert.equal(home.particles.length, 78, 'logo hover adds 30 stars across the page');
const hoverStars = home.particles.slice(48);
assert.ok(hoverStars.some(p => Number.parseFloat(p.style.left) > 300), 'logo hover stars spread beyond logo width');
assert.ok(hoverStars.some(p => Number.parseFloat(p.style.top) > 300), 'logo hover stars spread down the page');
home.particles[0].handlers.get('animationend')();
assert.equal(home.particles[0].removed, true, 'particles cleaned after animation');
const mobile = boot('/', false, 320, 730);
assert.equal(mobile.particles.length, 24, 'mobile has a smaller welcome burst');
const article = boot('/about/');
assert.equal(article.particles.length, 0, 'inner pages do not auto-scatter');
article.logoEvents.get('mouseenter')();
assert.equal(article.particles.length, 30, 'logo hover works on inner pages');
const reducedHome = boot('/', true);
assert.equal(reducedHome.particles.length, 0, 'reduced motion disables welcome stars');
reducedHome.logoEvents.get('mouseenter')();
assert.equal(reducedHome.particles.length, 0, 'reduced motion disables hover stars');
console.log('PASS: five-pointed star CSS, homepage-only welcome, logo hover, mobile count, cleanup, reduced motion');
