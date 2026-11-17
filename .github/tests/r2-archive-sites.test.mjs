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

// These starters deliberately permit exactly one bare inline <script> element.
// Use literal case-insensitive tag discovery instead of an HTML-filtering regexp:
// uppercase tags, attributes and extra scripts must not bypass this check.
const extractSingleInlineScript = html => {
  const lower = html.toLowerCase();
  const starts = [];
  let cursor = 0;
  while (true) {
    const at = lower.indexOf('<script', cursor);
    if (at === -1) break;
    const next = lower[at + '<script'.length];
    if (next === '>' || ' \t\r\n\f/'.includes(next)) starts.push(at);
    cursor = at + '<script'.length;
  }
  assert.equal(starts.length, 1, 'Exactly one inline script tag is required');
  const start = starts[0];
  assert.equal(
    lower.slice(start, start + '<script>'.length),
    '<script>',
    'Script attributes and external scripts are not permitted'
  );
  const end = lower.indexOf('</script>', start + '<script>'.length);
  assert.notEqual(end, -1, 'Missing script closing tag');
  assert.equal(lower.indexOf('</script>'), end, 'Unexpected script closing tag');
  assert.equal(lower.indexOf('</script>', end + '</script>'.length), -1, 'Extra script closing tag');
  return html.slice(start + '<script>'.length, end);
};

const assertSelfContainedScript = html => {
  assert.equal(html.toLowerCase().includes('<link'), false, 'External link elements are not permitted');
  assert.doesNotThrow(() => new vm.Script(extractSingleInlineScript(html)));
};

test('inline script validation rejects HTML tag variants that could bypass the old regexp', () => {
  const sample = '<SCRIPT>\nconst sample = 1;\n</SCRIPT>';
  assert.equal(extractSingleInlineScript(sample).trim(), 'const sample = 1;');
  assert.equal(extractSingleInlineScript('<scripture>not a script</scripture>' + sample).trim(), 'const sample = 1;');
  for (const invalid of [
    '<SCRIPT SRC="evil.js"></SCRIPT>',
    '<ScRiPt type="module">const x = 1;</ScRiPt>',
    '<script>const x = 1;</script><SCRIPT>const y = 2;</SCRIPT>',
    '<script>const x = 1;</script></SCRIPT>',
    '<script>const x = 1;'
  ]) {
    assert.throws(() => extractSingleInlineScript(invalid));
  }
  assert.throws(() => assertSelfContainedScript('<link rel="stylesheet" href="outside.css">' + sample));
});

test('file server HTML has its controls and valid inline JavaScript', () => {
  const html = read(path.join(fileDir, 'index.html'));
  assert.match(html, /<html lang="en-AU">/);
  assert.match(html, /<title>McRetro File Server<\/title>/);
  assert.match(html, /fetch\("\.\/catalogue\.json"/);
  for (const id of ['results','search','category','sort','show-more-files']) assert.ok(html.includes('id="' + id + '"'));
  assert.match(html, /const PAGE_SIZE = 80/);
  assertSelfContainedScript(html);
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
  assert.match(html, /fetch\("\/albums\.json"/);
  assert.match(html, /class="utility-bar"/);
  assert.doesNotMatch(html, /class="main-nav"/);
  assert.doesNotMatch(html, /MCRETRO\.EXE \/ PHOTO ARCHIVE/);
  for (const id of ['viewer','search','breadcrumbs','folders','up-folder','grid','show-more','theme-toggle'])
    assert.ok(html.includes('id="' + id + '"'), 'Missing gallery control: ' + id);
  assert.match(html, /const PAGE_SIZE = 60/);
  assert.match(html, /moreButton\.addEventListener\("click", appendPage\)/);
  assert.match(html, /function buildFolderTree\(dataFolders\)/);
  assert.match(html, /location\.pathname/);
  assert.match(html, /window\.history\.pushState/);
  assert.match(html, /location\.hash/, "Legacy hash URLs must still be supported");
  assert.match(html, /folderSection\.hidden = inSearch/);
  assert.match(html, /function reviewedCaption\(photo\)/);
  assert.match(html, /function reviewedScene\(photo\)/);
  assert.match(html, /function reviewedList\(photo, field\)/);
  assert.match(html, /class="visually-hidden"/);
  assert.match(html, /id="folder-list"/);
  assert.doesNotMatch(html, /class="lede"/);
  assert.doesNotMatch(html, /class="notice"/);
  assert.match(html, /--archive-blue:#EAF2FF/);
  assert.match(html, /--archive-blue:#293A55/);
  assert.match(html, /id="viewer-details"/);
  assert.match(html, /id="viewer-filename"/);
  assert.match(html, /id="viewer-date"/);
  assert.match(html, /id="viewer-components"/);
  assert.match(html, /id="viewer-scene"/);
  assert.doesNotMatch(html, /class="tile-label"/);
  assert.doesNotMatch(html, /id="viewer-credit"/);
  assert.match(html, /THEME_KEY = "mcretro-theme"/);
  assert.match(html, /data-theme="dark"/);
  assert.match(html, /#FFF8DC/i, 'Main-site light theme background must be retained');
  assert.match(html, /#191D27/i, 'Main-site dark theme background must be retained');
  assert.match(html, /#0009B5/i, 'Main-site light link colour must be retained');
  assert.match(html, /#93C5FD/i, 'Main-site dark link colour must be retained');
  assertSelfContainedScript(html);
});

test('folder browser navigates deeply nested source paths, searches globally and switches themes', async () => {
  const html = read(path.join(photoDir, 'index.html'));
  const source = extractSingleInlineScript(html);
  class FakeElement {
    constructor(tag = 'div') {
      this.tag = tag;
      this.children = [];
      this.attributes = {};
      this.listeners = {};
      this.value = '';
      this.textContent = '';
      this.hidden = false;
    }
    addEventListener(event, callback) { this.listeners[event] = callback; }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name] ?? null; }
    append(...parts) {
      for (const part of parts) {
        if (part.tag === 'fragment') this.children.push(...part.children);
        else this.children.push(part);
      }
    }
    replaceChildren(...parts) { this.children = []; this.append(...parts); }
    showModal() { this.open = true; }
    close() { this.open = false; }
  }
  const ids = new Map();
  const document = {
    documentElement: new FakeElement('html'),
    getElementById(id) {
      if (!ids.has(id)) ids.set(id, new FakeElement());
      return ids.get(id);
    },
    createElement(tag) { return new FakeElement(tag); },
    createDocumentFragment() { return new FakeElement('fragment'); },
  };
  const callbacks = new Map();
  const storage = new Map();
  const location = { hash: '', pathname:'/' };
  const deepUrl = '/albums/serial-001-9876543210.html';
  const albums = [
    { id: 'sega-a', title: 'Serial 001', path: 'consoles/sega/mega-drive/model-1/serial-001' },
    { id: 'nintendo-a', title: 'Serial 002', path: 'consoles/nintendo/game-boy/serial-002' },
  ];
  const photos = [
    { album:'sega-a', title:'Console motherboard', path:'full/consoles/sega/01.jpg.jxl',
      thumbnail:'thumbs/consoles/sega/01.jpg.jxl', alt:'Unverified circuit board',
      caption:'Unreviewed guess', caption_approved:false,
      scene_description:'Unverified solder work',scene_description_approved:false,
      components:['UNVERIFIED-CHIP-123'],components_approved:false },
    { album:'nintendo-a', title:'Game Boy screen', path:'full/consoles/nintendo/02.jpg.jxl',
      thumbnail:'thumbs/consoles/nintendo/02.jpg.jxl',
      caption:'Game Boy display', caption_approved:true,
      alt:'A Game Boy screen', alt_approved:true,
      date_taken:'2012-01-23', date_approved:true,
      scene_description:'Handheld console on a workbench',scene_description_approved:true,
      components:['Sharp LR35902', 'DMG-CPU-04'],components_approved:true,
      search_terms:['handheld motherboard'],search_terms_approved:true },
  ];
  const manifest = { schema_version:1, albums, photos, folders:[
    { path:'consoles', name:'Consoles', parent:'', photo_count:2 },
    { path:'consoles/sega', name:'Sega', parent:'consoles', photo_count:1 },
    { path:'consoles/nintendo', name:'Nintendo', parent:'consoles', photo_count:1 },
    { path:'consoles/sega/mega-drive/model-1/serial-001', name:'Serial 001',
      parent:'consoles/sega/mega-drive/model-1', photo_count:1, url:deepUrl },
  ] };
  const window = {
    matchMedia() { return { matches:false, addEventListener(){} }; },
    addEventListener(name, cb) { callbacks.set(name, cb); },
    history: {
      pushState(_state, _title, url) { location.pathname = url; location.hash = ''; },
      replaceState(_state, _title, url) { location.pathname = url; location.hash = ''; },
    },
  };
  const context = vm.createContext({
    document, window, location,
    localStorage: { getItem(key) { return storage.get(key) || null; },
      setItem(key, value) { storage.set(key, value); } },
    fetch: async () => ({ok:true, json: async () => manifest}),
  });
  vm.runInContext(source, context);
  await new Promise(resolve => setImmediate(resolve));
  const folderButtons = () => document.getElementById('folders').children;
  const openFolder = name => {
    const button = folderButtons().find(item => item.children.some(
      child => child.children.some(entry => entry.textContent === name)));
    assert.ok(button, 'Expected folder button: ' + name);
    button.listeners.click();
  };
  assert.equal(folderButtons().length, 1, 'Top level should show only Consoles');
  assert.equal(document.getElementById('grid').children[0].textContent,
    'Choose a folder above to see its photographs.');
  openFolder('Consoles');
  assert.equal(folderButtons().length, 2);
  openFolder('Sega');
  openFolder('mega drive');
  openFolder('model 1');
  openFolder('Serial 001');
  assert.equal(location.pathname, deepUrl);
  assert.equal(location.hash, '');
  assert.equal(document.getElementById('folder-list').hidden, true, 'Leaf albums hide empty folder headings');
  assert.equal(document.getElementById('count').textContent, '1 photograph');
  assert.equal(document.getElementById('grid').children.length, 1);
  const firstTile = document.getElementById('grid').children[0];
  assert.equal(firstTile.children.length, 1, 'No generic filename or repeated album caption');
  assert.equal(firstTile.getAttribute('aria-label'), 'View photograph 1 of 1 in Serial 001');
  assert.equal(firstTile.children[0].children[0].alt, '');
  firstTile.listeners.click();
  assert.equal(document.getElementById('viewer-title').textContent, 'Photograph 1 of 1');
  assert.equal(document.getElementById('viewer-filename').textContent, '01.jpg');
  assert.equal(document.getElementById('viewer-album').textContent, 'Serial 001');
  assert.equal(document.getElementById('viewer-date').hidden, true);
  assert.equal(document.getElementById('viewer-scene').hidden, true);
  assert.equal(document.getElementById('viewer-components').hidden, true);
  assert.equal(document.getElementById('viewer-caption').hidden, true);
  document.getElementById('viewer').close();
  const crumbs = document.getElementById('breadcrumbs').children;
  assert.ok(crumbs.some(entry => entry.textContent === 'Sega'));
  const input = document.getElementById('search');
  input.value = 'Game Boy screen';
  input.listeners.input();
  assert.equal(document.getElementById('folder-section').hidden, true);
  assert.equal(document.getElementById('count').textContent, '1 photograph',
    'Search must reach a photograph in another collection');
  const reviewedTile = document.getElementById('grid').children[0];
  assert.equal(reviewedTile.children.length, 2, 'Owner-approved caption is visible');
  assert.equal(reviewedTile.children[1].textContent, 'Game Boy display');
  reviewedTile.listeners.click();
  assert.equal(document.getElementById('viewer-caption').textContent, 'Game Boy display');
  assert.equal(document.getElementById('viewer-caption').hidden, false);
  assert.equal(document.getElementById('viewer-date').textContent, '2012-01-23');
  assert.equal(document.getElementById('viewer-date').hidden, false);
  assert.equal(document.getElementById('viewer-image').alt, 'A Game Boy screen');
  assert.equal(document.getElementById('viewer-scene').textContent, 'Handheld console on a workbench');
  assert.equal(document.getElementById('viewer-components').textContent, 'Sharp LR35902, DMG-CPU-04');
  assert.equal(document.getElementById('viewer-components').hidden, false);
  document.getElementById('viewer').close();
  input.value = 'LR35902';
  input.listeners.input();
  assert.equal(document.getElementById('count').textContent, '1 photograph', 'Verified chip IDs are searchable');
  input.value = 'workbench';
  input.listeners.input();
  assert.equal(document.getElementById('count').textContent, '1 photograph', 'Verified scenes are searchable');
  input.value = 'UNVERIFIED-CHIP-123';
  input.listeners.input();
  assert.equal(document.getElementById('count').textContent, '0 photographs', 'Unreviewed guesses must not be searchable');
  input.value = '';
  input.listeners.input();
  assert.equal(document.getElementById('folder-section').hidden, false);
  assert.equal(document.getElementById('count').textContent, '1 photograph');
  const themeButton = document.getElementById('theme-toggle');
  themeButton.listeners.click();
  assert.equal(storage.get('mcretro-theme'), 'dark');
  assert.equal(document.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(themeButton.getAttribute('aria-pressed'), 'true');
  themeButton.listeners.click();
  assert.equal(document.documentElement.getAttribute('data-theme'), 'light');
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
