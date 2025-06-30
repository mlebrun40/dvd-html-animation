const dvdLogo = document.getElementById('dvd-logo');
const container = document.getElementById('dvd-container');

let pos = { x: 100, y: 100 };
let velocity = { x: 3, y: 2 };
let logoWidth, logoHeight, containerWidth, containerHeight;

function updateSizes() {
  // logo sizes in px
  logoWidth = dvdLogo.offsetWidth;
  logoHeight = dvdLogo.offsetHeight;
  containerWidth = window.innerWidth;
  containerHeight = window.innerHeight;
}
window.addEventListener('resize', updateSizes);

function randomColor() {
  // Random bright color
  const r = 128 + Math.floor(Math.random() * 127);
  const g = 128 + Math.floor(Math.random() * 127);
  const b = 128 + Math.floor(Math.random() * 127);
  return `rgb(${r},${g},${b})`;
}

function moveLogo() {
  pos.x += velocity.x;
  pos.y += velocity.y;

  // Bounce off sides
  if (pos.x <= 0 || pos.x + logoWidth >= containerWidth) {
    velocity.x *= -1;
    dvdLogo.style.filter = `drop-shadow(0 0 15px ${randomColor()})`;
  }
  if (pos.y <= 0 || pos.y + logoHeight >= containerHeight) {
    velocity.y *= -1;
    dvdLogo.style.filter = `drop-shadow(0 0 15px ${randomColor()})`;
  }

  // Clamp position within bounds in case of resize
  pos.x = Math.max(0, Math.min(pos.x, containerWidth - logoWidth));
  pos.y = Math.max(0, Math.min(pos.y, containerHeight - logoHeight));

  dvdLogo.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  requestAnimationFrame(moveLogo);
}

// Wait for logo image to load for correct sizing
dvdLogo.onload = function() {
  updateSizes();
  moveLogo();
};
// In case the image is cached and already loaded:
if (dvdLogo.complete) {
  updateSizes();
  moveLogo();
}