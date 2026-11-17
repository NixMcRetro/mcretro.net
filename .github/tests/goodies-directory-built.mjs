#!/usr/bin/env node
/* Behavioural Goodies checks: preserve destinations and visible names, not card markup.
   All local links on this page must resolve in the published Jekyll output. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '_site');
const pagePath = path.join(root, 'goodies/index.html');
assert.ok(existsSync(pagePath), 'Published Goodies page is missing');
const html = readFileSync(pagePath, 'utf8');
const source = readFileSync(new URL('../../goodies.md', import.meta.url), 'utf8');

// Link names and destinations are preservation contracts. New entries and
// different layouts are welcome; silently losing an old project is not.
const preserved = new Map([
  ['/homepages/op-1/', 'BleepGarden Music Maker 2000'],
  ['/homepages/modem/', 'Dial-Up Networking'],
  ['/homepages/goatpad/', 'GOATPAD 1337'],
  ['/homepages/lunchbeat/', 'Lunchbeat'],
  ['/homepages/bowling/', 'The Cyber Lanes'],
  ['/homepages/vrampage-md/', 'VRAMpage MD'],
  ['/homepages/fishtankworld/', 'Fish Tank World'],
  ['/homepages/frank/', 'Frank the Snake'],
  ['/homepages/pepper/', 'Pepper the Dog Blog'],
  ['/homepages/sonic/', 'Sonic the Hedgehog Homepage'],
  ['/homepages/space/', 'Space / Planets Webpage'],
  ['/homepages/nature/', 'Super Nature World']
]);
const anchors = [...html.matchAll(/<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi)]
  .map(([, , href, body]) => ({
    href,
    text: body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  }));
for (const [href, label] of preserved) {
  assert.ok(anchors.some(link => link.href === href && link.text.includes(label)),
    'Goodies lost the visible "' + label + '" link to ' + href);
}

// Validate the links authored on Goodies, not unrelated global navigation.
// Both Markdown and HTML links are supported, so neither syntax is mandated.
const authored = [
  ...[...source.matchAll(/\bhref\s*=\s*(["'])(.*?)\1/gi)].map(match => match[2]),
  ...[...source.matchAll(/\]\((\/[^)\s]+)\)/g)].map(match => match[1])
];
let checked = 0;
for (const rawUrl of new Set(authored)) {
  if (rawUrl.startsWith('#')) {
    assert.ok(html.includes('id="' + rawUrl.slice(1) + '"'),
      'Goodies has a broken on-page link: ' + rawUrl);
    continue;
  }
  if (!rawUrl.startsWith('/') || rawUrl.startsWith('//')) continue;
  const pathname = rawUrl.split(/[?#]/, 1)[0];
  const targetPath = path.resolve(root, '.' + decodeURIComponent(pathname));
  assert.ok(targetPath.startsWith(root + path.sep), 'Goodies link escapes site root: ' + rawUrl);
  const file = pathname.endsWith('/') ? path.join(targetPath, 'index.html') : targetPath;
  assert.ok(existsSync(file), 'Goodies points to a missing published page: ' + rawUrl);
  assert.ok(anchors.some(link => link.href === rawUrl),
    'Goodies link not present in the rendered page: ' + rawUrl);
  checked++;
}

// Preserve the original animated artefact without constraining its border or
// location. The image must be reachable in the built website.
const floppy = '/assets/images/goodies/filecopy.gif';
assert.ok(html.includes(floppy), 'The Goodies floppy animation is missing');
assert.ok(existsSync(path.join(root, floppy.slice(1))), 'The original floppy GIF was not published');
console.log('PASS: ' + preserved.size + ' historical and active links, ' +
  checked + ' authored internal destinations, section anchors and original floppy animation.');
