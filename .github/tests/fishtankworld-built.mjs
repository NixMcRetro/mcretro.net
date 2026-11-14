#!/usr/bin/env node
/* Verify the preserved Fish Tank World site after the Jekyll build. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '_site');
const fishRoot = 'homepages/fishtankworld';
const profiles = ['bigfish', 'cichlid', 'guppies', 'plankers', 'slinky', 'todd', 'toga', 'whiskers'];
const pages = [
  fishRoot + '/index.html',
  fishRoot + '/specs.html',
  fishRoot + '/ideas.html',
  fishRoot + '/gallery/index.html',
  ...profiles.map(name => fishRoot + '/profiles/' + name + '.html')
];

const read = relative => {
  const filename = path.join(root, relative);
  assert.ok(existsSync(filename), 'Historical page missing: ' + relative);
  return readFileSync(filename, 'utf8');
};

const home = read(fishRoot + '/index.html');
assert.match(home, /Fish Tank World/);
assert.match(home, /BGCOLOR="#30D5C8"/i, 'Original turquoise page background was lost');
assert.match(home, /Comic Sans/i, 'Original retro typography was lost');
assert.match(home, /photo gallery/i);
for (const name of profiles) {
  assert.ok(home.includes('/homepages/fishtankworld/profiles/' + name + '.html'),
    'Original fish profile not linked from homepage: ' + name);
}
const gallery = read(fishRoot + '/gallery/index.html');
assert.equal((gallery.match(/<figure>/g) || []).length, 13, 'Gallery must display all 13 original photos');

let referencesChecked = 0;
for (const relative of pages) {
  const html = read(relative);
  const pattern = /\b(?:href|src)\s*=\s*["']([^"']+)["']/gi;
  for (const [, rawUrl] of html.matchAll(pattern)) {
    const url = rawUrl.split(/[?#]/, 1)[0];
    if (!url || /^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(url)) continue;
    const resolved = url.startsWith('/')
      ? path.resolve(root, '.' + url)
      : path.resolve(root, path.dirname(relative), url);
    assert.ok(resolved.startsWith(root + path.sep), 'Link escapes site root: ' + rawUrl);
    const target = (url.endsWith('/') ? path.join(resolved, 'index.html') : resolved);
    assert.ok(existsSync(target), relative + ' links to missing asset: ' + rawUrl);
    referencesChecked++;
  }
}
const goodies = read('goodies/index.html');
assert.ok(goodies.includes('/homepages/fishtankworld/'), 'Goodies lost Fish Tank World');
assert.ok(goodies.includes('/homepages/goatpad/'), 'Goodies lost Goatpad');
assert.ok(!existsSync(path.join(root, fishRoot, 'gallery-source')),
  'Binary photo staging parts must not appear in the published site');

console.log('PASS: ' + pages.length + ' Fish Tank World pages, 8 profiles, 13 gallery photographs, ' +
  referencesChecked + ' internal references and Goodies links.');
