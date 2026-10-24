import { readFileSync } from 'node:fs';

const path = process.argv[2];
if (!path) throw new Error('Expected generated HTML path');
const html = readFileSync(path, 'utf8');
const match = html.match(/<footer\b[^>]*class="site-footer"[^>]*>[\s\S]*?<\/footer>/i);
if (!match) throw new Error('Generated footer missing');
if (/\bstyle\s*=/i.test(match[0])) throw new Error('Inline CSS remains in generated footer');
for (const name of ['footer-rule', 'footer-badges', 'footer-badge', 'footer-details', 'footer-pride']) {
  if (!match[0].includes('class="' + name + '"')) throw new Error('Missing class: ' + name);
}
console.log('Generated footer contains no inline style attributes');
