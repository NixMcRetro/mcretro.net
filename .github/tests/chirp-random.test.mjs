import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const code = readFileSync(new URL('../../assets/js/channel-chirp-random.js', import.meta.url), 'utf8');
const sample = Array.from({length: 10}, (_, i) => ({
  url: '/chirp-post-' + i + '/',
  title: 'Bird adventure ' + i,
  date_label: '1st January 2018'
}));

function setup({theme='bird', fail=false, current='/chirp-post-0/'}={}) {
  const children = [];
  const listeners = {};
  let mutation;
  let fetches = 0;
  const list = {replaceChildren(fragment) {
    children.splice(0, children.length, ...fragment.children);
  }};
  const button = {
    disabled: true,
    addEventListener(type, listener) { listeners[type] = listener; }
  };
  const root = {theme, getAttribute(name) {
    assert.equal(name, 'data-theme');
    return this.theme;
  }};
  const document = {
    documentElement: root,
    querySelector(selector) {
      if (selector === '[data-chirp-random-posts]') return list;
      if (selector === '[data-chirp-random-shuffle]') return button;
      return null;
    },
    createElement(tag) {
      const element = { tag, children: [], appendChild(child) {this.children.push(child);} };
      return element;
    },
    createDocumentFragment() {
      return {children: [], appendChild(child) {this.children.push(child);}};
    }
  };
  const fakeFetch = async () => {
    fetches++;
    if (fail) throw Error('Offline');
    return {ok: true, json: async () => sample};
  };
  class Observer {
    constructor(cb) {mutation = cb;}
    observe(node, options) {
      assert.equal(node, root);
      assert.deepEqual(Array.from(options.attributeFilter), ['data-theme']);
    }
  }
  runInNewContext(code, {
    document, fetch: fakeFetch, MutationObserver: Observer,
    window: {location: {pathname: current}}
  });
  return {
    button, list, children, root, listeners,
    fetchCount:()=>fetches,
    changeTheme(next) { root.theme = next; mutation(); }
  };
}
const flush = async () => { await new Promise(resolve => setImmediate(resolve)); };

test('Bird mode selects four distinct released posts, excluding the current page', async () => {
  const app = setup();
  await flush();
  assert.equal(app.fetchCount(), 1);
  assert.equal(app.button.disabled, false);
  assert.equal(app.children.length, 4);
  const urls = app.children.map(item => item.children[0].href);
  assert.equal(new Set(urls).size, 4);
  assert.ok(urls.every(url => sample.some(x => x.url === url) && url !== '/chirp-post-0/'));
  assert.ok(app.children.every(item => item.children[1].textContent.includes('January')));
  app.listeners.click();
  assert.equal(app.children.length, 4);
  assert.equal(new Set(app.children.map(item => item.children[0].href)).size, 4);
  assert.equal(app.fetchCount(), 1, 'Shuffle reuses cached list');
});

test('Light and Dark never fetch Bird-only data until Bird is activated', async () => {
  const app = setup({theme:'light'});
  await flush();
  assert.equal(app.fetchCount(), 0);
  app.changeTheme('dark');
  await flush();
  assert.equal(app.fetchCount(), 0);
  app.changeTheme('bird');
  await flush();
  assert.equal(app.fetchCount(), 1);
  assert.equal(app.children.length, 4);
  app.changeTheme('light');
  app.changeTheme('bird');
  await flush();
  assert.equal(app.fetchCount(), 1, 'Returning to Bird does not refetch');
});

test('Failed fetch preserves progressive-enhancement fallback and disables Shuffle', async () => {
  const app = setup({fail:true});
  await flush();
  assert.equal(app.fetchCount(), 1);
  assert.equal(app.button.disabled, true);
  assert.equal(app.children.length, 0, 'Fallback DOM was never replaced');
});
