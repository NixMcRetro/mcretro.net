import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

// Check real Jekyll output, not the mock month counts used by JS unit tests.
// Every calendar month must agree with its actual /archive/YYYY/MM/ page.
const site = resolve(process.argv[2] || '_site');
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
    if (actual) archiveMonths++;
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
console.log('PASS: ' + options.length + ' years and ' + archiveMonths +
  ' published monthly archives have matching sidebar counts; Jan–Sep validated.');
