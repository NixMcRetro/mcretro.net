import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../../assets/js/channel-chirp-filter.js', import.meta.url), 'utf8');

function setup(query = '?q=tillie') {
  const makeText = text => {
    let value = text;
    return {
      nodes: [],
      get textContent() { return value; },
      set textContent(next) {
        value = next;
        this.nodes = []; // Mirrors DOM: replacing textContent removes child marks.
      },
      replaceChildren(...nodes) {
        this.nodes = nodes;
        value = nodes.map(node => node.textContent).join('');
      }
    };
  };
  const cards = Array.from({ length: 15 }, (_, i) => {
    const title = makeText((i < 12 ? 'Tillie ' : 'Chip ') + (i + 1));
    const excerpt = makeText(i < 12 ? 'Silly Tillie makes noise' : 'Chip eats seeds');
    return {
      title,
      excerpt,
      textContent: title.textContent + ' ' + excerpt.textContent,
      hidden: false,
      querySelectorAll(selector) {
        assert.equal(selector, '[data-nest-highlight]');
        return [title, excerpt];
      }
    };
  });
  const control = () => ({
    hidden: true,
    events: {},
    addEventListener(type, callback) { this.events[type] = callback; }
  });
  const field = control();
  field.value = '';
  field.focus = () => { field.focused = true; };
  const clear = control();
  const more = control();
  const empty = { hidden: true };
  const status = { textContent: '' };
  const root = { querySelectorAll(selector) {
    assert.equal(selector, '[data-nest-post]');
    return cards;
  }};
  const byId = {
    'nest-search-input': field,
    'nest-archive-list': root,
    'nest-search-status': status,
    'nest-no-results': empty,
    'nest-search-clear': clear,
    'nest-search-more': more
  };
  const document = {
    getElementById(id) { return byId[id]; },
    createTextNode(text) { return { type: 'text', textContent: text }; },
    createElement(tag) { return { tag, textContent: '' }; }
  };
  runInNewContext(script, {
    document,
    window: { location: { search: query } },
    URLSearchParams
  });
  return { cards, field, clear, more, empty, status };
}

test('Find-a-Squawk loads query, highlights text safely and initially shows ten matches', () => {
  const {cards, field, clear, more, empty, status} = setup();
  assert.equal(field.value, 'tillie');
  assert.equal(status.textContent, '12 adventures found');
  assert.equal(cards.filter(card => !card.hidden).length, 10);
  assert.equal(more.hidden, false);
  assert.equal(clear.hidden, false);
  assert.equal(empty.hidden, true);
  assert.ok(cards[0].title.nodes.some(node => node.tag === 'mark' &&
    node.textContent === 'Tillie'), 'matching text is marked with a DOM element');
  assert.ok(!script.includes('innerHTML'), 'untrusted queries are never inserted as HTML');

  more.events.click();
  assert.equal(cards.filter(card => !card.hidden).length, 12);
  assert.equal(more.hidden, true);
});

test('Find-a-Squawk updates results, empty state, and clear control', () => {
  const {cards, field, clear, more, empty, status} = setup();
  field.value = 'chip';
  field.events.input();
  assert.equal(status.textContent, '3 adventures found');
  assert.deepEqual(cards.map(card => !card.hidden).slice(12), [true, true, true]);
  assert.equal(cards.filter(card => !card.hidden).length, 3);
  assert.equal(more.hidden, true);

  field.value = 'no such bird';
  field.events.input();
  assert.equal(status.textContent, '0 adventures found');
  assert.equal(empty.hidden, false);

  clear.events.click();
  assert.equal(field.value, '');
  assert.equal(field.focused, true);
  assert.equal(status.textContent, '15 adventures');
  assert.equal(cards.filter(card => !card.hidden).length, 10);
  assert.equal(clear.hidden, true);
  assert.equal(more.hidden, false);
  assert.equal(empty.hidden, true);
  assert.ok(cards[0].title.nodes.every(node => node.tag !== 'mark'),
    'clearing restores original title text');
});
