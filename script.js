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
