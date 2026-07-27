/* ============================================================
   0. Respect reduced motion
   ============================================================ */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ============================================================
   1. Node-graph hero background — an "org chart" drifting quietly
   ============================================================ */
(function nodeCanvas(){
  const canvas = document.getElementById('node-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, nodes;
  const HERO_HEIGHT = () => document.querySelector('.hero').offsetHeight;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeNodes(){
    const count = Math.min(60, Math.floor((w * h) / 26000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.6 + 1
    }));
  }

  function step(){
    ctx.clearRect(0, 0, w, h);

    // only render node graph over the hero's viewport height for perf
    const limit = Math.min(h, HERO_HEIGHT() + 200);

    for(const n of nodes){
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > w) n.vx *= -1;
      if(n.y < 0 || n.y > limit) n.vy *= -1;
    }

    for(let i = 0; i < nodes.length; i++){
      for(let j = i + 1; j < nodes.length; j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < 150){
          ctx.strokeStyle = `rgba(74, 92, 122, ${0.35 * (1 - dist / 150)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for(const n of nodes){
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(226, 166, 59, 0.55)';
      ctx.fill();
    }

    if(!prefersReducedMotion) requestAnimationFrame(step);
  }

  resize();
  makeNodes();
  window.addEventListener('resize', () => { resize(); makeNodes(); });
  step();
  if(prefersReducedMotion){
    // draw a single static frame, no loop
  }
})();

/* ============================================================
   2. Typewriter role-cycle
   ============================================================ */
(function typewriter(){
  const el = document.getElementById('role-cycle');
  const roles = [
    'Workday HCM configurations.',
    'SAP → Workday migrations.',
    'CHRO-level Power BI dashboards.',
    'GDPR-compliant reporting.',
    'people analytics that get read.'
  ];

  if(prefersReducedMotion){
    el.textContent = roles[0];
    return;
  }

  let roleIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const current = roles[roleIndex];
    if(!deleting){
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(tick, 1800);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 30 : 55);
  }
  tick();
})();

/* ============================================================
   3. Scroll reveals — tag key elements for fade-up
   ============================================================ */
(function reveals(){
  const targets = document.querySelectorAll(
    '.about__photo, .about__copy, .systems__col, .node__card, .credential, .contact__item'
  );
  targets.forEach(t => t.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => io.observe(t));
})();

/* ============================================================
   4. Pipeline fill + active node + animated counters
   ============================================================ */
(function pipeline(){
  const pipelineEl = document.querySelector('.pipeline');
  const fill = document.getElementById('pipeline-fill');
  const nodeEls = document.querySelectorAll('.node');
  if(!pipelineEl) return;

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

  const io = new IntersectionObserver((entries) => {
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
  nodeEls.forEach(n => io.observe(n));

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
})();

/* ============================================================
   5. Nav background fade on scroll
   ============================================================ */
(function navFade(){
  const nav = document.querySelector('.nav');
  document.addEventListener('scroll', () => {
    if(window.scrollY > 40){ nav.style.boxShadow = '0 1px 0 rgba(16,22,35,0.06)'; }
    else{ nav.style.boxShadow = 'none'; }
  }, { passive: true });
})();
