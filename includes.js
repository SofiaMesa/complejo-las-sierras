/* includes.js: header/footer includes + nav activo */
(function () {
  async function injectIncludes() {
    const spots = document.querySelectorAll("[data-include]");
    for (const el of spots) {
      const file = el.getAttribute("data-include");
      try {
        const resp = await fetch(file, { cache: "no-cache" });
        if (!resp.ok) continue;
        el.outerHTML = await resp.text();
      } catch (e) { /* nos hacemos los zen */ }
    }
    highlightActiveLink();
  }

  function normalizePathname(p) {
    const file = p.split("/").pop().split("?")[0].split("#")[0];
    return file || "index.html";
  }

  function isSameLink(href, current) {
    if (!href) return false;
    const clean = (href.split("?")[0].split("#")[0] || "index.html");
    if (clean === current) return true;
    if (current === "index.html" && (clean === "" || clean === "/")) return true;
    return false;
  }

  function highlightActiveLink() {
    const current = normalizePathname(location.pathname);
    const links = document.querySelectorAll('nav[aria-label="Principal"] a');
    links.forEach(a => {
      const href = a.getAttribute("href");
      if (isSameLink(href, current)) {
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
