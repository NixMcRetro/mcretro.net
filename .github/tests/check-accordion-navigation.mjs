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
  assert.equal(html.split('src="' + asset + '"').length - 1, 1,
    'Shared accordion behaviour must load exactly once: ' + slug);
  const summaries = [...html.matchAll(/<summary\b/gi)].length;
  assert.ok(summaries >= panels.length, 'An accordion cannot lack its keyboard-accessible summary: ' + slug);
}
const darknet = readFileSync(path.join(site, 'take-back-the-darknet/index.html'), 'utf8');
assert.ok(darknet.includes('/assets/js/darknet-accordion.js'), 'Darknet hash navigation script missing');
const odyssey = readFileSync(path.join(site, 'odyssey-stealer-technical-analysis-of-a-macos-infostealer/index.html'), 'utf8');
assert.ok(odyssey.includes('/assets/js/odyssey-sections.js'), 'Odyssey deep-link navigation script missing');

// Exercise the click handler without requiring a browser-dependent test stack.
class MockElement {
  closest(selector) {
    assert.match(selector, /details.*summary/, 'Handler should be limited to accordion summaries');
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
console.log('PASS: ' + accordionPages + ' accordion pages, shared navigation, deep links and click-to-scroll behaviour.');
