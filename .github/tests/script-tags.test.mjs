import test from 'node:test';
import assert from 'node:assert/strict';
import { scriptElements } from './script-tags.mjs';

test('handles quoted angle brackets, varied spacing and mixed case', () => {
  const found = scriptElements('<SCRIPT SRC = "/x.js" data-note=">" DeFeR></SCRIPT><script>run()</script>');
  assert.equal(found.length, 2);
  assert.equal(found[0].parsedAttributes.get('src'), '/x.js');
  assert.equal(found[0].parsedAttributes.get('data-note'), '>');
  assert.equal(found[0].body, '');
  assert.equal(found[1].body, 'run()');
});
test('similar tag names do not count as script elements', () => {
  assert.deepEqual(scriptElements('<scripture>not a script</scripture>'), []);
});
test('attribute values do not masquerade as src or type', () => {
  const found = scriptElements('<script data-note="src=&quot;/evil.js&quot; type=&quot;application/ld+json&quot;">run()</script>');
  assert.equal(found.length, 1);
  assert.equal(found[0].parsedAttributes.has('src'), false);
  assert.equal(found[0].parsedAttributes.has('type'), false);
});
test('script with JSON-LD type has exact attribute name and value', () => {
  const found = scriptElements("<script TYPE='application/ld+json'>{}</script>");
  assert.equal(found[0].parsedAttributes.get('type'), 'application/ld+json');
});
