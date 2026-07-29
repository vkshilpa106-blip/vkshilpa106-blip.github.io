/* ============================================================
   MAIN.JS
   Scroll animations, typing effect, animated counters,
   expandable timeline, mobile nav, active-link tracking.
============================================================ */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- AOS (scroll reveal) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 40
    });
  }

  /* ---------- Typed.js (rotating role text) ---------- */
  if (window.Typed) {
    new Typed("#typedText", {
      strings: [
        "Workday Transformation",
        "People Analytics",
        "Data Intelligence",
        "Machine Learning",
        "Artificial Intelligence"
      ],
      typeSpeed: 42,
      backSpeed: 26,
      backDelay: 1600,
      startDelay: 400,
      loop: true,
      showCursor: true,
      cursorChar: "|"
    });
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll(".stat-number");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => counterObserver.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = Math.round(eased * target);
      el.textContent = value + (progress === 1 ? suffix : "");
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Expandable timeline ---------- */
  document.querySelectorAll(".timeline-item").forEach((item) => {
    const head = item.querySelector(".timeline-head");
    head.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".timeline-item.open").forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove("open");
      });
      item.classList.toggle("open", !isOpen);
    });
  });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById("siteHeader");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-link");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) => {
          a.classList.toggle("active-link", a.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
});
