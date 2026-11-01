/* MilkToy, la mascota de Evvil ("café con leche, muñeco de leche").
   Easter egg: aparece cada tanto, se escabulle y hay que tocarlo para atraparlo. */
(function(){
  // Recortado en papel: cabeza enorme, ojos ovalados que se tocan, boca que se abre y se cierra.
  const SKIN = '#f3cba5', SKIN_SH = '#d9a57e', HAIR = '#3a2313', BEARD = '#6b4226', CAP = '#6c6b3c', CAP_D = '#55542f', SHIRT = '#f4f1ea', AMBER = '#d99a1f';
  const curls = [[36,108,15],[30,132,16],[32,158,15],[40,182,14],[54,200,12]];
  const SVG = `<svg viewBox="0 0 220 270" aria-hidden="true">
    <g fill="${HAIR}">${curls.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/><circle cx="${220 - x}" cy="${y}" r="${r}"/>`).join('')}</g>
    <path d="M132 44C150 20 190 12 212 22C204 38 178 50 146 54Z" fill="${CAP_D}"/>
    <path d="M74 202Q60 214 56 232" stroke="${SHIRT}" stroke-width="15" stroke-linecap="round" fill="none"/>
    <circle cx="54" cy="237" r="9.5" fill="${SKIN}"/>
    <path d="M72 196C72 190 80 186 88 186H132C140 186 148 190 148 196L156 240H64Z" fill="${SHIRT}"/>
    <path d="M65 233H155L156 239H64Z" fill="#3cb4d8"/>
    <text x="110" y="227" text-anchor="middle" font-family="Evvil, Londrina Solid, Arial Black, sans-serif" font-size="17" fill="#0c546c">MilkToy</text>
    <path d="M64 240H156V252H118V247H102V252H64Z" fill="#2d4a7c"/>
    <ellipse cx="86" cy="256" rx="20" ry="8" fill="#1c1c22"/><ellipse cx="134" cy="256" rx="20" ry="8" fill="#1c1c22"/>
    <path d="M146 202Q168 198 182 182" stroke="${SHIRT}" stroke-width="15" stroke-linecap="round" fill="none"/>
    <g stroke-linecap="round" fill="none"><path d="M179 170L178 147M194 170L196 150" stroke="${SKIN_SH}" stroke-width="9"/><path d="M179 170L178 147M194 170L196 150" stroke="${SKIN}" stroke-width="6.5"/></g>
    <circle cx="186" cy="176" r="11" fill="${SKIN}"/><path d="M181 166q5-5 10 0" stroke="${SKIN_SH}" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M178 178q6 3 13-1" stroke="${SKIN_SH}" stroke-width="2" fill="none" stroke-linecap="round"/>
    <ellipse cx="110" cy="116" rx="80" ry="68" fill="${SKIN}"/>
    <path d="M34 128C38 176 74 198 110 198C146 198 182 176 186 128C176 150 156 164 136 166C128 158 120 156 110 156C100 156 92 158 84 166C64 164 44 150 34 128Z" fill="${BEARD}"/>
    <path d="M32 96C32 48 66 22 110 22C154 22 188 48 188 96C166 84 140 78 110 78C80 78 54 84 32 96Z" fill="${CAP}"/>
    <path d="M94 80Q110 60 126 80Z" fill="${HAIR}"/><path d="M92 80H128" stroke="${CAP_D}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="110" cy="24" r="5" fill="${CAP_D}"/>
    <ellipse cx="87" cy="121" rx="23" ry="25" fill="#fff"/><ellipse cx="133" cy="121" rx="23" ry="25" fill="#fff"/>
    <circle cx="96" cy="128" r="4.5" fill="#111"/><circle cx="142" cy="128" r="4.5" fill="#111"/>
    <g stroke="${AMBER}" stroke-width="6"><ellipse cx="87" cy="121" rx="27" ry="29" fill="rgba(232,160,30,.22)"/><ellipse cx="133" cy="121" rx="27" ry="29" fill="rgba(232,160,30,.22)"/></g>
    <path d="M60 115L34 106M160 115L186 106" stroke="${AMBER}" stroke-width="5" stroke-linecap="round"/>
    <path d="M72 107q6-7 14-6M118 107q6-7 14-6" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M64 92L102 102M118 102L156 92" stroke="#2a170c" stroke-width="7" stroke-linecap="round"/>
    <g class="mt-m0"><path d="M96 172Q112 180 128 168l4-3" stroke="#1d0d06" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
    <g class="mt-m1"><path d="M95 168Q111 194 129 166Q112 174 95 168Z" fill="#2a0a0a"/><path d="M103 178Q111 186 119 177Q111 181 103 178Z" fill="#d9576b"/></g>
  </svg>`;
  const SAYS = ['Café con leche, muñeco de leche', 'Leche, roc y terapia', 'Tomá la leche y hacé metal', 'Atrapame si podés', 'Shhh… yo no estuve acá', 'MilkToy danger'];
  let busy = false, ctx = null, last = 0;

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
    if(busy) return false; busy = true; last = Date.now();
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
  // Entre una aparición y otra pasa por lo menos un minuto.
  function maybe(p, h){ return Date.now() - last > 6e4 && Math.random() < p ? appear(h) : false; }

  window.MilkToy = {appear, maybe, growl};
})();
