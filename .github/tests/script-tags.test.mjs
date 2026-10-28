import test from 'node:test';
import assert from 'node:assert/strict';
import { scriptElements } from './script-tags.mjs';

test('handles quoted angle brackets and mixed case', () => {
  const found = scriptElements('<SCRIPT src="/x.js" data-note=">"></SCRIPT><script>run()</script>');
  assert.equal(found.length, 2);
  assert.ok(found[0].attributes.includes('src="/x.js"'));
  assert.equal(found[0].body, '');
  assert.equal(found[1].body, 'run()');
});
test('similarly named tags do not count as script elements', () => {
  assert.deepEqual(scriptElements('<scripture>not a script</scripture>'), []);
});
