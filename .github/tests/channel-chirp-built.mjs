// Test the generated Jekyll site, not source-code assumptions.
// All Bird pages must be independent from the unpublished historic archive.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const site = process.argv[2] || '_site';
const read = file => fs.readFileSync(path.join(site, file), 'utf8');
const exists = file => fs.existsSync(path.join(site, file));
const pages = {
  nest: read('chirp/index.html'),
  adventures: read('chirp/adventures/index.html'),
  flock: read('chirp/flock/index.html'),
  timeline: read('chirp/timeline/index.html'),
  search: read('chirp/search/index.html'),
  soundborb: read('chirp/soundborb/index.html'),
  diet: read('chirp/diet/index.html')
};
const conure = read('the-first-day/index.html');
const corella = read('little-corella-at-the-local-nursery/index.html');
const blog = read('blog/index.html');
const root = read('index.html');
const channels = read('channels/index.html');
const birdCss = read('assets/css/bird-theme.css');
const birdLayout = read('assets/css/channel-chirp.css');
const randomPosts = JSON.parse(read('assets/data/chirp-random.json'));

for (const [name, html] of Object.entries(pages)) {
  assert.match(html, /<html[^>]*data-chirp-landing="true"/, name + ' must activate Bird');
  assert.match(html, /class="sidebar-mode-bird"/);
  assert.match(html, /class="nav-mode-bird"/);
  assert.match(html, /class="bird-tagline">Welcome to the Nest<\/span>/);
  assert.doesNotMatch(html, /\/chirp\/archive\//);
  assert.doesNotMatch(html, /<nav class="nest-subnav"/);
}
assert.match(root, /<html[^>]*data-chirp-unrelated="true"/, 'Bird stored preference must not show McRetro homepage on charcoal');
assert.match(blog, /data-chirp-unrelated="true"/);
assert.match(corella, /data-chirp-unrelated="true"/);
assert.doesNotMatch(corella, /data-chirp-article="true"/);
assert.match(conure, /data-chirp-article="true"/);
assert.match(conure, /post-navigation--bird/);
assert.match(conure, /post-navigation--mcretro/);

for (const [slug, label] of [
  ['adventures', 'Adventures'], ['flock', 'Our Flock'],
  ['timeline', 'Timeline'], ['soundborb', 'Soundborb']
]) {
  assert.match(pages.nest, new RegExp('href="/chirp/' + slug + '/"'), slug + ' is an independent Bird page');
}
assert.match(pages.nest, /class="chirp-home-panel"/);
assert.doesNotMatch(pages.nest, /class="nest-post-card"/);
assert.match(pages.nest, /Welcome to the Nest/);
assert.match(pages.flock, /id="pudge"/);
assert.match(pages.flock, /id="tillie"/);
assert.match(pages.flock, /id="chip"/);
assert.match(pages.search, /id="nest-search-input"/);
assert.match(pages.soundborb, /Migration in progress/);
assert.doesNotMatch(pages.soundborb, /data-manifest|data-audio-root/);
assert.match(pages.diet, /Our Diet/);

const list = pages.adventures.split('<main class="content-area">')[1]?.split('</main>')[0];
assert.ok(list);
const cards = [...list.matchAll(/class="nest-post-card" data-nest-post/g)].length;
assert.ok(cards > 0, 'released conure collection must not be empty');
assert.equal(randomPosts.length, cards, 'random catalogue matches published Adventures');
assert.equal(new Set(randomPosts.map(post => post.url)).size, cards, 'random catalogue URLs stay unique');
assert.match(list, /The First Day!/);
assert.doesNotMatch(list, /Little Corella at the Local Nursery|Bits, Brass, and Bugs/);
assert.doesNotMatch(pages.timeline, /Little Corella at the Local Nursery/);
assert.match(pages.timeline, /The First Day!/);
assert.doesNotMatch(pages.timeline, /<time[^>]*>\s*\d{1,2}\s+[A-Z]/, 'timeline dates need ordinal suffixes');
assert.match(pages.timeline, /\d{1,2}(?:st|nd|rd|th)\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)/);
for (const post of randomPosts) {
  assert.match(post.url, /^\/(?![\\/])[^?#]*\/$/);
  assert.ok(post.title && post.date_label);
  assert.ok(list.includes('href="' + post.url + '"'));
  assert.doesNotMatch(post.url, /little-corella-at-the-local-nursery/);
}
assert.equal((list.match(/<time datetime=/g) || []).length, cards);
assert.match(list, /chirp-month-\d{4}-\d{2}/);

const sidebar = pages.nest.split('<div class="sidebar-mode-bird">')[1]?.split('</aside>')[0];
assert.ok(sidebar, 'Bird sidebar exists');
assert.ok(sidebar.indexOf('🎲 Random Posts') < sidebar.indexOf('Find-a-Squawk'));
assert.ok(sidebar.indexOf('Find-a-Squawk') < sidebar.indexOf('>Archives<'));
assert.ok(sidebar.indexOf('>Archives<') < sidebar.indexOf('Cool Links'));
assert.match(sidebar, /Browse Channel Chirp Adventures/);
assert.match(sidebar, /data-chirp-random-posts/);
assert.match(sidebar, /data-chirp-random-shuffle/);
assert.equal((sidebar.match(/<li>/g)||[]).length, 4);
for (const href of ['/chirp/search/', '/chirp/timeline/', '/chirp/soundborb/', '/chirp/diet/']) {
  assert.ok(sidebar.includes('href="' + href + '"'), href);
}
assert.match(sidebar, /data-chirp-archive-select/);
assert.match(sidebar, /chirp-month-\d{4}-\d{2}/);
assert.ok(exists('assets/js/channel-chirp-archive.js'));
assert.ok(exists('assets/js/channel-chirp-filter.js'));
assert.ok(exists('assets/js/channel-chirp-random.js'));

const mcretroSidebar = pages.nest.split('<div class="sidebar-mode-mcretro">')[1]?.split('<div class="sidebar-mode-bird">')[0];
assert.match(mcretroSidebar, /Recent Posts/);
assert.doesNotMatch(mcretroSidebar, /🎲 Random Posts/);
assert.match(pages.nest, /class="nav-mode-mcretro/);
assert.match(pages.nest, /class="nav-mode-bird"/);
assert.match(birdCss, /:root\[data-theme="bird"\] \.sidebar-mode-mcretro[\s\S]*display: none !important/);
assert.match(birdCss, /:root:not\(\[data-theme="bird"\]\) \.sidebar-mode-bird[\s\S]*display: none !important/);
assert.match(birdLayout, /font-family: 'Korataki'/);
assert.match(birdLayout, /border-left: 6px solid #0C4308/);
assert.match(birdLayout, /\.nest-post-card time::after/);
assert.match(birdLayout, /\.post-full \.post-meta::after/);
assert.match(channels, /Visit The Nest: Channel Chirp adventures on McRetro/);
assert.ok(!exists('chirp/archive/index.html'), 'unreleased historical archive must not be generated');
console.log('PASS: Bird owns seven routes, contains ' + cards + ' released articles, ordinal dates, filtered archives and scoped styling.');
