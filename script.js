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


// Toggle menú lateral + overlay
function toggleMenu() {
  const s = document.getElementById('sidebar');
  const o = document.getElementById('overlay');
  s.classList.toggle('open');
  o.classList.toggle('show');
}
function closeMenu() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('show');
}
// Cerrar con ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ====== Carrusel accesible con autoplay ====== */
(function(){
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(initCarousel);

  function initCarousel(root){
    const viewport = root.querySelector('.carousel__viewport');
    const slides = Array.from(root.querySelectorAll('.carousel__slide'));
    const btnPrev = root.querySelector('[data-dir="prev"]');
    const btnNext = root.querySelector('[data-dir="next"]');
    const dotsWrap = root.querySelector('.carousel__dots');

    // Build dots
    dotsWrap.innerHTML = '';
    slides.forEach((_, idx) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carousel__dot';
      b.dataset.index = String(idx);
      b.setAttribute('aria-label', `Ir a la foto ${idx+1}`);
      dotsWrap.appendChild(b);
    });

    let i = 0;
    let timer = null;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const delay = parseInt(root.getAttribute('data-autoplay') || '0', 10);
    let inView = true;

    function go(step){ i = (i + step + slides.length) % slides.length; update(); }
    function update(){
      viewport.style.transform = `translateX(-${i*100}%)`;
      slides.forEach((s, idx) => s.setAttribute('aria-hidden', String(idx !== i)));
      dotsWrap.querySelectorAll('[data-index]').forEach((d, idx) =>
        d.setAttribute('aria-current', idx === i ? 'true' : 'false'));
    }
    function play(){
      if (!delay || mql.matches || !inView) return;
      stop(); timer = setInterval(() => go(1), delay);
    }
    function stop(){ if (timer) { clearInterval(timer); timer = null; } }

    // Controls
    btnPrev?.addEventListener('click', () => { stop(); go(-1); });
    btnNext?.addEventListener('click', () => { stop(); go(1); });
    dotsWrap.addEventListener('click', e => {
      const b = e.target.closest('button[data-index]');
      if (!b) return; stop(); i = +b.dataset.index; update();
    });

    // Keyboard
    root.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { stop(); go(-1); }
      if (e.key === 'ArrowRight') { stop(); go(1); }
    });

    // Swipe
    let startX = 0;
    root.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    root.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { stop(); go(dx < 0 ? 1 : -1); }
    }, { passive: true });

    // Pause on hover/focus
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', play);

    // Pause when not visible
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting; inView ? play() : stop();
    }, { threshold: 0.2 });
    io.observe(root);

    // Init
    update(); play();
  }
})();


/* Carrusel accesible con autoplay y swipe */
(function(){
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach(initCarousel);

  function initCarousel(root){
    const viewport = root.querySelector('.carousel__viewport');
    const slides = Array.from(root.querySelectorAll('.carousel__slide'));
    const btnPrev = root.querySelector('[data-dir="prev"]');
    const btnNext = root.querySelector('[data-dir="next"]');
    const dotsWrap = root.querySelector('.carousel__dots');

    dotsWrap.innerHTML = '';
    slides.forEach((_, idx) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'carousel__dot';
      b.dataset.index = String(idx);
      b.setAttribute('aria-label', `Ir a la foto ${idx+1}`);
      dotsWrap.appendChild(b);
    });

    let i = 0, timer = null, inView = true;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const delay = parseInt(root.getAttribute('data-autoplay') || '0', 10);

    function go(step){ i = (i + step + slides.length) % slides.length; update(); }
    function update(){
      viewport.style.transform = `translateX(-${i*100}%)`;
      slides.forEach((s, idx) => s.setAttribute('aria-hidden', String(idx !== i)));
      dotsWrap.querySelectorAll('[data-index]').forEach((d, idx) => d.setAttribute('aria-current', idx === i ? 'true' : 'false'));
    }
    function play(){ if (!delay || mql.matches || !inView) return; stop(); timer = setInterval(() => go(1), delay); }
    function stop(){ if (timer) clearInterval(timer), timer = null; }

    btnPrev?.addEventListener('click', () => { stop(); go(-1); });
    btnNext?.addEventListener('click', () => { stop(); go(1); });
    dotsWrap.addEventListener('click', e => { const b = e.target.closest('button[data-index]'); if (!b) return; stop(); i = +b.dataset.index; update(); });

    root.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { stop(); go(-1); } if (e.key === 'ArrowRight') { stop(); go(1); } });

    let startX = 0;
    root.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
    root.addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - startX; if (Math.abs(dx) > 40) { stop(); go(dx < 0 ? 1 : -1); } }, {passive:true});

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', play);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', play);

    const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; inView ? play() : stop(); }, { threshold: 0.2 });
    io.observe(root);

    update(); play();
  }
})();
