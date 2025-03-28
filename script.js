let isDragging = false;
let currentItem = null;
let offsetX, offsetY;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentItem = item;
    offsetX = e.clientX - item.getBoundingClientRect().left;
    offsetY = e.clientY - item.getBoundingClientRect().top;
    item.style.transition = 'none'; // Disable transition while dragging
  });
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;

  const mouseX = e.clientX - offsetX;
  const mouseY = e.clientY - offsetY;

  // Get the boundary of the container
  const container = document.querySelector('.items');
  const containerRect = container.getBoundingClientRect();

  // Prevent dragging outside of the container's boundaries
  const maxX = containerRect.width - currentItem.offsetWidth;
  const maxY = containerRect.height - currentItem.offsetHeight;

  // Constrain the movement of the cube within the container
  const newX = Math.max(0, Math.min(mouseX, maxX));
  const newY = Math.max(0, Math.min(mouseY, maxY));

  currentItem.style.left = `${newX}px`;
  currentItem.style.top = `${newY}px`;

  // Scroll the container if necessary
  if (newX <= 0) {
    container.scrollLeft = Math.max(container.scrollLeft - 10, 0);  // Scroll left
  } else if (newX >= maxX) {
    container.scrollLeft = Math.min(container.scrollLeft + 10, container.scrollWidth - container.clientWidth);  // Scroll right
  }
});

document.addEventListener('mouseup', () => {
  if (!isDragging) return;

  isDragging = false;
  if (currentItem) {
    currentItem.style.transition = 'all 0.2s'; // Re-enable transition
    currentItem = null;
  }
});
