// Regression checks for the isolated Channel Chirp Nest inside McRetro.
// Run against the built _site after Jekyll. No network or live site updates.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const site = process.argv[2] || '_site';
const read = rel => fs.readFileSync(path.join(site, rel), 'utf8');
const exists = rel => fs.existsSync(path.join(site, rel));
const home = read('chirp/index.html');
const conure = read('the-first-day/index.html');
const corella = read('little-corella-at-the-local-nursery/index.html');
const normalBlog = read('blog/index.html');
const channels = read('channels/index.html');

assert.ok(exists('assets/css/bird-theme.css'), 'Bird palette must be built');
assert.ok(exists('assets/css/channel-chirp.css'), 'Nest CSS must be built');
assert.ok(exists('assets/js/channel-chirp-filter.js'), 'Nest filter must be built');
assert.match(home, /<html[^>]*data-default-theme="bird"/, 'The Nest defaults to Bird mode');
assert.doesNotMatch(home, /channels\/channel-chirp/, 'Draft nested URL must not leak');
assert.match(home, /<body[^>]*class="channel-chirp-theme"/, 'The Nest needs its own theme');
assert.match(home, /<nav class="nest-subnav"/);
assert.match(home, /href="\/chirp\/#nest-adventures"/);
assert.match(home, /id="nest-search-input"/);
assert.match(home, /id="nest-search-status"/);
assert.match(home, /id="nest-no-results"/);
assert.match(home, /assets\/js\/channel-chirp-filter\.js/);
assert.match(home, /assets\/css\/channel-chirp\.css/);
assert.match(home, /The First Day!/);
assert.match(home, /Burrrp! Tillie!/);
assert.doesNotMatch(home, /Little Corella at the Local Nursery/);
assert.doesNotMatch(home, /Bits, Brass, and Bugs/);
for (const route of [
  '/chirp/archive/pudge/', '/chirp/archive/tillie/',
  '/chirp/archive/chip/', '/chirp/archive/timeline/',
  '/chirp/archive/soundborb/'
]) assert.ok(home.includes(route), 'The Nest should link to ' + route);

// The full original site must be present locally, not merely linked to its old domain.
for (const route of [
  'chirp/archive/index.html',
  'chirp/archive/pudge/index.html',
  'chirp/archive/tillie/index.html',
  'chirp/archive/chip/index.html',
  'chirp/archive/timeline/index.html',
  'chirp/archive/diet/index.html',
  'chirp/archive/adventures/index.html',
  'chirp/archive/the-first-day/index.html',
  'chirp/archive/soundborb/index.html',
  'chirp/archive/assets/soundborb/clips.json',
  'chirp/archive/assets/soundborb/audio/beep-boop-001.mp3'
]) assert.ok(exists(route), 'The preserved original site must include ' + route);
assert.doesNotMatch(home, /href="https:\/\/(?:www\.)?channelchirp\.com\//,
  'The Nest cannot rely on the retiring Channel Chirp domain');
assert.match(home, /229 original/i);
assert.match(home, /509 individual recordings/);

const cards = [...home.matchAll(/class="nest-post-card" data-nest-post/g)].length;
assert.ok(cards >= 54, 'Expected all 54 historical conure posts, not ' + cards);
assert.ok(home.includes(cards + ' adventures'), 'Displayed count must match rendered cards');
assert.match(channels, /Visit The Nest: Channel Chirp adventures on McRetro/);

assert.match(conure, /<body[^>]*class="channel-chirp-theme"/,
  'A conure post must stay inside The Nest');
assert.match(conure, /More Channel Chirp adventures/);
assert.match(conure, /OLDER CONURE ADVENTURE|NEWER CONURE ADVENTURE/);
assert.match(conure, /Our Little Flock/);
assert.doesNotMatch(conure, /Browse all archives/, 'Nest sidebar must not be the global blog sidebar');

assert.doesNotMatch(corella, /class="channel-chirp-theme"/,
  'The Little Corella remains a Parrots post but not a Nest post');
assert.doesNotMatch(corella, /class="nest-subnav"/);
assert.match(corella, /Browse all archives/, 'Non-flock posts keep the normal sidebar');
assert.doesNotMatch(normalBlog, /class="channel-chirp-theme"/);
assert.doesNotMatch(normalBlog, /data-default-theme="bird"/);
assert.ok(!exists('channels/channel-chirp/index.html'), 'No second Nest URL');
assert.doesNotMatch(normalBlog, /channel-chirp-sidebar/);

console.log('PASS: The Nest contains ' + cards + ' conure posts; corella and other blog pages stay separate.');
