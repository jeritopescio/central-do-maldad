/* MilkToy, la mascota de Evvil ("café con leche, muñeco de leche").
   Easter egg: aparece muy de vez en cuando, se escabulle y hay que tocarlo para atraparlo. */
(function(){
  const SKIN = '#efc19c', SKIN_SH = '#dda37c';
  const SVG = `<svg viewBox="0 0 220 270" aria-hidden="true">
    <g fill="#24150e">
      <circle cx="58" cy="92" r="26"/><circle cx="48" cy="128" r="24"/><circle cx="50" cy="164" r="22"/><circle cx="60" cy="196" r="20"/>
      <circle cx="162" cy="92" r="26"/><circle cx="172" cy="128" r="24"/><circle cx="170" cy="164" r="22"/><circle cx="160" cy="196" r="20"/>
      <circle cx="80" cy="70" r="24"/><circle cx="140" cy="70" r="24"/><circle cx="110" cy="62" r="26"/>
    </g>
    <path d="M58 230c8-26 30-40 52-40s44 14 52 40v40H58Z" fill="#f5f1e8"/>
    <path d="M58 238h104v12H58Z" fill="#3cb4d8"/>
    <text x="110" y="266" text-anchor="middle" font-family="Evvil, Londrina Solid, Arial Black, sans-serif" font-size="19" fill="#0c546c">MilkToy</text>
    <ellipse cx="110" cy="132" rx="50" ry="60" fill="${SKIN}"/>
    <ellipse cx="128" cy="142" rx="28" ry="42" fill="${SKIN_SH}" opacity=".45"/>
    <path d="M64 140c2 34 20 66 46 68 26-2 44-34 46-68-8 18-20 26-46 28-26-2-38-10-46-28Z" fill="#2a1810"/>
    <path d="M84 160c8-6 18-7 26-3 8-4 18-3 26 3-8 2-16 6-26 6s-18-4-26-6Z" fill="#2a1810"/>
    <path d="M94 172c10 7 24 7 34-2" stroke="#b8475c" stroke-width="4" fill="none" stroke-linecap="round"/>
    <ellipse cx="88" cy="126" rx="21" ry="17" fill="#3b2617" stroke="#d99a1f" stroke-width="6"/>
    <ellipse cx="134" cy="126" rx="21" ry="17" fill="#3b2617" stroke="#d99a1f" stroke-width="6"/>
    <path d="M108 124q3-5 6 0" stroke="#d99a1f" stroke-width="5" fill="none"/>
    <path d="M78 119q6-6 13-5M124 119q6-6 13-5" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M58 92c4-34 26-52 52-52s48 18 52 52c-16-8-34-11-52-11s-36 3-52 11Z" fill="#6c6b3c"/>
    <path d="M150 66c18-14 36-16 52-10-6 12-22 22-46 26Z" fill="#5a5931"/>
    <path d="M96 60q14-10 28 0" stroke="#3f3e22" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="110" cy="42" r="4" fill="#5a5931"/>
    <path d="M170 214c-2-14 6-22 16-22h10c6 0 9 6 6 11h4c5 0 7 7 3 10 4 2 4 9-1 11 3 3 1 9-4 9h-20c-8 0-14-6-14-14Z" fill="${SKIN}" stroke="${SKIN_SH}" stroke-width="2"/>
    <path d="M180 196c-1-12 2-24 8-28 6-3 9 3 7 9l-3 19Z" fill="${SKIN}" stroke="${SKIN_SH}" stroke-width="2"/>
    <path d="M150 48q4 12 0 18q-4-6 0-18Z" fill="#fff" opacity=".9"/>
  </svg>`;
  const SAYS = ['Café con leche, muñeco de leche', 'Leche, roc y terapia', 'Tomá la leche y hacé metal', 'Atrapame si podés', 'Shhh… yo no estuve acá', 'MilkToy danger'];
  let busy = false, ctx = null;

  /* ---------- gruñido: 8 notas rapidísimas de un acorde mayor ---------- */
  function audio(){ ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if(ctx.state === 'suspended') ctx.resume(); return ctx; }
  function run(t0, root, speed, down){
    const c = audio(), steps = [0,4,7,12,16,19,24,28];
    (down ? steps.slice().reverse() : steps).forEach((s, i) => {
      const o = c.createOscillator(), g = c.createGain(), t = t0 + i*speed, f = 440 * Math.pow(2, (root + s - 69)/12);
      o.type = i % 2 ? 'triangle' : 'square';
      o.frequency.setValueAtTime(f, t); o.frequency.exponentialRampToValueAtTime(f * 1.03, t + speed*1.4);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(.08, t + .005); g.gain.exponentialRampToValueAtTime(.0001, t + speed*2);
      o.connect(g).connect(c.destination); o.start(t); o.stop(t + speed*2 + .02);
    });
  }
  function growl(){
    try{ const c = audio(), t = c.currentTime + .02, root = 70 + Math.floor(Math.random()*8);
      run(t, root, .034, false); run(t + .034*8 + .25, root - 2, .034, true); }catch(e){}
  }
  function chaos(){
    try{ const c = audio(), t = c.currentTime + .02;
      for(let k = 0; k < 6; k++) run(t + k*.19 + Math.random()*.08, 64 + Math.floor(Math.random()*16), .022 + Math.random()*.018, Math.random() < .5); }catch(e){}
  }

  /* ---------- explosión de solcitos ---------- */
  function boom(x, y){
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for(let i = 0; i < 26; i++){
      const s = document.createElement('span'); s.className = 'spark big';
      s.innerHTML = window.sun ? sun({size:14 + Math.random()*22, seed:i*5+3}) : '✷';
      const a = Math.random()*Math.PI*2, d = 70 + Math.random()*150;
      s.style.left = x + 'px'; s.style.top = y + 'px';
      s.style.setProperty('--dx', Math.cos(a)*d + 'px'); s.style.setProperty('--dy', Math.sin(a)*d - 40 + 'px');
      document.body.appendChild(s); setTimeout(() => s.remove(), 1100);
    }
  }

  /* ---------- aparece, se escabulle, se escapa ---------- */
  function appear(h = {}){
    if(busy) return false; busy = true;
    const el = document.getElementById('milktoy'), W = innerWidth, Hh = innerHeight, size = Math.min(150, W*.36);
    el.innerHTML = `<button class="mt-body" aria-label="¡Atrapá a MilkToy!"><div class="mt-bubble">${SAYS[Math.floor(Math.random()*SAYS.length)]}</div>${SVG}</button>`;
    el.hidden = false; el.className = 'milktoy';
    const b = el.firstChild; b.style.width = size + 'px';
    const spot = () => ({x:16 + Math.random()*(W - size - 32), y:90 + Math.random()*(Hh - size*1.25 - 180)});
    const side = Math.random() < .5 ? -size - 20 : W + 20;
    let p = {x:side, y:Hh*.55}, caught = false, timers = [];
    const go = (q, ms) => { b.style.transition = `transform ${ms}ms cubic-bezier(.3,1.4,.5,1)`; b.style.transform = `translate(${q.x}px,${q.y}px) rotate(${(Math.random()-.5)*24}deg)`; p = q; };
    b.style.transform = `translate(${p.x}px,${p.y}px)`;
    growl();
    const hops = 5 + Math.floor(Math.random()*3);
    let t = 60;
    for(let i = 0; i < hops; i++){ const ms = 380 + Math.random()*320; timers.push(setTimeout(() => !caught && go(spot(), ms), t)); t += ms + 220 + Math.random()*260; }
    timers.push(setTimeout(() => { if(caught) return; go({x:Math.random() < .5 ? -size - 40 : W + 40, y:p.y}, 420); }, t));
    timers.push(setTimeout(() => { if(caught) return; end(); if(h.onEscape) h.onEscape(); }, t + 480));
    b.addEventListener('pointerdown', e => {
      if(caught) return; caught = true; e.preventDefault(); e.stopPropagation();
      timers.forEach(clearTimeout);
      const r = b.getBoundingClientRect(), cx = r.left + r.width/2, cy = r.top + r.height/2;
      b.classList.add('caught'); chaos(); boom(cx, cy);
      if(h.onCatch) h.onCatch({x:cx, y:cy});
      setTimeout(end, 1300);
    });
    function end(){ el.hidden = true; el.innerHTML = ''; busy = false; }
    return true;
  }
  // p: probabilidad. Se llama solo desde toques del usuario, así el sonido puede sonar en iPhone.
  function maybe(p, h){ return Math.random() < p ? appear(h) : false; }

  window.MilkToy = {appear, maybe, growl};
})();
