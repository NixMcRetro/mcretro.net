import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const manifestPath = '.github/share-description-manifest.json';
const centralPath = '_data/share_descriptions.json';
const sharePath = '_includes/post-share.html';
const sourceTestPath = '.github/tests/share-descriptions.test.mjs';
const builtTestPath = '.github/tests/share-descriptions-built.mjs';
const snapshotPath = '.share-description-migration-snapshot.json';
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const read = file => fs.readFileSync(file, 'utf8');
const urlPath = entry => new URL(entry.url).pathname;

function frontmatter(source, filename) {
  const found = /^---(\r?\n)([\s\S]*?)(\r?\n---)(?=\r?\n|$)/.exec(source);
  assert.ok(found, 'Missing or malformed front matter: ' + filename);
  return { all: found[0], eol: found[1], yaml: found[2], closing: found[3],
    body: source.slice(found[0].length) };
}
function extractDescription(source, filename) {
  const fm = frontmatter(source, filename);
  const lines = fm.yaml.split(/\r?\n/);
  const locations = lines.map((line, i) => /^share_description\s*:/.test(line) ? i : -1).filter(i => i !== -1);
  assert.equal(locations.length, 1, 'Expected exactly one share description in ' + filename);
  const i = locations[0];
  assert.equal(lines[i], 'share_description: >-', 'Expected folded YAML: ' + filename);
  const parts = [];
  for (let k = i + 1; k < lines.length && /^  \S/.test(lines[k]); k++) {
    parts.push(lines[k].slice(2));
  }
  assert.ok(parts.length, 'Empty share description: ' + filename);
  return parts.join(' ');
}
function replaceOnce(source, oldText, newText, filename) {
  assert.ok(source.includes(oldText), 'Expected text not found: ' + filename);
  assert.equal(source.split(oldText).length, 2, 'Expected text more than once: ' + filename);
  return source.replace(oldText, newText);
}
function metadata(entry) {
  const {post_id, path: articlePath, url, batch_id, source_sha} = entry;
  return {post_id, path: articlePath, url, batch_id, source_sha};
}
function migrate() {
  assert.ok(!fs.existsSync(snapshotPath), 'Snapshot already exists');
  const originalManifest = read(manifestPath);
  const manifest = JSON.parse(originalManifest);
  const rawData = read(centralPath);
  const data = JSON.parse(rawData);
  assert.equal(manifest.schema_version, 2);
  assert.equal(manifest.posts.length, 964);
  const central = manifest.posts.filter(e => e.storage === 'jekyll_data');
  const pilots = manifest.posts.filter(e => e.storage === 'frontmatter');
  assert.equal(central.length, 954);
  assert.equal(pilots.length, 10);
  assert.equal(Object.keys(data).length, 954);
  for (const field of ['post_id', 'path', 'url', 'batch_id']) {
    assert.equal(new Set(manifest.posts.map(e => e[field])).size, 964, 'Duplicate ' + field);
  }
  assert.deepEqual(new Set(Object.keys(data)), new Set(central.map(urlPath)), 'Manifest/data URL mismatch');
  const allPostFiles = fs.readdirSync('_posts').filter(f => f.endsWith('.md'));
  assert.equal(allPostFiles.length, 964, 'Post count changed');
  assert.deepEqual(new Set(allPostFiles.map(f => '_posts/' + f)), new Set(manifest.posts.map(e => e.path)));
  const snapshot = {base_manifest_sha256: sha(originalManifest), base_json_sha256: sha(rawData),
    entries: [], counts: {central: 954, pilots: 10, total: 964}};

  // Prepare every updated post in memory; do not write until ALL 964 inputs pass.
  const changes = [];
  for (const entry of manifest.posts) {
    assert.match(entry.source_sha, /^[a-f0-9]{40}$/);
    const originalBuffer = fs.readFileSync(entry.path);
    const original = originalBuffer.toString('utf8');
    assert.ok(Buffer.from(original, 'utf8').equals(originalBuffer), 'Non-UTF-8 file: ' + entry.path);
    const fm = frontmatter(original, entry.path);
    const existingCount = (fm.yaml.match(/^share_description\s*:/gm) || []).length;
    const record = {meta: metadata(entry), body_sha256: sha(Buffer.from(fm.body)),
      original_sha256: sha(originalBuffer)};
    if (entry.storage === 'frontmatter') {
      assert.equal(existingCount, 1, 'Pilot field missing/duplicated: ' + entry.path);
      record.description = extractDescription(original, entry.path);
      record.pilot = true;
    } else {
      assert.equal(entry.storage, 'jekyll_data');
      assert.equal(existingCount, 0, 'Already populated: ' + entry.path);
      const description = data[urlPath(entry)];
      assert.equal(typeof description, 'string', 'Missing approved text for ' + entry.path);
      assert.equal(description.trim(), description);
      assert.doesNotMatch(description, /[\r\n\t\u2028\u2029]/u);
      const insert = fm.eol + 'share_description: >-' + fm.eol + '  ' + description;
      const newFront = fm.all.slice(0, -fm.closing.length) + insert + fm.closing;
      const updated = newFront + fm.body;
      const afterFm = frontmatter(updated, entry.path);
      assert.equal(afterFm.body, fm.body, 'Article body changed: ' + entry.path);
      assert.equal(newFront.replace(insert, ''), fm.all, 'Original metadata changed: ' + entry.path);
      assert.equal(extractDescription(updated, entry.path), description, 'YAML value changed: ' + entry.path);
      assert.equal((afterFm.yaml.match(/^share_description\s*:/gm) || []).length, 1);
      record.description = description;
      record.pilot = false;
      changes.push([entry.path, updated]);
    }
    snapshot.entries.push(record);
  }
  assert.equal(changes.length, 954);

  const amendedNote = 'All 964 approved article share descriptions are stored in post YAML front matter. The original 954 JSON-backed descriptions were migrated without editorial changes and the ten existing pilot descriptions were preserved. Historical reviewed source SHA records remain unchanged. Article bodies were not modified.';
  let nextManifest = replaceOnce(originalManifest, JSON.stringify(manifest.note), JSON.stringify(amendedNote), manifestPath);
  const occurrences = nextManifest.split('"storage": "jekyll_data"').length - 1;
  assert.equal(occurrences, 954);
  nextManifest = nextManifest.replaceAll('"storage": "jekyll_data"', '"storage": "frontmatter"');
  const newManifest = JSON.parse(nextManifest);
  assert.equal(newManifest.posts.filter(e => e.storage === 'frontmatter').length, 964);
  for (let i = 0; i < 964; i++) {
    assert.deepEqual(metadata(newManifest.posts[i]), metadata(manifest.posts[i]), 'Historical SHA or identity changed');
  }
  let nextShare = replaceOnce(read(sharePath),
    "{% if share_description == '' %}\n  {% assign share_description = site.data.share_descriptions[page.url] | default: '' | strip %}\n{% endif %}\n", '', sharePath);
  assert.ok(!nextShare.includes('site.data.share_descriptions'));
  let sourceTest = read(sourceTestPath);
  sourceTest = replaceOnce(sourceTest, "const data = JSON.parse(fs.readFileSync('_data/share_descriptions.json', 'utf8'));\n", '', sourceTestPath);
  sourceTest = sourceTest.replace(/function descriptionFor\(entry\) \{[\s\S]*?\n\}\n\n(?=test\()/,
    "function descriptionFor(entry) {\n  assert.equal(entry.storage, 'frontmatter', 'Descriptions must be in article YAML');\n  return frontMatterDescription(frontMatter(entry.path));\n}\n\n");
  assert.ok(!sourceTest.includes('function descriptionFor(entry) {\n  const key'));
  sourceTest = replaceOnce(sourceTest, 'assert.ok(manifest.posts.length >= 964);', 'assert.equal(manifest.posts.length, 964);', sourceTestPath);
  sourceTest = sourceTest.replace(/  const dataEntries = manifest.posts.filter\(entry => entry.storage === 'jekyll_data'\);[\s\S]*?  assert.deepEqual\(new Set\(Object.keys\(data\)\), expected, 'Data keys do not match approved URLs'\);\n/,
    "  assert.ok(manifest.posts.every(entry => entry.storage === 'frontmatter'));\n");
  assert.ok(!sourceTest.includes('dataEntries') && !sourceTest.includes('Object.keys(data)'));
  sourceTest = sourceTest.replace('every front-matter or JSON description is tracked exactly once',
    'every article has exactly one tracked front-matter description');
  let builtTest = read(builtTestPath);
  builtTest = replaceOnce(builtTest, "const data = JSON.parse(fs.readFileSync('_data/share_descriptions.json', 'utf8'));\n", '', builtTestPath);
  builtTest = replaceOnce(builtTest,
    "  if (entry.storage === 'jekyll_data') {\n    const text = data[new URL(entry.url).pathname];\n    assert.equal(typeof text, 'string');\n    return text;\n  }\n",
    "  assert.equal(entry.storage, 'frontmatter', 'Description must be in article YAML');\n", builtTestPath);
  assert.ok(!builtTest.includes('_data/share_descriptions'));

  // Commit to disk only after complete in-memory preservation checks.
  fs.writeFileSync(snapshotPath, JSON.stringify(snapshot));
  for (const [filename, updated] of changes) fs.writeFileSync(filename, updated, 'utf8');
  fs.writeFileSync(manifestPath, nextManifest, 'utf8');
  fs.writeFileSync(sharePath, nextShare, 'utf8');
  fs.writeFileSync(sourceTestPath, sourceTest, 'utf8');
  fs.writeFileSync(builtTestPath, builtTest, 'utf8');
  fs.unlinkSync(centralPath);
  console.log('Migration prepared: 954 inserted + 10 untouched = 964 YAML descriptions; JSON deleted.');
}
function panel(html, filename) {
  const match = html.match(/<section class="post-share"[\s\S]*?<\/section>/);
  assert.ok(match, 'Sharing panel missing: ' + filename);
  return match[0];
}
function headDescriptionTags(html) {
  const head = html.match(/<head>[\s\S]*?<\/head>/);
  assert.ok(head);
  return [...head[0].matchAll(/<meta\b[^>]*\b(?:description|og:description|twitter:description)\b[^>]*>/g)]
    .map(m => m[0]).join('\n');
}
function verify(beforeDir, afterDir) {
  assert.ok(fs.existsSync(snapshotPath), 'No migration snapshot found');
  const snapshot = JSON.parse(read(snapshotPath));
  const manifest = JSON.parse(read(manifestPath));
  assert.equal(manifest.posts.length, 964);
  assert.ok(manifest.posts.every(e => e.storage === 'frontmatter'));
  assert.ok(!fs.existsSync(centralPath));
  assert.equal(fs.readdirSync('_posts').filter(f => f.endsWith('.md')).length, 964);
  for (let i = 0; i < 964; i++) {
    const entry = manifest.posts[i], previous = snapshot.entries[i];
    assert.deepEqual(metadata(entry), previous.meta, 'Manifest historical identity/SHA changed');
    const buffer = fs.readFileSync(entry.path), source = buffer.toString('utf8');
    assert.ok(Buffer.from(source, 'utf8').equals(buffer));
    assert.equal(extractDescription(source, entry.path), previous.description, 'Approved text changed: ' + entry.path);
    assert.equal(sha(Buffer.from(frontmatter(source, entry.path).body)), previous.body_sha256,
      'Historical article body changed: ' + entry.path);
    if (previous.pilot) assert.equal(sha(buffer), previous.original_sha256,
      'Pilot article changed: ' + entry.path);
    const url = urlPath(entry), relative = url.replace(/^\/+/, '');
    const beforeFile = path.join(beforeDir, relative, 'index.html');
    const afterFile = path.join(afterDir, relative, 'index.html');
    const oldHtml = read(beforeFile), newHtml = read(afterFile);
    assert.equal(panel(newHtml, afterFile), panel(oldHtml, beforeFile),
      'Social-sharing message output changed: ' + entry.post_id);
    assert.equal(headDescriptionTags(newHtml), headDescriptionTags(oldHtml),
      'SEO description metadata changed: ' + entry.post_id);
  }
  console.log('VERIFIED: 964/964 exact approved descriptions; 954/954 article bodies byte-preserved;');
  console.log('VERIFIED: 10/10 pilots byte-identical; 964/964 immutable manifest identity and reviewed source SHAs;');
  console.log('VERIFIED: 964/964 pre/post social sharing sections identical across Bluesky, Mastodon, Tumblr and email;');
  console.log('VERIFIED: 964/964 generated description metadata unchanged; central JSON absent.');
}
const mode = process.argv[2];
if (mode === 'migrate') migrate();
else if (mode === 'verify') {
  assert.ok(process.argv[3] && process.argv[4], 'Usage: verify BEFORE_DIR AFTER_DIR');
  verify(process.argv[3], process.argv[4]);
} else throw Error('Expected migrate or verify');
