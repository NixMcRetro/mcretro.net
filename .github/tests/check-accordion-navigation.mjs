#!/usr/bin/env node
/* Regression checks for the shared accordion alignment on published pages. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const site = process.argv[2] || '_site';
const asset = '/assets/js/accordion-navigation.js';
const source = readFileSync(path.join(site, asset.slice(1)), 'utf8');
const css = readFileSync(path.join(site, 'assets/css/overrides.css'), 'utf8');

assert.match(css, /\.content-area details\.about-panel > summary\s*\{\s*scroll-margin-top:\s*1rem;/);
assert.ok(!css.includes('details[name="mcretro-darknet"] { scroll-margin-top: 0.75rem; }'));

const pages = [
  ['about', 'mcretro-about', 4],
  ['channels', 'mcretro-channels', 4],
  ['goodies', 'mcretro-goodies', 3],
  ['flicky-the-floury-baker-cicada', 'mcretro-flicky', 10],
  ['take-back-the-darknet', 'mcretro-darknet', 14],
  ['odyssey-stealer-technical-analysis-of-a-macos-infostealer', null, 7],
];
for (const [slug, name, count] of pages) {
  const pagePath = path.join(site, slug, 'index.html');
  assert.ok(existsSync(pagePath), `Missing published accordion page: ${slug}`);
  const html = readFileSync(pagePath, 'utf8');
  assert.equal(html.split(`src="${asset}"`).length - 1, 1, `Shared asset not loaded exactly once: ${slug}`);
  if (name) {
    assert.equal(html.split(`name="${name}"`).length - 1, count, `Incorrect accordion group: ${slug}`);
  } else {
    assert.equal(html.split('class="about-panel panel--teal odyssey-panel"').length - 1, count, 'Odyssey panels changed');
  }
  assert.ok(!html.includes('Native <details name> handles exclusivity. If collapsing'), `Legacy inline helper remains: ${slug}`);
}
const darknet = readFileSync(path.join(site, 'take-back-the-darknet/index.html'), 'utf8');
assert.ok(darknet.includes('/assets/js/darknet-accordion.js'), 'Darknet hash navigation script missing');
const odyssey = readFileSync(path.join(site, 'odyssey-stealer-technical-analysis-of-a-macos-infostealer/index.html'), 'utf8');
assert.ok(odyssey.includes('/assets/js/odyssey-sections.js'), 'Odyssey deep-link navigation script missing');

// Exercise the click handler without requiring a browser-dependent test stack.
class MockElement {
  closest(selector) {
    assert.equal(selector, '.content-area details.about-panel > summary');
    return this.summary || null;
  }
}
let onClick;
const frames = [];
vm.runInNewContext(source, {
  Element: MockElement,
  document: { addEventListener(type, handler) {
    assert.equal(type, 'click');
    onClick = handler;
  } },
  requestAnimationFrame(callback) { frames.push(callback); }
});
assert.equal(typeof onClick, 'function');
const calls = [];
const summary = new MockElement();
summary.parentElement = { open: true };
summary.scrollIntoView = opts => calls.push(opts);
const child = new MockElement();
child.summary = summary;
onClick({ target: child });
assert.equal(frames.length, 1);
frames.shift()();
assert.equal(calls.length, 1);
assert.equal(calls[0].block, 'start');
assert.equal(calls[0].inline, 'nearest');
assert.equal(calls[0].behavior, 'instant');

// Closing an open panel or clicking elsewhere must not change scroll.
summary.parentElement.open = false;
onClick({ target: child });
frames.shift()();
onClick({ target: new MockElement() });
assert.equal(frames.length, 0);
assert.equal(calls.length, 1);
console.log('PASS: six published accordion pages, shared CSS, one script per page, deep links and click-to-scroll behaviour.');
