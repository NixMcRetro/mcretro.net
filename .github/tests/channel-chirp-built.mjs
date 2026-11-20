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

assert.match(pages.nest, /Welcome to our homepage! We are the most adorable <strong>green-cheeked conures<\/strong> in Australia!/);
assert.match(pages.nest, /href="\/chirp\/adventures\/">our adventures<\/a>/);
assert.match(pages.nest, /href="\/chirp\/adventures\/" data-chirp-random-link(?:="")?>random post<\/a>/);
assert.match(pages.nest, /href="https:\/\/www\.youtube\.com\/playlist\?list=PLJAZP-TLMPj50jY6ytY53J3bQkgPIbeYP">YouTube Channel<\/a>/);
assert.match(pages.nest, /We are Pudge, Tillie, and Chip!/);
assert.match(pages.nest, /❤️ 🦜 ❤️ 🦜 ❤️ 🦜 ❤️/);
assert.doesNotMatch(pages.nest, /class="chirp-home-links"/);


assert.match(pages.nest, /<figure class="chirp-home-figure">/);
assert.match(pages.nest, /src="\/assets\/images\/2019\/01\/channel-chirp-nest\/frontpage\.jxl"/);
assert.match(pages.nest, /width="1024"\s+height="768"/);
assert.match(pages.nest, /Chirp, chirp, <strong>quack!<\/strong>/);
assert.ok(pages.nest.indexOf('<h1 id="chirp-welcome">') <
  pages.nest.indexOf('<figure class="chirp-home-figure">'));
assert.ok(pages.nest.indexOf('<figure class="chirp-home-figure">') <
  pages.nest.indexOf('class="chirp-home-copy"'));
assert.doesNotMatch(pages.nest, /A note about Soundborb|Our soundboard has a new home planned|chirp-home-secondary/);
const frontpageJxl = fs.readFileSync(path.join(site,
  'assets/images/2019/01/channel-chirp-nest/frontpage.jxl'));
assert.ok(frontpageJxl.length > 10000 && frontpageJxl.length < 150000,
  'the original welcome photo should be self-hosted, optimized and nonempty');
assert.equal(frontpageJxl.subarray(0, 12).toString('hex'),
  '0000000c4a584c200d0a870a', 'photo should be a JPEG XL container, not a renamed JPEG');
assert.match(birdLayout, /\.chirp-home-figure img\s*\{[^}]*width: 100%;[^}]*height: auto;/);

assert.match(pages.flock, /id="pudge"/);
assert.match(pages.flock, /id="tillie"/);
assert.match(pages.flock, /id="chip"/);
assert.match(pages.search, /id="nest-search-input"/);
assert.match(pages.soundborb, /Migration in progress/);
assert.doesNotMatch(pages.soundborb, /data-manifest|data-audio-root/);
assert.match(pages.diet, /Our Diet/);

// Adventures now uses McRetro's five-entry blog roll, not archive cards.
const rollPages = Array.from({length: Math.ceil(randomPosts.length / 5)}, (_, i) => {
  const page = i === 0
    ? pages.adventures
    : read('chirp/adventures/page' + (i + 1) + '/index.html');
  assert.match(page, /class="blog-list chirp-blog-list"/);
  assert.match(page, /data-chirp-landing="true"/);
  assert.doesNotMatch(page, /class="nest-post-card"|class="nest-year-title"|nest-search-input/);
  return page;
});
const pageEntries = rollPages.map(html => html.split('<main class="content-area">')[1]?.split('</main>')[0]);
assert.ok(pageEntries.every(Boolean), 'every Bird Adventures page must have a main area');
const list = pageEntries.join('\n');
const entries = [...list.matchAll(/<article class="post-entry"/g)].length;
assert.ok(entries > 0, 'released conure blog roll must not be empty');
assert.equal(randomPosts.length, entries, 'all released conures appear once across pages');
assert.equal(new Set(randomPosts.map(post => post.url)).size, entries,
  'random catalogue URLs stay unique');
for (const [index, html] of pageEntries.entries()) {
  const perPage = (html.match(/<article class="post-entry"/g) || []).length;
  assert.equal(perPage, Math.min(5, randomPosts.length - index * 5),
    'Bird Adventures uses the same five posts per page as McRetro');
  assert.match(html, /post-meta-row/);
  assert.match(html, /post-content-preview/);
  assert.match(html, /post-excerpt/);
  assert.match(html, /class="post-title"/);
  assert.match(html, /chirp-roll-heading-date/);
  assert.match(html, /chirp-roll-heading-line/);
  assert.match(html, /Continue reading/);
}
assert.match(list, /The First Day!/);
assert.doesNotMatch(list, /Little Corella at the Local Nursery|Bits, Brass, and Bugs/);
assert.doesNotMatch(pages.timeline, /Little Corella at the Local Nursery/);
assert.match(pages.timeline, /The First Day!/);
assert.doesNotMatch(pages.timeline, /<time[^>]*>\s*\d{1,2}\s+[A-Z]/,
  'timeline dates need ordinal suffixes');
assert.match(pages.timeline,
  /\d{1,2}(?:st|nd|rd|th)\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)/);
for (const post of randomPosts) {
  assert.match(post.url, /^\/(?![\\/])[^?#]*\/$/);
  assert.ok(post.title && post.date_label);
  assert.ok(list.includes('href="' + post.url + '"'),
    'Adventures lists released article ' + post.url);
  assert.doesNotMatch(post.url, /little-corella-at-the-local-nursery/);
}
assert.equal((list.match(/class="chirp-roll-heading-date"/g) || []).length, entries);
assert.match(list, /id="chirp-month-\d{4}-\d{2}"/);
assert.match(rollPages[0], /aria-label="Channel Chirp Adventures pagination"/);
assert.match(rollPages[0], /href="\/chirp\/adventures\/page2\/"/);
assert.match(rollPages.at(-1), /href="\/chirp\/adventures\/page\d+\/"|rel="prev"/);

const sidebar = pages.nest.split('<div class="sidebar-mode-bird">')[1]?.split('</aside>')[0];
assert.ok(sidebar, 'Bird sidebar exists');
const searchPos = sidebar.indexOf('placeholder="Find a Squawk"');
const calendarPos = sidebar.indexOf('data-chirp-calendar');
const randomPos = sidebar.indexOf('>Random Posts<');
const coolPos = sidebar.indexOf('Cool Links');
assert.ok(searchPos >= 0 && searchPos < calendarPos, 'Bird search is first');
assert.ok(calendarPos < randomPos, 'Bird archive calendar precedes Random Posts');
assert.ok(randomPos < coolPos, 'Cool Links remain below Random Posts');
assert.match(sidebar, /action="\/chirp\/search\/" method="get"/);
assert.match(sidebar, /id="bird-sidebar-search" type="text" name="q"/);
assert.match(sidebar, /class="archive-calendar" data-chirp-calendar/);
assert.match(sidebar, /data-chirp-older/);
assert.match(sidebar, /data-chirp-newer/);
assert.match(sidebar, /data-chirp-months/);
const calendarYears = [...sidebar.matchAll(/<option value="(\d{4})" data-counts=/g)].map(match => match[1]);
assert.deepEqual(calendarYears, ['2019', '2018'], 'Bird calendar only displays 2018/2019');
assert.match(sidebar, /href="\/chirp\/adventures\/(?:page\d+\/)?#chirp-month-2019-\d{2}"/);
assert.doesNotMatch(sidebar, /href="\/archive\/\d{4}\//);
assert.match(sidebar, /Browse all archives/);
assert.match(sidebar, /data-chirp-random-posts/);
assert.match(sidebar, /data-chirp-random-shuffle/);
assert.equal((sidebar.match(/<li>/g)||[]).length, 4, 'exactly four released Bird fallback posts');
assert.match(sidebar, /class="recent-posts-more sidebar-action-link" href="\/chirp\/adventures\/"/);
assert.match(sidebar, /<span class="sidebar-action-link__icon" aria-hidden="true">📚<\/span>/);
assert.match(sidebar, /<span class="sidebar-action-link__label">More posts<\/span>/);
assert.match(sidebar, /class="recent-posts-dial sidebar-action-link" type="button" data-chirp-random-shuffle disabled/);
assert.match(sidebar, /<span class="sidebar-action-link__icon" aria-hidden="true">🎲<\/span>/);
assert.match(sidebar, /<span class="sidebar-action-link__label">Random!<\/span>/);
assert.doesNotMatch(sidebar, /🎲 Random Posts|☎️|Dial-up|Shuffle again|Browse Adventures/);
for (const href of ['/chirp/timeline/', '/chirp/soundborb/', '/chirp/diet/']) {
  assert.ok(sidebar.includes('href="' + href + '"'), href);
}
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
// The Bird nav is pale green with thin horizontal rules in the sidebar accent green.
const navStyles = [...birdLayout.matchAll(/:root\[data-theme="bird"\] \.main-nav \{([^}]+)\}/g)]
  .map(match => match[1]);
assert.ok(navStyles.some(block =>
  /background: #E7F5E4;/.test(block) &&
  /border-top: 1px solid #29A518;/.test(block) &&
  /border-bottom: 1px solid #29A518;/.test(block) &&
  !/border-left: 6px|border-right: 6px/.test(block)),
  'Bird desktop menu must have pale green background and 1px sidebar-green top/bottom borders');
assert.match(birdLayout, /\.main-nav a:visited[\s\S]*?color: #17451D;/);
assert.match(birdLayout, /\.main-nav \.nav-list \{\s*background: #E7F5E4;\s*border-bottom: 1px solid #29A518;/);
assert.doesNotMatch(birdLayout, /border-left: 6px solid #0C4308/);

assert.match(birdLayout, /\.nest-post-card time::after/);
assert.match(birdLayout, /\.post-full \.post-meta::after/);
assert.match(channels, /Visit The Nest: Channel Chirp adventures on McRetro/);
assert.ok(!exists('chirp/archive/index.html'), 'unreleased historical archive must not be generated');
console.log('PASS: Bird blog roll spans ' + rollPages.length + ' pages with ' + entries + ' released articles, ordinal dates, filtered archives and scoped styling.');
