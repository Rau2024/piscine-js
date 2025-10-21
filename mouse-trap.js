let lastCircle = null;
let box = null;

export function createCircle() {
  document.addEventListener('click', (e) => {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.background = 'white';
    circle.style.left = `${e.clientX - 25}px`; // Center the circle (50/2 = 25)
    circle.style.top = `${e.clientY - 25}px`;
    document.body.appendChild(circle);
    lastCircle = circle;
  });
}

export function moveCircle() {
  document.addEventListener('mousemove', (e) => {
    if (!lastCircle) return;

    // Get box rect and circle rect (circle is 50x50)
    const boxRect = box.getBoundingClientRect();

    // Calculate proposed new circle position (centered on mouse)
    let newLeft = e.clientX - 25;
    let newTop = e.clientY - 25;

    // Check if the circle is already trapped (purple)
    if (lastCircle.style.background === 'var(--purple)') {
      // Constrain circle inside the box (box borders are 1px)
      // The circle must stay fully inside the box, so:
      // left >= box.left + 1
      // top >= box.top + 1
      // right <= box.right - 1
      // bottom <= box.bottom - 1
      const minLeft = boxRect.left + 1;
      const minTop = boxRect.top + 1;
      const maxLeft = boxRect.right - 1 - 50; // circle width = 50
      const maxTop = boxRect.bottom - 1 - 50;

      newLeft = Math.min(Math.max(newLeft, minLeft), maxLeft);
      newTop = Math.min(Math.max(newTop, minTop), maxTop);

      // Update position to constrained position
      lastCircle.style.left = `${newLeft}px`;
      lastCircle.style.top = `${newTop}px`;

      return; // no further checking needed, circle is trapped
    }

    // If circle is not trapped, update its position freely first
    lastCircle.style.left = `${newLeft}px`;
    lastCircle.style.top = `${newTop}px`;

    // Now check if circle is fully inside the box
    const circleRect = lastCircle.getBoundingClientRect();

    // To be fully inside box (including border):
    // circle.left >= box.left + 1
    // circle.top >= box.top + 1
    // circle.right <= box.right - 1
    // circle.bottom <= box.bottom - 1
    const inside =
      circleRect.left >= boxRect.left + 1 &&
      circleRect.top >= boxRect.top + 1 &&
      circleRect.right <= boxRect.right - 1 &&
      circleRect.bottom <= boxRect.bottom - 1;

    if (inside) {
      // Trap the circle: turn purple and constrain it
      lastCircle.style.background = 'var(--purple)';
      // Make sure circle is fully inside (already true), but re-apply constraints
      lastCircle.style.left = `${circleRect.left}px`;
      lastCircle.style.top = `${circleRect.top}px`;
    }
  });
}

export function setBox() {
  box = document.createElement('div');
  box.className = 'box';

  // Position the box centered on the page
  // The box CSS only sets width/height and border,
  // so we need to position it absolutely or fixed
  // Let's do fixed to keep it centered on viewport.

  box.style.position = 'fixed';
  box.style.left = '50%';
  box.style.top = '50%';
  box.style.transform = 'translate(-50%, -50%)';

  document.body.appendChild(box);
}
