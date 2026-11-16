import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const root = 'archive-sites';
const fileDir = path.join(root, 'file-server');
const photoDir = path.join(root, 'photo-gallery');
const read = name => fs.readFileSync(name, 'utf8');
const validKey = key => typeof key === 'string' && key.length > 0 &&
  !key.startsWith('/') && !/[?#\\]/.test(key) &&
  key.split('/').every(part => part && part !== '.' && part !== '..');
const nonEmpty = value => typeof value === 'string' && value.trim().length > 0;

test('file server HTML has its controls and valid inline JavaScript', () => {
  const html = read(path.join(fileDir, 'index.html'));
  assert.match(html, /<html lang="en-AU">/);
  assert.match(html, /<title>McRetro File Server<\/title>/);
  assert.match(html, /fetch\("\.\/catalogue\.json"/);
  for (const id of ['results','search','category','sort']) assert.ok(html.includes('id="' + id + '"'));
  assert.doesNotMatch(html, /<script[^>]+src=|<link[^>]+rel="stylesheet"/);
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  assert.doesNotThrow(() => new vm.Script(scripts[0][1]));
});

test('file catalogue validates and points at known test object', () => {
  const data = JSON.parse(read(path.join(fileDir, 'catalogue.json')));
  assert.equal(data.schema_version, 1);
  assert.ok(Array.isArray(data.files));
  assert.ok(data.files.length >= 1);
  assert.equal(data.files[0].path, 'mcretro-r2-check.txt');
  const unique = new Set();
  for (const file of data.files) {
    assert.ok(validKey(file.path), 'Invalid R2 key');
    assert.ok(nonEmpty(file.title) && nonEmpty(file.description) && nonEmpty(file.category));
    assert.ok(!unique.has(file.path), 'Duplicate object key');
    unique.add(file.path);
    if (file.year != null) assert.ok(Number.isInteger(file.year) && file.year > 1900 && file.year < 2100);
    if (file.size_bytes != null) assert.ok(Number.isInteger(file.size_bytes) && file.size_bytes >= 0);
    if (file.sha256 != null) assert.match(file.sha256, /^[a-f0-9]{64}$/i);
  }
});

test('photo gallery HTML has its controls and valid inline JavaScript', () => {
  const html = read(path.join(photoDir, 'index.html'));
  assert.match(html, /<html lang="en-AU">/);
  assert.match(html, /<title>McRetro Photo Gallery<\/title>/);
  assert.match(html, /fetch\("\.\/albums\.json"/);
  for (const id of ['viewer','search','albums','grid']) assert.ok(html.includes('id="' + id + '"'));
  assert.doesNotMatch(html, /<script[^>]+src=|<link[^>]+rel="stylesheet"/);
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
  assert.equal(scripts.length, 1);
  assert.doesNotThrow(() => new vm.Script(scripts[0][1]));
});

test('photo albums validate with accessible image labels', () => {
  const data = JSON.parse(read(path.join(photoDir, 'albums.json')));
  assert.equal(data.schema_version, 1);
  assert.ok(Array.isArray(data.albums) && Array.isArray(data.photos));
  assert.ok(data.photos.length >= 1);
  assert.equal(data.photos[0].path, 'mcretro-r2-check.png');
  const albums = new Set();
  for (const album of data.albums) {
    assert.ok(nonEmpty(album.id) && /^[a-z0-9-]+$/.test(album.id));
    assert.ok(nonEmpty(album.title) && !albums.has(album.id));
    albums.add(album.id);
  }
  const paths = new Set();
  for (const photo of data.photos) {
    assert.ok(validKey(photo.path));
    assert.ok(!photo.thumbnail || validKey(photo.thumbnail));
    assert.ok(nonEmpty(photo.title) && nonEmpty(photo.alt));
    assert.ok(albums.has(photo.album));
    assert.ok(!paths.has(photo.path));
    paths.add(photo.path);
  }
});

test('starter does not contain Cloudflare access credentials', () => {
  for (const filename of ['file-server/index.html','file-server/catalogue.json','photo-gallery/index.html','photo-gallery/albums.json']) {
    assert.doesNotMatch(read(path.join(root, filename)), /r2\.cloudflarestorage\.com|CF_API_TOKEN|AWS_SECRET_ACCESS_KEY|CLOUDFLARE_API_TOKEN/);
  }
});
