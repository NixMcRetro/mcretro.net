import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const footer = read('_includes/footer.html');
const css = read('assets/css/style.css');

test('shared footer has no inline styles', () => {
  assert.doesNotMatch(footer, /\bstyle\s*=/i);
  for (const name of ['footer-rule', 'footer-badges', 'footer-badge', 'footer-details', 'footer-pride']) {
    assert.ok(footer.includes('class="' + name + '"'));
    assert.ok(css.includes('.site-footer .' + name + ' {'));
  }
});

test('eight historical footer badges retain their source images', () => {
  const names = [
    'creative.gif', 'nsnow3.gif', 'ie4get.gif', 'icqdl.gif',
    'debian.gif', 'tor.gif', 'mircnow.gif', 'dogecoin.gif'
  ];
  const badges = [...footer.matchAll(/<img\b[^>]*class="footer-badge"[^>]*>/g)];
  assert.equal(badges.length, names.length);
  for (const name of names) {
    assert.ok(footer.includes('src="/assets/images/footer/' + name + '"'));
  }
  assert.match(footer, /biggayroll\.gif/);
  assert.match(footer, /counter\.gif/);
});

test('CSS preserves all original inline footer values', () => {
  const expected = new Map([
    ['footer-rule', ['border: 0.5px solid black;', 'text-align: center;', 'margin: 0 auto 30px;', 'width: 100%;']],
    ['footer-badges', ['text-align: center;']],
    ['footer-badge', ['margin: 2px 1px;']],
    ['footer-details', ['max-width: 80%;', 'min-width: 50%;', 'margin: auto;', 'text-align: center;']],
    ['footer-pride', ['text-align: center;', 'margin: 6px;']]
  ]);
  for (const [name, declarations] of expected) {
    const start = css.indexOf('.site-footer .' + name + ' {');
    assert.ok(start >= 0, name + ' CSS missing');
    const block = css.slice(start, css.indexOf('}', start));
    for (const declaration of declarations) assert.ok(block.includes(declaration), name + ': ' + declaration);
  }
});
