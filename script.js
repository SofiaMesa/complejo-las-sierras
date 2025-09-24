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

/* ====== Includes de header y footer + navegación activa ====== */
(function () {
  async function injectIncludes() {
    const spots = document.querySelectorAll("[data-include]");
    for (const el of spots) {
      const file = el.getAttribute("data-include");
      try {
        const resp = await fetch(file, { cache: "no-cache" });
        if (!resp.ok) continue;
        el.outerHTML = await resp.text();
      } catch (e) {
        // si falla, la página igual carga
      }
    }
    highlightActiveLink();
  }

  function highlightActiveLink() {
    const path = location.pathname.split("/").pop() || "index.html";
    const links = document.querySelectorAll('nav[aria-label="Principal"] a');
    links.forEach(a => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href === path) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
      if (path === "" && href === "index.html") {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectIncludes);
  } else {
    injectIncludes();
  }
})();
