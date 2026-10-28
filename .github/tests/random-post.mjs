import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { scriptElements } from './script-tags.mjs';

const read = name => readFileSync(new URL('../../' + name, import.meta.url), 'utf8');
const layout = read('_layouts/default.html');
const source = read('assets/js/random-post.js');
const dataTemplate = read('assets/data/random-post-urls.json');

function fixture(options = {}) {
  const listeners = {};
  const visits = [];
  const link = {
    href: 'https://mcretro.net/blog/',
    addEventListener(event, handler) { listeners[event] = handler; }
  };
  let fetchCount = 0;
  const document = {
    readyState: options.readyState ?? 'complete',
    getElementById(id) {
      assert.equal(id, 'random-post-link');
      return options.absent ? null : link;
    },
    addEventListener(event, handler) { listeners['document:' + event] = handler; }
  };
  const response = options.reject ? Promise.reject(new Error('Network failure')) : Promise.resolve({
    ok: !options.httpError,
    json: async () => options.urls ?? ['/first/', '/second/', '/third/']
  });
  const fetch = async (url, init) => {
    fetchCount++;
    assert.equal(url, '/assets/data/random-post-urls.json');
    assert.equal(init.credentials, 'same-origin');
    return response;
  };
  runInNewContext(source, {
    document,
    fetch,
    window: { location: { assign(url) { visits.push(url); } } },
    Math: { floor: Math.floor, random: () => options.random ?? 0.5 }
  });
  const click = async () => {
    let prevented = false;
    await listeners.click({ preventDefault() { prevented = true; } });
    assert.equal(prevented, true);
  };
  return { listeners, click, visits, get fetchCount() { return fetchCount; } };
}

test('modern shared layout has only external scripts', () => {
  const scripts = scriptElements(layout);
  assert.ok(scripts.length >= 3);
  for (const match of scripts) {
    assert.match(match.attributes, /\bsrc\s*=/);
    assert.equal(match.body.trim(), '');
  }
  assert.ok(layout.includes("'/assets/js/random-post.js' | relative_url"));
  assert.ok(!layout.includes('random-post-urls.html'));
  assert.match(dataTemplate, /layout: null/);
  assert.match(dataTemplate, /site\.posts\s*\|\s*map:\s*'url'\s*\|\s*jsonify/);
});

test('click opens a random internal post', async () => {
  const f = fixture({random: 0.7});
  await f.click();
  assert.deepEqual(f.visits, ['/third/']);
  assert.equal(f.fetchCount, 1);
});

test('prefetch shares a single request between focus and click', async () => {
  const f = fixture();
  f.listeners.focus();
  f.listeners.mouseenter();
  await f.click();
  assert.equal(f.fetchCount, 1);
  assert.deepEqual(f.visits, ['/second/']);
});

test('invalid external URLs cannot be used as redirect destinations', async () => {
  const f = fixture({urls: ['https://bad.test/', '//bad.test/', '/\\bad.test/', '/valid/']});
  await f.click();
  assert.deepEqual(f.visits, ['/valid/']);
});

test('empty data sends readers to the Blog fallback', async () => {
  const f = fixture({urls: []});
  await f.click();
  assert.deepEqual(f.visits, ['https://mcretro.net/blog/']);
});

test('HTTP and fetch errors fall back to Blog', async () => {
  const http = fixture({httpError: true});
  await http.click();
  assert.deepEqual(http.visits, ['https://mcretro.net/blog/']);
  const network = fixture({reject: true});
  await network.click();
  assert.deepEqual(network.visits, ['https://mcretro.net/blog/']);
});

test('DOMContentLoaded and pages without a Random link are safe', async () => {
  const late = fixture({readyState: 'loading'});
  assert.equal(late.listeners.click, undefined);
  late.listeners['document:DOMContentLoaded']();
  await late.click();
  assert.deepEqual(late.visits, ['/second/']);
  assert.doesNotThrow(() => fixture({absent: true}));
});
