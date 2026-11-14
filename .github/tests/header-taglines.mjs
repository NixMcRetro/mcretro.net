import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const source = readFileSync(new URL('../../assets/js/header-taglines.js', import.meta.url), 'utf8');

function classList() {
  const classes = new Set();
  return {
    add(name) { classes.add(name); },
    remove(name) { classes.delete(name); },
    contains(name) { return classes.has(name); }
  };
}

function fixture({ count = 10, reducedMotion = false, missing = false } = {}) {
  const phrases = Array.from({ length: count }, (_, index) => ({
    id: index,
    classList: classList()
  }));
  const cycle = {
    children: [...phrases],
    classList: classList(),
    querySelectorAll(selector) {
      assert.equal(selector, '.phrase');
      return this.children.slice();
    },
    appendChild(phrase) {
      this.children.splice(this.children.indexOf(phrase), 1);
      this.children.push(phrase);
    }
  };
  let tick = null;
  let period = null;
  const document = {
    querySelector(selector) {
      assert.equal(selector, '.textcycle');
      return missing ? null : cycle;
    }
  };
  const window = {
    matchMedia(query) {
      assert.equal(query, '(prefers-reduced-motion: reduce)');
      return { matches: reducedMotion };
    },
    setInterval(callback, delay) {
      tick = callback;
      period = delay;
    }
  };
  runInNewContext(source, {
    document, window,
    Math: { random: () => 0.3, floor: Math.floor }
  });

  return {
    cycle, phrases, period, tick,
    active() { return phrases.filter(phrase => phrase.classList.contains('is-active')); }
  };
}

test('keeps the original opener visible and schedules exactly six-second changes', () => {
  const f = fixture();
  assert.equal(f.cycle.children[0], f.phrases[0]);
  assert.equal(f.active().length, 1);
  assert.equal(f.active()[0], f.phrases[0]);
  assert.ok(f.cycle.classList.contains('is-cycling'));
  assert.equal(f.period, 6000);
  assert.equal(typeof f.tick, 'function');
});

test('every phrase appears once per cycle without an empty active state', () => {
  const f = fixture();
  const seen = new Set([f.active()[0].id]);
  for (let i = 0; i < f.phrases.length * 3; i += 1) {
    f.tick();
    const active = f.active();
    assert.equal(active.length, 1, 'a phrase must always be active after each tick');
    seen.add(active[0].id);
  }
  assert.equal(seen.size, f.phrases.length, 'all taglines appear');
  assert.equal(f.active()[0], f.phrases[0], 'the opener returns after a full cycle');
  assert.deepEqual(f.cycle.children.map(x => x.id).sort((a, b) => a - b),
    Array.from({ length: f.phrases.length }, (_, i) => i));
});

test('reduced motion keeps the original tagline static', () => {
  const f = fixture({ reducedMotion: true });
  assert.equal(f.active().length, 1);
  assert.equal(f.active()[0], f.phrases[0]);
  assert.equal(f.tick, null);
});

test('missing header exits without scheduling work', () => {
  const f = fixture({ missing: true });
  assert.equal(f.tick, null);
});

test('a single phrase remains visible without a timer', () => {
  const f = fixture({ count: 1 });
  assert.equal(f.active().length, 1);
  assert.equal(f.tick, null);
});
