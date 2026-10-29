/* Aplastá solcitos: pasatiempo. No da XP, pero cuenta para los achievvilments. */
(function(){
  const TYPES = [
    {k:'pink', c:'#f2426a', size:56, speed:1, pts:1, w:70},
    {k:'gold', c:'#ffcf4a', size:40, speed:1.75, pts:3, w:18},
    {k:'violet', c:'#b448cc', size:76, speed:.65, pts:2, w:12},
  ];
  const WORDS = ['Wepa', 'Oku', 'Okarola', 'Dale', 'Incre', 'Perfe', 'Cul', 'A?', 'Xupala', 'MilkToy danger'];
  const DUR = 30000;
  let G = null, ctx = null;

  function snd(type){
    try{
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if(ctx.state === 'suspended') ctx.resume();
      const t = ctx.currentTime;
      if(type === 'squash'){
        const len = .09, buf = ctx.createBuffer(1, ctx.sampleRate*len, ctx.sampleRate), d = buf.getChannelData(0);
        for(let i = 0; i < d.length; i++) d[i] = (Math.random()*2 - 1) * Math.pow(1 - i/d.length, 2);
        const n = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
        n.buffer = buf; f.type = 'lowpass'; f.frequency.value = 1400 + Math.random()*900; g.gain.value = .35;
        n.connect(f).connect(g).connect(ctx.destination); n.start(t);
        const o = ctx.createOscillator(), og = ctx.createGain(); o.type = 'sine';
        o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(60, t + .1);
        og.gain.setValueAtTime(.25, t); og.gain.exponentialRampToValueAtTime(.0001, t + .12);
        o.connect(og).connect(ctx.destination); o.start(t); o.stop(t + .13);
      } else {
        const o = ctx.createOscillator(), g = ctx.createGain(); o.type = 'square';
        o.frequency.setValueAtTime(type === 'end' ? 330 : 520, t); o.frequency.exponentialRampToValueAtTime(type === 'end' ? 660 : 780, t + .12);
        g.gain.setValueAtTime(.05, t); g.gain.exponentialRampToValueAtTime(.0001, t + .16);
        o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + .17);
      }
    }catch(e){}
  }
  const word = () => WORDS[Math.floor(Math.random()*WORDS.length)];
  const pickType = () => { let r = Math.random()*100; for(const T of TYPES){ if((r -= T.w) < 0) return T; } return TYPES[0]; };

  function open(h){
    const el = document.getElementById('game');
    el.hidden = false;
    el.innerHTML = `<div class="g-top"><div class="g-score"><span id="g-pts">0</span><small>puntos</small></div><div class="g-combo" id="g-combo"></div><div class="g-time"><i id="g-bar"></i></div><button class="g-x" data-g="exit" aria-label="Salir">✕</button></div>
      <div class="g-field" id="g-field"></div>
      <div class="g-card" id="g-card"><h2 class="g-title">Aplastá solcitos</h2><p>Treinta segundos. Se escabullen como cucarachas: tocalos antes de que se escapen.</p>
        <p class="tiny">Rosa 1 punto · violeta 2 · dorado 3. Si le errás, se corta el combo.</p><button class="btn" data-g="start">${word()}</button></div>`;
    G = {h, el, field:el.querySelector('#g-field'), bugs:[], running:false};
    el.onpointerdown = e => {
      const g = e.target.closest('[data-g]');
      if(g){ e.preventDefault(); if(g.dataset.g === 'start') start(); else if(g.dataset.g === 'exit') close(); return; }
      if(!G || !G.running) return;
      const bug = e.target.closest('.g-bug');
      if(bug) squash(bug.__b, e.clientX, e.clientY); else { G.combo = 0; showCombo(); }
    };
  }
  function close(){
    if(!G) return; G.running = false; cancelAnimationFrame(G.raf);
    G.el.hidden = true; G.el.innerHTML = ''; G.el.onpointerdown = null; G = null;
  }
  function start(){
    G.field.innerHTML = ''; G.bugs = []; G.pts = 0; G.hits = 0; G.combo = 0; G.maxCombo = 0; G.t0 = performance.now(); G.last = G.t0; G.nextSpawn = 0; G.running = true;
    G.el.querySelector('#g-card').hidden = true; G.el.querySelector('#g-pts').textContent = '0'; showCombo();
    G.raf = requestAnimationFrame(loop);
  }
  function spawn(now){
    const T = pickType(), W = G.field.clientWidth, H = G.field.clientHeight, s = T.size;
    const edge = Math.floor(Math.random()*4);
    const x = edge === 1 ? W + s : edge === 3 ? -s : Math.random()*(W - s);
    const y = edge === 0 ? -s : edge === 2 ? H + s : Math.random()*(H - s);
    const a = Math.atan2(H/2 - y + (Math.random()-.5)*H*.6, W/2 - x + (Math.random()-.5)*W*.6);
    const el = document.createElement('div'); el.className = 'g-bug';
    el.style.width = el.style.height = s + 'px'; el.style.color = T.c;
    el.innerHTML = sun({size:s, seed:Math.floor(Math.random()*90), n:9});
    const b = {el, T, x, y, a, s, turn:now + 300 + Math.random()*500, born:now, life:2600 + Math.random()*2600, sp:(110 + Math.random()*60) * T.speed};
    el.__b = b; G.field.appendChild(el); G.bugs.push(b);
  }
  function loop(now){
    if(!G || !G.running) return;
    const dt = Math.min(.05, (now - G.last)/1000), el = now - G.t0, W = G.field.clientWidth, H = G.field.clientHeight; G.last = now;
    const k = el / DUR;
    if(now >= G.nextSpawn){ spawn(now); G.nextSpawn = now + (560 - 360*k) * (.7 + Math.random()*.6); }
    for(const b of G.bugs){
      if(b.dead) continue;
      const age = now - b.born, inside = b.x > 4 && b.y > 70 && b.x < W - b.s - 4 && b.y < H - b.s - 4;
      if(inside) b.inside = true;
      if(!b.leaving && age > b.life * (1 - k*.35)){ b.leaving = true; b.a = Math.atan2(b.y < H/2 ? -1 : 1, b.x < W/2 ? -1 : 1); }
      if(now > b.turn){ b.a += (Math.random()-.5)*2.4; b.turn = now + 220 + Math.random()*560; b.dash = Math.random() < .3; }
      if(b.inside && !inside && !b.leaving){ b.a = Math.atan2(H/2 - b.y + (Math.random()-.5)*H*.4, W/2 - b.x + (Math.random()-.5)*W*.4); b.turn = now + 300; }
      const sp = b.sp * (1 + k*.8) * (b.dash ? 1.6 : 1);
      b.x += Math.cos(b.a)*sp*dt; b.y += Math.sin(b.a)*sp*dt;
      const out = b.x < -b.s*1.5 || b.y < -b.s*1.5 || b.x > W + b.s*.5 || b.y > H + b.s*.5;
      if(out && (b.leaving || age > 2500)){ b.dead = true; b.el.remove(); continue; }
      b.el.style.transform = `translate(${b.x}px,${b.y}px) rotate(${b.a*57.3 + 90}deg) scale(${1 + Math.sin(now/70 + b.s)*.06})`;
    }
    G.bugs = G.bugs.filter(b => !b.dead);
    G.el.querySelector('#g-bar').style.width = Math.max(0, 100 - k*100) + '%';
    if(el >= DUR) return finish();
    G.raf = requestAnimationFrame(loop);
  }
  function squash(b, cx, cy){
    if(!b || b.dead) return; b.dead = true;
    G.hits++; G.combo++; G.maxCombo = Math.max(G.maxCombo, G.combo);
    const pts = b.T.pts * (G.combo >= 10 ? 2 : 1); G.pts += pts;
    G.el.querySelector('#g-pts').textContent = G.pts; showCombo(); snd('squash');
    b.el.classList.add('squashed'); b.el.style.transform = `translate(${b.x}px,${b.y}px) rotate(${b.a*57.3 + 90}deg) scale(1.35,.35)`;
    const stain = document.createElement('div'); stain.className = 'g-stain'; stain.style.cssText = `left:${b.x + b.s/2}px;top:${b.y + b.s/2}px;--c:${b.T.c}`;
    const pop = document.createElement('div'); pop.className = 'g-pop'; pop.textContent = '+' + pts; pop.style.cssText = `left:${b.x + b.s/2}px;top:${b.y}px`;
    G.field.append(stain, pop);
    setTimeout(() => { b.el.remove(); }, 260); setTimeout(() => { stain.remove(); pop.remove(); }, 900);
  }
  function showCombo(){ const c = G.el.querySelector('#g-combo'); c.textContent = G.combo >= 3 ? `Combo x${G.combo}${G.combo >= 10 ? ' · puntos dobles' : ''}` : ''; }
  function finish(){
    G.running = false; snd('end'); G.combo = 0; showCombo();
    G.bugs.forEach(b => b.el.remove()); G.bugs = [];
    const res = {hits:G.hits, pts:G.pts, combo:G.maxCombo};
    const info = G.h && G.h.onEnd ? G.h.onEnd(res) : {};
    const card = G.el.querySelector('#g-card'); card.hidden = false;
    card.innerHTML = `<h2 class="g-title">${res.pts >= (info.best || 0) && res.pts > 0 ? '¡Récord!' : 'Se terminó'}</h2>
      <div class="g-res"><div><b>${res.pts}</b><small>puntos</small></div><div><b>${res.hits}</b><small>aplastados</small></div><div><b>${res.combo}</b><small>combo máx</small></div></div>
      <p class="tiny">Tu récord: ${info.best || res.pts} · La banda ya aplastó ${info.total || res.hits} solcitos.</p>
      <div class="row" style="justify-content:center"><button class="btn" data-g="start">${word()}</button><button class="btn ghost" data-g="exit">Salir</button></div>`;
  }
  window.Game = {open, close};
})();
