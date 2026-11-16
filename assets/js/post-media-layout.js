/* Article media sizing: enlarge raster photographs, screenshots and diagrams
   proportionally by up to 170%. Explicitly sized or opted-out images remain
   unchanged; captions match their rendered image widths, including on resize. */
(() => {
  const content = document.querySelector('.post-full .post-content');
  if (!content) return;

  // Scale raster images consistently, regardless of whether their ALT text
  // describes a photograph, screenshot, game screen, logo, or diagram.
  const scalableRasterFile = /\.(?:jpe?g|jxl|png|webp|avif)$/i;
  const exemptSelector = '[data-no-enlarge], .no-enlarge, .pixel-art, .keep-original-size';
  const entries = [];

  function mediaFrame(img) {
    const parent = img.parentElement;
    const media = parent?.tagName === 'A' ? parent : img;
    const frame = media.parentElement;
    if (!frame || !['P', 'FIGURE'].includes(frame.tagName)) return null;
    if (frame.tagName === 'P' && (frame.children.length !== 1 || frame.firstElementChild !== media)) return null;
    return frame;
  }

  function captionFor(frame) {
    if (frame.tagName === 'FIGURE') return frame.querySelector('figcaption');
    const next = frame.nextElementSibling;
    return next?.matches('p.media-caption') ? next : null;
  }

  function shouldEnlarge(img) {
    if (img.matches(exemptSelector) || img.closest(exemptSelector)) return false;
    // Jekyll adds intrinsic width/height attributes for layout stability.
    // Only authored dimensions (without the marker) opt out of enlargement.
    if (img.hasAttribute('width') && !img.hasAttribute('data-mcretro-intrinsic-dimensions')) return false;
    if (img.style.width || img.style.maxWidth) return false;
    const path = new URL(img.currentSrc || img.src, document.baseURI).pathname;
    // The five approved historical full-width JXL photos retain their
    // existing dedicated CSS rule. GIF and SVG are deliberately untouched.
    if (!scalableRasterFile.test(path) || path.endsWith('-wide-1800.jxl')) return false;
    return true;
  }

  function updateCaptions() {
    for (const { img, caption } of entries) {
      if (!caption) continue;
      const imageWidth = img.getBoundingClientRect().width;
      if (imageWidth > 0) {
        caption.style.maxWidth = `${Math.round(imageWidth)}px`;
      }
    }
  }

  let updateScheduled = false;
  function scheduleCaptionUpdate() {
    if (updateScheduled) return;
    updateScheduled = true;
    requestAnimationFrame(() => {
      updateScheduled = false;
      updateCaptions();
    });
  }

  for (const img of content.querySelectorAll('img')) {
    const frame = mediaFrame(img);
    if (!frame) continue;
    const canEnlarge = shouldEnlarge(img);
    entries.push({ img, caption: captionFor(frame) });

    const applyImageSize = () => {
      if (canEnlarge && img.naturalWidth > 0) {
        img.style.width = `${Math.round(img.naturalWidth * 1.7)}px`;
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
      }
      scheduleCaptionUpdate();
    };

    if (img.complete) applyImageSize();
    else img.addEventListener('load', applyImageSize, { once: true });
  }

  window.addEventListener('resize', scheduleCaptionUpdate, { passive: true });
  scheduleCaptionUpdate();
})();
