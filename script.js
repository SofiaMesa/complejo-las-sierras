// Función para abrir/cerrar el menú lateral
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("open");
}

// Cierra el menú al sacar el mouse
function closeMenu() {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.remove("open");
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  if (slides.length > 0) {
    function showNextSlide() {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }

    // Ejecutar cada 5 segundos si hay slides
    setInterval(showNextSlide, 5000);
  }
});
