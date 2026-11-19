import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root = 'archive-sites/file-server';
const read = path => fs.readFileSync(path, 'utf8');
const html = read(root + '/index.html');
const data = JSON.parse(read(root + '/catalogue.json'));

test('draft file-server UI has local controls and one inline script', () => {
  assert.match(html, /<html lang="en-AU">/);
  assert.match(html, /<title>McRetro File Server<\/title>/);
  assert.match(html, /fetch\("\.\/catalogue\.json"/);
  for (const id of ['results', 'search', 'category', 'sort', 'show-more-files']) {
    assert.ok(html.includes('id="' + id + '"'));
  }
  assert.match(html, /const PAGE_SIZE = 80/);
  const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script\s*>/gi)];
  assert.equal(scripts.length, 1);
  assert.match(scripts[0][0], /^<script>/i);
  assert.doesNotThrow(() => new vm.Script(scripts[0][1]));
});

test('sample catalogue remains unapproved and schema-valid', () => {
  assert.equal(data.schema_version, 1);
  assert.ok(Array.isArray(data.files) && data.files.length >= 1);
  assert.equal(data.files[0].path, 'mcretro-r2-check.txt');
  const seen = new Set();
  for (const file of data.files) {
    assert.match(file.path, /^[^\\?#]+$/);
    assert.ok(!file.path.split('/').some(x => !x || x === '.' || x === '..'));
    assert.ok(!seen.has(file.path));
    seen.add(file.path);
  }
});

test('draft files contain no Cloudflare API credentials', () => {
  for (const text of [html, JSON.stringify(data)]) {
    assert.doesNotMatch(text, /r2\.cloudflarestorage\.com|CF_API_TOKEN|AWS_SECRET_ACCESS_KEY|CLOUDFLARE_API_TOKEN/);
  }
});
