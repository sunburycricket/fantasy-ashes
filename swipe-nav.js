// ----- MOBILE SWIPE NAVIGATION -----
const pages = [
  "index.html",
  "teams.html",
  "player-stats.html",
  "transfers.html",
  "rules.html"
];

let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;

const SWIPE_THRESHOLD = 60;      // px
const MAX_VERTICAL_DRIFT = 80;   // px

document.addEventListener("touchstart", e => {
  if (e.touches.length !== 1) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;

  const deltaX = touchEndX - touchStartX;
  const deltaY = Math.abs(touchEndY - touchStartY);

  // Ignore vertical scrolling (table etc.)
  if (deltaY > MAX_VERTICAL_DRIFT) return;

  if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
    navigateBySwipe(deltaX);
  }
}, { passive: true });

function navigateBySwipe(deltaX) {
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const currentIndex = pages.indexOf(currentPage);
  if (currentIndex === -1) return;

  // Swipe left → next page
  if (deltaX < 0 && currentIndex < pages.length - 1) {
    window.location.href = pages[currentIndex + 1];
  }

  // Swipe right → previous page
  if (deltaX > 0 && currentIndex > 0) {
    window.location.href = pages[currentIndex - 1];
  }
}
