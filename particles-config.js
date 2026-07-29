/* ============================================================
   PARTICLES CONFIG
   Subtle AI neural-network style ambient background for the hero.
   To customize: tweak `color`, `number.value`, or `links.opacity`.
============================================================ */
(function initParticles() {
  const options = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      number: {
        value: 46,
        density: { enable: true, area: 900 }
      },
      color: { value: ["#3B82F6", "#8B5CF6"] },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.15, max: 0.55 }
      },
      size: { value: { min: 1, max: 2.4 } },
      links: {
        enable: true,
        distance: 140,
        color: "#3B82F6",
        opacity: 0.18,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none",
        random: true,
        outModes: { default: "out" }
      }
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        resize: { enable: true }
      },
      modes: {
        grab: { distance: 160, links: { opacity: 0.35 } }
      }
    },
    detectRetina: true
  };

  function boot() {
    if (typeof tsParticles === "undefined") return;
    tsParticles.load({ id: "particles-bg", options: options }).catch(function () {
      /* Fails silently — the gradient/grid background still looks intentional without it. */
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
