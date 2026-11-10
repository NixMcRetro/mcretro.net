import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const site = process.argv[2] || '_site';
const read = (relative) => fs.readFileSync(path.join(site, relative), 'utf8');

function excerptFor(pageHtml, permalink) {
  const article = pageHtml.split('<article class="post-entry">')
    .find((part) => part.includes('href="' + permalink + '"'));
  assert.ok(article, 'Missing listing entry for ' + permalink);
  const excerpt = article.match(/<div class="post-excerpt">([\s\S]*?)<a\s+href=/);
  assert.ok(excerpt, 'Missing excerpt for ' + permalink);
  return excerpt[1].replace(/\s+/g, ' ').trim();
}

const blog = read('blog/index.html');
const november = excerptFor(blog, '/bits-brass-and-bugs/');
assert.match(november, /been a rather busy few weeks/);
assert.doesNotMatch(november, /Somewhere between old Macs/);

const archive = read('archive/2026/10/index.html');
const modem = excerptFor(archive, '/still-dialling-in-my-head/');
assert.match(modem, /particular sound from the dial-up internet days/);
assert.doesNotMatch(modem, /The real Avtek MegaPlus V\.32bis CD950/);
const vram = excerptFor(archive, '/vrampage-md-bending-bits/');
assert.match(vram, /spent plenty of time persuading Mega Drives/);
assert.doesNotMatch(vram, /Some of my earlier VRAM experiments/);

const fullArticle = read('still-dialling-in-my-head/index.html');
assert.match(fullArticle, /The real Avtek MegaPlus V\.32bis CD950/,
  'Article captions must remain on full article pages');
assert.match(fullArticle, /alt="Actual Avtek modem dialling spectrogram showing eight dual-tone pulses"/,
  'Original image alt text must remain on full article pages');
const head = fullArticle.split('</head>', 1)[0];
assert.doesNotMatch(head, /The real Avtek MegaPlus V\.32bis CD950/,
  'Caption should not become an article metadata description');

const feed = read('feed.xml');
const summaries = [...feed.matchAll(/<summary\b[^>]*>([\s\S]*?)<\/summary>/g)]
  .map((match) => match[1]).join(' ');
assert.doesNotMatch(summaries, /The real Avtek MegaPlus V\.32bis CD950|Somewhere between old Macs/,
  'Caption should not become a feed summary');

console.log('Caption-safe blog/archives, full article media, metadata and feed checks passed.');
