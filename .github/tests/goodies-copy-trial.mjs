import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const source = readFileSync(new URL('../../goodies.md', import.meta.url), 'utf8');
const oldStrings = [
  'The restored homepages and browser projects have found a home here too.',
  'Some are working, some are being restored',
  'No need to pretend everything works when it doesn',
  'No point pretending those pages are finished!'
];
test('Goodies copy has the requested removals', () => {
  for (const text of oldStrings) assert.ok(!source.includes(text), text);
  assert.ok(source.includes("There's a mix of old favourites, restored pages and experiments I've tinkered with over the years."));
});
test('floppy tagline appears exactly once, directly below the header GIF', () => {
  const gif = '![Your files are copying...](/assets/images/goodies/filecopy.gif)';
  const quote = "**Don't copy that floppy!**";
  assert.ok(source.includes(gif));
  assert.equal(source.split(quote).length - 1, 1);
  const headerEnd = source.indexOf('</div>');
  assert.ok(source.indexOf(gif) < source.indexOf(quote));
  assert.ok(source.indexOf(quote) < headerEnd);
  assert.ok(source.slice(source.indexOf(gif),source.indexOf(quote)).includes('\n\n'));
});
test('Goodies sections, links, and panel visibility script are preserved', () => {
  for (const title of ['Ready to Visit','Restored Historical Homepages','Still Under Construction']) {
    assert.ok(source.includes(title));
  }
  assert.equal((source.match(/<details /g) || []).length, 3);
  assert.equal((source.match(/<\/details>/g) || []).length, 3);
  for (const path of ['/homepages/op-1/','/homepages/frank/','/homepages/sonic/','/homepages/fishtankworld/','/homepages/geocities/','/files/','/photos/']) {
    assert.ok(source.includes(path));
  }
  assert.ok(source.includes('exclusive-panel-visibility.html'));
});
