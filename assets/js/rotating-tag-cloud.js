(function cloudScript() {
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tag-cloud-container');
  const dataList = document.getElementById('tag-data');
  if (!container || !dataList) return;

  const items = [];
  dataList.querySelectorAll('li').forEach(li => {
    const name = li.dataset.name;
    const count = parseInt(li.dataset.count, 10);
    if (name && count > 0) items.push({ name, count });
  });
  if (!items.length) return;

  const maxCount = Math.max(...items.map(item => item.count));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tags = items.map(item => {
    const tag = document.createElement('span');
    tag.className = 'rotating-tag';
    // Counts still control relative size but are never displayed.
    tag.style.fontSize = (0.8 + item.count / maxCount) + 'rem';
    tag.dataset.theta = Math.random() * Math.PI * 2;
    tag.dataset.phi = Math.random() * Math.PI * 2;
    container.appendChild(tag);
    return tag;
  });

  let radiusX = 0;
  let radiusY = 0;
  let angleX = 0;
  let angleY = 0;
  let frameId = null;
  let lastTime = null;
  let visible = true;
  let hovering = false;
  let keyboardFocused = false;
  // The old values were radians per frame at 60 FPS. Convert to radians/second.
  const speedX = 0.003 * 60;
  const speedY = 0.005 * 60;

  function measure() {
    radiusX = container.offsetWidth / 2;
    radiusY = container.offsetHeight / 2;
  }

  function updatePositions() {
    const cosX = Math.cos(angleX);
    const sinX = Math.sin(angleX);
    const cosY = Math.cos(angleY);
    const sinY = Math.sin(angleY);
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    tags.forEach(tag => {
      const theta = Number(tag.dataset.theta);
      const phi = Number(tag.dataset.phi);
      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.cos(phi);
      let z = Math.sin(phi) * Math.sin(theta);
      const rotatedX = x * cosY - z * sinY;
      const rotatedZ = x * sinY + z * cosY;
      x = rotatedX;
      z = rotatedZ;
      const rotatedY = y * cosX - z * sinX;
      z = y * sinX + z * cosX;
      y = rotatedY;
      const scale = 400 / (400 + z * radiusX);
      const screenX = x * radiusX * scale + centerX;
      const screenY = -y * radiusY * scale + centerY;
      tag.style.transform = `translate(-50%, -50%) translate(${screenX}px, ${screenY}px)`;
      tag.style.opacity = String(0.6 + 0.4 * ((z + 1) / 2));
      tag.style.zIndex = String(Math.round(scale * 100));
    });
  }

  function stop() {
    if (frameId !== null) cancelAnimationFrame(frameId);
    frameId = null;
    lastTime = null;
  }

  function shouldAnimate() {
    return !reducedMotion.matches && !document.hidden && visible && !hovering && !keyboardFocused;
  }

  function animate(now) {
    frameId = null;
    if (!shouldAnimate()) {
      lastTime = null;
      return;
    }
    if (lastTime !== null) {
      // Prevent large jumps when a browser resumes after being suspended.
      const elapsed = Math.max(0, Math.min((now - lastTime) / 1000, 0.05));
      angleX += speedX * elapsed;
      angleY += speedY * elapsed;
    }
    lastTime = now;
    updatePositions();
    frameId = requestAnimationFrame(animate);
  }

  function syncAnimation() {
    if (!shouldAnimate()) {
      stop();
    } else if (frameId === null) {
      lastTime = null;
      frameId = requestAnimationFrame(animate);
    }
  }

  function applyMotionPreference() {
    const staticMode = reducedMotion.matches;
    stop();
    container.classList.toggle('tag-cloud-static', staticMode);
    tags.forEach((tag, index) => {
      tag.textContent = items[index].name;
      if (staticMode) {
        tag.style.removeProperty('transform');
        tag.style.removeProperty('opacity');
        tag.style.removeProperty('z-index');
      }
    });
    if (!staticMode) {
      measure();
      updatePositions();
      syncAnimation();
    }
  }

  container.addEventListener('mouseenter', () => {
    hovering = true;
    syncAnimation();
  });
  container.addEventListener('mouseleave', () => {
    hovering = false;
    syncAnimation();
  });
  container.addEventListener('focusin', () => {
    keyboardFocused = true;
    syncAnimation();
  });
  container.addEventListener('focusout', event => {
    keyboardFocused = container.contains(event.relatedTarget);
    syncAnimation();
  });
  document.addEventListener('visibilitychange', syncAnimation);
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0]?.isIntersecting ?? false;
      syncAnimation();
    });
    observer.observe(container);
  }
  if (typeof reducedMotion.addEventListener === 'function') {
    reducedMotion.addEventListener('change', applyMotionPreference);
  } else if (typeof reducedMotion.addListener === 'function') {
    reducedMotion.addListener(applyMotionPreference);
  }
  window.addEventListener('resize', () => {
    if (!reducedMotion.matches) {
      measure();
      updatePositions();
    }
  });

  applyMotionPreference();
});
})();
