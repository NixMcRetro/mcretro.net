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
  for(const value of ['#FFF8DC','#191D27','#0009B5','#93C5FD','#064584','#244D78','#FFFDF2','#242B38'])assert.ok(style.includes(value),value);
  assert.match(style,/:root\[data-theme="dark"\]/);
});

test('classic blue stays in Light mode; Dark links use soft sky blue', () => {
  const light = style.split(':root[data-theme="dark"]')[0];
  const dark = style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  assert.match(light, /--link:\s*#0009B5;/);
  assert.match(light, /--link-hover:\s*#000080;/);
  assert.match(light, /--focus:\s*#0009B5;/);
  assert.match(dark, /--link:\s*#93C5FD;/);
  assert.match(dark, /--link-hover:\s*#BFDBFE;/);
  assert.match(dark, /--focus:\s*#BFDBFE;/);
  assert.match(dark, /--button-bg:\s*#93C5FD;/);
  assert.match(dark, /--button-hover:\s*#BFDBFE;/);
  assert.match(dark, /--nav-button-bg:\s*#93C5FD;/);
  assert.doesNotMatch(dark, /#78D0C3|#A5E5D9|#115B60|#19757B|#B9EEE6/);
});
test('recent sidebar post links underline on hover and keyboard focus', () => {
  assert.match(style, /\.recent-posts-list li a:hover,\s*\.recent-posts-list li a:focus-visible\s*\{[^}]*text-decoration:\s*underline;/);
});
test('Dial-a-Homepage links and monthly archive counts follow the active theme', () => {
  assert.match(overrides, /\.dial-homepage a \{ color: var\(--link\); text-decoration: none; \}/);
  assert.match(overrides, /\.dial-homepage a:hover,\s*\.dial-homepage a:focus-visible\s*\{[^}]*color: var\(--link-hover\);[^}]*text-decoration:\s*underline;/);
  assert.match(overrides, /\.dial-homepage a:focus-visible\s*\{[^}]*var\(--focus\)/);
  assert.match(overrides, /\.archive-month-summary\s*\{[^}]*color: var\(--muted\)/);
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});


test('sidebar Search and archive calendar use matching blue palettes in both themes', () => {
  const light = style.split(':root[data-theme="dark"]')[0];
  const dark = style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  for (const token of ['--sidebar-button-bg: #064584;', '--sidebar-button-hover: #00346D;', '--archive-tile: #064584;', '--archive-hover: #00346D;']) {
    assert.ok(light.includes(token), token);
  }
  for (const token of ['--sidebar-button-bg: #93C5FD;', '--sidebar-button-hover: #BFDBFE;', '--archive-tile: #244D78;', '--archive-hover: #2A527F;']) {
    assert.ok(dark.includes(token), token);
  }
  assert.match(style, /\.sidebar \.inline-search-form button\s*\{[^}]*background:\s*var\(--sidebar-button-bg\);/);
  assert.match(style, /\.sidebar \.inline-search-form button:hover\s*\{[^}]*background:\s*var\(--sidebar-button-hover\);/);
  assert.match(overrides, /\.sidebar a\.archive-calendar-month\.has-posts \{[^}]*background: var\(--archive-filled\);/);
  assert.match(overrides, /\.sidebar a\.archive-calendar-month\.has-posts:hover \{[^}]*background: var\(--archive-filled-hover\);/);
  assert.match(style, /--link:\s*#0009B5;/);
  assert.match(style, /--retro-teal:\s*#008080;/);
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});


test('accordion headers use Archives blue in Light mode and teal in Dark mode', () => {
  const light = overrides.split(':root[data-theme="dark"]')[0];
  const dark = overrides.split(':root[data-theme="dark"]')[1].split('\n/*')[0];
  const lightPalette = style.split(':root[data-theme="dark"]')[0];
  // Keep blue panel surfaces in sync with the actual Archives theme tokens.
  for (const token of [
    '--archive-filled: #EAF2FF;', '--archive-filled-hover: #D5E6FF;',
    '--archive-accent: #064584;'
  ]) assert.ok(lightPalette.includes(token), token);
  for (const token of [
    '--accordion-neutral-bg: #F3EAC9;', '--accordion-neutral-hover: #E9DDB1;',
    '--accordion-teal-bg: var(--archive-filled);',
    '--accordion-teal-hover: var(--archive-filled-hover);',
    '--accordion-teal-open: #DBEAFD;',
    '--accordion-teal-open-hover: #C7DCFA;',
    '--accordion-accent: var(--archive-accent);'
  ]) assert.ok(light.includes(token), token);
  for (const token of [
    '--accordion-neutral-bg: #2E4142;', '--accordion-neutral-hover: #3B5D5A;',
    '--accordion-teal-bg: #274A46;', '--accordion-teal-hover: #35665E;',
    '--accordion-teal-open: #2F554F;', '--accordion-teal-open-hover: #3B7368;',
    '--accordion-accent: var(--retro-teal);'
  ]) assert.ok(dark.includes(token), token);
  assert.match(overrides, /\.about-panel\.panel--teal\s*\{[^}]*border-left:\s*3px solid var\(--accordion-accent\)/);
  assert.match(overrides, /\.about-panel\.panel--teal > summary:hover,\s*\.about-panel\.panel--teal > summary:focus-visible\s*\{\s*background:\s*var\(--accordion-teal-hover\)/);
  assert.match(overrides, /\.about-panel\.panel--teal\[open\] > summary:hover,\s*\.about-panel\.panel--teal\[open\] > summary:focus-visible\s*\{\s*background:\s*var\(--accordion-teal-open-hover\)/);
  assert.match(overrides, /\.about-panel > summary:focus-visible\s*\{\s*outline:\s*2px solid var\(--focus\)/);
  assert.match(overrides, /\.content-area details\.about-panel > summary\s*\{\s*scroll-margin-top:\s*1rem;/);
});

test('desktop and mobile menus underline on pointer hover and keyboard focus', () => {
  assert.match(style, /\.main-nav a:hover \.nav-text,\s*\.main-nav a:focus-visible \.nav-text\s*\{\s*text-decoration:\s*underline;\s*text-underline-offset:\s*0\.12em;\s*\}/);
  assert.match(style, /\.nav-list li a:hover,\s*\.nav-list li a:focus-visible\s*\{[^}]*text-decoration:\s*none;/);
});

test('Channels keeps emoji and links, without old summary siren GIFs', () => {
  const channels = read('channels.md');
  assert.ok(!channels.includes('/assets/images/about/siren.gif'));
  assert.equal((channels.match(/<summary markdown="span">/g) || []).length, 4);
  for (const name of ['🎸 Nix McRetro', '👾 McRetro Gaming', '🪲 Super Nature World', '🦜 Channel Chirp']) {
    assert.ok(channels.includes(name), name);
  }
  for (const handle of ['@NixMcRetro', '@McRetroGaming', '@SuperNatureWorld', '@ChannelChirp']) {
    assert.ok(channels.includes(handle), handle);
  }
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});


test('navigation hover underlines words without bolding or shifting adjacent items', () => {
  for(const [emoji, word] of [['🏡','Home'],['✏️','Blog'],['📺','Channels'],['💾','Goodies'],['🌏','Random'],['📡','About']]) {
    assert.ok(header.includes('<span class="nav-emoji" aria-hidden="true">' + emoji + '</span> <span class="nav-text">' + word + '</span>'), word);
  }
  assert.equal((header.match(/class="nav-text"/g) || []).length, 6);
  const labelHoverRule = style.match(/\.main-nav a:hover \.nav-text,\s*\.main-nav a:focus-visible \.nav-text\s*\{([^}]*)\}/)?.[1];
  assert.ok(labelHoverRule, 'text-only nav hover and focus rule exists');
  assert.doesNotMatch(labelHoverRule, /font-weight\s*:/, 'hover must not change font weight or item widths');
  assert.match(style, /\.main-nav a\s*\{[^}]*font-weight:\s*normal;/, 'regular menu links remain normal weight');
  assert.match(style, /\.main-nav a\.active\s*\{[^}]*font-weight:\s*bold;/, 'current-page highlight remains unchanged');
  assert.match(style, /\.main-nav a:hover,\s*\.main-nav a:focus-visible\s*\{[^}]*text-decoration:\s*none;/);
  assert.match(style, /\.main-nav a:hover \.nav-text,\s*\.main-nav a:focus-visible \.nav-text\s*\{\s*text-decoration:\s*underline;\s*text-underline-offset:\s*0\.12em;\s*\}/);
  assert.match(style, /\.nav-list li a:hover,\s*\.nav-list li a:focus-visible\s*\{[^}]*text-decoration:\s*none;/);
});

test('Dial-a-Homepage link behaves as an ordinary unbolded link', () => {
  assert.match(overrides, /\.dial-homepage a \{ color: var\(--link\); text-decoration: none; \}/);
  assert.match(overrides, /\.dial-homepage-random\s*\{[^}]*font-weight:\s*400;/);
  assert.match(overrides, /\.dial-homepage a:hover,\s*\.dial-homepage a:focus-visible\s*\{[^}]*text-decoration:\s*underline;/);
});

test('calendar keeps four month columns with compact themed filled and empty tiles', () => {
  const light=style.split(':root[data-theme="dark"]')[0];
  const dark=style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  for(const token of ['--archive-tile: #064584;', '--archive-filled: #EAF2FF;', '--archive-filled-hover: #D5E6FF;', '--archive-filled-text: #064584;'])assert.ok(light.includes(token),token);
  for(const token of ['--archive-tile: #244D78;', '--archive-filled: #293A55;', '--archive-filled-hover: #2B405E;', '--archive-filled-text: #BFDBFE;'])assert.ok(dark.includes(token),token);
  assert.match(overrides, /grid-template-columns: repeat\(4, minmax\(0, 1fr\)\)/);
  assert.match(overrides, /min-height:\s*3\.2rem/);
  assert.match(overrides, /\.sidebar a\.archive-calendar-month\.has-posts \{[^}]*color:\s*var\(--archive-filled-text\);[^}]*background:\s*var\(--archive-filled\)/);
  assert.match(overrides, /\.sidebar \.archive-calendar-month\.is-empty\s*\{[^}]*color:\s*var\(--muted\)/);
  assert.match(overrides, /\.sidebar a\.archive-calendar-month\.has-posts:focus-visible\s*\{[^}]*outline:\s*3px solid #ffc857/);
});


test('About portrait reuses blog media-caption markup and compact photo spacing', () => {
  const about = read('about.md');
  const expectedCaption = [
    '![Future Lost](/assets/images/about/futurelost.jxl){: width="600" }',
    '',
    '*An artefact from a timeline that never existed.*',
    '{: .media-caption }'
  ].join(String.fromCharCode(10));
  assert.ok(about.includes(expectedCaption), 'About uses the same Kramdown caption class as blog images');
  assert.ok(overrides.includes('.about-panel > .center > p:has(> img:only-child):has(+ p.media-caption)'));
  assert.ok(overrides.includes('.about-panel > .center > p:has(> img:only-child) + p.media-caption'));
  assert.ok(overrides.includes('margin-inline: auto;'), 'photo stays centred when displayed as a block');
  assert.ok(overrides.includes('margin-bottom: 0.25rem;'), 'reuses the compact blog caption gap');
  assert.ok(!about.includes('Me-1988.jpg'));
  assert.ok(!about.includes('<picture>') && !about.includes('srcset='), 'no JXL fallback is added');
});
