import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const read = name => readFileSync(new URL('../../' + name, import.meta.url), 'utf8');
const sidebar = read('_includes/sidebar.html');
const layout = read('_layouts/default.html');
const source = read('assets/js/archive-dropdown.js');

function fixture() {
  const handlers = {};
  const visited = [];
  const dropdown = {
    value: '',
    addEventListener(event, callback) { handlers[event] = callback; }
  };
  runInNewContext(source, {
    document: { getElementById: id => id === 'archive-dropdown' ? dropdown : null },
    window: { location: { assign: url => visited.push(url) } }
  });
  return {
    visited,
    change: value => { dropdown.value = value; handlers.change(); }
  };
}

test('archive dropdown uses an external script and no inline handler', () => {
  assert.match(sidebar, /<select id="archive-dropdown">/);
  assert.ok(!sidebar.includes('onchange='));
  assert.ok(layout.includes("'/assets/js/archive-dropdown.js' | relative_url"));
});

test('valid archive months navigate', () => {
  const f = fixture();
  f.change('/archive/2026/10/');
  f.change('/archive/2015/01/');
  assert.deepEqual(f.visited, ['/archive/2026/10/', '/archive/2015/01/']);
});

test('external, invalid and empty destinations are rejected', () => {
  const f = fixture();
  for (const value of ['', 'https://evil.example/', '//evil.example/',
    '/\\evil.example/', 'javascript:alert(1)', '/archive/2026/13/',
    '/archive/2026/00/', '/archive/2026/10/../../evil',
    '/archive/2026/10/?next=evil']) f.change(value);
  assert.deepEqual(f.visited, []);
});

test('pages without archive dropdown are safe', () => {
  assert.doesNotThrow(() => runInNewContext(source, {
    document: { getElementById: () => null }, window: {}
  }));
});
