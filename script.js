const items = document.querySelectorAll('.item');
let isDragging = false;
let currentItem = null;
let offsetX, offsetY;

// Mouse down event: Start dragging
items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentItem = item;
    offsetX = e.clientX - item.getBoundingClientRect().left;
    offsetY = e.clientY - item.getBoundingClientRect().top;
    item.style.transition = 'none'; // Disable transition while dragging
  });
});

// Mouse move event: Update position of the item
document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentItem) return;

  const mouseX = e.clientX - offsetX;
  const mouseY = e.clientY - offsetY;

  // Get the boundary of the container
  const container = document.querySelector('.items');
  const containerRect = container.getBoundingClientRect();

  // Prevent dragging outside the container's boundaries
  const maxX = containerRect.width - currentItem.offsetWidth;
  const maxY = containerRect.height - currentItem.offsetHeight;

  // Constrain the movement of the cube within the container
  const newX = Math.max(0, Math.min(mouseX, maxX));
  const newY = Math.max(0, Math.min(mouseY, maxY));

  // Update the position of the cube
  currentItem.style.left = `${newX}px`;
  currentItem.style.top = `${newY}px`;
});

// Mouse up event: Stop dragging and finalize the position
document.addEventListener('mouseup', () => {
  if (!isDragging) return;

  isDragging = false;
  if (currentItem) {
    currentItem.style.transition = 'transform 0.1s ease'; // Re-enable transition
    currentItem = null;
  }
});
