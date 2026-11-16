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
function renderedMedia({ filename, alt = '', naturalWidth = 500, explicitWidth = false,
                         optOut = false, frameTag = 'P', linked = false }) {
  const source = 'https://mcretro.net/assets/images/' + filename;
  const caption = { matches: selector => selector === 'p.media-caption', style: {} };
  let frameWidth = 848;
  const frame = {
    tagName: frameTag, children: [], nextElementSibling: caption,
    querySelector: selector => selector === 'figcaption' ? caption : null,
    getBoundingClientRect: () => ({ width: frameWidth })
  };
  const anchor = { tagName: 'A', parentElement: frame };
  const img = {
    alt, src: source, currentSrc: source, naturalWidth, complete: true, style: {},
    parentElement: linked ? anchor : frame,
    getBoundingClientRect() {
      return { width: Math.min(parseFloat(this.style.width) || naturalWidth, frameWidth) };
    },
    matches: () => optOut,
    closest: () => null,
    hasAttribute: name => name === 'width' || (!explicitWidth && name === 'data-mcretro-intrinsic-dimensions')
  };
  const media = linked ? anchor : img;
  frame.firstElementChild = media;
  frame.children.push(media);
  const content = { querySelectorAll: selector => selector === 'img' ? [img] : [] };
  const listeners = {};
  runInNewContext(script, {
    URL, Math, document: { querySelector: () => content, baseURI: 'https://mcretro.net/' },
    window: { addEventListener(name, callback) { listeners[name] = callback; } },
    requestAnimationFrame: callback => callback()
  });
  return {
    img, caption,
    resizeTo(width) {
      frameWidth = width;
      listeners.resize();
    }
  };
}
function renderedWidth(options) {
  return renderedMedia(options).img.style.width || null;
}
assert.equal(renderedWidth({ filename: '2020/img_0656.jpg', alt: 'Sonic the Hedgehog 1 title screen with glitches.' }), '850px');
assert.equal(renderedWidth({ filename: '2020/img_0657.jpg', alt: 'Sonic 2 gameplay with scrambled scenery.' }), '850px');
assert.equal(renderedWidth({ filename: '2020/img_0658.jpg', alt: 'Blue SEGA logo on a nearly white screen.' }), '850px');
assert.equal(renderedWidth({ filename: '2020/example.png', alt: 'Computer screenshot.' }), '850px');
assert.equal(renderedWidth({ filename: '2020/example.jpg', explicitWidth: true }), null);
assert.equal(renderedWidth({ filename: '2020/example.jpg', optOut: true }), null);
assert.equal(renderedWidth({ filename: '2012/test-wide-1800.jxl' }), null);
assert.equal(renderedWidth({ filename: '2020/example.gif' }), null);
assert.equal(renderedWidth({ filename: '2016/img_0494.jpg', naturalWidth: 500 }), '850px');
assert.equal(renderedWidth({ filename: '2016/img_0493.jpg', naturalWidth: 600 }), '1020px');
assert.equal(renderedWidth({ filename: '2021/img_0780a.jpg', naturalWidth: 1024 }), '1741px');
const css = fs.readFileSync('assets/css/overrides.css', 'utf8');
assert.match(css, /\.post-full \.post-content > \.video-container\s*\{\s*margin:\s*0 0 1\.15em;/,
  'Direct article videos should share the regular paragraph-to-media spacing');
assert.match(css, /\.post-full \.post-content p\.media-caption,[\s\S]*?text-align:\s*center;/,
  'Article captions should be centred');
assert.doesNotMatch(css, /media-caption--narrow/, 'Obsolete narrow-caption rule should be removed');

const narrow = renderedMedia({ filename: '2016/img_0491.jpg', naturalWidth: 220 });
assert.equal(narrow.caption.style.maxWidth, '374px', 'Narrow screenshot caption matches image');
narrow.resizeTo(320);
assert.equal(narrow.caption.style.maxWidth, '320px', 'Narrow caption responds to mobile resize');
const wide = renderedMedia({ filename: '2012/test-wide-1800.jxl', naturalWidth: 1800 });
assert.equal(wide.caption.style.maxWidth, '848px', 'Full-width photo caption is not artificially narrowed');
wide.resizeTo(375);
assert.equal(wide.caption.style.maxWidth, '375px', 'Wide photo caption follows the mobile viewport');
const figure = renderedMedia({ filename: '2020/example.jpg', naturalWidth: 300, frameTag: 'FIGURE' });
assert.equal(figure.caption.style.maxWidth, '510px', 'Figure caption follows its image');
const linked = renderedMedia({ filename: '2020/example.jpg', naturalWidth: 200, linked: true });
assert.equal(linked.caption.style.maxWidth, '340px', 'Linked-image caption follows its image');
const optOutCaption = renderedMedia({ filename: '2020/example.jpg', naturalWidth: 250, optOut: true });
assert.equal(optOutCaption.caption.style.maxWidth, '250px', 'Opted-out images retain correct caption width');
console.log('Post media 170% sizing, responsive caption widths and video spacing checks passed.');
