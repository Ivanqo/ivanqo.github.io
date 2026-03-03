// Tabs + transitions + cyberpunk background canvas
(() => {
  const tabs = [...document.querySelectorAll('.tab')];
  const panels = [...document.querySelectorAll('.panel')];
  const glow = document.querySelector('.tabs__glow');

  function setActive(tabName, pushHash = true){
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    const activePanel = panels.find(p => p.dataset.panel === tabName);
    panels.forEach(p => {
      const isActive = p === activePanel;
      p.classList.toggle('active', isActive);
      if (isActive){
        requestAnimationFrame(() => p.classList.add('show'));
      } else {
        p.classList.remove('show');
      }
    });

    // move glow
    const btn = tabs.find(t => t.dataset.tab === tabName);
    if (btn && glow){
      const r = btn.getBoundingClientRect();
      const pr = btn.parentElement.getBoundingClientRect();
      glow.style.width = Math.max(90, r.width) + 'px';
      glow.style.transform = `translateX(${r.left - pr.left}px)`;
    }

    if (pushHash){
      history.replaceState(null, '', '#' + tabName);
    }
  }

  tabs.forEach(btn => btn.addEventListener('click', () => setActive(btn.dataset.tab)));
  document.querySelectorAll('[data-jump]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      setActive(a.dataset.jump);
      // small scroll to top of content area for mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // hash routing
  const initial = (location.hash || '#about').replace('#', '');
  setActive(['about','portfolio','experience','contacts'].includes(initial) ? initial : 'about', false);

  window.addEventListener('resize', () => {
    const current = tabs.find(t => t.classList.contains('active'))?.dataset.tab || 'about';
    setActive(current, false);
  });

  // Keyboard navigation: Tab / arrows
  document.addEventListener('keydown', (e) => {
    const keys = ['ArrowLeft','ArrowRight','Tab'];
    if (!keys.includes(e.key)) return;
    // don't hijack input fields (none here, but still)
    const tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : '';
    if (tag === 'input' || tag === 'textarea') return;

    const currentIdx = tabs.findIndex(t => t.classList.contains('active'));
    if (currentIdx < 0) return;

    if (e.key === 'Tab') e.preventDefault();

    const dir = (e.key === 'ArrowLeft') ? -1 : 1;
    const nextIdx = (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'Tab')
      ? (currentIdx + dir + tabs.length) % tabs.length
      : currentIdx;

    if (nextIdx !== currentIdx){
      setActive(tabs[nextIdx].dataset.tab);
    }
  });

  // --- Canvas cyber grid ---
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d', { alpha: true });
  let w = 0, h = 0, t = 0;

  function resize(){
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    w = Math.floor(window.innerWidth * dpr);
    h = Math.floor(window.innerHeight * dpr);
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.setTransform(1,0,0,1,0,0);
  }
  resize();
  window.addEventListener('resize', resize);

  function rand(n){ return Math.random() * n; }

  function draw(){
    t += 0.016;
    ctx.clearRect(0,0,w,h);

    // background vignette
    const vg = ctx.createRadialGradient(w*0.5,h*0.45, Math.min(w,h)*0.12, w*0.5,h*0.5, Math.min(w,h)*0.7);
    vg.addColorStop(0, 'rgba(0,245,255,0.08)');
    vg.addColorStop(0.35, 'rgba(124,92,255,0.05)');
    vg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = vg;
    ctx.fillRect(0,0,w,h);

    // moving grid
    const size = Math.max(28, Math.min(54, Math.floor(Math.min(w,h) / 22)));
    const offset = (t * 18) % size;

    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.32;

    // horizontal lines
    for (let y = -size; y < h + size; y += size){
      const yy = y + offset;
      ctx.strokeStyle = 'rgba(0,245,255,0.08)';
      ctx.beginPath();
      ctx.moveTo(0, yy);
      ctx.lineTo(w, yy);
      ctx.stroke();
    }
    // vertical lines
    for (let x = -size; x < w + size; x += size){
      const xx = x + offset;
      ctx.strokeStyle = 'rgba(255,43,214,0.06)';
      ctx.beginPath();
      ctx.moveTo(xx, 0);
      ctx.lineTo(xx, h);
      ctx.stroke();
    }

    // glitch particles
    ctx.globalAlpha = 0.85;
    const n = Math.floor((w*h) / 350000);
    for (let i=0;i<n;i++){
      const x = rand(w), y = rand(h);
      const ww = 12 + rand(60);
      const hh = 1 + rand(2);
      const a = 0.10 + rand(0.18);
      ctx.fillStyle = (i % 2 === 0) ? `rgba(0,245,255,${a})` : `rgba(255,43,214,${a})`;
      ctx.fillRect(x, y, ww, hh);
    }

    // scanline
    const sy = (t * 120) % h;
    const g = ctx.createLinearGradient(0, sy-20, 0, sy+20);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.06)');
    g.addColorStop(0.55, 'rgba(0,245,255,0.08)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, sy-20, w, 40);

    requestAnimationFrame(draw);
  }
  draw();
})();
