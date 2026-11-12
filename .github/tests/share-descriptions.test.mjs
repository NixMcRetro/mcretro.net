import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const manifest = JSON.parse(fs.readFileSync('.github/share-description-manifest.json', 'utf8'));
const length = value => [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(value)].length;

function frontMatter(file) {
  const source = fs.readFileSync(file, 'utf8');
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  assert.ok(match, 'Missing front matter: ' + file);
  return match[1].split(/\r?\n/);
}

function frontMatterDescription(lines) {
  const indexes = lines.map((line, i) => /^share_description:/.test(line) ? i : -1).filter(i => i >= 0);
  assert.equal(indexes.length, 1, 'Expected one front-matter description');
  const start = indexes[0];
  assert.equal(lines[start], 'share_description: >-', 'Expected folded YAML');
  const parts = [];
  for (let i = start + 1; i < lines.length && /^  \S/.test(lines[i]); i++) parts.push(lines[i].slice(2));
  assert.ok(parts.length > 0, 'Empty front-matter description');
  return parts.join(' ');
}

function descriptionFor(entry) {
  assert.equal(entry.storage, 'frontmatter', 'Descriptions must be in article YAML');
  return frontMatterDescription(frontMatter(entry.path));
}

test('manifest contains unique approved post identifiers and canonical URLs', () => {
  assert.equal(manifest.schema_version, 2);
  assert.equal(manifest.posts.length, 965);
  for (const field of ['post_id', 'path', 'url', 'batch_id']) {
    const values = manifest.posts.map(entry => entry[field]);
    assert.ok(values.every(Boolean), 'Empty ' + field);
    assert.equal(new Set(values).size, values.length, 'Duplicate ' + field);
  }
  assert.ok(manifest.posts.every(entry => entry.storage === 'frontmatter'));
});

for (const entry of manifest.posts) {
  test(entry.post_id + ' matches its approved share description and platform limits', () => {
    assert.match(entry.post_id, /^POST-\d{4}$/);
    assert.match(entry.path, /^_posts\/\d{4}-\d\d-\d\d-[\w-]+\.md$/);
    assert.match(entry.source_sha, /^[a-f0-9]{40}$/);
    assert.ok(fs.existsSync(entry.path));
    const url = new URL(entry.url);
    assert.equal(url.origin, 'https://mcretro.net');
    assert.ok(url.pathname.endsWith('/'));
    const description = descriptionFor(entry);
    assert.equal(description.trim(), description);
    assert.doesNotMatch(description, /[\u2013\u2014]/u, 'Only ASCII hyphens are allowed');
    assert.ok(length(description) >= 120 && length(description) <= 180,
      'Expected 120-180 graphemes, received ' + length(description));
    assert.ok(length(description + '\n\n' + entry.url) <= 300,
      'Bluesky message exceeds 300 graphemes');
  });
}

test('every article has exactly one tracked front-matter description', () => {
  const tracked = new Map(manifest.posts.map(entry => [entry.path, entry]));
  for (const filename of fs.readdirSync('_posts').filter(name => name.endsWith('.md'))) {
    const file = path.posix.join('_posts', filename);
    const yaml = frontMatter(file);
    const hasFrontMatter = yaml.some(line => /^share_description:/.test(line));
    const entry = tracked.get(file);
    assert.equal(hasFrontMatter, entry?.storage === 'frontmatter',
      'Front matter and manifest disagree: ' + file);
  }
});
