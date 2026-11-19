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
const randomPosts = JSON.parse(read('assets/data/chirp-random.json'));
const shuffleScript = read('assets/js/channel-chirp-random.js');

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

const random = nest.match(/<h4 class="widgettitle" id="nest-sidebar-random">[\s\S]*?<\/section>/);
assert.ok(random, 'Bird sidebar must have a Random Posts widget');
assert.match(random[0], /🎲 Random Posts/);
assert.equal((random[0].match(/<li>/g) || []).length, 4, 'Fallback should have four bird links');
assert.match(random[0], /data-chirp-random-posts/);
assert.match(random[0], /data-chirp-random-shuffle/);
assert.doesNotMatch(random[0], /Little Corella at the Local Nursery/);
assert.match(random[0], /Browse all 54 Channel Chirp posts/);
assert.equal(randomPosts.length, 54, 'Only released conure articles may be shuffled');
assert.equal(new Set(randomPosts.map(post => post.url)).size, 54, 'No duplicate random URLs');
for (const post of randomPosts) {
  assert.ok(/^\/(?![\\/])[^?#]*\/$/.test(post.url), 'Random URL must be local: ' + post.url);
  assert.ok(post.title && post.date_label);
  assert.ok(nestMain.includes('href="' + post.url + '"'),
    'Every random link must belong to the published Nest feed: ' + post.url);
}
assert.ok(randomPosts.every(post => !/little-corella-at-the-local-nursery/.test(post.url)));
assert.match(shuffleScript, /MutationObserver/);
assert.match(shuffleScript, /Math\.random/);
assert.match(nest, /assets\/js\/channel-chirp-random\.js/);
const normalSidebar = nest.match(/<div class="sidebar-mode-mcretro">[\s\S]*?<div class="sidebar-mode-bird">/);
assert.ok(normalSidebar, 'McRetro sidebar is still present for Light/Dark');
assert.match(normalSidebar[0], /Recent Posts/);
assert.doesNotMatch(normalSidebar[0], /🎲 Random Posts/);
assert.match(birdCss, /:root\[data-theme="bird"\] \.sidebar-mode-mcretro[\s\S]*display: none !important/);
assert.match(birdCss, /:root:not\(\[data-theme="bird"\]\) \.sidebar-mode-bird[\s\S]*display: none !important/);
assert.match(birdCss, /\.nav-mode-bird/);
assert.match(birdLayout, /post-navigation--bird/);
assert.match(birdLayout, /post-navigation--mcretro/);
assert.ok(!exists('chirp/archive/index.html'), 'No unpublished historical articles should be generated');

console.log('PASS: Bird filter shows ' + cards + ' released conure posts, four random-only sidebar entries, and theme-specific navigation.');
