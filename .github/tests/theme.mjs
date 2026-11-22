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
const postTemplate = read('_layouts/post.html');
function fixture(systemDark = false, stored = null, storageFails = false, defaultBird = false, context = {}) {
  const handlers = {}, docHandlers = {}, mediaHandlers = {}, attrs = defaultBird ? {'data-default-theme':'bird','data-chirp-landing':'true'} : {};
  if (context.unrelated) attrs['data-chirp-unrelated'] = 'true';
  if (context.article) attrs['data-chirp-article'] = 'true';
  const navigations = [];
  const navigationStore = context.navigationStore || new Map();
  const pathname = context.path || (defaultBird ? '/chirp/' : '/');
  const btnAttrs = {}, metaAttrs = {};
  const store = new Map(stored ? [['mcretro-theme', stored]] : []);
  if (context.standard) store.set('mcretro-last-standard-theme', context.standard);
  const exitLink = {
    getAttribute(k) { return k === 'data-theme-exit' ? 'standard' : null; },
    addEventListener(k,fn) { if (k === 'click') handlers.exitClick = fn; }
  };
  const chirpLink = {
    addEventListener(k, fn) { if (k === 'click') handlers.chirpClick = fn; }
  };
  const button = {
    setAttribute(k,v) { btnAttrs[k] = String(v); },
    addEventListener(k,fn) { handlers[k] = fn; }
  };
  const meta = { setAttribute(k,v) { metaAttrs[k] = String(v); } };
  const document = {
    readyState: 'loading',
    documentElement: { setAttribute(k,v) { attrs[k] = String(v); }, getAttribute(k) { return attrs[k] || null; } },
    querySelector(s) { return s === '[data-theme-toggle]' ? button : s === 'meta[name="theme-color"]' ? meta : null; },
    querySelectorAll(s) {
      if (s === '[data-theme-exit]') return context.exitLink ? [exitLink] : [];
      if (s === '[data-chirp-view-post]') return context.article ? [chirpLink] : [];
      return [];
    },
    addEventListener(k,fn) { docHandlers[k] = fn; }
  };
  const media = { matches: systemDark, addEventListener(k,fn) { mediaHandlers[k] = fn; } };
  const window = {
    location: {
      pathname,
      origin: 'https://mcretro.net',
      href: 'https://mcretro.net' + pathname + (context.search || ''),
      search: context.search || '',
      hash: context.hash || '',
      assign(url) { navigations.push({ method: 'assign', url }); },
      replace(url) { navigations.push({ method: 'replace', url }); }
    },
    matchMedia(s) { assert.equal(s, '(prefers-color-scheme: dark)'); return media; },
    localStorage: {
      getItem(k) { if(storageFails) throw Error('blocked'); return store.get(k) || null; },
      setItem(k,v) { if(storageFails) throw Error('blocked'); store.set(k,v); }
    },
    sessionStorage: {
      getItem(k) { if(storageFails) throw Error('blocked'); return navigationStore.get(k) || null; },
      setItem(k,v) { if(storageFails) throw Error('blocked'); navigationStore.set(k,v); },
      removeItem(k) { if(storageFails) throw Error('blocked'); navigationStore.delete(k); }
    },
    addEventListener(k,fn) { handlers[k] = fn; }
  };
  runInNewContext(code,{ window, document, URL });
  docHandlers.DOMContentLoaded();
  return {attrs, btnAttrs, metaAttrs, media, mediaHandlers, handlers, docHandlers, store, navigationStore, navigations};
}
test('core: early external script prevents incorrect-theme flash and preserves CSP', () => {
  assert.ok(layout.indexOf('assets/js/theme.js') < layout.indexOf('assets/css/style.css'));
  assert.ok(header.includes('data-theme-toggle') &&
    header.includes('aria-label="Switch to Dark Mode"'));
  assert.ok(!layout.includes('<script>') && !header.includes('onclick='));
  assert.match(layout, /assets\/css\/bird-theme\.css/);
  assert.match(layout, /data-default-theme="bird"/);
  assert.match(style,/--retro-teal: #008080/);
  assert.match(overrides,/\.mcretro-modem-titlebar[\s\S]*background: #000080/);
  assert.match(style,/\.mcretro-modem-dialog, \.mcretro-modem-card \{ color-scheme: light; \}/);
});

test('core: first visit respects light/dark system preference on non-bird pages', () => {
  const light=fixture(false),dark=fixture(true);
  assert.equal(light.attrs['data-theme'],'light');
  assert.equal(light.btnAttrs['aria-label'], 'Switch to Dark Mode');
  assert.equal(light.btnAttrs.title, 'Switch to Dark Mode');
  assert.equal(dark.attrs['data-theme'],'dark');
  assert.equal(dark.metaAttrs.content,'#191D27');
  assert.equal(dark.btnAttrs['aria-label'], 'Visit Channel Chirp');
  assert.equal(dark.btnAttrs.title, 'Visit Channel Chirp');
});

test('core: theme button cycles Light, Dark, Bird, Light and remembers the filter', () => {
  const f=fixture(false);
  f.handlers.click();
  assert.equal(f.store.get('mcretro-theme'),'dark');
  assert.equal(f.store.get('mcretro-last-standard-theme'),'dark');
  assert.equal(f.attrs['data-theme'],'dark');
  f.handlers.click();
  assert.equal(f.store.get('mcretro-theme'),'bird');
  assert.equal(f.store.get('mcretro-last-standard-theme'),'dark');
  assert.equal(f.attrs['data-theme'],'bird');
  assert.equal(f.metaAttrs.content,'#424242');
  assert.deepEqual(f.navigations.at(-1), { method:'assign', url:'/chirp/' });
  assert.equal(f.btnAttrs['aria-label'], 'Switch to Light Mode');
  assert.equal(f.btnAttrs.title, 'Switch to Light Mode');
  f.handlers.click();
  assert.equal(f.store.get('mcretro-theme'),'light');
  assert.equal(f.attrs['data-theme'],'light');
});

test('core: opening /chirp/ activates Bird; turning it off returns to McRetro Home', () => {
  const f=fixture(false,'dark',false,true);
  assert.equal(f.attrs['data-theme'],'bird');
  assert.equal(f.store.get('mcretro-theme'),'bird');
  assert.equal(f.store.get('mcretro-last-standard-theme'),'dark',
    'explicit Bird destination must remember the previous McRetro colour');
  f.handlers.click();
  assert.equal(f.attrs['data-theme'],'light');
  assert.deepEqual(f.navigations.at(-1), {method:'assign',url:'/'});
});

test('core: McRetro Home and the Nest are paired across theme switches', () => {
  const home=fixture(false,null,false,false,{unrelated:true,path:'/'});
  home.handlers.click();
  assert.equal(home.attrs['data-theme'],'dark');
  assert.equal(home.navigations.length,0,'Light to Dark should not leave McRetro Home');
  home.handlers.click();
  assert.deepEqual(home.navigations.at(-1), {method:'assign',url:'/chirp/'});

  const nest=fixture(false,'bird',false,true,{path:'/chirp/'});
  nest.handlers.click();
  assert.equal(nest.attrs['data-theme'],'light');
  assert.deepEqual(nest.navigations.at(-1), {method:'assign',url:'/'});
  assert.match(read('chirp/index.md'), /permalink: \/chirp\//);
});

test('core: Goodies and Soundborb are paired across theme switches', () => {
  const goodies=fixture(false,null,false,false,{unrelated:true,path:'/goodies/'});
  goodies.handlers.click();
  assert.equal(goodies.attrs['data-theme'],'dark');
  assert.equal(goodies.navigations.length,0,'Light to Dark should not leave Goodies');
  goodies.handlers.click();
  assert.deepEqual(goodies.navigations.at(-1), {method:'assign',url:'/chirp/soundborb/'});

  const soundborb=fixture(false,'bird',false,true,{path:'/chirp/soundborb/'});
  soundborb.handlers.click();
  assert.equal(soundborb.attrs['data-theme'],'light');
  assert.deepEqual(soundborb.navigations.at(-1), {method:'assign',url:'/goodies/'});
  assert.match(read('chirp/soundborb/index.md'), /permalink: \/chirp\/soundborb\//);
});

test('core: Blog and Adventures remain paired when cycling Light, Dark and Bird', () => {
  const blog=fixture(false,null,false,false,{unrelated:true,path:'/blog/'});
  blog.handlers.click();
  assert.equal(blog.attrs['data-theme'],'dark');
  assert.equal(blog.navigations.length,0,'Light to Dark stays on Blog');
  blog.handlers.click();
  assert.deepEqual(blog.navigations.at(-1), {method:'assign',url:'/chirp/adventures/'});

  const adventures=fixture(false,'bird',false,true,{path:'/chirp/adventures/'});
  adventures.handlers.click();
  assert.equal(adventures.attrs['data-theme'],'light');
  assert.deepEqual(adventures.navigations.at(-1), {method:'assign',url:'/blog/'});

  // Pagination maps to the counterpart's first page, not an unrelated Nest page.
  const blogPage=fixture(false,'dark',false,false,{unrelated:true,path:'/blog/page3/'});
  blogPage.handlers.click();
  assert.deepEqual(blogPage.navigations.at(-1), {method:'assign',url:'/chirp/adventures/'});
  const birdPage=fixture(false,'bird',false,true,{path:'/chirp/adventures/page2/'});
  birdPage.handlers.click();
  assert.deepEqual(birdPage.navigations.at(-1), {method:'assign',url:'/blog/'});
});

test('core: About and Channel Chirp About remain paired across modes', () => {
  const about=fixture(false,null,false,false,{unrelated:true,path:'/about/'});
  about.handlers.click();
  assert.equal(about.attrs['data-theme'],'dark');
  assert.equal(about.navigations.length,0,'Light to Dark stays on About');
  about.handlers.click();
  assert.deepEqual(about.navigations.at(-1), {method:'assign',url:'/chirp/about/'});

  const birdAbout=fixture(false,'bird',false,true,{path:'/chirp/about/'});
  birdAbout.handlers.click();
  assert.equal(birdAbout.attrs['data-theme'],'light');
  assert.deepEqual(birdAbout.navigations.at(-1), {method:'assign',url:'/about/'});
  assert.match(read('chirp/about/index.md'), /permalink: \/chirp\/about\//);
  assert.match(read('chirp/adventures/index.md'), /permalink: \/chirp\/adventures\//);
});

test('core: direct McRetro links never redirect when Bird was the saved experience', () => {
  for (const path of ['/', '/about/', '/blog/', '/blog/page3/', '/goodies/',
    '/channels/', '/kodi-until-when/']) {
    const f=fixture(false,'bird',false,false,
      {unrelated:true,path,standard:'dark',search:'?utm_source=external',hash:'#notes'});
    assert.equal(f.attrs['data-theme'],'dark', 'remembered Dark is used for ' + path);
    assert.equal(f.navigations.length,0, 'requested URL is preserved for ' + path);
    assert.equal(f.store.get('mcretro-theme'),'bird', 'visiting McRetro does not erase Bird choice');
  }
  const light=fixture(true,'bird',false,false,
    {unrelated:true,path:'/kodi-until-when/',standard:'light'});
  assert.equal(light.attrs['data-theme'],'light', 'remembered Light overrides system Dark');
  assert.equal(light.navigations.length,0);
});

test('core: older saved Bird preference falls back to system Light/Dark', () => {
  const dark=fixture(true,'bird',false,false,
    {unrelated:true,path:'/kodi-until-when/'});
  assert.equal(dark.attrs['data-theme'],'dark');
  assert.equal(dark.navigations.length,0);
  dark.media.matches=false;
  dark.mediaHandlers.change();
  assert.equal(dark.attrs['data-theme'],'light',
    'unconfigured last-standard fallback responds to system changes');
  const light=fixture(false,'bird',false,false,
    {unrelated:true,path:'/kodi-until-when/'});
  assert.equal(light.attrs['data-theme'],'light');
  assert.equal(light.navigations.length,0);
});

test('core: explicit Bird destinations are authoritative, preserving McRetro preference', () => {
  const bird=fixture(false,'dark',false,true,
    {path:'/chirp/adventures/',standard:'light',exitLink:true});
  assert.equal(bird.attrs['data-theme'],'bird');
  assert.equal(bird.store.get('mcretro-last-standard-theme'),'dark',
    'most recent standard choice is saved on entry into Bird');
  bird.handlers.exitClick();
  assert.equal(bird.store.get('mcretro-theme'),'dark');
  assert.equal(bird.attrs['data-theme'],'dark');

  const standard=fixture(false,'bird',false,false,
    {unrelated:true,path:'/kodi-until-when/',standard:'dark'});
  standard.handlers.click();
  assert.equal(standard.attrs['data-theme'],'bird',
    'the existing toggle can still deliberately enter Bird');
  assert.deepEqual(standard.navigations.at(-1), {method:'assign',url:'/chirp/'});
});

test('core: another tab and back navigation never hijack the requested URL', () => {
  const standard=fixture(false,'bird',false,false,
    {unrelated:true,path:'/kodi-until-when/',standard:'dark'});
  standard.store.set('mcretro-last-standard-theme','light');
  standard.handlers.storage({key:'mcretro-last-standard-theme'});
  assert.equal(standard.attrs['data-theme'],'light');
  assert.equal(standard.navigations.length,0);
  standard.store.set('mcretro-theme','dark');
  standard.handlers.storage({key:'mcretro-theme'});
  assert.equal(standard.attrs['data-theme'],'dark');
  standard.store.set('mcretro-theme','bird');
  standard.handlers.storage({key:'mcretro-theme'});
  assert.equal(standard.attrs['data-theme'],'light');
  standard.handlers.pageshow({persisted:true});
  assert.equal(standard.attrs['data-theme'],'light');
  assert.equal(standard.navigations.length,0);

  const bird=fixture(false,'bird',false,true,
    {path:'/chirp/about/',standard:'dark'});
  bird.store.set('mcretro-theme','light');
  bird.handlers.storage({key:'mcretro-theme'});
  assert.equal(bird.attrs['data-theme'],'bird');
  bird.handlers.pageshow({persisted:true});
  assert.equal(bird.attrs['data-theme'],'bird');
  assert.equal(bird.store.get('mcretro-theme'),'bird');
  assert.equal(bird.navigations.length,0);
});

test('core: released conure articles retain the existing Bird and Light toggling', () => {
  const article=fixture(false,'bird',false,false,{article:true});
  assert.equal(article.attrs['data-theme'],'bird');
  assert.equal(article.navigations.length,0);
  article.handlers.click();
  assert.equal(article.attrs['data-theme'],'light');
  assert.equal(article.navigations.length,0,'Light can read original conure post layout');
});


test('core: View in Channel Chirp changes only the current conure article theme', () => {
  assert.match(postTemplate, /page.categories contains 'parrots' and page.channel_chirp != false/);
  assert.match(postTemplate, /href="\/chirp\/adventures\/" data-chirp-view-post>🦜 View in Channel Chirp<\/a>/);
  assert.match(overrides, /:root\[data-theme="bird"\] \.chirp-view-invitation \{\s*display: none;/);

  const article = fixture(false, 'dark', false, false,
    {article:true, path:'/the-first-day/', standard:'dark'});
  assert.equal(article.attrs['data-theme'], 'dark');
  const e = {button:0, defaultPrevented:false, preventDefault() { this.defaultPrevented = true; }};
  article.handlers.chirpClick(e);
  assert.equal(e.defaultPrevented, true, 'normal click switches theme in place');
  assert.equal(article.attrs['data-theme'], 'bird');
  assert.equal(article.store.get('mcretro-theme'), 'bird');
  assert.equal(article.store.get('mcretro-last-standard-theme'), 'dark');
  assert.equal(article.navigations.length, 0, 'same article URL remains untouched');
  article.handlers.click();
  assert.equal(article.attrs['data-theme'], 'light', 'theme toggle still exits Bird');
  assert.equal(article.navigations.length, 0);

  const modified = fixture(false,'dark',false,false,{article:true,path:'/the-first-day/'});
  const ctrl = {button:0,ctrlKey:true,defaultPrevented:false,preventDefault(){this.defaultPrevented=true;}};
  modified.handlers.chirpClick(ctrl);
  assert.equal(ctrl.defaultPrevented,false,'modified click retains normal hyperlink/new-tab behaviour');
  assert.equal(modified.attrs['data-theme'],'dark');
  const unrelated = fixture(false,'dark',false,false,{unrelated:true,path:'/kodi-until-when/'});
  assert.equal(typeof unrelated.handlers.chirpClick,'undefined','ordinary McRetro posts have no Bird invitation');
});


test('core: standard archive and Pagefind links preserve the visible Light/Dark theme on conure articles', () => {
  const navigationStore = new Map();
  function navigate(fixtureResult, url, options = {}) {
    const anchor = {
      href: url,
      target: options.target || '',
      hasAttribute(name) { return name === 'download' && !!options.download; }
    };
    fixtureResult.docHandlers.click({
      button: options.button ?? 0,
      ctrlKey: !!options.ctrlKey, metaKey: !!options.metaKey,
      defaultPrevented: false,
      target: {closest(selector) {
        assert.equal(selector, 'a[href]');
        return anchor;
      }}
    });
  }

  // A previously stored Bird selection can display Dark on a normal archive.
  // Opening its conure article must keep Dark rather than exposing old Bird.
  const archive = fixture(false,'bird',false,false,{
    unrelated:true, path:'/archive/2018/01/', standard:'dark', navigationStore
  });
  assert.equal(archive.attrs['data-theme'],'dark');
  navigate(archive,'https://mcretro.net/sprinkles-and-pudding/');
  const article = fixture(false,'bird',false,false,{
    article:true,path:'/sprinkles-and-pudding/',standard:'dark',navigationStore
  });
  assert.equal(article.attrs['data-theme'],'dark');
  assert.equal(article.navigations.length,0,'preserve the original article permalink');
  assert.equal(article.store.get('mcretro-theme'),'bird',
    'do not rewrite the remembered Bird preference just to follow a link');
  assert.equal(navigationStore.size,0,'navigation intent is consumed on arrival');

  // The same event delegation catches Pagefind search results added after load.
  const search=fixture(false,'bird',false,false,{
    unrelated:true,path:'/search/',search:'?q=sprinkles',standard:'light',navigationStore
  });
  assert.equal(search.attrs['data-theme'],'light');
  navigate(search,'/sprinkles-and-pudding-feast/');
  const found=fixture(false,'bird',false,false,{
    article:true,path:'/sprinkles-and-pudding-feast/',standard:'light',navigationStore
  });
  assert.equal(found.attrs['data-theme'],'light');

  // Carry the displayed standard theme through further article-to-article links.
  navigate(found,'/the-first-day/');
  const next=fixture(false,'bird',false,false,{
    article:true,path:'/the-first-day/',standard:'light',navigationStore
  });
  assert.equal(next.attrs['data-theme'],'light');

  // The explicit invitation still enters the Nest without changing the URL.
  const click={button:0,defaultPrevented:false,preventDefault() {this.defaultPrevented=true;}};
  next.handlers.chirpClick(click);
  assert.equal(click.defaultPrevented,true);
  assert.equal(next.attrs['data-theme'],'bird');
  assert.equal(next.navigations.length,0);

  // Following a link from a real Bird page must remain in Bird Mode.
  const bird=fixture(false,'bird',false,true,{path:'/chirp/adventures/',navigationStore});
  navigate(bird,'/the-first-day/');
  const conure=fixture(false,'bird',false,false,{
    article:true,path:'/the-first-day/',navigationStore
  });
  assert.equal(conure.attrs['data-theme'],'bird');

  // External, modified, and new-tab clicks do not write navigation context.
  const normal=fixture(false,'bird',false,false,{
    unrelated:true,path:'/archive/2018/01/',standard:'dark',navigationStore
  });
  navigate(normal,'https://example.org/sprinkles/');
  navigate(normal,'/the-first-day/',{metaKey:true});
  navigate(normal,'/the-first-day/',{target:'_blank'});
  navigate(normal,'/the-first-day/',{download:true});
  navigate(normal,'/archive/2018/01/');
  assert.equal(navigationStore.size,0);
});

test('core: navigation intent is one-shot, path-bound, and expires safely', () => {
  const navigationStore = new Map();
  const key='mcretro-next-article-theme';
  navigationStore.set(key,JSON.stringify({
    path:'/the-first-day/',theme:'light',at:Date.now()-120000
  }));
  const expired=fixture(false,'bird',false,false,{
    article:true,path:'/the-first-day/',navigationStore
  });
  assert.equal(expired.attrs['data-theme'],'bird');
  assert.equal(navigationStore.size,0);

  navigationStore.set(key,JSON.stringify({
    path:'/the-first-day/',theme:'dark',at:Date.now()
  }));
  const wrongPath=fixture(false,'bird',false,false,{
    article:true,path:'/sprinkles-and-pudding/',navigationStore
  });
  assert.equal(wrongPath.attrs['data-theme'],'bird');
  assert.equal(navigationStore.size,0);

  navigationStore.set(key,'not JSON');
  const corrupt=fixture(false,'bird',false,false,{
    article:true,path:'/the-first-day/',navigationStore
  });
  assert.equal(corrupt.attrs['data-theme'],'bird');
  const blocked=fixture(false,'bird',true,false,{
    article:true,path:'/the-first-day/',navigationStore
  });
  assert.equal(blocked.attrs['data-theme'],'bird','disabled sessionStorage is non-fatal');
});

test('core: without manual selection, device changes update normal pages', () => {
  const f=fixture(false);
  f.media.matches=true;f.mediaHandlers.change();
  assert.equal(f.attrs['data-theme'],'dark');
  f.media.matches=false;f.mediaHandlers.change();
  assert.equal(f.attrs['data-theme'],'light');
  assert.equal(f.store.has('mcretro-theme'),false);
});

test('core: invalid preferences are ignored and ordinary pages remain in Light/Dark', () => {
  const f=fixture(false,'unexpected',false,false,{unrelated:true});
  assert.equal(f.attrs['data-theme'],'light');
  f.store.set('mcretro-theme','bird');
  f.handlers.storage({key:'mcretro-theme'});
  assert.equal(f.attrs['data-theme'],'light');
  assert.equal(f.navigations.length,0);
  f.store.set('mcretro-theme','dark');
  f.handlers.storage({key:'mcretro-theme'});
  assert.equal(f.attrs['data-theme'],'dark');
});

test('core: blocked localStorage still permits page-local theme choice', () => {
  const f=fixture(true,null,true);
  f.handlers.click();
  assert.equal(f.attrs['data-theme'],'bird');
  assert.equal(f.btnAttrs['aria-label'], 'Switch to Light Mode');
  assert.deepEqual(f.navigations.at(-1), {method:'assign', url:'/chirp/'});
});

test('core: Light and Dark retain their ten taglines while Bird has exactly nine', () => {
  const classic = [...header.matchAll(/class="phrase(?: mobile-tagline)?"/g)].length;
  assert.equal(classic, 10, 'The ten original McRetro tagline animations must remain');
  assert.ok(!header.includes('class="phrase phrase--bird"'));
  const birdLines = header.split('\n').filter(line => line.includes('class="bird-tagline"'))
    .map(line => line.split('>')[1].split('<')[0]);
  assert.deepEqual(birdLines, [
    "🪺 Welcome to the Nest!",
    "📢 You've Got Squawk!",
    "📟 404: Silence Not Found",
    "💾 All Your Seeds Are Belong to Us",
    "🎮 Press START to Squawk!",
    "🦖 Tiny Dinosaurs, Big Attitudes",
    "🌻 Powered by Seeds and Screams",
    "💻 Best Viewed with a Beak",
    "🔊 Volume Control Not Found"
]);
  const firstClassic = header.indexOf('class="phrase"');
  const lastClassic = header.lastIndexOf('class="phrase"');
  const birdPosition = header.indexOf('class="bird-tagline"');
  assert.ok(firstClassic < lastClassic && lastClassic < birdPosition,
    'Bird taglines must occupy separate slots after the classic taglines');

  const bird = read('assets/css/bird-theme.css');
  assert.ok(bird.includes(':root:not([data-theme="bird"]) .textcycle .bird-tagline'));
  assert.ok(bird.includes(':root[data-theme="bird"] .textcycle .phrase'));
  assert.ok(bird.includes('animation: birdTaglineCycle 54s infinite'));
  for (let i = 0; i < 9; i += 1) {
    assert.ok(bird.includes('.bird-tagline:nth-child(' + (i + 11) +
      ') { animation-delay: ' + (i * 6) + 's; }'), 'Bird delay slot ' + i);
  }
  assert.ok(bird.includes('@media (prefers-reduced-motion: reduce)'));
  assert.ok(bird.includes('.bird-tagline:nth-child(11) { opacity: 1; }'));
});

test('core: each theme shuffles after its fixed first tagline without mixing slots', () => {
  const classic = Array.from({length: 10}, (_, i) => ({name: 'classic-' + i}));
  const birds = Array.from({length: 9}, (_, i) => ({name: 'bird-' + i}));
  const cycle = {
    children: [...classic, ...birds],
    querySelectorAll(selector) {
      if (selector === '.phrase') return classic;
      if (selector === '.bird-tagline') return birds;
      assert.fail('unexpected selector: ' + selector);
    },
    appendChild(item) {
      const i = this.children.indexOf(item);
      if (i !== -1) this.children.splice(i, 1);
      this.children.push(item);
    }
  };
  // Fixed random value produces a deterministic but genuinely shuffled order.
  const shuffledMath = Object.create(Math);
  shuffledMath.random = () => 0;
  runInNewContext(read('assets/js/header-taglines.js'), {
    document: {querySelector(selector) {
      assert.equal(selector, '.textcycle');
      return cycle;
    }},
    Math: shuffledMath
  });
  assert.equal(cycle.children.length, 19);
  assert.equal(cycle.children[0], classic[0], 'McRetro opener remains first');
  assert.equal(cycle.children[10], birds[0], 'Nest welcome must always play first in Bird mode');
  assert.equal(new Set(cycle.children).size, 19, 'no lost or duplicated taglines');
  assert.deepEqual(cycle.children.slice(0, 10).slice(1).map(node => node.name).sort(),
    classic.slice(1).map(node => node.name).sort());
  assert.deepEqual(cycle.children.slice(10).slice(1).map(node => node.name).sort(),
    birds.slice(1).map(node => node.name).sort());
  assert.notDeepEqual(cycle.children.slice(11), birds.slice(1),
    'the eight remaining Bird taglines are shuffled, not fixed in markup order');
});


test('core: Bird stylesheet and header icon preserve original mobile layout', () => {
  const bird=read('assets/css/bird-theme.css');
  assert.match(bird, /:root\[data-theme="bird"\]/);
  assert.match(bird, /--page-bg: #424242/);
  assert.match(bird, /--link: #18770C/);
  assert.match(bird, /\.theme-icon--bird/);
  assert.match(header, /class="theme-icon theme-icon--bird"/);
  assert.match(header, /bird-brand-name">Channel Chirp<\/span>/);
  assert.doesNotMatch(header, /bird-brand-mark/, 'Bird wordmark must not show the parrot');
  assert.match(layout, /data-default-theme="bird"/);
  assert.match(layout, /data-chirp-unrelated="true"/);
  assert.match(layout, /\{% unless channel_chirp_page or channel_chirp_article %\}/,
    'ordinary McRetro pages must be identified to prevent Bird hijacking their URLs');
  assert.match(layout, /class="sidebar-mode-bird"/);
  assert.match(header, /class="nav-mode-bird"/);
});

test('advisory: two stable button positions, WCAG labels and CSS colour tokens', () => {
  assert.match(style,/\.theme-toggle[\s\S]*width: 40px/);
  assert.match(style,/@media screen and \(max-width: 750px\) \{\s*\.theme-toggle/);
  for(const value of ['#FFF8DC','#191D27','#0009B5','#93C5FD','#064584','#244D78','#FFFDF2','#242B38'])assert.ok(style.includes(value),value);
  assert.match(style,/:root\[data-theme="dark"\]/);
});

test('advisory: 320px homepage proportions are tuned without changing larger mobile widths', () => {
  const home = read('index.md');
  assert.match(home, /<h2 class="center home-headline">Blast Processed Since 199X<\/h2>/);
  assert.match(overrides, /@media screen and \(max-width: 360px\) \{\s*\.logo-area \{[^}]*grid-template-columns: minmax\(0, 1fr\) 36px 36px;[^}]*column-gap: 6px;/);
  assert.match(overrides, /\.site-header \.theme-toggle,\s*\.site-header \.nav-toggle \{[^}]*width: 36px;[^}]*height: 36px;/);
  assert.match(overrides, /\.site-header \.nav-toggle span \{ width: 17px; \}/);
  assert.match(overrides, /@media screen and \(max-width: 500px\) \{\s*\.home-headline \{[^}]*font-size: clamp\(1\.3rem, 6\.2vw, 1\.75rem\);/);
  // At 376px and 390px the original 40px controls and rotating text remain.
  assert.match(style, /grid-template-columns: minmax\(0, 1fr\) 40px 40px;/);
  assert.match(style, /\.textcycle \.phrase \{\s*white-space: nowrap;/);
  assert.match(overrides, /@media screen and \(max-width: 375px\) \{\s*\.textcycle \.phrase \{[^}]*display: none;/);
});

test('advisory: classic blue stays in Light mode; Dark links use soft sky blue', () => {
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
test('advisory: recent sidebar post links underline on hover and keyboard focus', () => {
  assert.match(style, /\.recent-posts-list li a:hover,\s*\.recent-posts-list li a:focus-visible\s*\{[^}]*text-decoration:\s*underline;/);
});
test('advisory: sidebar action links and monthly archive counts follow the active theme', () => {
  assert.match(style, /\.sidebar-action-link\s*\{[^}]*color:\s*var\(--link\);/);
  assert.match(style, /\.sidebar-action-link:hover,\s*\.sidebar-action-link:focus-visible\s*\{[^}]*color:\s*var\(--link-hover\);/);
  assert.match(style, /\.sidebar-action-link:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--focus\)/);
  assert.match(overrides, /\.archive-month-count\s*\{[^}]*font: 700 1\.25rem\/1\.3 Montserrat/);
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});


test('advisory: sidebar Search Go matches months with posts in both colour themes', () => {
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


test('advisory: article quotes use theme-appropriate colours, including Bird', () => {
  const light = style.split(':root[data-theme="dark"]')[0];
  const dark = style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  const bird = read('assets/css/bird-theme.css');

  // Main McRetro Light/Dark quote surfaces and borders use the Archives blue palette.
  for (const palette of [light, dark]) {
    assert.ok(palette.includes('--quote-bg: var(--archive-filled);'));
  }
  assert.ok(light.includes('--archive-filled: #EAF2FF;'));
  assert.ok(light.includes('--archive-accent: #064584;'));
  assert.ok(dark.includes('--archive-filled: #293A55;'));
  assert.ok(dark.includes('--archive-accent: #93C5FD;'));

  const quoteRule = overrides.match(/\.post-full \.post-content blockquote\s*\{([^}]*)\}/)?.[1];
  assert.ok(quoteRule, 'Shared article quote rule must exist');
  assert.ok(quoteRule.includes('border-left: 4px solid var(--archive-accent);'));
  assert.ok(quoteRule.includes('background: var(--quote-bg);'));

  // Bird mode is a separate stylesheet loaded after the shared styles. It
  // deliberately overrides both tokens, so Channel Chirp stays grey and green.
  const birdPalette = bird.split(':root[data-theme="bird"] {')[1].split('\n}')[0];
  assert.ok(birdPalette.includes('--quote-bg: #F5F5F5;'));
  assert.ok(birdPalette.includes('--archive-accent: #29A518;'));
  assert.ok(birdPalette.includes('--archive-filled: #E7F5E4;'));
});

test('advisory: accordion headers use Archives blues in both modes without changing panel markup', () => {
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

test('advisory: desktop and mobile menus underline on pointer hover and keyboard focus', () => {
  assert.match(style, /\.main-nav a:hover \.nav-text,\s*\.main-nav a:focus-visible \.nav-text\s*\{\s*text-decoration:\s*underline;\s*text-underline-offset:\s*0\.12em;\s*\}/);
  assert.match(style, /\.nav-list li a:hover,\s*\.nav-list li a:focus-visible\s*\{[^}]*text-decoration:\s*none;/);
});

test('advisory: Bird filled hover belongs to the expanded mobile menu only', () => {
  const bird = read('assets/css/channel-chirp.css');
  const desktopStart = bird.indexOf(':root[data-theme="bird"] .main-nav a:hover,');
  const desktopEnd = bird.indexOf('/* Post previews use the original Channel Chirp rhythm', desktopStart);
  assert.ok(desktopStart >= 0 && desktopEnd > desktopStart);
  const desktop = bird.slice(desktopStart, desktopEnd);
  assert.ok(desktop.includes('text-decoration: underline;'),
    'desktop Bird links retain their original text-only hover behaviour');
  assert.ok(!desktop.includes('background: #C8E5BD;'),
    'desktop Bird navigation must not gain a filled background');
  assert.ok(!desktop.includes('box-shadow: 0 0 0 .25rem #C8E5BD;'),
    'desktop Bird navigation must not gain a highlight halo');

  const mobileStart = bird.indexOf('@media screen and (max-width: 750px) {');
  const mobileEnd = bird.indexOf('/* Existing post metadata is a flex row.', mobileStart);
  assert.ok(mobileStart >= 0 && mobileEnd > mobileStart);
  const mobile = bird.slice(mobileStart, mobileEnd);
  assert.ok(mobile.includes('.nav-list li a.nav-mode-bird:hover,'),
    'expanded mobile menu has a hover style');
  assert.ok(mobile.includes('.nav-list li a.nav-mode-bird:focus-visible {'),
    'expanded mobile menu has a keyboard-focus style');
  assert.ok(mobile.includes('background: #C8E5BD;'));
  const birdPaleNavStart = bird.indexOf('/* Pale green gives navigation emoji');
  const birdPaleNavEnd = bird.indexOf('/* Post previews use the original Channel Chirp rhythm');
  assert.ok(birdPaleNavStart >= 0 && birdPaleNavEnd > birdPaleNavStart);
  const desktopColour = bird.slice(birdPaleNavStart, birdPaleNavEnd);
  assert.ok(desktopColour.includes('background: #E7F5E4;'));
  assert.ok(desktopColour.includes('color: #000000;'));
  assert.ok(!desktopColour.includes('color: #17660D;'));
  assert.ok(!desktopColour.includes('color: #105B08;'));
  assert.ok(desktopColour.includes('outline: 2px solid #17660D;'));
  assert.ok(mobile.includes('background: #E7F5E4;'));
  assert.ok(mobile.includes('color: #000000;'));

  assert.ok(mobile.includes('text-decoration: none;'),
    'mobile labels use a filled highlight instead of an underline');

  const postsStart = bird.indexOf(':root[data-theme="bird"] .sidebar-mode-bird .recent-posts-list li a:hover,');
  const postsRule = bird.slice(postsStart, bird.indexOf('}', postsStart));
  assert.ok(postsStart >= 0 && postsRule.includes('color: #FFFFFF;'));
  assert.ok(postsRule.includes('text-decoration: underline;'),
    'Random Posts keep their original desktop/sidebar hover treatment');
  assert.ok(!postsRule.includes('background:'),
    'Random Posts do not inherit mobile-menu highlighting');

  const chirpSidebar = read('_includes/channel-chirp-sidebar.html');
  assert.ok(chirpSidebar.includes('href="/" data-theme-exit="standard">↩ Return to McRetro.net</a>'));
  assert.ok(style.includes('.main-nav a:hover .nav-text,'),
    'Light and Dark navigation remains unchanged');
});

test('advisory: Channels keeps emoji and links, without old summary siren GIFs', () => {
  const channels = read('channels.md');
  assert.ok(!channels.includes('/assets/images/about/siren.gif'));
  assert.equal((channels.match(/<summary markdown="span">/g) || []).length, 4);
  for (const name of ['🎸 Nix McRetro', '👾 McRetro Gaming', '🪲 Super Nature World', '🦜 Channel Chirp']) {
    assert.ok(channels.includes(name), name);
  }
  for (const handle of ['@NixMcRetro', '@McRetroGaming', '@SuperNatureWorld']) {
    assert.ok(channels.includes(handle), handle);
  }
  for (const handle of ['NixMcRetro', 'McRetroGaming', 'SuperNatureWorld']) {
    const url = 'https://www.youtube.com/@' + handle;
    assert.ok(channels.includes('YouTube Channel: [@' + handle + '](' + url + ')<br>'),
      'Channels should show the handle and keep the existing URL for ' + handle);
    assert.ok(!channels.includes('YouTube Channel: [https://youtube.com/@' + handle + ']'),
      'Old full-URL link text should be removed for ' + handle);
  }
  assert.ok(!channels.includes('@ChannelChirp'), 'Retiring YouTube channel should not be advertised');
  assert.ok(channels.includes('/chirp/'));
  for (const snippet of [
    "What started as a YouTube channel about retro computers back in 2012",
    "In 2026, I also started bringing videos from former channels, including Fish Tank World and Channel Chirp",
    "These channels have become something of a video scrapbook",
    "McRetro Gaming started in June 2014",
    "the trusty PlayStation 4 to retro gaming through the MiSTer FPGA",
    "It's mostly nature, superfied!",
    "Channel Chirp began just a couple of weeks after Pudge and Tillie came home",
    "Along with Chip, they were three of the cheekiest green-cheeked conures",
    "I'm gradually re-releasing their original videos on my Nix McRetro YouTube channel"
  ]) {
    assert.ok(channels.includes(snippet), 'Missing updated Channels copy: ' + snippet);
  }
  assert.ok(!channels.includes('PlayStation 5'), 'Gaming description should use PlayStation 4');
  assert.ok(!channels.includes('Recently (2026)'), 'Old merging summary should not remain');
  assert.ok(channels.includes('YouTube Playlist: [Channel Chirp](https://www.youtube.com/playlist?list=PLJAZP-TLMPj50jY6ytY53J3bQkgPIbeYP)<br>'));
  assert.ok(channels.includes('Homepage: [https://mcretro.net/chirp/](/chirp/)'));
  assert.ok(!channels.includes('Visit The Nest: Channel Chirp adventures on McRetro'));
  assert.ok(!channels.includes('Re-released videos: [McRetro on YouTube]'));
  assert.ok(!channels.includes('Recently (2024)'));
  assert.match(overrides, /\.mcretro-modem-titlebar[\s\S]*background: #000080/);
});


test('advisory: navigation hover underlines words without bolding or shifting adjacent items', () => {
  for(const [emoji, word] of [['🏡','Home'],['✏️','Blog'],['📺','Channels'],['💾','Goodies'],['🌏','Random'],['📡','About']]) {
    assert.ok(header.includes('<span class="nav-emoji" aria-hidden="true">' + emoji + '</span> <span class="nav-text">' + word + '</span>'), word);
  }
  assert.equal((header.match(/class="nav-text"/g) || []).length, 11,
    'Six original McRetro links and five Bird links');
  assert.equal((header.match(/<li(?:\s[^>]*)?>/g) || []).length, 6);
  assert.equal((header.match(/class="nav-mode-bird/g) || []).length, 5);
  assert.match(header, /<li class="nav-item--mcretro-only">/);

  assert.match(header, /class="nav-mode-bird" href="\/chirp\/"[^>]*>[^<]*<span class="nav-emoji" aria-hidden="true">🪺<\/span> <span class="nav-text">Home<\/span><\/a>/,
    'Bird Home replaces The Nest in the primary nav');
  assert.doesNotMatch(header, /<span class="nav-text">The Nest<\/span>/,
    'The Nest name remains in the homepage heading, not the nav');


  assert.match(header, /class="nav-mode-bird" href="\/chirp\/random\/" data-chirp-random-link/);

  assert.ok(header.includes("page.url contains '/chirp/adventures/' or page.url contains '/chirp/archive/' or page.categories contains 'parrots' and page.channel_chirp != false"), 'Bird Adventures remains active on monthly archives');

  assert.match(header, /class="nav-mode-bird" href="\/chirp\/about\/"[^\n]*<span class="nav-text">About<\/span>/);
  assert.doesNotMatch(header, /class="nav-mode-bird" href="\/chirp\/timeline\//);
  assert.doesNotMatch(header, /\/chirp\/flock\//, 'no old flock link remains');

  const labelHoverRule = style.match(/\.main-nav a:hover \.nav-text,\s*\.main-nav a:focus-visible \.nav-text\s*\{([^}]*)\}/)?.[1];
  assert.ok(labelHoverRule, 'text-only nav hover and focus rule exists');
  assert.doesNotMatch(labelHoverRule, /font-weight\s*:/, 'hover must not change font weight or item widths');
  assert.match(style, /\.main-nav a\s*\{[^}]*font-weight:\s*normal;/, 'regular menu links remain normal weight');
  assert.match(style, /\.main-nav a\.active\s*\{[^}]*font-weight:\s*bold;/, 'current-page highlight remains unchanged');
  assert.match(style, /\.main-nav a:hover,\s*\.main-nav a:focus-visible\s*\{[^}]*text-decoration:\s*none;/);
  assert.match(style, /\.main-nav a:hover \.nav-text,\s*\.main-nav a:focus-visible \.nav-text\s*\{\s*text-decoration:\s*underline;\s*text-underline-offset:\s*0\.12em;\s*\}/);
  assert.match(style, /\.nav-list li a:hover,\s*\.nav-list li a:focus-visible\s*\{[^}]*text-decoration:\s*none;/);
});

test('advisory: Recent Posts has four entries and paired More posts / random-blog Dial-up buttons', () => {
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

test('advisory: Bird sidebar dividers use normal widget spacing without shifting panels down', () => {
  const bird = read('assets/css/channel-chirp.css');
  const widget = bird.match(/:root\[data-theme="bird"\] \.sidebar-mode-bird \.widget\s*\{([^}]*)\}/)?.[1];
  assert.ok(widget, 'Bird sidebar widget layout exists');
  assert.match(widget, /margin:\s*0 0 1rem;/);
  assert.match(widget, /padding:\s*0 0 1\.3rem;/);
  assert.doesNotMatch(widget, /padding:\s*\.8rem 0/);
  const search = bird.match(/:root\[data-theme="bird"\] \.sidebar-mode-bird \.search-widget\s*\{([^}]*)\}/)?.[1];
  assert.match(search || '', /padding-top:\s*\.8rem;/, 'only the search widget needs top padding');
  assert.match(style, /\.search-widget\s*\{[^}]*padding-top:\s*0\.8rem;/,
    'Light/Dark search keeps its existing top spacing');
});

test('advisory: sidebar sections retain divider breathing room without obsolete dial widget', () => {
  assert.match(style, /\.search-widget\s*\{[^}]*padding-bottom:\s*1\.3rem;/);
  const common = overrides.match(/\.sidebar \.archive-widget,\s*\.sidebar \.recent-posts-widget\s*\{([^}]*)\}/)?.[1];
  assert.ok(common, 'Archives and Recent Posts share their divider spacing');
  assert.match(common, /padding-bottom:\s*1\.3rem;/);
  assert.doesNotMatch(overrides, /\.sidebar \.dial-homepage\s*\{/);
  assert.match(style, /\.widget ul\.recent-posts-list\s*\{[^}]*margin-bottom:\s*0;/);
  assert.match(overrides, /\.recent-posts-actions\s*\{[^}]*margin-top: 1rem;/);
  assert.match(overrides, /\.sidebar \.recent-posts-list li:last-child\s*\{[^}]*margin-bottom:\s*0;/);
});

test('advisory: calendar keeps four month columns with compact themed filled and empty tiles', () => {
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


test('advisory: About portrait reuses blog media-caption markup and compact photo spacing', () => {
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


test('advisory: article image and video captions separate cleanly from following content', () => {
  // This must not disturb the existing compact gap immediately beneath
  // photographs and YouTube video containers.
  assert.match(overrides, /\.post-full \.post-content > p:has\(> img:only-child\):has\(\+ p\.media-caption\),/);
  assert.match(overrides, /\.post-full \.post-content > \.video-container:has\(\+ p\.media-caption\),/);
  assert.match(overrides, /\.post-full \.post-content p\.media-caption \{\s*margin-bottom: 1\.75rem;\s*\}/);
  assert.match(overrides, /@media screen and \(max-width: 600px\) \{\s*\.post-full \.post-content p\.media-caption \{\s*margin-bottom: 1\.35rem;/);
  assert.match(read('_includes/youtube.html'), /<div class="video-container">/);
  const teradrive = read('_posts/2012-06-09-sega-teradrive-model-3-hard-drive-replacement.md');
  assert.match(teradrive, /\*Getting the TeraDrive back together,[^\n]*\*\n\{:\s*\.media-caption \}/);
});

test('advisory: linked article images have the same compact captions as ordinary images', () => {
  const linked = '.post-full .post-content > p:has(> a:only-child > img:only-child):has(+ p.media-caption)';
  assert.ok(overrides.includes(linked + ','), 'linked-image paragraphs use the same 0.25rem gap');
  assert.ok(overrides.includes(linked + ' > a > img'), 'linked images become block images');
  assert.match(overrides, /\.post-full \.post-content > p:has\(> a:only-child > img:only-child\):has\(\+ p\.media-caption\) > a \{\s*display: block;\s*width: fit-content;/);
  assert.ok(overrides.includes('.post-full .post-content > p:has(> a:only-child > img:only-child) + p.media-caption,'),
    'linked-image captions use the normal caption font and margins');
  const op1 = read('_posts/2021-12-27-teenage-engineering-op-1-demo-track.md');
  const finalFantasy = read('_posts/2023-09-07-final-fantasy-xvi-live-stream-2023.md');
  assert.match(op1, /\]\(\/assets\/uploads\/demotrack\.mp3\)\n\n\*My OP-1 demo track,/);
  assert.match(finalFantasy, /\]\(https:\/\/www\.youtube\.com\/playlist\?list=PLLJI5UKuYtwVAVaH6ywsjtI3atRdiJ5lO\)\n\n\*Sixty-two hours of Final Fantasy XVI,/);
});

test('advisory: Blog pagination is compact, accessible and retains numbered URLs', () => {
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

test('advisory: interactive hover backgrounds use themed blue without recolouring neutral surfaces', () => {
  const light = style.split(':root[data-theme="dark"]')[0];
  const dark = style.split(':root[data-theme="dark"]')[1].split('\nhtml {')[0];
  assert.match(light, /--panel-subtle:\s*#F0EAD9;/);
  assert.match(dark, /--panel-subtle:\s*#303A48;/);
  assert.match(light, /--interactive-hover:\s*var\(--archive-filled-hover\);/);
  assert.match(dark, /--interactive-hover:\s*var\(--archive-filled-hover\);/);
  assert.match(light, /--code-bg:\s*#EAF2FF;/);
  assert.match(dark, /--code-bg:\s*#303A48;/);
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

test('advisory: monthly Archives use a matching heading/subheading, breadcrumb and article media', () => {
  const archive = read('_layouts/archive.html');
  const index = read('archive/index.html');
  assert.match(archive, /<nav class="archive-breadcrumbs" aria-label="Breadcrumb">/);
  assert.ok(archive.includes("{% assign archive_index = '/archive/' %}"), 'standard McRetro archive breadcrumb preserved');
  assert.ok(archive.includes("{% assign archive_index = '/chirp/archive/' %}"), 'Bird archive breadcrumb available');
  assert.ok(archive.includes('<a href="{{ archive_index }}">Archives</a>'));
  assert.match(archive, /<h1 class="post-title">\{\{ page\.date \| date: "%B %Y" \}\}<\/h1>/);
  assert.match(archive, /<p class="archive-month-count">\{% if month_count == 1 %\}1 article\{% else %\}\{\{ month_count \}\} articles\{% endif %\}<\/p>/);
  assert.doesNotMatch(archive, /<span class="archive-month-count">|class="archive-month-summary"/);
  assert.match(archive, /capture archive_thumbnail/);
  assert.match(archive, /include auto-thumbnail\.html content=post\.content url=post\.url title=post\.title/);
  assert.match(archive, /unless archive_thumbnail == blank/);
  assert.doesNotMatch(archive, /class="author-avatar"/);
  assert.match(archive, /<time class="post-date" datetime=/);
  assert.match(archive, /class="post-categories"/);
  assert.match(overrides, /\.archive-breadcrumbs \[aria-current="page"\]\s*\{\s*color: var\(--text\);\s*\}/);
  assert.match(overrides, /\.archive-month-header\s*\{[^}]*border-bottom: 0\.5px solid var\(--text\);/);
  // Both archive landing and monthly breadcrumb trails are compact on
  // phones; desktop and unrelated pages keep their existing spacing.
  assert.match(overrides, /@media screen and \(max-width: 750px\) \{[^}]*\.archive-month \.archive-breadcrumbs,\s*\.archive-index > \.archive-breadcrumbs \{\s*margin-bottom: 0\.5rem;\s*\}/);
  assert.match(overrides, /\.archive-index > \.post-title \{\s*margin-bottom: 0\.25rem;\s*\}/);
  assert.match(overrides, /\.archive-index > \.archive-index-intro \{\s*margin-bottom: 0\.75rem;\s*\}/);
  assert.match(overrides, /\.archive-index-years > \.archive-index-year:first-child \{\s*margin-top: 0\.5rem;\s*\}/);
  assert.match(overrides, /\.archive-index-year \{\s*margin-bottom: 0\.65rem;\s*\}/);
  assert.match(overrides, /\.archive-blog-list \.read-more \{\s*display: inline;\s*margin: 0;\s*\}/);

  assert.doesNotMatch(overrides, /\.archive-blog-list \.read-more \{[^}]*inline-block/);
  assert.match(overrides, /\.archive-month-count\s*\{[^}]*font: 700 1\.25rem\/1\.3 Montserrat/);
  assert.match(overrides, /\.archive-card-layout\s*\{[^}]*display: grid;[^}]*grid-template-columns: 160px minmax\(0, 1fr\);/);
  assert.match(overrides, /\.archive-card-media \.post-thumbnail-img\s*\{[^}]*object-fit: contain/);
  assert.match(overrides, /\.archive-card-layout:not\(:has\(\.archive-card-media\)\)\s*\{[^}]*grid-template-areas: "title" "meta" "excerpt";/);
  assert.match(overrides, /@media screen and \(max-width: 600px\)[\s\S]*?grid-template-areas: "title" "meta" "media" "excerpt";/);
  assert.match(overrides, /\.archive-card-media \{ width: min\(100%, 380px\);/);
  assert.match(archive, /class="archive-card-meta-sep" aria-hidden="true">\/\/<\/span>/);
  assert.doesNotMatch(archive, /class="archive-card-body"/);
  const card = archive.slice(archive.indexOf('<div class="archive-card-layout">'), archive.indexOf('</article>'));
  const cardOrder = [
    '<h2 class="post-title">',
    '<div class="archive-card-meta">',
    '<div class="archive-card-media">',
    '<div class="post-excerpt">'
  ].map(part => card.indexOf(part));
  assert.ok(cardOrder.every(position => position >= 0));
  assert.ok(cardOrder.every((position, i) => i === 0 || position > cardOrder[i - 1]), 'archive source reading order must be title, meta, image, excerpt');
  assert.match(index, /permalink: \/archive\//);
  assert.match(index, /<details id="year-\{\{ year\.name \}\}" class="archive-index-year about-panel panel--teal">/);
  assert.ok(archive.includes("href=\"{{ archive_index }}#year-{{ page.date | date: '%Y' }}\""), 'year breadcrumb follows the active archive');
  assert.ok(archive.includes('<span aria-current="page">{{ page.date | date: "%B" }}</span>'));
  assert.ok(index.includes('<script src="/assets/js/archive-year-deeplink.js"></script>'));
  assert.match(index, /<summary><span class="about-panel-icon" aria-hidden="true">📅<\/span>/u);
  assert.doesNotMatch(index, /open\{% endif %\}>/, 'all archive years must begin collapsed');
  assert.doesNotMatch(index, /name="mcretro-archive-years"/, 'archive years must expand independently');
  assert.doesNotMatch(overrides, /\.archive-index-year > summary:hover/, 'Archives use the shared accordion hover palette');
  assert.match(index, /data-archive-month="\{\{ year\.name \}\}-\{\{ month_key \}\}"/);
  assert.match(sidebar, /class="archive-all-link sidebar-action-link" href="\/archive\/"/);
  assert.match(header, /page\.url contains "\/archive\/"/);
  assert.match(overrides, /\.archive-index-grid\s*\{[^}]*grid-template-columns: repeat\(4/);
});

test('advisory: archive year deep links open only the requested year', () => {
  const source = read('assets/js/archive-year-deeplink.js');
  const setup = (hash) => {
    const calls = [], frames = [], listeners = {};
    const summary = { scrollIntoView: options => calls.push(options) };
    const panel = {
      open: false,
      matches: selector => selector === 'details.archive-index-year',
      querySelector: selector => selector === 'summary' ? summary : null
    };
    const years = { contains: candidate => candidate === panel };
    const document = {
      querySelector: selector => selector === '.archive-index-years' ? years : null,
      getElementById: id => id === 'year-2012' ? panel : null
    };
    const window = {
      location: { hash },
      addEventListener: (type, handler) => { listeners[type] = handler; }
    };
    runInNewContext(source, { document, window, requestAnimationFrame: cb => frames.push(cb) });
    return { panel, calls, frames, listeners, window };
  };

  const normal = setup('');
  assert.equal(normal.panel.open, false);
  assert.equal(normal.frames.length, 0);

  const linked = setup('#year-2012');
  assert.equal(linked.panel.open, true);
  assert.equal(linked.frames.length, 1);
  linked.frames.shift()();
  assert.equal(linked.calls[0].block, 'start');

  const invalid = setup('#year-unknown');
  assert.equal(invalid.panel.open, false);
  const absent = setup('#year-1999');
  assert.equal(absent.panel.open, false);

  // Deep links also work if the fragment changes after the page has loaded.
  normal.window.location.hash = '#year-2012';
  normal.listeners.hashchange();
  assert.equal(normal.panel.open, true);
});

test('advisory: Windows 95 dial-up preserves selectable destinations and mobile navigation', () => {
  const modem = read('assets/js/mcretro-dialup.js');
  const modemPage = read('homepages/modem/index.html');
  const connection = read('_includes/modem-connection.html');
  const header = read('_includes/header.html');
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
  assert.doesNotMatch(mobileHeader, /\.textcycle \.phrase \{[^}]*white-space: normal;/);
  assert.doesNotMatch(style + overrides, /padding-right:\s*110px;/);
  assert.match(mobileHeader, /font-size: clamp\(1\.7rem, 6\.7vw, 2\.2rem\);/);
  assert.match(style, /font-size: clamp\(1\.3rem, 6vw, 1\.7rem\);/);
  assert.match(overrides, /font-size: clamp\(1\.23rem, 6\.2vw, 1\.38rem\);/);

  assert.doesNotMatch(header, /🦭 It's time to seal the deal<\/span>/u);
});
