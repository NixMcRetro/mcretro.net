// Tests run only against the generated preview _site; they never publish.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const site = process.argv[2] || '_site';
const read = rel => fs.readFileSync(path.join(site, rel), 'utf8');
const exists = rel => fs.existsSync(path.join(site, rel));
const nest = read('chirp/index.html');
const timeline = read('chirp/timeline/index.html');
const conure = read('the-first-day/index.html');
const corella = read('little-corella-at-the-local-nursery/index.html');
const blog = read('blog/index.html');
const channels = read('channels/index.html');
const birdCss = read('assets/css/bird-theme.css');
const birdLayout = read('assets/css/channel-chirp.css');

assert.ok(exists('assets/js/channel-chirp-filter.js'));
assert.match(nest, /<html[^>]*data-chirp-landing="true"/);
assert.match(nest, /<body[^>]*class="channel-chirp-page"/);
assert.match(nest, /<nav class="nest-subnav"/);
assert.match(nest, /href="\/chirp\/#nest-adventures"/);
assert.match(nest, /id="nest-flock"/);
assert.match(nest, /id="nest-soundborb"/);
assert.match(nest, /id="nest-search-input"/);
assert.match(nest, /assets\/js\/channel-chirp-filter\.js/);
assert.match(nest, /The First Day!/);
const nestMain = nest.split('<main class="content-area">')[1]?.split('</main>')[0];
assert.ok(nestMain, 'Nest article cards must be inside main content');
assert.doesNotMatch(nestMain, /Little Corella at the Local Nursery/);
assert.doesNotMatch(nestMain, /Bits, Brass, and Bugs/);
assert.doesNotMatch(nest, /229 Original Posts|229 original adventures|509 individual recordings/);
assert.doesNotMatch(nest, /\/chirp\/archive\//);

assert.match(timeline, /The Flock Timeline/);
assert.match(timeline, /The First Day!/);
assert.doesNotMatch(timeline, /Little Corella at the Local Nursery/);
assert.doesNotMatch(timeline, /229 Original Posts/);

const cards = [...nest.matchAll(/class="nest-post-card" data-nest-post/g)].length;
assert.equal(cards, 54, 'Only 54 already-released conure posts should appear for now');
assert.ok(nest.includes(cards + ' adventures'));
assert.match(channels, /Visit The Nest: Channel Chirp adventures on McRetro/);

for (const doc of [nest, conure, corella, blog]) {
  assert.match(doc, /class="sidebar-mode-mcretro"/);
  assert.match(doc, /class="sidebar-mode-bird"/);
  assert.match(doc, /class="nav-mode-bird"/);
  assert.match(doc, /class="nav-mode-mcretro/);
}
assert.match(blog, /data-chirp-unrelated="true"/);
assert.match(corella, /data-chirp-unrelated="true"/);
assert.doesNotMatch(corella, /data-chirp-article="true"/);
assert.match(conure, /data-chirp-article="true"/);
assert.match(conure, /post-navigation--bird/);
assert.match(conure, /post-navigation--mcretro/);
assert.match(conure, /OLDER CONURE ADVENTURE|NEWER CONURE ADVENTURE/);

const recent = nest.match(/<h4 class="widgettitle" id="nest-sidebar-recent">[\s\S]*?<\/section>/);
assert.ok(recent, 'Bird sidebar must show recent flock articles');
assert.equal((recent[0].match(/<li>/g) || []).length, 4, 'Bird sidebar must list exactly 4 newest conure articles');
assert.doesNotMatch(recent[0], /Little Corella at the Local Nursery/);
assert.match(recent[0], /More Channel Chirp posts \(54\)/);
assert.match(birdCss, /:root\[data-theme="bird"\] \.sidebar-mode-mcretro[\s\S]*display: none !important/);
assert.match(birdCss, /:root:not\(\[data-theme="bird"\]\) \.sidebar-mode-bird[\s\S]*display: none !important/);
assert.match(birdCss, /\.nav-mode-bird/);
assert.match(birdLayout, /post-navigation--bird/);
assert.match(birdLayout, /post-navigation--mcretro/);
assert.ok(!exists('chirp/archive/index.html'), 'No unpublished historical articles should be generated');

console.log('PASS: Bird filter shows ' + cards + ' released conure posts, bird-only sidebar, and theme-specific navigation.');
