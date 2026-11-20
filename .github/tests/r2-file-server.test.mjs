import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { scriptElements } from './script-tags.mjs';

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
  const scripts = scriptElements(html);
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].attributes.trim(), '');
  assert.doesNotThrow(() => new vm.Script(scripts[0].body));
});

test('repository catalogue is intentionally empty and embargoed', () => {
  assert.equal(data.schema_version, 1);
  assert.equal(data.owner_review_required, true);
  assert.deepEqual(data.files, []);
  assert.doesNotMatch(JSON.stringify(data), /mcretro-r2-check\.txt/);
});

test('draft files contain no Cloudflare API credentials', () => {
  for (const text of [html, JSON.stringify(data)]) {
    assert.doesNotMatch(text, /r2\.cloudflarestorage\.com|CF_API_TOKEN|AWS_SECRET_ACCESS_KEY|CLOUDFLARE_API_TOKEN/);
  }
});
