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

// GeoCities editorial headings use Title Case, not sentence case.
const home = read('index.html');
for (const heading of ["Explore the Restored Frontend","Enter My Private GeoCities Archive","A Short History of the Rebuild","Read the Rebuild Story","A Little Piece of the Original Site"]) {
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
for (const route of ['neighborhoods/', 'news/', 'cool/']) {
  assert.match(home, new RegExp('<a class="gc-home-card" href="/homepages/geocities/' + route + '">'));
}
const styles = read('geocities.css');
assert.match(styles, /gc-home-nav/);
assert.match(styles, /\.gc-neighbourhood \{[^}]+var\(--panel\)[^}]+var\(--text\)/);
assert.match(styles, /gc-browser-tools\[hidden\]/);
assert.doesNotMatch(styles, /background:\s*#f1f1f1/i);

const directory = read('neighborhoods/index.html');
assert.match(directory, /<strong>all 41 neighbourhoods<\/strong>/i);
assert.match(directory, /<strong>298,559 Homesteaders<\/strong>/i);
assert.match(directory, /<a href="#Area51">Area51<\/a>/);
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
assert.match(script, /addEventListener\('input', filter\)/);
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
assert.match(directory, /Private archive links are marked ↗/);
assert.match(home, /class="gc-private-gateway"/);
assert.match(styles, /\.gc-neighbourhood mark/);
assert.match(styles, /\.gc-cool-pages a\[target="_blank"\]/);
assert.match(styles, /gc-directory-stats/);
assert.match(script, /const highlightText = \(element, original, query\) =>/);
assert.match(script, /document\.createElement\('mark'\)/);
assert.match(script, /group\.suburbs\.forEach\(item => highlightText/);
assert.match(script, /random\.addEventListener\('click', pickRandom\)/);
assert.match(script, /lastRandom = index/);
assert.match(script, /prefers-reduced-motion: reduce/);
console.log('PASS: ' + pages.length +
  ' GeoCities pages rendered as HTML; original artwork and private gateway preserved.');
