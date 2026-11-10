import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const manifest = JSON.parse(fs.readFileSync('.github/share-description-manifest.json', 'utf8'));
const length = (value) => [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(value)].length;

function descriptionFromSource(file) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert.ok(match, 'Missing front matter: ' + file);
  const lines = match[1].split(/\r?\n/);
  const indexes = lines.map((line, i) => /^share_description:/.test(line) ? i : -1).filter(i => i >= 0);
  assert.equal(indexes.length, 1, 'Expected one share_description in ' + file);
  const start = indexes[0];
  assert.equal(lines[start], 'share_description: >-', 'Use folded YAML block in ' + file);
  const parts = [];
  for (let i = start + 1; i < lines.length && /^  \S/.test(lines[i]); i++) parts.push(lines[i].slice(2));
  assert.ok(parts.length > 0, 'Empty share description in ' + file);
  return parts.join(' ');
}

test('manifest uses unique Post IDs, paths, URLs and review batch IDs', () => {
  assert.equal(manifest.schema_version, 1);
  assert.ok(manifest.posts.length > 0);
  for (const field of ['post_id', 'path', 'url', 'batch_id']) {
    const values = manifest.posts.map(entry => entry[field]);
    assert.ok(values.every(Boolean), 'Empty ' + field);
    assert.equal(new Set(values).size, values.length, 'Duplicate ' + field);
  }
});

for (const entry of manifest.posts) {
  test(entry.post_id + ' meets description and platform limits', () => {
    assert.match(entry.post_id, /^POST-\d{4}$/);
    assert.match(entry.path, /^_posts\/\d{4}-\d\d-\d\d-[\w-]+\.md$/);
    assert.ok(fs.existsSync(entry.path));
    const url = new URL(entry.url);
    assert.equal(url.origin, 'https://mcretro.net');
    assert.equal(url.pathname.endsWith('/'), true);
    const description = descriptionFromSource(entry.path);
    assert.equal(description.trim(), description);
    assert.doesNotMatch(description, /[\u2013\u2014]/u, 'Only ASCII hyphens are allowed');
    assert.ok(length(description) >= 120 && length(description) <= 180,
      'Expected 120-180 graphemes, received ' + length(description));
    assert.ok(length(description + '\n\n' + entry.url) <= 300,
      'Bluesky message exceeds 300 graphemes');
  });
}

test('migrated posts cannot lose descriptions, and untracked descriptions are rejected', () => {
  const tracked = new Set(manifest.posts.map(entry => entry.path));
  for (const filename of fs.readdirSync('_posts').filter(name => name.endsWith('.md'))) {
    const file = path.posix.join('_posts', filename);
    const source = fs.readFileSync(file, 'utf8');
    const yaml = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const hasDescription = !!yaml && /^share_description:/m.test(yaml[1]);
    assert.equal(hasDescription, tracked.has(file),
      'Manifest and front matter disagree: ' + file);
  }
});
