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
  for(const value of ['#FFF8DC','#191D27','#006B69','#78D0C3','#005E63','#115B60','#FFFDF2','#242B38'])assert.ok(style.includes(value),value);
  assert.match(style,/:root\[data-theme="dark"\]/);
});
