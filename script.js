function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

function closeMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("open");
}

// Slider automático para reseñas
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

setInterval(showNextSlide, 5000); // cambia cada 5 segundos

// Detectar deslizamiento hacia la izquierda para cerrar el menú
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
}

function handleGesture() {
  if (touchStartX - touchEndX > 50) { // deslizar hacia la izquierda más de 50px
    closeMenu();
  }
}

// Agregar eventos al documento
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

// Función que ya tenés para cerrar el menú
function closeMenu() {
  document.getElementById('sidebar').classList.remove('open');
}

