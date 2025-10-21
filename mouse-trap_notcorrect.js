let lastCircle = null;
let box = null;
let trappedCircles = new Set();

// Create a circle at mouse position on click
function createCircle(event) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.background = 'white';
    circle.style.position = 'absolute';
    circle.style.left = event.clientX + 'px';
    circle.style.top = event.clientY + 'px';
    
    document.body.appendChild(circle);
    lastCircle = circle;
}

// Move the last created circle with mouse movement
function moveCircle(event) {
    if (!lastCircle || trappedCircles.has(lastCircle)) {
        return;
    }
    
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // Check if circle would be trapped in box
    if (box && isCircleInBox(mouseX, mouseY, lastCircle)) {
        // Trap the circle
        trapCircle(lastCircle, mouseX, mouseY);
    } else {
        // Move circle to mouse position
        lastCircle.style.left = mouseX + 'px';
        lastCircle.style.top = mouseY + 'px';
    }
}

// Create the trap box in center of page
function setBox() {
    box = document.createElement('div');
    box.className = 'box';
    box.style.position = 'absolute';
    
    // Center the box on the page
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Position box at center (will be adjusted by CSS)
    box.style.left = centerX + 'px';
    box.style.top = centerY + 'px';
    
    document.body.appendChild(box);
}

// Check if a circle at given position would be entirely inside the box
function isCircleInBox(mouseX, mouseY, circle) {
    if (!box) return false;
    
    const boxRect = box.getBoundingClientRect();
    const circleRect = circle.getBoundingClientRect();
    
    // Calculate circle dimensions
    const circleRadius = circleRect.width / 2;
    
    // Calculate circle center if it were at mouse position
    const circleCenterX = mouseX;
    const circleCenterY = mouseY;
    
    // Check if entire circle (including radius) is inside box bounds
    // Account for 1px border
    const boxLeft = boxRect.left + 1;
    const boxRight = boxRect.right - 1;
    const boxTop = boxRect.top + 1;
    const boxBottom = boxRect.bottom - 1;
    
    return (circleCenterX - circleRadius >= boxLeft &&
            circleCenterX + circleRadius <= boxRight &&
            circleCenterY - circleRadius >= boxTop &&
            circleCenterY + circleRadius <= boxBottom);
}

// Trap a circle inside the box
function trapCircle(circle, mouseX, mouseY) {
    // Mark as trapped
    trappedCircles.add(circle);
    
    // Change color to purple
    circle.style.background = 'var(--purple)';
    
    // Position circle at mouse position (it's already validated to be inside)
    circle.style.left = mouseX + 'px';
    circle.style.top = mouseY + 'px';
    
    // Clear lastCircle so it stops following mouse
    if (lastCircle === circle) {
        lastCircle = null;
    }
}

// Set up event listeners
document.addEventListener('click', createCircle);
document.addEventListener('mousemove', moveCircle);

// Create the trap box when page loads
document.addEventListener('DOMContentLoaded', setBox);
// Also create box immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setBox);
} else {
    setBox();
}
