import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
const read = name => readFileSync(new URL('../../' + name, import.meta.url), 'utf8');
const code = read('assets/js/theme.js');
const header = read('_includes/header.html');
const sidebar = read('_includes/sidebar.html');
const layout = read('_layouts/default.html');
const style = read('assets/css/style.css');
const overrides = read('assets/css/overrides.css');
const blog = read('blog/index.html');
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
test('sidebar action links and monthly archive counts follow the active theme', () => {
  assert.match(style, /\.sidebar-action-link\s*\{[^}]*color:\s*var\(--link\);/);
  assert.match(style, /\.sidebar-action-link:hover,\s*\.sidebar-action-link:focus-visible\s*\{[^}]*color:\s*var\(--link-hover\);/);
  assert.match(style, /\.sidebar-action-link:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--focus\)/);
  assert.match(overrides, /\.archive-month-count\s*\{[^}]*font: 700 1\.25rem\/1\.3 Montserrat/);
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});


test('sidebar Search Go matches months with posts in both colour themes', () => {
  const light = style.split(':root[data-theme="dark"]')[0];
  const dark = style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  for (const token of ['--sidebar-button-bg: #064584;', '--sidebar-button-hover: #00346D;', '--archive-tile: #064584;', '--archive-hover: #00346D;']) {
    assert.ok(light.includes(token), token);
  }
  for (const token of ['--sidebar-button-bg: #93C5FD;', '--sidebar-button-hover: #BFDBFE;', '--archive-tile: #244D78;', '--archive-hover: #2A527F;']) {
    assert.ok(dark.includes(token), token);
  }
  assert.match(style, /\.sidebar \.inline-search-form button\s*\{[^}]*background:\s*var\(--archive-filled\);[^}]*color:\s*var\(--archive-filled-text\);[^}]*font-weight:\s*700;/);
  assert.match(style, /\.sidebar \.inline-search-form button:hover,\s*\.sidebar \.inline-search-form button:focus-visible\s*\{[^}]*background:\s*var\(--archive-filled-hover\);[^}]*color:\s*var\(--archive-filled-text\);/);
  assert.match(style, /\.sidebar-action-link\s*\{[^}]*background:\s*var\(--archive-empty\);[^}]*color:\s*var\(--link\);/);
  assert.match(style, /\.sidebar-action-link:hover,\s*\.sidebar-action-link:focus-visible\s*\{[^}]*background:\s*var\(--archive-filled\);/);
  assert.match(overrides, /\.sidebar a\.archive-calendar-month\.has-posts \{[^}]*background: var\(--archive-filled\);/);
  assert.match(overrides, /\.sidebar a\.archive-calendar-month\.has-posts:hover \{[^}]*background: var\(--archive-filled-hover\);/);
  assert.match(style, /--link:\s*#0009B5;/);
  assert.match(style, /--retro-teal:\s*#008080;/);
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});


test('accordion headers use Archives blues in both modes without changing panel markup', () => {
  const light = overrides.split(':root[data-theme="dark"]')[0];
  const dark = overrides.split(':root[data-theme="dark"]')[1].split('\n/*')[0];
  const lightPalette = style.split(':root[data-theme="dark"]')[0];
  // Keep blue panel surfaces in sync with the actual Archives theme tokens.
  for (const token of [
    '--archive-filled: #EAF2FF;', '--archive-filled-hover: #D5E6FF;',
    '--archive-accent: #064584;'
  ]) assert.ok(lightPalette.includes(token), token);
  for (const token of [
    '--accordion-neutral-bg: #F3EAC9;', '--accordion-neutral-hover: var(--interactive-hover);',
    '--accordion-teal-bg: var(--archive-filled);',
    '--accordion-teal-hover: var(--archive-filled-hover);',
    '--accordion-teal-open: #DBEAFD;',
    '--accordion-teal-open-hover: #C7DCFA;',
    '--accordion-accent: var(--archive-accent);'
  ]) assert.ok(light.includes(token), token);
  for (const token of [
    '--accordion-neutral-bg: #2C3546;', '--accordion-neutral-hover: var(--interactive-hover);',
    '--accordion-teal-bg: var(--archive-filled);', '--accordion-teal-hover: var(--archive-filled-hover);',
    '--accordion-teal-open: #304762;', '--accordion-teal-open-hover: #395575;',
    '--accordion-accent: var(--archive-accent);'
  ]) assert.ok(dark.includes(token), token);
  // Historical class names stay for compatibility, but the dark palette must be blue.
  assert.doesNotMatch(dark, /#2E4142|#3B5D5A|#274A46|#35665E|#2F554F|#3B7368|--accordion-accent: var\(--retro-teal\)/);
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

test('Recent Posts has four entries and paired More posts / random-blog Dial-up buttons', () => {
  assert.match(sidebar, /\{% for post in site\.posts limit:4 %\}/);
  assert.match(sidebar, /<div class="recent-posts-actions">/);
  assert.match(sidebar, /class="recent-posts-more sidebar-action-link" href="\/blog\/"/);
  assert.match(sidebar, /class="recent-posts-dial sidebar-action-link" href="\/homepages\/modem\/\?site=blog-random" data-dial-site="blog-random"/);
  assert.match(sidebar, /class="sidebar-action-link__icon" aria-hidden="true">📚<\/span>/u);
  assert.match(sidebar, /<span class="sidebar-action-link__label">More posts<\/span>/);
  assert.match(sidebar, /<span class="sidebar-action-link__label">Dial-up<\/span>/);
  assert.doesNotMatch(sidebar, /More posts\s*<span[^>]*>→<\/span>/);
  assert.match(sidebar, /class="sidebar-action-link__icon" aria-hidden="true">☎️<\/span>/u);
  assert.match(sidebar, /class="archive-all-link sidebar-action-link" href="\/archive\/"/);
  assert.match(sidebar, /<span class="sidebar-action-link__label">Browse all archives<\/span>/);
  assert.equal((sidebar.match(/class="sidebar-action-link__label"/g) || []).length, 3);
  assert.doesNotMatch(sidebar, /class="widget dial-homepage"/);
  assert.match(sidebar, /<dialog id="mcretro-modem-dialog"/);
  assert.match(overrides, /\.recent-posts-actions\s*\{[^}]*display: flex;[^}]*flex-wrap: wrap;[^}]*justify-content: center;/);
  assert.match(overrides, /\.sidebar \.archive-all-link\s*\{[^}]*display: flex;[^}]*width: fit-content;[^}]*margin-inline: auto;/);
  assert.match(overrides, /\.recent-posts-actions \.sidebar-action-link\s*\{ margin-top: 0; \}/);
  assert.match(style, /\.sidebar-action-link\s*\{[^}]*font-weight:\s*700;/);
  assert.match(style, /\.sidebar-action-link\s*\{[^}]*border-radius:\s*0;/);
});

test('sidebar sections retain divider breathing room without obsolete dial widget', () => {
  assert.match(style, /\.search-widget\s*\{[^}]*padding-bottom:\s*1\.3rem;/);
  const common = overrides.match(/\.sidebar \.archive-widget,\s*\.sidebar \.recent-posts-widget\s*\{([^}]*)\}/)?.[1];
  assert.ok(common, 'Archives and Recent Posts share their divider spacing');
  assert.match(common, /padding-bottom:\s*1\.3rem;/);
  assert.doesNotMatch(overrides, /\.sidebar \.dial-homepage\s*\{/);
  assert.match(style, /\.widget ul\.recent-posts-list\s*\{[^}]*margin-bottom:\s*0;/);
  assert.match(overrides, /\.recent-posts-actions\s*\{[^}]*margin-top: 1rem;/);
  assert.match(overrides, /\.sidebar \.recent-posts-list li:last-child\s*\{[^}]*margin-bottom:\s*0;/);
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


test('Blog pagination is compact, accessible and retains numbered URLs', () => {
  assert.match(blog, /<nav class="pagination-wrapper" aria-label="Blog pagination">/);
  assert.match(blog, /class="page-number current-page" aria-current="page"/);
  assert.match(blog, /class="arrow-link pagination-prev" rel="prev" aria-label="Previous page"/);
  assert.match(blog, /class="arrow-link pagination-next" rel="next" aria-label="Next page"/);
  assert.doesNotMatch(blog, /class="pagination-status"/, 'the page count label is redundant');
  assert.match(blog, /class="pagination-arrows"/);
  assert.match(blog, /class="arrow-placeholder pagination-prev" aria-hidden="true"/);
  assert.match(blog, /class="arrow-placeholder pagination-next" aria-hidden="true"/);
  assert.match(blog, /href="\/blog\/page\{\{ page \}\}\/" class="page-number"/);
  assert.match(blog, /href="\/blog\/page\{\{ paginator.total_pages \}\}\/" class="page-number"/);
  assert.match(style, /\.pagination-bar\s*\{[^}]*border-top: 4px solid var\(--text\);/, 'blog pagination rule matches the sidebar dividers');
  assert.match(style, /\.pagination-wrapper\s*\{[^}]*margin-top: 2rem;[^}]*margin-bottom: 0\.75rem;/);
  assert.match(style, /\.pagination-controls\s*\{[^}]*justify-content: space-between;[^}]*align-items: flex-start;/);
  assert.match(style, /\.pagination-numbers\s*\{[^}]*justify-content: flex-start;/);
  assert.match(style, /\.pagination-arrows\s*\{[^}]*display: flex;/);
  assert.match(style, /\.arrow-placeholder\s*\{[^}]*width: 2\.75rem;/);
  assert.match(style, /\.site-footer \.footer-rule\s*\{[^}]*border: 0\.5px solid var\(--border\);/);
  assert.match(style, /\.current-page\s*\{[^}]*background: var\(--archive-filled\);[^}]*border-top: 0;[^}]*border-radius: 0 0 4px 4px;/);
  assert.match(style, /\.arrow-link\s*\{[^}]*border-top: 0;[^}]*border-radius: 0 0 4px 4px;/);
  assert.match(style, /\.arrow-icon\s*\{[^}]*font-size: 1\.1rem;[^}]*transform: scaleX\(0\.85\);/);
  assert.match(style, /:root\[data-theme="dark"\] \.pagination-arrows \.arrow-link\s*\{[^}]*background: var\(--archive-filled\);[^}]*border-color: var\(--archive-accent\);[^}]*color: var\(--archive-filled-text\);/);
  assert.match(style, /:root\[data-theme="dark"\] \.pagination-arrows \.arrow-link:hover\s*\{[^}]*background: var\(--interactive-hover\);[^}]*color: var\(--link-hover\);/);
  assert.doesNotMatch(style, /:root\[data-theme="light"\] \.pagination-arrows \.arrow-link/, 'Light mode retains its previous button styling');
  assert.match(style, /\.page-number:focus-visible,\s*\.arrow-link:focus-visible\s*\{[^}]*outline: 3px solid var\(--focus\);/);
  assert.match(overrides, /\.pagination-controls\s*\{[^}]*grid-template-columns: 2\.75rem minmax\(0, 1fr\) 2\.75rem;/);
  assert.match(overrides, /\.pagination-arrows\s*\{[^}]*display: contents;/);
  assert.match(overrides, /\.pagination-numbers\s*\{[^}]*justify-content: center;/);
  assert.doesNotMatch(style, /\.pagination-bar a:hover\s*\{[^}]*font-weight:/);
  assert.match(style, /a\.page-number:hover,\s*\.arrow-link:hover\s*\{/);
  assert.doesNotMatch(style, /^\.page-number:hover,/m, "active page should not change on hover");
});

test('interactive hover backgrounds use themed blue without recolouring neutral surfaces', () => {
  const light = style.split(':root[data-theme="dark"]')[0];
  const dark = style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  assert.match(light, /--panel-subtle:\s*#F0EAD9;/);
  assert.match(dark, /--panel-subtle:\s*#303A48;/);
  assert.match(light, /--interactive-hover:\s*var\(--archive-filled-hover\);/);
  assert.match(dark, /--interactive-hover:\s*var\(--archive-filled-hover\);/);
  assert.match(style, /--code-bg:\s*#F0EAD9;/);
  assert.match(style, /--pagefind-ui-tag:\s*var\(--panel-subtle\);/);
  assert.match(style, /a\.page-number:hover,\s*\.arrow-link:hover\s*\{[^}]*background:\s*var\(--interactive-hover\);/);
  assert.match(style, /\.theme-toggle:hover\s*\{\s*background:\s*var\(--interactive-hover\);/);
  assert.match(style, /:root\[data-theme="dark"\] \.pagination-arrows \.arrow-link:hover\s*\{[^}]*background:\s*var\(--interactive-hover\);/);
  assert.match(overrides, /\.post-full \.post-share__action:hover\s*\{[^}]*background:\s*var\(--interactive-hover\);/);
  assert.match(overrides, /\.post-full \.post-share__action\.is-copied\s*\{[^}]*background:\s*var\(--interactive-hover\);/);
  assert.match(overrides, /:root\[data-theme="dark"\] \.theme-toggle:hover\s*\{[^}]*background:\s*var\(--interactive-hover\);/);
  assert.match(overrides, /:root\[data-theme="dark"\] \.nav-toggle:hover\s*\{[^}]*background:\s*var\(--interactive-hover\);/);
  assert.match(overrides, /--accordion-neutral-hover:\s*var\(--interactive-hover\);/);
  assert.match(overrides, /:root:not\(\[data-theme="dark"\]\) \.theme-toggle:hover\s*\{[^}]*background:\s*var\(--archive-filled-hover\);/);
  assert.match(overrides, /\.mcretro-modem-close:hover/, 'Windows-style modem controls remain independently styled');
  assert.doesNotMatch(style + overrides, /--panel-hover|var\(--panel-hover\)/, 'no interactive control uses the old neutral hover token');
});

test('monthly Archives use a matching heading/subheading, breadcrumb and article media', () => {
  const archive = read('_layouts/archive.html');
  const index = read('archive/index.html');
  assert.match(archive, /<nav class="archive-breadcrumbs" aria-label="Breadcrumb">/);
  assert.match(archive, /<a href="\/archive\/">Archives<\/a>/);
  assert.match(archive, /<h1 class="post-title">\{\{ page\.date \| date: "%B %Y" \}\}<\/h1>/);
  assert.match(archive, /<p class="archive-month-count">\{% if month_count == 1 %\}1 article\{% else %\}\{\{ month_count \}\} articles\{% endif %\}<\/p>/);
  assert.doesNotMatch(archive, /<span class="archive-month-count">|class="archive-month-summary"/);
  assert.match(archive, /capture archive_thumbnail/);
  assert.match(archive, /include auto-thumbnail\.html content=post\.content url=post\.url title=post\.title/);
  assert.match(archive, /unless archive_thumbnail == blank/);
  assert.doesNotMatch(archive, /class="author-avatar"/);
  assert.match(archive, /<time class="post-date" datetime=/);
  assert.match(archive, /class="post-categories"/);
  assert.match(overrides, /\.archive-month-header\s*\{[^}]*border-bottom: 0\.5px solid var\(--text\);/);
  assert.match(overrides, /\.archive-month-count\s*\{[^}]*font: 700 1\.25rem\/1\.3 Montserrat/);
  assert.match(overrides, /\.archive-card-layout\s*\{[^}]*display: flex/);
  assert.match(overrides, /\.archive-card-media \.post-thumbnail-img\s*\{[^}]*object-fit: contain/);
  assert.match(overrides, /\.archive-card-layout\s*\{ flex-direction: column/);
  assert.match(index, /permalink: \/archive\//);
  assert.match(index, /<details class="archive-index-year about-panel panel--teal" name="mcretro-archive-years"/);
  assert.match(index, /<summary><span class="about-panel-icon" aria-hidden="true">📅<\/span>/u);
  assert.doesNotMatch(index, /open\{% endif %\}>/, 'all archive years must begin collapsed');
  assert.match(index, /name="mcretro-archive-years">/, 'keep single-open accordion semantics');
  assert.doesNotMatch(overrides, /\.archive-index-year > summary:hover/, 'Archives use the shared accordion hover palette');
  assert.match(index, /data-archive-month="\{\{ year\.name \}\}-\{\{ month_key \}\}"/);
  assert.match(sidebar, /class="archive-all-link sidebar-action-link" href="\/archive\/"/);
  assert.match(header, /page\.url contains "\/archive\/"/);
  assert.match(overrides, /\.archive-index-grid\s*\{[^}]*grid-template-columns: repeat\(4/);
});

test('Goodies links to the Windows 95 dial-up folder with all destinations', () => {
  const goodies = read('goodies.md');
  const modem = read('assets/js/mcretro-dialup.js');
  const modemPage = read('homepages/modem/index.html');
  const connection = read('_includes/modem-connection.html');
  const header = read('_includes/header.html');
  assert.match(goodies, /\[Dial-Up Networking\]\(\/homepages\/modem\/\)/);
  assert.doesNotMatch(goodies, /data-dial-site=/);
  assert.match(modemPage, /data-modem-launch/);
  assert.match(modemPage, /include modem-connection\.html/);
  assert.match(modemPage, /data-modem-new/);
  assert.match(modemPage, /data-modem-target="blog-random"/);
  assert.match(modemPage, /data-modem-target="random"/);
  assert.match(modemPage, /Make New Connection/);
  assert.doesNotMatch(connection, /data-modem-choice/);
  assert.match(modem, /function openConnection\(/);
  assert.match(modem, /assets\/data\/random-post-urls\.json/);
  assert.match(header, /<span class="phrase mobile-tagline">🚀 Blast Processed Since 199X<\/span>/u);
  assert.match(header, /🧪 Trial and Error<\/span>/u);
  assert.match(header, /🧭 Best viewed with Netscape Navigator<\/span>/u);
  assert.match(header, /🌐 Best viewed with Internet Explorer<\/span>/u);
  assert.match(header, /🔎 Do You Yahoo\?<\/span>/u);
  assert.match(header, /🌍 Hack the Planet!<\/span>/u);
  assert.match(header, /💣 Somebody set up us the bomb<\/span>/u);
  assert.match(header, /🛸 Never give up, never surrender!<\/span>/u);
  assert.match(header, /🦭 It's time to seal the deal!!!<\/span>/u);
  // Mobile controls must occupy the logo row, leaving the entire second
  // row for unchanged, single-line, emoji-prefixed rotating taglines.
  const mobileHeader = style.slice(
    style.indexOf('/* Hamburger Menu & Mobile Meta */'),
    style.indexOf('/* Very Small Screens')
  );
  assert.match(mobileHeader, /\.logo-area \{[^}]*display: grid;[^}]*grid-template-columns: minmax\(0, 1fr\) 40px 40px;[^}]*grid-template-rows: auto auto;/);
  assert.match(mobileHeader, /\.textcycle \{[^}]*grid-column: 1 \/ -1;[^}]*grid-row: 2;/);
  assert.match(mobileHeader, /\.textcycle \.phrase \{\s*white-space: nowrap;/);
  assert.match(mobileHeader, /\.nav-toggle \{[^}]*position: static;[^}]*grid-column: 3;[^}]*grid-row: 1;[^}]*transform: none;/);
  assert.match(style, /@media screen and \(max-width: 750px\) \{\s*\.theme-toggle \{[^}]*position: static;[^}]*grid-column: 2;[^}]*grid-row: 1;[^}]*transform: none;/);
  assert.doesNotMatch(mobileHeader, /white-space: normal|text-wrap: balance|overflow-wrap: break-word/);
  assert.doesNotMatch(style + overrides, /padding-right:\s*110px;/);
  assert.match(style, /font-size: clamp\(1\.3rem, 6\.5vw, 1\.7rem\);/);

  assert.doesNotMatch(header, /🦭 It's time to seal the deal<\/span>/u);
});
