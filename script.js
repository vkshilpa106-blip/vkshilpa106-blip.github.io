const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   Scroll reveals
   ============================================================ */
try{
  const targets = document.querySelectorAll(
    '.about__photo, .about__copy, .tagcloud-group, .project-card, .node__card, .credential, .contact__item'
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
   Pipeline fill + active node + animated counters
   ============================================================ */
try{
  const pipelineEl = document.querySelector('.pipeline');
  const fill = document.getElementById('pipeline-fill');

  if(pipelineEl && fill){
    const nodeEls = document.querySelectorAll('.node');

    function onScroll(){
      const rect = pipelineEl.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height;
      const scrolled = Math.min(Math.max(vh * 0.6 - rect.top, 0), total);
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      fill.style.height = pct + '%';
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    function animateCounter(el, target){
      if(prefersReducedMotion || !target){ el.textContent = target; return; }
      let current = 0;
      const step = Math.max(1, Math.round(target / 40));
      const int = setInterval(() => {
        current += step;
        if(current >= target){ current = target; clearInterval(int); }
        el.textContent = current;
      }, 25);
    }

    const nodeIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('is-active');
          const counterEl = entry.target.querySelector('.counter');
          if(counterEl && !counterEl.dataset.done){
            counterEl.dataset.done = '1';
            animateCounter(counterEl, parseInt(entry.target.dataset.metric || '0', 10));
          }
        }
      });
    }, { threshold: 0.4 });
    nodeEls.forEach(n => nodeIo.observe(n));
  }
}catch(e){ console.error('pipeline setup failed', e); }

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
