/* Article media sizing: enlarge photographs by at most 150% without distortion.
   Intentionally small graphics and explicitly sized images are left at their
   original display width. Captions stay left-aligned and are centred as a
   readable text block only when the accompanying image is narrow. */
(() => {
  const content = document.querySelector('.post-full .post-content');
  if (!content) return;

  const photoFile = /\.(?:jpe?g|jxl|webp|avif)$/i;
  const graphicFile = /(?:^|[\/_ .-])(?:icon|logo|sprite|pixel-art|screenshot|screen-shot|diagram|chart|graph)(?:[\/_ .-]|$)/i;
  const graphicAlt = /\b(?:screenshot|screen capture|gameplay|game screen|title screen|pixel art|sprite|diagram|chart|graph|illustration|illustrated guide|ascii art)\b/i;
  const standaloneGraphicAlt = /^(?:an? |the )?(?:icon|logo)\b/i;
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
    if (!photoFile.test(path) || path.endsWith('-wide-1800.jxl')) return false;
    if (graphicFile.test(path) || graphicAlt.test(img.alt || '') || standaloneGraphicAlt.test(img.alt || '')) return false;
    return true;
  }

  function updateCaptions() {
    for (const { img, frame, caption } of entries) {
      if (!caption) continue;
      const frameWidth = frame.getBoundingClientRect().width;
      const imageWidth = img.getBoundingClientRect().width;
      if (frameWidth > 0 && imageWidth > 0) {
        caption.classList.toggle('media-caption--narrow', imageWidth + 2 < frameWidth);
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
    entries.push({ img, frame, caption: captionFor(frame) });

    const applyImageSize = () => {
      if (canEnlarge && img.naturalWidth > 0) {
        img.style.width = `${Math.round(img.naturalWidth * 1.5)}px`;
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
