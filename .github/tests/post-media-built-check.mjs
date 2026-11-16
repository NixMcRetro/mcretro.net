import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// The Markdown rendering hook supplies intrinsic dimensions that the browser
// script may safely override for capped photo enlargement.
const site = process.argv[2] ?? '_site';
const html = fs.readFileSync(path.join(site, 'vegemite-australias-birthright', 'index.html'), 'utf8');
const imgTag = [...html.matchAll(/<img\b[^>]*>/gi)].map(([tag]) => tag)
  .find(tag => tag.includes('/assets/images/2016/img_0499.jpg'));
assert.ok(imgTag, 'Expected Vegemite photograph missing from built post');
assert.ok(imgTag.includes('width="312"') && imgTag.includes('height="349"'),
  'Original image dimensions not present on built photograph');
assert.ok(imgTag.includes('data-mcretro-intrinsic-dimensions="true"'),
  'Generated width/height marker missing; 150% enlargement would be blocked');
assert.ok(html.includes('/assets/js/post-media-layout.js'),
  'Article media enlargement script is not loaded');
console.log('Post media build check passed.');
