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


// Exercise the shipped browser script with a minimal DOM rather than only
// checking that the script URL appears in the built HTML.
const { runInNewContext } = await import('node:vm');
const script = fs.readFileSync('assets/js/post-media-layout.js', 'utf8');
function renderedWidth({ filename, alt = '', naturalWidth = 500, explicitWidth = false, optOut = false }) {
  const source = 'https://mcretro.net/assets/images/' + filename;
  const caption = { matches: selector => selector === 'p.media-caption', classList: { toggle() {} } };
  const frame = {
    tagName: 'P', children: [], nextElementSibling: caption,
    getBoundingClientRect: () => ({ width: 848 })
  };
  const img = {
    alt, src: source, currentSrc: source, naturalWidth, complete: true, style: {},
    parentElement: frame,
    getBoundingClientRect() {
      return { width: Math.min(parseFloat(this.style.width) || naturalWidth, 848) };
    },
    matches: () => optOut,
    closest: () => null,
    hasAttribute: name => name === 'width' || (!explicitWidth && name === 'data-mcretro-intrinsic-dimensions')
  };
  frame.firstElementChild = img;
  frame.children.push(img);
  const content = { querySelectorAll: selector => selector === 'img' ? [img] : [] };
  runInNewContext(script, {
    URL, Math, document: { querySelector: () => content, baseURI: 'https://mcretro.net/' },
    window: { addEventListener() {} },
    requestAnimationFrame: callback => callback()
  });
  return img.style.width || null;
}
assert.equal(renderedWidth({ filename: '2020/img_0656.jpg', alt: 'Sonic the Hedgehog 1 title screen with glitches.' }), '750px');
assert.equal(renderedWidth({ filename: '2020/img_0657.jpg', alt: 'Sonic 2 gameplay with scrambled scenery.' }), '750px');
assert.equal(renderedWidth({ filename: '2020/img_0658.jpg', alt: 'Blue SEGA logo on a nearly white screen.' }), '750px');
assert.equal(renderedWidth({ filename: '2020/example.png', alt: 'Computer screenshot.' }), '750px');
assert.equal(renderedWidth({ filename: '2020/example.jpg', explicitWidth: true }), null);
assert.equal(renderedWidth({ filename: '2020/example.jpg', optOut: true }), null);
assert.equal(renderedWidth({ filename: '2012/test-wide-1800.jxl' }), null);
assert.equal(renderedWidth({ filename: '2020/example.gif' }), null);
console.log('Post media uniform 150% scaling checks passed.');
