// ======================================
// MANEJO DEL MENÚ LATERAL
// ======================================

// Toggle del menú (abrir/cerrar)
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
}

// Cerrar menú
function closeMenu() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}

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
  if (touchStartX - touchEndX > 50) {
    closeMenu();
  }
}

// Agregar eventos de touch
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchend', handleTouchEnd, false);

// Cerrar menú si se hace click en un link del sidebar
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
});

// ======================================
// SLIDER AUTOMÁTICO DE RESEÑAS
// ======================================

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

// Cambia de reseña cada 5 segundos
setInterval(showNextSlide, 5000);
