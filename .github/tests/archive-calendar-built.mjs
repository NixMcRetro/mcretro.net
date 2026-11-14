import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

// Check real Jekyll output, not the mock month counts used by JS unit tests.
// Every calendar month must agree with its actual /archive/YYYY/MM/ page.
const site = resolve(process.argv[2] || '_site');
const landing = readFileSync(join(site, 'archive', 'index.html'), 'utf8');
assert.match(landing, /<h1 class="post-title">Archives<\/h1>/);
const archiveDisclosures = [...landing.matchAll(/<details class="archive-index-year about-panel panel--teal" name="mcretro-archive-years"([^>]*)>/g)];
assert.ok(archiveDisclosures.length >= 3, 'Historical year accordions missing');
assert.ok(archiveDisclosures.every(([, attrs]) => !/\bopen(?:\s|=|$)/.test(attrs)),
  'Every archive year must begin collapsed');

const home = readFileSync(join(site, 'index.html'), 'utf8');
const select = home.match(/<select\b[^>]*\bid="archive-calendar-year"[^>]*>[\s\S]*?<\/select>/)?.[0];
assert.ok(select, 'Generated sidebar year selector missing');
const options = [...select.matchAll(/<option\s+value="(\d{4})"\s+data-counts="([^"]*)"/g)];
assert.ok(options.length >= 3, 'Expected historical years in generated archive selector');

let archiveMonths = 0;
for (const [, year, rawCounts] of options) {
  const counts = rawCounts.trim().replace(/\s+/g, '').split(',').map(Number);
  assert.equal(counts.length, 12, year + ': expected 12 monthly counts');
  assert.ok(counts.every(n => Number.isSafeInteger(n) && n >= 0),
    year + ': calendar counts must be nonnegative whole numbers');
  for (let i = 0; i < 12; i++) {
    const month = String(i + 1).padStart(2, '0');
    const htmlFile = join(site, 'archive', year, month, 'index.html');
    const actual = existsSync(htmlFile)
      ? (readFileSync(htmlFile, 'utf8').match(/<article class="post-entry">/g) || []).length
      : 0;
    assert.equal(counts[i], actual,
      year + '-' + month + ': sidebar says ' + counts[i] + ', monthly archive contains ' + actual);
    // The landing-page tile must agree with the real archive count for every year.
    const tile = landing.match(new RegExp('<(a|span) class="archive-index-month (has-posts|is-empty)" ' +
      'data-archive-month="' + year + '-' + month + '" data-article-count="(\\d+)"([^>]*)>'));
    assert.ok(tile, year + '-' + month + ': landing tile missing');
    assert.equal(Number(tile[3]), actual, year + '-' + month + ': landing tile count mismatch');
    assert.equal(tile[1], actual ? 'a' : 'span',
      year + '-' + month + ': only populated months may be links');
    if (actual) {
      assert.ok(tile[4].includes('href="/archive/' + year + '/' + month + '/"'),
        year + '-' + month + ': archive link wrong');
    } else {
      assert.ok(!tile[4].includes('href='), year + '-' + month + ': empty month must not link');
    }
    if (actual) {
      archiveMonths++;
      const archiveHtml = readFileSync(htmlFile, 'utf8');
      const heading = archiveHtml.match(/<h1 class="post-title">([^<]+)<\/h1>/)?.[1]?.trim();
      const subtitle = archiveHtml.match(/<p class="archive-month-count">([\s\S]*?)<\/p>/)?.[1]
        ?.replace(/\s+/g, ' ').trim();
      const monthName = new Date(Date.UTC(Number(year), i, 1))
        .toLocaleString('en-AU', {month: 'long', timeZone: 'UTC'});
      assert.equal(heading, monthName + ' ' + year,
        year + '-' + month + ': month/year should be its own heading');
      assert.equal(subtitle, actual + ' article' + (actual === 1 ? '' : 's'),
        year + '-' + month + ': subheading should use the correct count');
      assert.match(archiveHtml, /<nav class="archive-breadcrumbs" aria-label="Breadcrumb">/,
        year + '-' + month + ': breadcrumb missing');
      assert.match(archiveHtml, /<a href="\/archive\/">Archives<\/a>/,
        year + '-' + month + ': breadcrumb must lead to the landing page');
      assert.doesNotMatch(archiveHtml, /class="archive-month-summary"/,
        year + '-' + month + ': no duplicate count paragraph');
    }
  }
}
assert.ok(archiveMonths > 20, 'Expected real published monthly archives to be checked');

// Regression for the reported defect: Jan–Sep must not all show zero when
// their corresponding archive pages have articles; Oct–Dec already worked.
const janToSep = options.flatMap(([, year, raw]) =>
  raw.trim().replace(/\s+/g, '').split(',').slice(0, 9).map((n, i) => ({year, month: i + 1, count: Number(n)})));
assert.ok(janToSep.some(x => x.count > 0), 'Jan–Sep cannot all be empty');
const year2016 = options.find(([,year]) => year === '2016');
assert.ok(year2016, 'Expected historical 2016 archive');
const vals = year2016[2].trim().replace(/\s+/g, '').split(',').map(Number);
assert.ok(vals.slice(0, 9).some(n => n > 0), '2016 Jan–Sep posts must appear');

// The initial server-rendered grid must match the selected latest-year
// option, including links for populated early months.
const [first, year, raw] = options[0];
const firstCounts = raw.trim().replace(/\s+/g, '').split(',').map(Number);
const initialGrid = home.match(/<div\s+class="archive-calendar-grid"[^>]*>[\s\S]*?<\/div>/)?.[0];
assert.ok(initialGrid, 'Initial server-rendered calendar grid missing');
for (let i = 0; i < 12; i++) {
  const month = String(i + 1).padStart(2, '0');
  const url = '/archive/' + year + '/' + month + '/';
  assert.equal(initialGrid.includes('href="' + url + '"'), firstCounts[i] > 0,
    'Initial grid link disagrees with latest-year count for ' + year + '-' + month);
}
// The page layout should expose the publication year even for title-based posts.
const year2012 = options.find(([, archiveYear]) => archiveYear === '2012');
assert.ok(year2012, 'Expected a 2012 archive year');
const counts2012 = year2012[2].trim().replace(/\s+/g, '').split(',').map(Number);
const sampleMonth = counts2012.findIndex(count => count > 0);
assert.ok(sampleMonth >= 0, 'Expected at least one published month in 2012');
const archivePath2012 = join(site, 'archive', '2012',
  String(sampleMonth + 1).padStart(2, '0'), 'index.html');
const html2012 = readFileSync(archivePath2012, 'utf8');
assert.match(html2012, /<body\b[^>]*data-archive-context-year="2012"/,
  'A 2012 monthly archive should initialise the sidebar to 2012');
const articleUrl2012 = html2012.match(/<h2 class="post-title"><a href="([^"]+)"/)?.[1];
assert.ok(articleUrl2012 && /^\/[^?#]+\/$/.test(articleUrl2012),
  'Expected an article link in the 2012 monthly archive');
const articlePath2012 = join(site, articleUrl2012.slice(1), 'index.html');
assert.ok(existsSync(articlePath2012), 'Expected article page: ' + articleUrl2012);
const articleHtml2012 = readFileSync(articlePath2012, 'utf8');
assert.match(articleHtml2012, /<body\b[^>]*data-archive-context-year="2012"/,
  'A 2012 article should initialise the sidebar to its year');
assert.doesNotMatch(home, /data-archive-context-year=/,
  'The undated homepage should keep the latest year as the default');

console.log('PASS: ' + options.length + ' years and ' + archiveMonths +
  ' published monthly archives have matching sidebar counts; Jan–Sep validated.');
