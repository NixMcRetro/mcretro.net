import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const sidebar = read('_includes/sidebar.html'), layout = read('_layouts/default.html');
const code = read('assets/js/archive-calendar.js'), css = read('assets/css/overrides.css');

function fixture() {
  const handlers = {};
  class El {
    constructor(tag) { this.tag = tag; this.children = []; this.attrs = {}; }
    append(...x) { this.children.push(...x); }
    setAttribute(k, v) { this.attrs[k] = v; }
  }
  const grid = new El('div');
  grid.replaceChildren = (...x) => { grid.children = x; };
  const select = { disabled: true, selectedIndex: 0,
    options: [
      { value: '2026', dataset: { counts: '2,1,0,0,0,0,0,0,0,0,0,0' } },
      { value: '2016', dataset: { counts: '17,9,25,6,3,4,5,0,0,0,0,0' } },
      { value: '2012', dataset: { counts: '0,0,1,0,0,0,0,0,0,0,0,0' } }
    ],
    addEventListener: (_t, cb) => { handlers.change = cb; } };
  const older = { disabled: true, addEventListener: (_t, cb) => { handlers.older = cb; } };
  const newer = { disabled: true, addEventListener: (_t, cb) => { handlers.newer = cb; } };
  const els = { '[data-archive-year]': select, '[data-archive-older]': older,
    '[data-archive-newer]': newer, '[data-archive-months]': grid };
  runInNewContext(code, { document: { querySelector: x =>
    x === '[data-archive-calendar]' ? { querySelector: k => els[k] } : null,
    createElement: tag => new El(tag) } });
  return { grid, select, newer, older, handlers };
}
test('sidebar order and no redundant navigation', () => {
  assert.ok(sidebar.indexOf('search-widget') < sidebar.indexOf('archive-widget'));
  assert.ok(sidebar.indexOf('archive-widget') < sidebar.indexOf('Recent Posts'));
  assert.ok(sidebar.indexOf('Recent Posts') < sidebar.indexOf('Dial-a-Homepage'));
  assert.ok(sidebar.includes('site.posts limit:3'));
  assert.ok(!sidebar.includes('View All Posts') && !sidebar.includes('archive-dropdown'));
});
test('Jekyll supplies 12 months per year and direct archive links', () => {
  assert.ok(sidebar.includes('group_by_exp: "post", "post.date | date: \'%Y\'"'));
  assert.ok(sidebar.includes('group_by_exp: "post", "post.date | date: \'%m\'"'));
  assert.ok(sidebar.includes('for m in (1..12)'));
  assert.ok(sidebar.includes('data-counts='));
  assert.ok(sidebar.includes('if count > 0'));
  assert.ok(sidebar.includes('class="archive-calendar-month is-empty"'));
  assert.ok(sidebar.includes('href="/archive/{{ latest_year.name }}/{{ month_key }}/"'));
  assert.ok(css.includes('grid-template-columns: repeat(4, minmax(0, 1fr))'));
});
test('CSP external JS and no inline click handlers', () => {
  assert.ok(layout.includes("'/assets/js/archive-calendar.js' | relative_url"));
  assert.ok(!layout.includes('archive-dropdown.js'));
  assert.ok(!sidebar.includes('onchange=') && !sidebar.includes('onclick='));
});
test('year navigation, 12 tiles, blue links and zero-month disabled cells', () => {
  const f = fixture();
  assert.equal(f.select.disabled, false);
  assert.equal(f.grid.children.length, 12);
  assert.equal(f.newer.disabled, true);
  f.handlers.older();
  assert.equal(f.select.selectedIndex, 1);
  assert.equal(f.grid.children[0].href, '/archive/2016/01/');
  assert.equal(f.grid.children[0].children[1].textContent, '17 Posts');
  assert.equal(f.grid.children[2].children[1].textContent, '25 Posts');
  assert.equal(f.grid.children[7].tag, 'span');
  assert.equal(f.grid.children[7].href, undefined);
  assert.equal(f.grid.children[7].children[1].textContent, '0 Posts');
  assert.equal(f.grid.children.length, 12);
  f.select.selectedIndex = 2; f.handlers.change();
  assert.equal(f.older.disabled, true);
  assert.equal(f.newer.disabled, false);
  f.handlers.newer();
  assert.equal(f.select.selectedIndex, 1);
});
test('invalid data or missing calendar is safe', () => {
  assert.doesNotThrow(() => runInNewContext(code, { document: { querySelector: () => null } }));
  const f = fixture(), before = f.grid.children;
  f.select.selectedIndex = 1;
  f.select.options[1].dataset.counts = '0,1,2';
  f.handlers.change();
  assert.equal(f.grid.children, before);
});
