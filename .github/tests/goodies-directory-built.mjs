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
  // Markdown images are not navigational links; the floppy GIF is verified below.
  ...[...source.matchAll(/(!?)\[[^\]\n]*\]\((\/[^)\s]+)\)/g)]
    .filter(match => match[1] !== '!')
    .map(match => match[2])
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

// Keep the user-curated historical Cool Links list deduplicated and visible.
assert.match(source, /Historical Homepages<\/summary>/, 'Historical Homepages accordion heading is missing');
assert.match(source, /Cool Links<\/summary>/, 'Goodies Cool Links accordion is missing');
assert.doesNotMatch(source, /Still Under Construction/, 'Obsolete construction accordion remains');
const coolLinkNames = [
  'ASSEMblergames.com',
  'Sega World Sydney',
  'Segata Sanshiro Music Video',
  'Ship to Shore Theme Music',
  'The Cover Project',
  'XBOX Archive',
  'Macintosh Garden',
  'Pippi Longstocking Theme Song',
  'The Vintage Computing Files Archive',
  'VOGONS Vintage Driver Library',
  "Peter H. S. Madsen's Animated GIF Archive"
];
for (const name of coolLinkNames) {
  assert.equal(source.split('**[' + name + '](').length - 1, 1,
    'Cool Links must contain exactly one entry for ' + name);
  // Jekyll may encode an apostrophe as an HTML entity or a curly quote.
  const normaliseApostrophes = text => text.replace(/&#(?:0*39|0*8217);|&#x(?:0*27|0*2019);|&(?:apos|rsquo);|[\u2018\u2019]/gi, "'");
  assert.ok(anchors.some(link => normaliseApostrophes(link.text).includes(name)),
    'Cool Links entry is not visible in built HTML: ' + name);
}

const panelSections = [...source.matchAll(/<details class="about-panel panel--teal" markdown="1">([\s\S]*?)<\/details>/g)]
  .map(match => match[1]);
const panelHeading = panel => panel.match(/<\/span>\s*([^<]+)<\/summary>/)?.[1];
const expectedSections = [
  'Cool Links', 'File Server', 'Historical Homepages',
  'Photo Gallery', 'Projects', 'Super Secret Recipes'
];
const sectionCollator = new Intl.Collator('en', {sensitivity: 'base'});
assert.deepEqual(expectedSections, [...expectedSections].sort(sectionCollator.compare),
  'Top-level Goodies accordion headings must also be alphabetised');
assert.deepEqual(panelSections.map(panelHeading), expectedSections,
  'Goodies sections are independent accordions sorted alphabetically');
assert.doesNotMatch(panelSections[4], /\[File Server\]|\[Photo Gallery\]/,
  'Files and photos must not appear among interactive projects');
const externalArchives = [
  [1, 'https://files.mcretro.net/index.html', 'Visit File Server (Coming Soon)'],
  [3, 'https://photos.mcretro.net/index.html', 'Browse the Photo Gallery']
];
for (const [panelIndex, href, label] of externalArchives) {
  const expectedLink = '<a class="goodies-archive-button" href="' + href +
    '" target="_blank" rel="noopener noreferrer">';
  assert.ok(panelSections[panelIndex].includes(expectedLink),
    label + ' must be a styled link opening in a new tab with secure rel');
  assert.ok(html.includes(expectedLink),
    label + ' must be present in the published page');
  assert.ok(anchors.some(link => link.href === href && link.text.includes(label)),
    label + ' must remain a visible working hyperlink');
}
assert.doesNotMatch(panelSections[1], /<button\b[^>]*disabled/,
  'File Server is intentionally a live link to its current 404 until launch');
assert.match(panelSections[1], /404 page/,
  'File Server explicitly describes its current 404 destination');
const goodiesStyles = readFileSync(new URL('../../assets/css/overrides.css', import.meta.url), 'utf8');
assert.match(goodiesStyles, /\.goodies-archive-actions\s*\{[^}]*justify-content:\s*center;/,
  'Both gallery buttons must be centred in their accordion');
// Only sort the leading bold item titles, not secondary links within
// descriptions (such as historical homepages' own photo galleries).
const entryNames = panel => panel.split('\n')
  .filter(line => /\*\*[^\n]*\[([^\]]+)\]\(/.test(line))
  .map(line => line.match(/\[([^\]]+)\]\(/)?.[1])
  .filter(Boolean);
const collator = new Intl.Collator('en', {sensitivity:'base'});
for (const index of [0, 2, 4]) {
  const names = entryNames(panelSections[index]);
  assert.deepEqual(names, [...names].sort(collator.compare),
    expectedSections[index] + ' must list entries alphabetically by name');
}
const recipeNames = [...panelSections[5].matchAll(/^- \[([^\]]+)\]/gm)].map(match => match[1]);
assert.deepEqual(recipeNames, [...recipeNames].sort(collator.compare),
  'Recipes must list items alphabetically by name');


// Goodies now features the rotating floppy; keep its original file-copy GIF
// as an archived asset. Both must survive the published Jekyll build.
const floppy = '/assets/images/goodies/floppy-download.gif';
const historicFloppy = '/assets/images/goodies/filecopy.gif';
assert.ok(source.includes('src="' + floppy + '"'),
  'The Goodies source no longer references the rotating floppy GIF');
assert.ok(html.includes('src="' + floppy + '"'),
  'The rotating Goodies floppy animation is missing from the built page');
assert.ok(existsSync(path.join(root, floppy.slice(1))),
  'The rotating Goodies floppy GIF was not published');
assert.ok(existsSync(path.join(root, historicFloppy.slice(1))),
  'The historical Goodies file-copy GIF was not preserved');
console.log('PASS: ' + preserved.size + ' historical and active links, ' +
  checked + ' authored internal destinations, section anchors, rotating floppy and historical file-copy GIF.');
