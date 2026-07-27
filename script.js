const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   Role cycle — static fallback text already in HTML;
   this only enhances it. If it fails, the first phrase stays visible.
   ============================================================ */
try{
  const el = document.getElementById('role-cycle');
  if(el && !prefersReducedMotion){
    const roles = [
      'Workday HCM & Recruitment — Functional Consultant',
      'CHRO-level Power BI Dashboards',
      'Recruitment Intelligence Dashboard — 25+ hubs',
      'SAP → Workday Data Migration'
    ];
    let roleIndex = 0, charIndex = roles[0].length, deleting = false;

    function tick(){
      const current = roles[roleIndex];
      if(!deleting){
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if(charIndex >= current.length){
          deleting = true;
          setTimeout(tick, 1900);
          return;
        }
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if(charIndex <= 0){
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 28 : 45);
    }
    setTimeout(tick, 2200); // pause on the static first phrase before cycling starts
  }
}catch(e){ console.error('role cycle failed', e); }

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
