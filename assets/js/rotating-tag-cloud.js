document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tag-cloud-container');
  const dataList = document.getElementById('tag-data');
  if (!container || !dataList) return;

  // Read category data from hidden list
  const items = [];
  dataList.querySelectorAll('li').forEach(li => {
    const name = li.dataset.name;
    const count = parseInt(li.dataset.count, 10);
    const url = li.dataset.url;
    if (name && count) items.push({ name, count, url });
  });

  if (items.length === 0) return;

  // Calculate font sizes based on count (relative to max)
  const maxCount = Math.max(...items.map(i => i.count));
  const minFont = 0.8; // rem
  const maxFont = 1.8; // rem

  // Create tag elements
  const tags = items.map(item => {
    const span = document.createElement('a');
    span.className = 'rotating-tag';
    span.href = item.url;
    span.textContent = item.name + ' (' + item.count + ')';
    // Font size proportional to count
    const ratio = item.count / maxCount;
    const fontSize = minFont + ratio * (maxFont - minFont);
    span.style.fontSize = fontSize + 'rem';
    // Random initial position on the sphere (theta, phi)
    span.dataset.theta = Math.random() * Math.PI * 2;
    span.dataset.phi = Math.random() * Math.PI * 2;
    container.appendChild(span);
    return span;
  });

  // Sphere radius in pixels (adjust to fit container)
  const radiusX = container.offsetWidth / 2 * 1.0;
  const radiusY = container.offsetHeight / 2 * 1.0;

  // Rotation speeds (radians per frame)
  let angleX = 0;
  let angleY = 0;
  const speedX = 0.003;
  const speedY = 0.005;
  let isHovered = false;

  container.addEventListener('mouseenter', () => { isHovered = true; });
  container.addEventListener('mouseleave', () => { isHovered = false; });

  function updatePositions() {
    tags.forEach(tag => {
      // Get current spherical coordinates
      let theta = parseFloat(tag.dataset.theta);
      let phi = parseFloat(tag.dataset.phi);

      // Convert to Cartesian for rotation
      let x = Math.sin(phi) * Math.cos(theta);
      let y = Math.cos(phi);
      let z = Math.sin(phi) * Math.sin(theta);

      // Rotate around Y axis (horizontal spin)
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const newX = x * cosY - z * sinY;
      const newZ = x * sinY + z * cosY;
      x = newX; z = newZ;

      // Rotate around X axis (vertical tilt)
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const newY = y * cosX - z * sinX;
      const newZ2 = y * sinX + z * cosX;
      y = newY; z = newZ2;

      // Project to 2D with perspective
      const scale = 400 / (400 + z * radiusX);
      const screenX = (x * radiusX * scale) + container.offsetWidth / 2;
      const screenY = (-y * radiusY * scale) + container.offsetHeight / 2;

      tag.style.transform = `translate(-50%, -50%) translate(${screenX}px, ${screenY}px)`;
      tag.style.opacity = 0.6 + 0.4 * ((z + 1) / 2); // closer = brighter
      tag.style.zIndex = Math.round(scale * 100);
    });
  }

  function animate() {
    if (!isHovered) {
      angleY += speedY;
      angleX += speedX;
    }
    updatePositions();
    requestAnimationFrame(animate);
  }

  // Set initial positions
  updatePositions();
  animate();

  // Recalculate radius on window resize
  window.addEventListener('resize', () => {
    // No need to recalculate if container size fixed; but adjust if needed
  });
});