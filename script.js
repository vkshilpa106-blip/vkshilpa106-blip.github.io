const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   Scroll reveals
   ============================================================ */
try{
  const targets = document.querySelectorAll(
    '.about__copy, .tagcloud-group, .project-card, .contact__item'
  );
  targets.forEach(t => t.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(t => io.observe(t));
}catch(e){ console.error('reveal setup failed', e); }

/* ============================================================
   Nav shadow on scroll
   ============================================================ */
try{
  const nav = document.querySelector('.nav');
  if(nav){
    document.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 40 ? '0 1px 0 rgba(0,0,0,0.2)' : 'none';
    }, { passive: true });
  }
}catch(e){ console.error('nav setup failed', e); }
