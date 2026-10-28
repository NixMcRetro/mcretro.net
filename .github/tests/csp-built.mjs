import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { scriptElements } from './script-tags.mjs';

// Reuse the production Jekyll/Pagefind output rather than rebuilding it.
const site = resolve(process.argv[2] || '_site');
function requiredFile(relativePath) {
  const path = resolve(site, relativePath);
  assert.ok(statSync(path).isFile() && statSync(path).size > 0, `Missing or empty generated file: ${relativePath}`);
  return path;
}
for (const path of [
  'assets/js/mobile-navigation.js',
  'assets/js/search-page.js',
  'assets/js/random-post.js',
  'assets/js/archive-dropdown.js',
  'assets/data/random-post-urls.json',
  'search/index.html',
  'pagefind/pagefind-ui.js'
]) requiredFile(path);

const urls = JSON.parse(readFileSync(requiredFile('assets/data/random-post-urls.json'), 'utf8'));
assert.ok(Array.isArray(urls) && urls.length > 0, 'Random post data must be a nonempty array');
assert.ok(urls.every(url => typeof url === 'string' && url.startsWith('/') && !url.startsWith('//')),
  'Random post data must contain only internal paths');

const search = readFileSync(requiredFile('search/index.html'), 'utf8');
const homePath = requiredFile('index.html');
const home = readFileSync(homePath, 'utf8');
assert.ok(search.includes('/assets/js/search-page.js'), 'Missing external search script');
assert.ok(home.includes('/assets/js/mobile-navigation.js'), 'Missing external navigation script');
assert.ok(home.includes('/assets/js/random-post.js'), 'Missing external random-post script');
assert.ok(home.includes('/assets/js/archive-dropdown.js'), 'Missing external archive script');
assert.ok(!home.includes('onchange='), 'Inline archive event handler present');

// Preserve the existing footer structural regression test.
execFileSync(process.execPath, [fileURLToPath(new URL('./footer-csp-built.mjs', import.meta.url)), homePath], {
  stdio: 'inherit'
});

// Equivalent to the previous homepage inline-script check.
// Jekyll SEO Tag emits inert JSON-LD structured data, not executable JS.
// Reject genuine inline scripts while retaining the existing SEO metadata.
const inlineExecutableScripts = scriptElements(home)
  .filter(({ attributes, body }) =>
    !/\bsrc\s*=/.test(attributes) &&
    !/\btype\s*=\s*(['"])application\/ld\+json\1/i.test(attributes) &&
    body.trim().length > 0);
assert.equal(inlineExecutableScripts.length, 0, 'Inline executable script found in generated homepage');
console.log('Generated site CSP assertions passed');
