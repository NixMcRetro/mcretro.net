#!/usr/bin/env node
/* Prevent Markdown being served as plain text on GeoCities pages.
   The public artwork/directory stay on McRetro; the archive stays private. */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.argv[2] || '_site');
const base = 'homepages/geocities';
const pages = [
  ['neighborhoods/index.html', 'Visit the GeoCities Neighbourhoods'],
  ['news/index.html', 'News from the GeoCities Rebuild'],
  ['cool/index.html', 'Cool Pages'],
  ['artwork/index.html', 'Original GeoCities Artwork Gallery'],
  ...['2021-09-05', '2021-09-19', '2021-10-09', '2021-10-31', '2022-01-03']
    .map(date => ['news/' + date + '.html', 'GeoCities Rebuild News: ' + date])
];

const read = (relative) => {
  const file = path.join(root, base, relative);
  assert.ok(existsSync(file), 'Missing GeoCities page: ' + relative);
  return readFileSync(file, 'utf8');
};

for (const [relative, heading] of pages) {
  const html = read(relative);
  assert.match(html, new RegExp('<h1\\b[^>]*>\\s*' + heading + '\\s*<\\/h1>', 'i'),
    'Markdown heading was not rendered: ' + relative);
  assert.match(html, /<a\b[^>]+href=["']\/homepages\/geocities\//i,
    'Markdown navigation link was not rendered: ' + relative);
  assert.doesNotMatch(html, /\[[^\]\n]+\]\(\/homepages\/geocities\//,
    'Raw Markdown links remain: ' + relative);
  assert.doesNotMatch(html, /(?:^|>)[ \t]*# (?:Visit the GeoCities|News from the GeoCities|Cool Pages|GeoCities Rebuild News)/m,
    'Raw Markdown heading remains: ' + relative);
}

// The breadcrumb is a real Home > Goodies > GeoCities hierarchy, not a
// mixed back button and sibling-link bar. Dated news has an additional level.
const breadcrumbCases = [
  ['index.html', ['Home', 'Goodies', 'GeoCities Rebuild']],
  ['neighborhoods/index.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Neighbourhoods']],
  ['news/index.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Project News']],
  ['cool/index.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Cool Pages']],
  ['artwork/index.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Artwork Gallery']],
  ['news/2021-09-05.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Project News', '5th September 2021']],
  ['news/2021-09-19.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Project News', '19th September 2021']],
  ['news/2021-10-09.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Project News', '9th October 2021']],
  ['news/2021-10-31.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Project News', '31st October 2021']],
  ['news/2022-01-03.html', ['Home', 'Goodies', 'GeoCities Rebuild', 'Project News', '3rd January 2022']]
];
for (const [file, expected] of breadcrumbCases) {
  const html = read(file);
  const match = html.match(/<nav class="archive-breadcrumbs gc-breadcrumbs" aria-label="Breadcrumb">([\s\S]*?)<\/nav>/);
  assert.ok(match, 'Missing shared GeoCities breadcrumb: ' + file);
  const breadcrumb = match[1];
  const labels = [...breadcrumb.matchAll(/(?:<a\b[^>]*>|<span aria-current="page">)([^<]+)<\/(?:a|span)>/g)]
    .map(([, label]) => label.trim());
  assert.deepEqual(labels, expected, 'Incorrect GeoCities breadcrumb hierarchy: ' + file);
  assert.equal((breadcrumb.match(/aria-current="page"/g) || []).length, 1,
    'Exactly one current breadcrumb per page: ' + file);
  assert.match(breadcrumb, /<a href="\/goodies\/">Goodies<\/a>/,
    'Every GeoCities page links back through Goodies');
}
for (const section of ['neighborhoods', 'news', 'cool', 'artwork']) {
  const html = read(section + '/index.html');
  const nav = html.match(/<nav class="gc-section-nav" aria-label="Explore GeoCities">([\s\S]*?)<\/nav>/);
  assert.ok(nav, 'Missing separate sibling-section navigation on ' + section);
  assert.equal((nav[1].match(/<a\b/g) || []).length, 4,
    'All four sibling destinations remain accessible');
  assert.equal((nav[1].match(/aria-current="page"/g) || []).length, 1,
    'Sibling navigation identifies the active section');
}
for (const date of ['2021-09-05', '2021-09-19', '2021-10-09', '2021-10-31', '2022-01-03']) {
  assert.doesNotMatch(read('news/' + date + '.html'), /<nav class="gc-section-nav"/,
    'Dated historical news pages need a breadcrumb, not duplicate section menus');
}

// GeoCities editorial headings use Title Case, not sentence case.
const home = read('index.html');
for (const heading of ["Explore the Restored Frontend","Enter My GeoCities Archive","A Short History of the Rebuild","Read the Rebuild Story","A Little Piece of the Original Site"]) {
  assert.match(home, new RegExp('<h2\\b[^>]*>' + heading + '<\\/h2>'),
    'GeoCities project heading lost Title Case: ' + heading);
}
const newsHeadings = read('news/index.html');
for (const heading of ['Project Updates', 'Contemporary GeoCities Headlines']) {
  assert.match(newsHeadings, new RegExp('<h2\\b[^>]*>' + heading + '<\\/h2>'),
    'GeoCities news heading lost Title Case: ' + heading);
}

// Both original homepage GIFs must use the existing centred layout helper.
for (const filename of ['mai_mast.gif', 'welcome.gif']) {
  assert.match(home, new RegExp('<figure class="center">\\s*<img[^>]*' + filename.replace('.', '\\.') + '[^>]*>', 'i'),
    'GeoCities image is not centred: ' + filename);
}
assert.doesNotMatch(home, /<figure class="aligncenter">/,
  'Unsupported aligncenter class reintroduced');

// The three public destinations use local links and actual preserved GIFs.
assert.match(home, /<nav class="gc-home-nav"[^>]*>/);
for (const route of ['neighborhoods/', 'news/', 'cool/', 'artwork/']) {
  assert.match(home, new RegExp('<a class="gc-home-card" href="/homepages/geocities/' + route + '">'));
}
const styles = read('geocities.css');
assert.match(styles, /gc-home-nav/);
assert.match(styles, /\.gc-breadcrumbs \{ margin-bottom: \.55rem; \}/);
assert.match(styles, /\.content-area:has\(> \.gc-breadcrumbs\) > h2 \{/,
  'GeoCities uses a scoped, article-sized H2 heading');
assert.match(styles, /\.content-area:has\(> \.gc-breadcrumbs\) > :is\(h1, h2, h3\) \+ :is\(p, ul, ol\)/,
  'Headings and following body text should not have doubled margins');
assert.match(styles, /\.content-area:has\(> \.gc-breadcrumbs\) > \.gc-art/,
  'Historic banner spacing is compact only on GeoCities pages');

assert.match(styles, /\.gc-neighbourhood \{[^}]+var\(--panel\)[^}]+var\(--text\)/);
assert.match(styles, /gc-browser-tools\[hidden\]/);
assert.doesNotMatch(styles, /background:\s*#f1f1f1/i);

const directory = read('neighborhoods/index.html');
assert.match(directory, /<strong>all 41 neighbourhoods<\/strong>/i);
assert.match(directory, /<strong>298,559 Homesteaders<\/strong>/i);
assert.doesNotMatch(directory, /<nav class="gc-jump"/);
assert.doesNotMatch(styles, /\.gc-jump/);
assert.match(directory, /<section class="gc-neighbourhood" id="Area51">/);
assert.match(directory, /<img[^>]+\/images\/icons\/area51\.gif/i);
assert.match(directory, /<a href="http:\/\/geocities\.mcretro\.net\/Area51\/"/i);
assert.doesNotMatch(directory, /\*\*all 41 neighbourhoods\*\*/);

const news = read('news/index.html');
assert.match(news, /<a href="\/homepages\/geocities\/news\/2021-09-05\.html">/);
const cool = read('cool/index.html');
assert.match(cool, /<a href="http:\/\/geocities\.mcretro\.net\/TimesSquare\/Castle\/3320\/"/);

for (const asset of [
  'geocities.css',
  'images/icons/area51.gif',
  'images/neighborhoods/neighborhoods.gif',
  'images/neighborhoods/Area51/Area51.gif',
  'images/main/info/areaid_news.gif',
  'pictures/geocool.gif'
]) {
  assert.ok(existsSync(path.join(root, base, asset)), 'Missing artwork or CSS: ' + asset);
}
assert.ok(!existsSync(path.join(root, base, 'news/2011-04-29.mp3')),
  'Archive Team interview must not be included');
const privateLinks = [
  ...directory.matchAll(/<a\b[^>]*href="http:\/\/geocities\.mcretro\.net\/[^"]+"[^>]*>/g),
  ...cool.matchAll(/<a\b[^>]*href="http:\/\/geocities\.mcretro\.net\/[^"]+"[^>]*>/g)
].map(match => match[0]);
assert.ok(privateLinks.length >= 760, 'Private archive links are missing');
for (const anchor of privateLinks) {
  assert.match(anchor, /\btarget="_blank"/);
  assert.match(anchor, /\brel="noopener noreferrer nofollow"/);
}
assert.match(directory, /id="gc-neighbourhood-search"/);
assert.match(directory, /class="gc-browser-tools" hidden/);
assert.match(directory, /id="gc-neighbourhood-list"/);
assert.match(directory, /\/homepages\/geocities\/neighborhoods\/browser\.js/);
const script = read('neighborhoods/browser.js');
assert.doesNotMatch(script, /\bgc-jump\b/);
assert.match(script, /addEventListener\('input', \(\) =>/);
assert.match(script, /addEventListener\('click', \(\) => toggle\(true\)\)/);
assert.match(script, /addEventListener\('click', \(\) => toggle\(false\)\)/);
assert.match(script, /preSearchOpen = groups\.map/);
assert.match(script, /toolbar\.hidden = false/);

// Low-risk directory additions must preserve all original names, links, and GIFs.
assert.match(directory, /<strong>41<\/strong> neighbourhoods/);
assert.match(directory, /<strong>714<\/strong> suburbs/);
assert.match(directory, /<strong>298,559<\/strong> historical Homesteaders/);
assert.equal([...directory.matchAll(/<section class="gc-neighbourhood"/g)].length, 41);
assert.equal([...directory.matchAll(/<div class="gc-suburbs">/g)].length, 41);
assert.equal([...directory.matchAll(/<a href="http:\/\/geocities\.mcretro\.net\//g)].length, 755);
assert.match(directory, /data-gc-action="random"/);
assert.match(directory, /id="gc-directory-top"/);
assert.match(directory, /href="#gc-directory-top">↑ Back to Top<\/a>/);
assert.match(directory, /The neighbourhood and suburb links lead to my personal archive/,
  'Explain private destination access once, without markers or code formatting');
assert.doesNotMatch(directory, /Links marked ↗|<code>geocities\.mcretro\.net<\/code>/,
  'Old arrow explanations and monospace hostname must not return');
assert.doesNotMatch(directory, /title="Private archive:/,
  'Suburb links should not repeat the private archive tooltip hundreds of times');
assert.doesNotMatch(directory, /in my private archive<\/a>/,
  'Neighbourhood link labels should not repeat the private disclaimer');
assert.equal([...directory.matchAll(/Open [^<]+ in the archive<\/a>/g)].length, 41,
  'All 41 neighbourhood archive links retain clear, concise names');
assert.match(home, /class="gc-private-gateway"/);
assert.match(styles, /\.gc-neighbourhood mark/);
assert.match(styles, /\.gc-browser-tools \{[^}]*background: var\(--panel\)/,
  'Directory controls use the same panel colour as the other cards');
assert.doesNotMatch(styles, /\.gc-browser-tools \{[^}]*background: var\(--panel-subtle\)/,
  'No mismatched grey search-panel background');
assert.doesNotMatch(styles, /content:\s*["']\s*↗/,
  'Do not automatically append arrows to hundreds of private archive links');
assert.doesNotMatch(cool, /<code>geocities\.mcretro\.net<\/code>/,
  'Cool Pages archive note should use normal text, not a code box');
assert.match(home, /class="gc-private-gateway"/);
assert.match(cool, /The list is public, but the archived websites aren't/,
  'A concise one-time private link note remains for direct visitors');
assert.match(styles, /gc-directory-stats/);
assert.match(script, /const highlightText = \(element, original, query\) =>/);
assert.match(script, /document\.createElement\('mark'\)/);
assert.match(script, /group\.suburbs\.forEach\(item => \{/);
assert.match(script, /random\.addEventListener\('click', pickRandom\)/);
assert.match(script, /lastRandom = index/);
assert.match(script, /prefers-reduced-motion: reduce/);
// The public-only artwork gallery must use existing local files and link
// back to the public directory rather than archived personal homepages.
const gallery = read('artwork/index.html');
const galleryImages = [...gallery.matchAll(/<img\b[^>]+src="(\/homepages\/geocities\/[^"]+\.gif)"/g)]
  .map(match => match[1]);
assert.equal(galleryImages.length, 49, 'Expected 41 buttons, six frontend graphics and two banners');
for (const img of galleryImages) {
  assert.ok(existsSync(path.join(root, img.slice(1))), 'Missing gallery GIF: ' + img);
}
assert.equal([...gallery.matchAll(/class="gc-artwork-directory-link" href="\/homepages\/geocities\/neighborhoods\/#/g)].length, 43);
const gifOpenLinks = [...gallery.matchAll(/<a class="gc-artwork-image-link" href="([^"]+\.gif)" target="_blank" rel="noopener noreferrer"/g)]
  .map(match => match[1]);
assert.equal(gifOpenLinks.length, 49, 'Every image has its own raw GIF link');
assert.deepEqual(gifOpenLinks.slice().sort(), galleryImages.slice().sort(), 'No displayed or linked GIF path changed');
assert.match(gallery, /href="\/homepages\/geocities\/neighborhoods\/#Area51"/);
assert.doesNotMatch(gallery, /href="http:\/\/geocities\.mcretro\.net/);
assert.match(directory, /<a href="\/homepages\/geocities\/artwork\/">Artwork Gallery<\/a>/);
assert.match(styles, /\.gc-artwork-grid \{/);
assert.match(styles, /\.gc-neighbourhood-tour \{/);
assert.match(script, /const byId = new Map\(/);
assert.match(script, /window\.addEventListener\('hashchange', revealHash\)/);
assert.match(script, /navigator\.clipboard\?\.writeText/);
assert.match(script, /'Copy Link'/);
assert.match(script, /'← Previous: '/);
assert.match(script, /'Next: '/);
assert.match(script, /url\.searchParams\.set\('q', query\)/);
assert.match(script, /window\.history\.replaceState/);
assert.match(script, /event\.key === 'Escape'/);
assert.match(script, /event\.key !== '\/'/);
assert.match(script, /random\.addEventListener\('click', pickRandom\)/);
// Parse the standalone browser script as JavaScript, not merely source text.
import { execFileSync } from 'node:child_process';
execFileSync(process.execPath, ['--check', path.join(root, base, 'neighborhoods/browser.js')]);

// Directory sorting, match-only filtering, and the accessible live count.
assert.match(directory, /id="gc-neighbourhood-sort"/);
for (const mode of ['alphabetical', 'largest', 'smallest']) {
  assert.match(directory, new RegExp('<option value="' + mode + '">'));
}
assert.match(directory, /id="gc-suburbs-matching-only"/);
assert.match(styles, /gc-suburbs a\[hidden\]/);
assert.match(styles, /gc-artwork-jump/);
assert.match(script, /sortSelect\.addEventListener\('change', applySort\)/);
assert.match(script, /matchingOnly\.addEventListener\('change', filter\)/);
assert.match(script, /population: Number/);
assert.match(script, /const bySuburbs = sortSelect\.value/);
assert.match(script, /suburbCount: suburbs\.length/);
assert.match(script, /direction \* \(first - second\)/);
assert.match(script, /list\.appendChild\(reordered\)/);
assert.match(script, /const highlightCache = new WeakMap\(\)/);
assert.match(script, /highlightCache\.get\(element\) === query/);
assert.match(script, /matchingSuburbs \+ ' suburb names match\.'/);
// All six Round Five additions stay inside the public GeoCities directory.
for (const value of ['most-suburbs', 'fewest-suburbs']) {
  assert.match(directory, new RegExp('<option value="' + value + '">'));
}
assert.match(directory, /data-gc-action="reset"/);
assert.match(directory, /data-gc-action="copy-search" disabled/);
assert.match(directory, /id="gc-suburbs-matching-only" type="checkbox" disabled/);
assert.match(directory, /id="gc-neighbourhood-empty" class="gc-no-results" hidden/);
const panelStart = directory.indexOf('class="gc-browser-tools" hidden');
const emptyStart = directory.indexOf('id="gc-neighbourhood-empty"');
assert.ok(panelStart >= 0 && emptyStart > panelStart,
  'Browser panel and no-results block must exist in that order');
const panel = directory.slice(panelStart, emptyStart);
assert.ok(panel.indexOf('gc-browser-search-row') < panel.indexOf('gc-browser-tool-row'),
  'Search should be before the actions row');
assert.ok(panel.indexOf('gc-browser-options') < panel.indexOf('gc-browser-status'),
  'Sorting and filters should be grouped before results');
assert.equal([...directory.matchAll(/id="gc-neighbourhood-search"/g)].length, 1);
assert.match(directory, /data-gc-action="clear-search"/);
assert.match(script, /matchingOnly\.disabled = !query/);
assert.match(script, /copySearch\.disabled = !query/);
assert.match(script, /copySearchGroup\.hidden = !query/);
assert.match(directory, /class="gc-browser-search-row"/);
assert.match(directory, /class="gc-browser-tool-row" role="group"/);
assert.match(directory, /class="gc-browser-status"/);
assert.match(directory, /id="gc-search-share" hidden/);
assert.match(styles, /\.gc-search-share\[hidden\] \{ display: none; \}/);
assert.match(styles, /\.gc-browser-options \{ display: grid; grid-template-columns:/);
assert.match(styles, /@media \(max-width: 620px\)/);
assert.match(directory, /aria-label="Random Neighbourhood">🎲 Random<\/button>/);
assert.match(directory, /Press \/ to search, Esc to clear/);
assert.match(script, /noResults\.hidden = !\(query && found === 0\)/);
assert.match(script, /const resetView = \(\) =>/);
assert.match(script, /sortSelect\.value = 'alphabetical'/);
assert.match(script, /copySearch\.addEventListener\('click', \(\) =>/);
assert.match(script, /copyUrl\(url\.href, copySearchStatus\)/);
assert.match(script, /clearSearchButton\.addEventListener\('click', clearSearch\)/);
assert.match(styles, /\.gc-no-results\[hidden\]/);
const displayedSuburbCounts = [...directory.matchAll(/<small>Listed suburbs: (\d+)<\/small>/g)]
  .map(match => Number(match[1]));
assert.equal(displayedSuburbCounts.length, 41, 'All 41 neighbourhood headers need suburb counts');
assert.equal(displayedSuburbCounts.reduce((sum, count) => sum + count, 0), 714,
  'Suburb counts must sum to 714, not a guessed total');
assert.match(gallery, /id="gc-artwork-top"/);
for (const id of ['frontend-graphics', 'neighbourhood-buttons', 'preserved-banners']) {
  assert.match(gallery, new RegExp('<a href="#' + id + '">'));
  assert.match(gallery, new RegExp('<h2 id="' + id + '">'));
}
assert.match(gallery, /href="#gc-artwork-top">↑ Back to Top<\/a>/);
console.log('PASS: ' + pages.length +
  ' GeoCities pages rendered as HTML; original artwork and private gateway preserved.');
