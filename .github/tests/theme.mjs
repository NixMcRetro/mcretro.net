import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const read = name => readFileSync(new URL('../../' + name, import.meta.url), 'utf8');
const code = read('assets/js/theme.js');
const header = read('_includes/header.html');
const layout = read('_layouts/default.html');
const style = read('assets/css/style.css');
const overrides = read('assets/css/overrides.css');
function fixture(systemDark = false, stored = null, storageFails = false) {
  const handlers = {}, docHandlers = {}, mediaHandlers = {}, attrs = {};
  const btnAttrs = {}, metaAttrs = {};
  const store = new Map(stored ? [['mcretro-theme', stored]] : []);
  const button = {
    setAttribute(k,v) { btnAttrs[k] = String(v); },
    addEventListener(k,fn) { handlers[k] = fn; }
  };
  const meta = { setAttribute(k,v) { metaAttrs[k] = String(v); } };
  const document = {
    readyState: 'loading',
    documentElement: { setAttribute(k,v) { attrs[k] = String(v); }, getAttribute(k) { return attrs[k] || null; } },
    querySelector(s) { return s === '[data-theme-toggle]' ? button : s === 'meta[name="theme-color"]' ? meta : null; },
    addEventListener(k,fn) { docHandlers[k] = fn; }
  };
  const media = { matches: systemDark, addEventListener(k,fn) { mediaHandlers[k] = fn; } };
  const window = {
    matchMedia(s) { assert.equal(s, '(prefers-color-scheme: dark)'); return media; },
    localStorage: {
      getItem(k) { if(storageFails) throw Error('blocked'); return store.get(k) || null; },
      setItem(k,v) { if(storageFails) throw Error('blocked'); store.set(k,v); }
    },
    addEventListener(k,fn) { handlers[k] = fn; }
  };
  runInNewContext(code,{ window, document });
  docHandlers.DOMContentLoaded();
  return {attrs, btnAttrs, metaAttrs, media, mediaHandlers, handlers, store};
}
test('early external script prevents incorrect-theme flash and preserves CSP', () => {
  assert.ok(layout.indexOf('assets/js/theme.js') < layout.indexOf('assets/css/style.css'));
  assert.ok(header.includes('data-theme-toggle') && header.includes('aria-label="Dark theme"'));
  assert.ok(!layout.includes('<script>') && !header.includes('onclick='));
  assert.match(style,/--retro-teal: #008080/);
  assert.match(overrides,/\.mcretro-modem-titlebar[\s\S]*background: #000080/);
  assert.match(style,/\.mcretro-modem-dialog, \.mcretro-modem-card \{ color-scheme: light; \}/);
});
test('first visit respects light/dark system preference', () => {
  const light=fixture(false),dark=fixture(true);
  assert.equal(light.attrs['data-theme'],'light');
  assert.equal(light.btnAttrs['aria-pressed'],'false');
  assert.equal(dark.attrs['data-theme'],'dark');
  assert.equal(dark.metaAttrs.content,'#191D27');
  assert.equal(dark.btnAttrs['aria-pressed'],'true');
});
test('manual selection persists and takes priority over system changes', () => {
  const f=fixture(false);
  f.handlers.click();
  assert.equal(f.store.get('mcretro-theme'),'dark');
  assert.equal(f.attrs['data-theme'],'dark');
  f.media.matches=true;f.mediaHandlers.change();
  assert.equal(f.attrs['data-theme'],'dark');
  f.handlers.click();
  assert.equal(f.store.get('mcretro-theme'),'light');
  assert.equal(f.attrs['data-theme'],'light');
});
test('without manual selection, device changes update page', () => {
  const f=fixture(false);
  f.media.matches=true;f.mediaHandlers.change();
  assert.equal(f.attrs['data-theme'],'dark');
  f.media.matches=false;f.mediaHandlers.change();
  assert.equal(f.attrs['data-theme'],'light');
  assert.equal(f.store.has('mcretro-theme'),false);
});
test('invalid stored value is ignored; storage events sync other tabs', () => {
  const f=fixture(false,'unexpected');
  assert.equal(f.attrs['data-theme'],'light');
  f.store.set('mcretro-theme','dark');
  f.handlers.storage({key:'mcretro-theme'});
  assert.equal(f.attrs['data-theme'],'dark');
});
test('blocked localStorage still permits a page-only manual choice', () => {
  const f=fixture(true,null,true);
  f.handlers.click();
  assert.equal(f.attrs['data-theme'],'light');
  assert.equal(f.btnAttrs['aria-pressed'],'false');
});
test('two stable button positions, WCAG labels and CSS colour tokens', () => {
  assert.match(style,/\.theme-toggle[\s\S]*width: 40px/);
  assert.match(style,/@media screen and \(max-width: 750px\) \{\s*\.theme-toggle/);
  for(const value of ['#FFF8DC','#191D27','#0009B5','#78D0C3','#064584','#115B60','#FFFDF2','#242B38'])assert.ok(style.includes(value),value);
  assert.match(style,/:root\[data-theme="dark"\]/);
});

test('original blue is restored only in Light mode; Dark links remain teal', () => {
  const light = style.split(':root[data-theme="dark"]')[0];
  const dark = style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  assert.match(light, /--link:\s*#0009B5;/);
  assert.match(light, /--link-hover:\s*#000080;/);
  assert.match(light, /--focus:\s*#0009B5;/);
  assert.match(dark, /--link:\s*#78D0C3;/);
  assert.match(dark, /--link-hover:\s*#A5E5D9;/);
});
test('recent sidebar post links underline on hover and keyboard focus', () => {
  assert.match(style, /\.recent-posts-list li a:hover,\s*\.recent-posts-list li a:focus-visible\s*\{[^}]*text-decoration:\s*underline;/);
});
test('Dial-a-Homepage links and monthly archive counts follow the active theme', () => {
  assert.match(overrides, /\.dial-homepage a \{ color: var\(--link\); text-decoration: underline; \}/);
  assert.match(overrides, /\.dial-homepage a:hover \{ color: var\(--link-hover\); \}/);
  assert.match(overrides, /\.dial-homepage a:focus-visible\s*\{[^}]*var\(--focus\)/);
  assert.match(overrides, /\.archive-month-summary\s*\{[^}]*color: var\(--muted\)/);
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});


test('sidebar Search and archive calendar share classic blue only in Light mode', () => {
  const light = style.split(':root[data-theme="dark"]')[0];
  const dark = style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  for (const token of ['--sidebar-button-bg: #064584;', '--sidebar-button-hover: #00346D;', '--archive-tile: #064584;', '--archive-hover: #00346D;']) {
    assert.ok(light.includes(token), token);
  }
  for (const token of ['--sidebar-button-bg: #78D0C3;', '--sidebar-button-hover: #A5E5D9;', '--archive-tile: #115B60;', '--archive-hover: #19757B;']) {
    assert.ok(dark.includes(token), token);
  }
  assert.match(style, /\.sidebar \.inline-search-form button\s*\{[^}]*background:\s*var\(--sidebar-button-bg\);/);
  assert.match(style, /\.sidebar \.inline-search-form button:hover\s*\{[^}]*background:\s*var\(--sidebar-button-hover\);/);
  assert.match(overrides, /\.sidebar a\.archive-calendar-month\.has-posts \{[^}]*background: var\(--archive-tile\);/);
  assert.match(overrides, /\.sidebar a\.archive-calendar-month\.has-posts:hover \{[^}]*background: var\(--archive-hover\);/);
  assert.match(style, /--link:\s*#0009B5;/);
  assert.match(style, /--retro-teal:\s*#008080;/);
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});
