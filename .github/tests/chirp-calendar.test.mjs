import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../../assets/js/channel-chirp-archive.js', import.meta.url), 'utf8');

function fixture({ contextYear, invalidCounts = false } = {}) {
  const listeners = {};
  const options = [
    {value: '2019', dataset: {counts: invalidCounts ? 'not-numbers' : '0,0,1,0,0,0,0,0,0,0,2,0'}},
    {value: '2018', dataset: {counts: '1,3,2,0,0,0,0,0,0,0,0,0'}}
  ];
  const year = {
    options,
    selectedIndex: 0,
    disabled: true,
    addEventListener(type, fn) { listeners['year:' + type] = fn; }
  };
  const older = {
    disabled: true,
    addEventListener(type, fn) { listeners['older:' + type] = fn; }
  };
  const newer = {
    disabled: true,
    addEventListener(type, fn) { listeners['newer:' + type] = fn; }
  };
  const grid = {
    children: [],
    attributes: {},
    replaceChildren(...nodes) { this.children = nodes; },
    setAttribute(k, v) { this.attributes[k] = v; }
  };
  const targets = {
    '[data-chirp-year]': year,
    '[data-chirp-older]': older,
    '[data-chirp-newer]': newer,
    '[data-chirp-months]': grid
  };
  const root = { querySelector(selector) { return targets[selector] || null; } };
  const document = {
    body: {dataset: {archiveContextYear: contextYear}},
    querySelector(selector) {
      assert.equal(selector, '[data-chirp-calendar]');
      return root;
    },
    createElement(tag) {
      return {
        tag,
        children: [],
        attributes: {},
        append(...nodes) { this.children.push(...nodes); },
        setAttribute(k, v) { this.attributes[k] = v; }
      };
    }
  };
  runInNewContext(script, { document });
  return { grid, year, older, newer, listeners };
}

test('Bird calendar renders the 2019 archive with the same 12 McRetro-style month cells', () => {
  const f = fixture();
  assert.equal(f.year.disabled, false);
  assert.equal(f.year.options.length, 2);
  assert.equal(f.year.selectedIndex, 0);
  assert.equal(f.grid.children.length, 12);
  assert.equal(f.grid.children[2].href, '/chirp/archive/2019/03/');
  assert.equal(f.grid.children[10].href, '/chirp/archive/2019/11/');
  assert.equal(f.grid.children[0].tag, 'span');
  assert.equal(f.grid.children[2].attributes['aria-label'], 'March 2019: 1 adventure');
  assert.equal(f.older.disabled, false);
  assert.equal(f.newer.disabled, true);
});

test('Older/newer buttons and selector navigate only between 2018 and 2019', () => {
  const f = fixture();
  f.listeners['older:click']();
  assert.equal(f.year.selectedIndex, 1);
  assert.equal(f.grid.children[0].href, '/chirp/archive/2018/01/');
  assert.equal(f.grid.children[1].href, '/chirp/archive/2018/02/');
  assert.equal(f.older.disabled, true);
  assert.equal(f.newer.disabled, false);
  f.listeners['newer:click']();
  assert.equal(f.year.selectedIndex, 0);
  f.year.selectedIndex = 1;
  f.listeners['year:change']();
  assert.equal(f.grid.children[2].href, '/chirp/archive/2018/03/');
  assert.ok(f.grid.children.every(item => !item.href ||
    /^\/chirp\/archive\/2018\/\d{2}\/$/.test(item.href)));
});

test('A conure article selects its own year and invalid month counts never become URLs', () => {
  const article = fixture({contextYear: '2018'});
  assert.equal(article.year.selectedIndex, 1);
  assert.match(article.grid.attributes['aria-label'], /2018/);
  const invalid = fixture({invalidCounts: true});
  assert.equal(invalid.grid.children.length, 0);
  assert.equal(invalid.older.disabled, true);
});

test('Calendar code never writes into the unrelated McRetro archive calendar', () => {
  assert.match(script, /querySelector\('\[data-chirp-calendar\]'\)/);
  assert.doesNotMatch(script, /data-archive-calendar|document\.querySelectorAll|innerHTML/);
  assert.match(script, /\/chirp\/archive\//);
  assert.doesNotMatch(script, /\/chirp\/adventures\/|#chirp-month-/);
});
