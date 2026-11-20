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
  archive: read('chirp/archive/index.html'),
  random: read('chirp/random/index.html'),
  about: read('chirp/about/index.html'),
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
  assert.ok(html.includes('class="bird-tagline">🪺 Welcome to the Nest!</span>'));
  assert.equal([...html.matchAll(/class="bird-tagline">/g)].length, 9,
    name + " must contain exactly nine Bird taglines");
  assert.doesNotMatch(html, /<nav class="nest-subnav"/);
}
assert.match(root, /<html[^>]*data-chirp-unrelated="true"/, 'Bird stored preference must not show McRetro homepage on charcoal');
assert.match(blog, /data-chirp-unrelated="true"/);
assert.match(corella, /data-chirp-unrelated="true"/);
assert.doesNotMatch(corella, /data-chirp-article="true"/);
assert.match(conure, /data-chirp-article="true"/);
assert.match(conure, /post-navigation--bird/);
assert.match(conure, /post-navigation--mcretro/);

// Original Channel Chirp article hierarchy: tighter title/date/rule group.
// These overrides must target Bird articles only, not the McRetro post layout.
function birdArticleRule(suffix) {
  const selector = ':root[data-theme="bird"][data-chirp-article="true"] .post-full' +
    (suffix ? ' ' + suffix : '') + ' {';
  const pos = birdLayout.indexOf(selector);
  assert.ok(pos >= 0, 'missing Bird article selector: ' + suffix);
  return birdLayout.slice(pos + selector.length, birdLayout.indexOf('}', pos));
}
const articleStyle = birdArticleRule('');
assert.match(articleStyle, /padding-top:\s*1rem;/,
  'the Bird post title should sit closer to the top of the white card');
const headingStyle = birdArticleRule('.post-title');
assert.match(headingStyle, /font-weight:\s*500;/,
  'avoid heavier fallback bold weight when Montserrat has only regular and bold files');
assert.match(headingStyle, /margin-bottom:\s*\.2rem;/);
assert.match(headingStyle, /line-height:\s*1\.25;/);
const metadataStyle = birdArticleRule('.post-meta');
assert.match(metadataStyle, /margin:\s*0 0 1\.5rem;/);
const dateStyle = birdArticleRule('.post-date');
assert.match(dateStyle, /color:\s*#626262;/);
assert.match(dateStyle, /font-size:\s*1rem;/,
  'article date should be clearly legible like the original Channel Chirp');
const headingRuleStyle = birdArticleRule('.post-meta::after');
assert.match(headingRuleStyle, /background:\s*#29A518;/);
assert.match(headingRuleStyle, /margin:\s*\.4rem auto 0;/);
assert.match(conure, /class="post-title" data-pagefind-title/,
  'released Bird articles keep their real title element');



const preening = read('preening-party/index.html');
assert.match(preening, /class="post-navigation post-navigation--bird nest-post-navigation"/,
  'bird posts retain independent conure chronology');
assert.match(preening, /<span class="nav-label">OLDER ADVENTURE<\/span>/,
  'Bird previous-post label is shortened');
assert.match(preening, /<span class="nav-label">NEWER ADVENTURE<\/span>/,
  'Bird next-post label is shortened');
assert.doesNotMatch(preening, /OLDER CONURE ADVENTURE|NEWER CONURE ADVENTURE/);
assert.match(preening, /<span class="nav-label">PREVIOUS<\/span>/,
  'standard McRetro post navigation remains intact');


for (const [slug, label] of [
  ['adventures', 'Adventures'], ['about', 'About'],
  ['soundborb', 'Soundborb']
]) {
  assert.match(pages.nest, new RegExp('href="/chirp/' + slug + '/"'), slug + ' is an independent Bird page');
}

// Exactly five Bird links appear in this order, with the text-only Korataki title.
const birdNavigation = [...pages.nest.matchAll(/<a class="nav-mode-bird"[^>]*>([\s\S]*?)<\/a>/g)];
assert.deepEqual(birdNavigation.map(item => item[1].match(/class="nav-text">([^<]+)</)?.[1]),
  ['Home', 'Adventures', 'Soundborb', 'Random', 'About']);
assert.match(pages.nest, /class="bird-brand-name">Channel Chirp<\/span>/);
assert.doesNotMatch(pages.nest, /bird-brand-mark/);
assert.match(pages.nest, /href="\/chirp\/random\/" data-chirp-random-link(?:="")?/);
// Correct About destination is checked against the rendered nav, independent of active state.
assert.match(birdNavigation[4][0], /href="\/chirp\/about\/"/);
assert.match(birdNavigation[3][0], /href="\/chirp\/random\/" data-chirp-random-link/);
assert.match(birdNavigation[2][0], /href="\/chirp\/soundborb\/"/);
assert.doesNotMatch(birdNavigation.map(item => item[0]).join(' '), /href="\/chirp\/timeline\/"/);


// Bird Random has an addressable native destination, including on new-tab clicks.
assert.match(pages.random, /data-chirp-random-destination/);
assert.match(pages.random, /href="\/chirp\/adventures\/">browse Adventures<\/a>/);
assert.doesNotMatch(pages.random, /data-chirp-unrelated="true"/);
assert.match(pages.adventures,
  /class="nav-mode-bird active" href="\/chirp\/adventures\/"[^>]*aria-current="page"/,
  'Adventures is bold on the blog roll');
assert.match(conure,
  /class="nav-mode-bird active" href="\/chirp\/adventures\/"/,
  'Adventures is bold on released bird articles');
assert.doesNotMatch(corella,
  /class="nav-mode-bird active" href="\/chirp\/adventures\/"/,
  'regular McRetro articles do not gain Bird Adventures active styling');
assert.doesNotMatch(pages.nest,
  /class="nav-mode-bird active" href="\/chirp\/adventures\/"/);
assert.match(birdLayout, /a\.nav-mode-bird\.active\s*\{\s*font-weight:\s*700;/);

const birdPagination = birdLayout.match(
  /:root\[data-theme="bird"\] \.chirp-blog-list \+ \.pagination-wrapper \{([^}]+)\}/);
assert.ok(birdPagination, 'Bird pagination has its own scoped layout');
assert.match(birdPagination[1], /border-top:\s*3px solid #29A518;/);
assert.match(birdPagination[1], /padding:\s*0 \.8rem \.4rem;/,
  'pagination highlights must touch the green rule with no top gap');
assert.match(birdLayout, /\.chirp-blog-list \+ \.pagination-wrapper \.pagination-bar \{\s*border:\s*0;/,
  'avoid a second rule between the green border and tiles');


assert.match(pages.timeline, /Flock Timeline|Timeline/, 'Timeline remains available at its own URL');
assert.match(pages.nest, /class="chirp-home-panel"/);
assert.doesNotMatch(pages.nest, /class="nest-post-card"/);
assert.match(pages.nest, /Welcome to the Nest/);

assert.match(pages.nest, /Welcome to our homepage! We are the most adorable <strong>green-cheeked conures<\/strong> in Australia!/);
assert.match(pages.nest, /href="\/chirp\/adventures\/">our adventures<\/a>/);
assert.match(pages.nest, /href="\/chirp\/random\/" data-chirp-random-link(?:="")?>random post<\/a>/);
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

assert.match(pages.about, /id="pudge"/);
assert.match(pages.about, /id="tillie"/);
assert.match(pages.about, /id="chip"/);
assert.match(pages.about, /<h1 id="chirp-about-heading">About Channel Chirp<\/h1>/);
assert.match(pages.about, /href="\/chirp\/diet\/">Our Diet<\/a>/);
assert.ok(!exists('chirp/flock/index.html'), 'former /chirp/flock/ must not exist or redirect');
assert.doesNotMatch(pages.about, /redirect_from:|http-equiv="refresh"/i,
  'About is a native route, not a redirect');
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
assert.equal(coolPos, -1, 'Cool Links section is removed from the Bird sidebar');
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
assert.match(sidebar, /class="archive-all-link sidebar-action-link" href="\\/chirp\\/archive\\/"/);
assert.match(sidebar, /Browse all archives/);
assert.match(sidebar, /data-chirp-random-posts/);
assert.match(sidebar, /data-chirp-random-shuffle/);
const randomList = sidebar.match(/<ul class="recent-posts-list" data-chirp-random-posts[^>]*>[\s\S]*?<\/ul>/)?.[0];
assert.ok(randomList, 'server-rendered Bird fallback list exists');
const fallbackUrls = [...randomList.matchAll(/<a href="([^"]+)"/g)].map(match => match[1]);
const publishedDates = new Map(randomPosts.map(post => [post.url, post.date]));
assert.ok(fallbackUrls.every(url => publishedDates.has(url)), 'fallback links must be published Bird articles');
const fallbackDates = fallbackUrls.map(url => publishedDates.get(url));
assert.deepEqual(fallbackDates, fallbackDates.slice().sort().reverse(),
  'fallback Bird Random Posts should also be newest-first');
assert.equal((sidebar.match(/<li>/g)||[]).length, 4, 'exactly four released Bird fallback posts');
assert.match(sidebar, /class="recent-posts-more sidebar-action-link" href="\/chirp\/adventures\/"/);
assert.match(sidebar, /<span class="sidebar-action-link__icon" aria-hidden="true">📚<\/span>/);
assert.match(sidebar, /<span class="sidebar-action-link__label">More posts<\/span>/);
assert.match(sidebar, /class="recent-posts-dial sidebar-action-link" type="button" data-chirp-random-shuffle disabled/);
assert.match(sidebar, /<span class="sidebar-action-link__icon" aria-hidden="true">🎲<\/span>/);
assert.match(sidebar, /<span class="sidebar-action-link__label">Random!<\/span>/);
assert.doesNotMatch(sidebar, /🎲 Random Posts|☎️|Dial-up|Shuffle again|Browse Adventures/);
assert.doesNotMatch(sidebar, /Cool Links|nest-cool-links|Our Soundboard|Our Diet|data-chirp-random-link/,
  'the sidebar contains no former Cool Links destinations');

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
// Bird navigation uses the charcoal page background and white labels, with
// the existing thin green horizontal rules. Light/Dark remain untouched.
assert.match(birdCss, /--page-bg:\s*#424242;/);
const navStyles = [...birdLayout.matchAll(/:root\[data-theme="bird"\] \.main-nav \{([^}]+)\}/g)]
  .map(match => match[1]);
assert.ok(navStyles.some(block =>
  /background: var\(--page-bg\);/.test(block) &&
  /border-top: 1px solid #29A518;/.test(block) &&
  /border-bottom: 1px solid #29A518;/.test(block) &&
  !/border-left: 6px|border-right: 6px/.test(block)),
  'Bird desktop menu should match charcoal background and retain thin green rules');
assert.match(birdLayout, /\.main-nav a\.active \{\s*color: #FFFFFF;/);
assert.match(birdLayout, /\.main-nav a:hover,[\s\S]*?\.main-nav a:focus-visible \{\s*color: #FFFFFF;/);
assert.match(birdLayout, /\.main-nav \.nav-list \{\s*background: var\(--page-bg\);\s*border-bottom: 1px solid #29A518;/);
assert.match(birdLayout, /\.main-nav \.nav-list li a:visited \{\s*color: #FFFFFF;/);
assert.match(birdLayout, /\.main-nav \.nav-list li a\.nav-mode-bird\.active \{\s*color: #FFFFFF;/);
assert.doesNotMatch(birdLayout, /border-left: 6px solid #0C4308/);
assert.ok(pages.nest.includes('<p class="chirp-return"><a href="/" data-theme-exit="light">↩ Return to McRetro.net</a></p>'));
// Filled Bird menu hover is intentionally limited to mobile widths.
const desktopBirdHover = birdLayout.slice(
  birdLayout.indexOf(':root[data-theme="bird"] .main-nav a:hover,'),
  birdLayout.indexOf('/* Post previews use the original Channel Chirp rhythm')
);
assert.ok(desktopBirdHover.includes('text-decoration: underline;'));
assert.ok(!desktopBirdHover.includes('background: #C8E5BD;'));
const mobileBirdHover = birdLayout.slice(
  birdLayout.indexOf('@media screen and (max-width: 750px) {'),
  birdLayout.indexOf('/* Existing post metadata is a flex row.')
);
assert.ok(mobileBirdHover.includes('.nav-list li a.nav-mode-bird:hover,'));
assert.ok(mobileBirdHover.includes('background: #C8E5BD;'));
const birdPostsHover = birdLayout.indexOf(':root[data-theme="bird"] .sidebar-mode-bird .recent-posts-list li a:hover,');
assert.ok(birdPostsHover >= 0);
const birdPostsRule = birdLayout.slice(birdPostsHover, birdLayout.indexOf('}', birdPostsHover));
assert.ok(birdPostsRule.includes('text-decoration: underline;'));
assert.ok(!birdPostsRule.includes('background:'));

assert.match(birdLayout, /\.nest-post-card time::after/);
assert.match(birdLayout, /\.post-full \.post-meta::after/);
assert.match(channels, /Visit The Nest: Channel Chirp adventures on McRetro/);

// Bird archives reuse the McRetro disclosure and month tiles, but count only
// released Channel Chirp adventures and link into the existing paginated roll.
const birdArchive = pages.archive;
assert.match(birdArchive, /class="archive-index chirp-archive-index"/);
assert.match(birdArchive, /href="\\/chirp\\/">Home<\\/a>/);
assert.match(birdArchive, /id="year-\\d{4}" class="archive-index-year about-panel panel--teal"/);
assert.match(birdArchive, /assets\\/js\\/archive-year-deeplink\\.js/);
assert.doesNotMatch(birdArchive, /href="\\/archive\\/\\d{4}\\//);
assert.doesNotMatch(birdArchive, /little-corella-at-the-local-nursery/i);
assert.match(birdLayout, /:root\\[data-theme="bird"\\] \\.chirp-archive-index \\{[^}]*background: #FFFFFF;/);
const birdByMonth = new Map();
const chronologicalBirds = [...randomPosts].sort((a, b) =>
  b.date.localeCompare(a.date) || b.url.localeCompare(a.url));
const firstBirdPageByMonth = new Map();
for (const [index, post] of chronologicalBirds.entries()) {
  const month = post.date.slice(0, 7);
  birdByMonth.set(month, (birdByMonth.get(month) || 0) + 1);
  if (!firstBirdPageByMonth.has(month)) {
    firstBirdPageByMonth.set(month, Math.floor(index / 5) + 1);
  }
}
const availableYears = [...new Set([...birdByMonth.keys()].map(month => month.slice(0, 4)))].sort().reverse();
const archiveYearPanels = [...birdArchive.matchAll(/<details id="year-(\\d{4})" class="archive-index-year about-panel panel--teal">/g)]
  .map(match => match[1]);
assert.deepEqual(archiveYearPanels, availableYears, 'Bird archive year sections contain released years only');
const allMonthTiles = [...birdArchive.matchAll(/data-archive-month="(\\d{4}-\\d{2})" data-article-count="(\\d+)"/g)];
assert.equal(allMonthTiles.length, availableYears.length * 12, 'all 12 month tiles exist for each Bird year');
const filledMonthTiles = [...birdArchive.matchAll(/<a class="archive-index-month has-posts" data-archive-month="(\\d{4}-\\d{2})" data-article-count="(\\d+)" href="([^"]+)"/g)];
assert.equal(filledMonthTiles.length, birdByMonth.size, 'only published months link to Adventures');
assert.equal(filledMonthTiles.reduce((sum, match) => sum + Number(match[2]), 0), randomPosts.length,
  'every released adventure is counted exactly once in the archive');
for (const [, month, count, href] of filledMonthTiles) {
  assert.equal(Number(count), birdByMonth.get(month), 'released-article count for ' + month);
  const page = firstBirdPageByMonth.get(month);
  const expected = '/chirp/adventures/' + (page > 1 ? 'page' + page + '/' : '') + '#chirp-month-' + month;
  assert.equal(href, expected, 'archive month tile must reach the correct Adventures page for ' + month);
  const targetPage = page === 1 ? pages.adventures : rollPages[page - 1];
  assert.ok(targetPage.includes('id="chirp-month-' + month + '"'), 'archive anchor exists on ' + expected);
}
for (const [year, count] of availableYears.map(y => [y, chronologicalBirds.filter(post => post.date.startsWith(y)).length])) {
  assert.match(birdArchive, new RegExp('class="archive-index-year-count">' + count + ' articles?<\\/span>'),
    'archive should show released-only total for ' + year);
}
assert.ok(exists('chirp/archive/index.html'), 'new released-only Bird archive page must be generated');
assert.deepEqual(fs.readdirSync(path.join(site, 'chirp/archive')).sort(), ['index.html'],
  'the release archive publishes exactly one index, never the legacy post snapshot');
console.log('PASS: Bird blog roll spans ' + rollPages.length + ' pages with ' + entries + ' released articles, ordinal dates, filtered archives and scoped styling.');
