#!/usr/bin/env node
/* Behavioural checks for accessible accordion navigation on published pages. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const site = process.argv[2] || '_site';
const asset = '/assets/js/accordion-navigation.js';
const source = readFileSync(path.join(site, asset.slice(1)), 'utf8');

// Verify actual accordion behaviour rather than the number of panels or
// their names. Editors may add, remove or redesign sections legitimately.
const pages = [
  'about',
  'channels',
  'goodies',
  'archive',
  'flicky-the-floury-baker-cicada',
  'tp-link-archer-vr1600v-v2-firmware-dump-attempt',
  'take-back-the-darknet',
  'odyssey-stealer-technical-analysis-of-a-macos-infostealer'
];
let accordionPages = 0;
for (const slug of pages) {
  const pagePath = path.join(site, slug, 'index.html');
  assert.ok(existsSync(pagePath), 'Published page missing: ' + slug);
  const html = readFileSync(pagePath, 'utf8');
  const panels = [...html.matchAll(/<details\b[^>]*>/gi)]
    .filter(([tag]) => /\babout-panel\b/.test(tag));
  if (!panels.length) continue; // Other accessible designs are allowed.
  accordionPages++;
  assert.ok(panels.every(([tag]) => !/\bname\s*=/.test(tag)),
    'Shared accordions must permit multiple open panels: ' + slug);
  assert.equal(html.split('src="' + asset + '"').length - 1, 1,
    'Shared accordion behaviour must load exactly once: ' + slug);
  const summaries = [...html.matchAll(/<summary\b/gi)].length;
  assert.ok(summaries >= panels.length, 'An accordion cannot lack its keyboard-accessible summary: ' + slug);
}
const flicky = readFileSync(path.join(site, 'flicky-the-floury-baker-cicada/index.html'), 'utf8');
assert.equal((flicky.match(/<details\b[^>]*\bflicky-panel\b/g) || []).length, 10,
  'Flicky panels need their dedicated class for embedded video styling');

const darknet = readFileSync(path.join(site, 'take-back-the-darknet/index.html'), 'utf8');
assert.ok(darknet.includes('/assets/js/darknet-accordion.js'), 'Darknet hash navigation script missing');
const darknetScript = readFileSync(path.join(site, 'assets/js/darknet-accordion.js'), 'utf8');
assert.ok(darknetScript.includes('details.about-panel[id^="part-"]'),
  'Darknet chapter deep links must not depend on exclusive accordion groups');
const odyssey = readFileSync(path.join(site, 'odyssey-stealer-technical-analysis-of-a-macos-infostealer/index.html'), 'utf8');
assert.ok(odyssey.includes('/assets/js/odyssey-sections.js'), 'Odyssey deep-link navigation script missing');

// Exercise the click handler without requiring a browser-dependent test stack.
class MockElement {
  constructor(top = 0) { this.top = top; }
  closest(selector) {
    assert.match(selector, /details.*summary/, 'Handler should be limited to accordion summaries');
    return this.summary || null;
  }
  getBoundingClientRect() { return { top: this.top }; }
}
let onClick;
const frames = [];
const scrolls = [];
vm.runInNewContext(source, {
  Element: MockElement,
  document: { addEventListener(type, handler) {
    assert.equal(type, 'click');
    onClick = handler;
  } },
  requestAnimationFrame(callback) { frames.push(callback); },
  window: { scrollBy(options) { scrolls.push(options); } }
});
assert.equal(typeof onClick, 'function');

const summary = new MockElement(240);
const child = new MockElement();
child.summary = summary;

// Opening a panel normally must not scroll the page.
onClick({ target: child });
assert.equal(frames.length, 1);
frames.shift()();
assert.equal(scrolls.length, 0);

// A previously expanded panel closing above this heading can move it.
// Compensate by precisely that amount, not by jumping to the top.
summary.top = 340;
onClick({ target: child });
summary.top = 120;
frames.shift()();
assert.equal(scrolls.length, 1);
assert.equal(scrolls[0].top, -220);
assert.equal(scrolls[0].left, 0);
assert.equal(scrolls[0].behavior, 'instant');

// Browser scroll anchoring may already have prevented movement.
summary.top = 120;
onClick({ target: child });
frames.shift()();
assert.equal(scrolls.length, 1);

// Ignore unrelated clicks.
onClick({ target: new MockElement() });
assert.equal(frames.length, 0);
assert.equal(scrolls.length, 1);
console.log('PASS: ' + accordionPages + ' accordion pages, shared navigation, deep links and position-preserving clicks.');
