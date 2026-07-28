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
   Live console panel — retypes its lines on a loop for a
   "live status feed" feel. Static content is already in the
   HTML, so if this fails, all four lines just sit there fully
   readable rather than disappearing.
   ============================================================ */
try{
  const body = document.getElementById('console-body');
  if(body && !prefersReducedMotion){
    const lines = Array.from(body.querySelectorAll('p')).map(p => ({
      key: p.querySelector('.console__key').textContent,
      val: p.querySelector('.console__val').textContent
    }));

    function typeLoop(){
      body.innerHTML = '';
      let i = 0;

      function nextLine(){
        if(i >= lines.length){
          setTimeout(typeLoop, 3200); // hold full panel, then restart
          return;
        }
        const p = document.createElement('p');
        p.classList.add('is-typing');
        const keySpan = document.createElement('span');
        keySpan.className = 'console__key';
        const valSpan = document.createElement('span');
        valSpan.className = 'console__val';
        p.appendChild(keySpan);
        p.appendChild(valSpan);
        body.appendChild(p);
        keySpan.textContent = lines[i].key;

        let c = 0;
        const val = lines[i].val;
        const typeChar = () => {
          c++;
          valSpan.textContent = val.slice(0, c);
          if(c < val.length){
            setTimeout(typeChar, 22);
          } else {
            p.classList.remove('is-typing');
            i++;
            setTimeout(nextLine, 260);
          }
        };
        setTimeout(typeChar, 120);
      }
      nextLine();
    }
    setTimeout(typeLoop, 2600); // let the static version sit first
  }
}catch(e){ console.error('console panel failed', e); }

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
