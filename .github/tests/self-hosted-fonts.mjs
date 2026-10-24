import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const read = p => readFileSync(join(root, p), 'utf8');
const layout = read('_layouts/default.html');
const css = read('assets/css/style.css');
const subsets = ['cyrillic-ext','cyrillic','vietnamese','latin-ext','latin'];
const styles = {
  Merriweather: { folder: 'merriweather', modes: ['400-normal','700-normal','400-italic'] },
  Montserrat: { folder: 'montserrat', modes: ['400-normal','700-normal'] }
};

test('Google Fonts requests are absent from main layout; all other scripts remain', () => {
  assert.ok(!layout.includes('fonts.googleapis.com'));
  assert.ok(!layout.includes('fonts.gstatic.com'));
  assert.ok(layout.includes('assets/css/style.css'));
  assert.ok(layout.includes('assets/css/overrides.css'));
  assert.ok(layout.includes("'/assets/js/confetti.js' | relative_url"));
  assert.ok(layout.includes("'/assets/js/mobile-navigation.js' | relative_url"));
  assert.ok(layout.includes("'/assets/js/random-post.js' | relative_url"));
});

test('exact requested font weights, styles and language subsets are self-hosted', () => {
  let totalFaces = 0;
  const faces = [...css.matchAll(/@font-face\s*\{([^}]*)\}/g)].map(match => match[1]);
  for (const [family, config] of Object.entries(styles)) {
    for (const mode of config.modes) {
      const [weight, slant] = mode.split('-');
      for (const subset of subsets) {
        const filename = config.folder + '-' + subset + '-' + mode + '.woff2';
        const path = 'assets/fonts/' + config.folder + '/' + filename;
        const matches = faces.filter(block =>
          block.includes("font-family: '" + family + "'") &&
          block.includes('font-weight: ' + weight + ';') &&
          block.includes('font-style: ' + (slant === 'italic' ? 'italic' : 'normal') + ';') &&
          block.includes(filename)
        );
        assert.equal(matches.length, 1, 'Expected one @font-face for ' + path);
        assert.match(matches[0], /font-display:\s*swap/);
        assert.match(matches[0], /unicode-range:\s*U\+/);
        assert.ok(!matches[0].includes('fonts.gstatic.com'));
        assert.ok(existsSync(join(root, path)), 'Missing WOFF2: ' + path);
        const bytes = readFileSync(join(root, path));
        assert.equal(bytes.subarray(0, 4).toString('ascii'), 'wOF2', path);
        assert.ok(bytes.length > 3000, 'Unusually small font: ' + path);
        totalFaces++;
      }
    }
  }
  assert.equal(totalFaces, 25);
  assert.equal(faces.length, 26, '25 Google web fonts + existing Korataki');
});

test('all WOFF2 font URLs are local, resolvable and unique', () => {
  const paths = [...css.matchAll(/src:\s*url\('\.\.\/fonts\/([^']+\.woff2)'\) format\('woff2'\);/g)].map(m => m[1]);
  assert.equal(paths.length, 25);
  assert.equal(new Set(paths).size, 25);
  for (const p of paths) {
    assert.ok(existsSync(join(root, 'assets/fonts', p)), 'Unresolved file: ' + p);
  }
  assert.ok(!css.includes('fonts.googleapis.com'));
  assert.ok(!css.includes('fonts.gstatic.com'));
});

test('licence notices and font revision provenance are retained', () => {
  for (const font of ['merriweather','montserrat']) {
    const notice=read('assets/fonts/' + font + '/OFL.txt');
    assert.match(notice, /SIL OPEN FONT LICENSE/i);
    assert.match(notice, /Version 1\.1/i);
    assert.match(notice, /Copyright/);
  }
  const readme=read('assets/fonts/README.md');
  assert.match(readme, /v33/);
  assert.match(readme, /v31/);
  assert.match(readme, /Fontsource/);
});

test('original Korataki CSS is preserved, with regular local font fallback stacks', () => {
  assert.match(css, /font-family:\s*'Korataki'/);
  assert.match(css, /korataki\.woff2/);
  assert.match(css, /'Merriweather',\s*Georgia,\s*serif/);
  assert.match(css, /'Montserrat',\s*'Helvetica Neue',\s*sans-serif/);
});

test('no font migration changes to unrelated navigation or GIF animation assets', () => {
  const js=read('assets/js/confetti.js');
  const header=read('_includes/header.html');
  assert.match(js, /mainNav\.getBoundingClientRect\(\)/);
  assert.match(js, /header-runner-sprite/);
  assert.match(header, /id="random-post-link"/);
  assert.match(header, /nav-toggle/);
});
