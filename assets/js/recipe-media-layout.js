/* Match recipe captions to their rendered photo widths, without resizing photos.
   The post media script remains exclusive to blog posts. */
(() => {
  const content = document.querySelector('body[data-recipe-page="true"] .content-area');
  if (!content) return;

  const pairs = [];
  for (const caption of content.querySelectorAll('p.media-caption')) {
    const frame = caption.previousElementSibling;
    if (frame?.tagName !== 'P' || frame.children.length !== 1) continue;
    const media = frame.firstElementChild;
    const image = media.tagName === 'IMG'
      ? media
      : media.tagName === 'A' && media.children.length === 1 && media.firstElementChild?.tagName === 'IMG'
        ? media.firstElementChild
        : null;
    if (image) pairs.push({ image, caption });
  }
  if (!pairs.length) return;

  let scheduled = false;
  function updateWidths() {
    for (const { image, caption } of pairs) {
      const width = image.getBoundingClientRect().width;
      if (width > 0) caption.style.maxWidth = `${Math.round(width)}px`;
    }
  }
  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      updateWidths();
    });
  }

  for (const { image } of pairs) {
    if (!image.complete) image.addEventListener('load', scheduleUpdate, { once: true });
  }
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  scheduleUpdate();
})();
