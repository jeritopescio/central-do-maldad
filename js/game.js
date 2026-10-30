/* Aplastá solcitos: pasatiempo de 10 niveles. No da XP, pero cuenta para los achievvilments.
   Cada nivel dura 15 segundos y hay que aplastar una cantidad de solcitos para pasar. */
(function(){
  const TYPES = {
    white:{c:'#f4ebe6', size:80, speed:95, pts:1, n:11, name:'blancos'},
    gold:{c:'#ffcf4a', size:52, speed:175, pts:2, n:9, name:'dorados'},
    pink:{c:'#f2426a', size:64, speed:230, pts:3, n:13, stopgo:true, name:'rosas'},
  };
  const LEVELS = [
    {quota:6,  spawn:950, speed:1,    mix:{white:1}},
    {quota:8,  spawn:850, speed:1.2,  mix:{white:1}},
    {quota:10, spawn:760, speed:1.25, mix:{white:.75, gold:.25}, intro:'Nuevos: dorados. Más chiquitos y más rápidos.'},
    {quota:12, spawn:690, speed:1.4,  mix:{white:.7, gold:.3}},
    {quota:14, spawn:620, speed:1.55, mix:{white:.62, gold:.38}},
    {quota:15, spawn:580, speed:1.65, mix:{white:.5, gold:.25, pink:.25}, intro:'Nuevos: rosas. Rapidísimos, frenan y cambian de rumbo.'},
    {quota:17, spawn:540, speed:1.8,  mix:{white:.45, gold:.27, pink:.28}},
    {quota:8,  spawn:700, speed:1.7,  mix:{white:.5, gold:.25, pink:.25}, boss:20, intro:'Final Boss: pegale 20 veces.'},
    {quota:12, spawn:520, speed:2,    mix:{white:.4, gold:.3, pink:.3}, boss:26},
    {quota:16, spawn:430, speed:2.35, mix:{white:.3, gold:.35, pink:.35}, boss:32, intro:'Imposible.'},
  ];
  const WORDS = ['Wepa', 'Oku', 'Okarola', 'Ok', 'Dale', 'Incre', 'Perfe'];
  const DUR = 15000;
  let G = null, ctx = null;

  /* ---------- sonidos ---------- */
  function audio(){ ctx = ctx || new (window.AudioContext || window.webkitAudioContext)(); if(ctx.state === 'suspended') ctx.resume(); return ctx; }
  function tone(f0, f1, dur, type, vol, delay=0){
    const c = audio(), t = c.currentTime + delay, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f0, t); o.frequency.exponentialRampToValueAtTime(f1, t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + dur + .02);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + dur + .03);
  }
  function snd(kind){
    try{
      const c = audio(), t = c.currentTime;
      if(kind === 'squash' || kind === 'hit'){
        const len = .09, buf = c.createBuffer(1, c.sampleRate*len, c.sampleRate), d = buf.getChannelData(0);
        for(let i = 0; i < d.length; i++) d[i] = (Math.random()*2 - 1) * Math.pow(1 - i/d.length, 2);
        const n = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
        n.buffer = buf; f.type = 'lowpass'; f.frequency.value = kind === 'hit' ? 700 : 1400 + Math.random()*900; g.gain.value = .35;
        n.connect(f).connect(g).connect(c.destination); n.start(t);
        tone(kind === 'hit' ? 110 : 180, 50, .12, 'sine', .25);
      } else if(kind === 'boss'){ [0,4,7,12,16,19,24,28].forEach((s, i) => tone(196*Math.pow(2, s/12), 196*Math.pow(2, s/12)*1.02, .06, 'square', .06, i*.05)); }
      else if(kind === 'level'){ [0,4,7,12].forEach((s, i) => tone(523*Math.pow(2, s/12), 523*Math.pow(2, s/12), .08, 'triangle', .07, i*.07)); }
      else if(kind === 'lose'){ tone(330, 110, .5, 'sawtooth', .05); }
      else tone(520, 780, .14, 'square', .05);
    }catch(e){}
  }
  const word = () => WORDS[Math.floor(Math.random()*WORDS.length)];

  /* ---------- pantalla ---------- */
  function open(h){
    const el = document.getElementById('game');
    el.hidden = false;
    el.innerHTML = `<div class="g-top">
        <div class="g-lvl"><small>Nivel</small><b id="g-lvl">1</b><small>/10</small></div>
        <div class="g-clock" id="g-clock">15</div>
        <button class="g-x" data-g="exit" aria-label="Salir">✕</button>
        <div class="g-goal"><span id="g-goal">0/6 solcitos</span><span id="g-pts">0 pts</span></div>
        <div class="g-time"><i id="g-bar"></i></div>
        <div class="g-combo" id="g-combo"></div>
      </div>
      <div class="g-field" id="g-field"></div>
      <div class="g-banner" id="g-banner" hidden></div>
      <div class="g-card" id="g-card"><h2 class="g-title">Aplastá solcitos</h2>
        <p>10 niveles de 15 segundos. En cada uno hay que aplastar una cantidad de solcitos para pasar.</p>
        <p class="tiny">Cada 2 niveles aparece un enemigo nuevo. En el 8 llega el Final Boss.</p><button class="btn" data-g="start">${word()}</button></div>`;
    G = {h, el, field:el.querySelector('#g-field'), bugs:[], running:false};
    el.onpointerdown = e => {
      const g = e.target.closest('[data-g]');
      if(g){ e.preventDefault(); if(g.dataset.g === 'start') start(); else if(g.dataset.g === 'exit') close(); return; }
      if(!G || !G.running) return;
      const bug = e.target.closest('.g-bug');
      if(bug) hit(bug.__b); else { G.combo = 0; combo(); }
    };
  }
  function close(){
    if(!G) return; G.running = false; cancelAnimationFrame(G.raf); clearTimeout(G.wait);
    if(G.level > 1 || G.hits > 0) report(false);
    G.el.hidden = true; G.el.innerHTML = ''; G.el.onpointerdown = null; G = null;
  }
  function start(){
    Object.assign(G, {pts:0, hits:0, combo:0, maxCombo:0, level:0, bossKills:0, reported:false});
    G.el.querySelector('#g-card').hidden = true;
    nextLevel();
  }
  function nextLevel(){
    G.level++; G.running = false;
    const L = LEVELS[G.level - 1];
    G.field.innerHTML = ''; G.bugs = []; G.kills = 0; G.boss = null;
    G.el.querySelector('#g-lvl').textContent = G.level;
    hud(L);
    const ban = G.el.querySelector('#g-banner'); ban.hidden = false;
    ban.innerHTML = `<b>Nivel ${G.level}</b><span>Aplastá ${L.quota} en 15 segundos${L.boss ? ' y derrotá al boss' : ''}</span>${L.intro ? `<em>${L.intro}</em>` : ''}`;
    snd('level');
    G.wait = setTimeout(() => { if(!G) return; ban.hidden = true; G.t0 = performance.now(); G.last = G.t0; G.nextSpawn = 0; G.running = true; if(L.boss) spawnBoss(L.boss); G.raf = requestAnimationFrame(loop); }, 1700);
  }
  function hud(L){
    const left = G.running ? Math.max(0, Math.ceil((DUR - (performance.now() - G.t0)) / 1000)) : 15;
    G.el.querySelector('#g-clock').textContent = left;
    G.el.querySelector('#g-clock').classList.toggle('hurry', G.running && left <= 4);
    G.el.querySelector('#g-goal').textContent = `${Math.min(G.kills, L.quota)}/${L.quota} solcitos${G.boss ? ` · boss ${G.boss.hp}` : ''}`;
    G.el.querySelector('#g-pts').textContent = `${G.pts} pts`;
  }
  function combo(){ const c = G.el.querySelector('#g-combo'); c.textContent = G.combo >= 3 ? `Combo x${G.combo}${G.combo >= 10 ? ' · puntos dobles' : ''}` : ''; }

  /* ---------- enemigos ---------- */
  function pickType(mix){ let r = Math.random(); for(const [k, w] of Object.entries(mix)){ if((r -= w) < 0) return k; } return 'white'; }
  function spawn(now, L){
    const k = pickType(L.mix), T = TYPES[k], W = G.field.clientWidth, H = G.field.clientHeight, s = T.size;
    const edge = Math.floor(Math.random()*4);
    const x = edge === 1 ? W + s : edge === 3 ? -s : Math.random()*(W - s);
    const y = edge === 0 ? -s : edge === 2 ? H + s : 120 + Math.random()*(H - s - 120);
    const a = Math.atan2(H/2 - y + (Math.random()-.5)*H*.5, W/2 - x + (Math.random()-.5)*W*.5);
    const el = document.createElement('div'); el.className = 'g-bug g-' + k;
    el.style.width = el.style.height = s + 'px'; el.style.color = T.c;
    el.innerHTML = sun({size:s, seed:Math.floor(Math.random()*90), n:T.n});
    const b = {el, k, T, x, y, a, s, sp:T.speed * L.speed * (.85 + Math.random()*.3), turn:now + 300 + Math.random()*500, born:now, life:3000 + Math.random()*2500};
    el.__b = b; G.field.appendChild(el); G.bugs.push(b);
  }
  function spawnBoss(hp){
    const W = G.field.clientWidth, H = G.field.clientHeight, s = 120;
    const el = document.createElement('div'); el.className = 'g-bug g-boss';
    el.innerHTML = `<div class="g-hp"><i></i></div>${window.bossSVG ? bossSVG(1) : sun({size:s, seed:77, n:11})}`;
    const b = {el, k:'boss', boss:true, x:W/2 - s/2, y:H*.45, a:Math.random()*6.28, s, sp:45, hp, max:hp, turn:0, born:performance.now()};
    el.__b = b; G.field.appendChild(el); G.bugs.push(b); G.boss = b; size(b);
  }
  function size(b){ b.el.style.width = b.el.style.height = b.s + 'px'; }

  function loop(now){
    if(!G || !G.running) return;
    const L = LEVELS[G.level - 1], dt = Math.min(.05, (now - G.last)/1000), el = now - G.t0, W = G.field.clientWidth, H = G.field.clientHeight; G.last = now;
    if(now >= G.nextSpawn){ spawn(now, L); G.nextSpawn = now + L.spawn * (.7 + Math.random()*.6); }
    for(const b of G.bugs){
      if(b.dead) continue;
      if(b.boss){
        if(now > b.turn){ b.a = Math.atan2(H*.25 + Math.random()*H*.5 - b.y, Math.random()*(W - b.s) - b.x); b.turn = now + 1400 + Math.random()*1400; }
        b.x = Math.max(0, Math.min(W - b.s, b.x + Math.cos(b.a)*b.sp*dt)); b.y = Math.max(110, Math.min(H - b.s, b.y + Math.sin(b.a)*b.sp*dt));
        b.el.style.transform = `translate(${b.x}px,${b.y}px) rotate(${Math.sin(now/300)*6}deg)`;
        continue;
      }
      const age = now - b.born, inside = b.x > 4 && b.y > 110 && b.x < W - b.s - 4 && b.y < H - b.s - 4;
      if(inside) b.inside = true;
      if(!b.leaving && age > b.life){ b.leaving = true; b.a = Math.atan2(b.y < H/2 ? -1 : 1, b.x < W/2 ? -1 : 1); }
      if(now > b.turn){
        if(b.T.stopgo){ b.stop = !b.stop && Math.random() < .55; b.turn = now + (b.stop ? 350 + Math.random()*450 : 260 + Math.random()*420); if(!b.stop) b.a += (Math.random()-.5)*3.2; }
        else { b.a += (Math.random()-.5)*(b.k === 'white' ? 1.4 : 2.4); b.turn = now + (b.k === 'white' ? 500 : 250) + Math.random()*500; }
      }
      if(b.inside && !inside && !b.leaving){ b.a = Math.atan2(H/2 - b.y + (Math.random()-.5)*H*.4, W/2 - b.x + (Math.random()-.5)*W*.4); b.turn = now + 300; }
      const sp = b.stop ? 0 : b.sp;
      b.x += Math.cos(b.a)*sp*dt; b.y += Math.sin(b.a)*sp*dt;
      const out = b.x < -b.s*1.5 || b.y < -b.s*1.5 || b.x > W + b.s*.5 || b.y > H + b.s*.5;
      if(out && (b.leaving || age > 2500)){ b.dead = true; b.el.remove(); continue; }
      const wob = b.k === 'white' ? Math.sin(now/180 + b.s)*.07 : Math.sin(now/70 + b.s)*.05;
      b.el.style.transform = `translate(${b.x}px,${b.y}px) rotate(${b.a*57.3 + 90}deg) scale(${1 + wob})`;
    }
    G.bugs = G.bugs.filter(b => !b.dead);
    G.el.querySelector('#g-bar').style.width = Math.max(0, 100 - el/DUR*100) + '%';
    hud(L);
    if(G.kills >= L.quota && !G.boss) return clear(L, el);
    if(el >= DUR) return lose();
    G.raf = requestAnimationFrame(loop);
  }

  function hit(b){
    if(!b || b.dead || !G.running) return;
    G.combo++; G.maxCombo = Math.max(G.maxCombo, G.combo); combo();
    if(b.boss){
      b.hp--; G.pts += 1; snd('hit');
      b.s = Math.min(240, b.s + 6); size(b);
      b.el.querySelector('.g-hp i').style.width = (b.hp / b.max * 100) + '%';
      b.el.classList.remove('ouch'); void b.el.offsetWidth; b.el.classList.add('ouch');
      if(b.hp <= 0){ b.dead = true; G.boss = null; G.bossKills++; G.pts += 25; snd('boss'); splat(b, '#a8102f', 25); setTimeout(() => b.el.remove(), 300); }
      return;
    }
    b.dead = true; G.hits++; G.kills++;
    const pts = b.T.pts * (G.combo >= 10 ? 2 : 1); G.pts += pts; snd('squash'); splat(b, b.T.c, pts);
    setTimeout(() => b.el.remove(), 260);
  }
  function splat(b, c, pts){
    b.el.classList.add('squashed'); b.el.style.transform = `translate(${b.x}px,${b.y}px) scale(1.35,.35)`;
    const stain = document.createElement('div'); stain.className = 'g-stain'; stain.style.cssText = `left:${b.x + b.s/2}px;top:${b.y + b.s/2}px;--c:${c};width:${b.s*1.2}px;height:${b.s*.4}px;margin:${-b.s*.2}px 0 0 ${-b.s*.6}px`;
    const pop = document.createElement('div'); pop.className = 'g-pop'; pop.textContent = '+' + pts; pop.style.cssText = `left:${b.x + b.s/2}px;top:${b.y}px`;
    G.field.append(stain, pop); setTimeout(() => { stain.remove(); pop.remove(); }, 900);
  }

  /* ---------- pasar, perder, ganar ---------- */
  function clear(L, el){
    G.running = false; cancelAnimationFrame(G.raf);
    const bonus = Math.max(0, Math.ceil((DUR - el)/1000)); G.pts += bonus;
    G.bugs.forEach(b => b.el.remove()); G.bugs = [];
    if(G.level >= LEVELS.length) return finish(true);
    const ban = G.el.querySelector('#g-banner'); ban.hidden = false;
    ban.innerHTML = `<b>¡Pasaste!</b><span>+${bonus} pts por los segundos que sobraron</span>`;
    G.wait = setTimeout(() => G && nextLevel(), 1200);
  }
  function lose(){ G.running = false; cancelAnimationFrame(G.raf); G.bugs.forEach(b => b.el.remove()); G.bugs = []; snd('lose'); finish(false); }
  function report(win){
    if(!G || G.reported) return {}; G.reported = true;
    return G.h && G.h.onEnd ? G.h.onEnd({hits:G.hits, pts:G.pts, combo:G.maxCombo, level:G.level, boss:G.bossKills, win}) || {} : {};
  }
  function finish(win){
    const info = report(win);
    const card = G.el.querySelector('#g-card'); card.hidden = false;
    card.innerHTML = `<h2 class="g-title">${win ? '¡Ganaste!' : 'Se terminó'}</h2>
      <p>${win ? 'Pasaste los 10 niveles. Imposible, decían.' : `Llegaste al nivel ${G.level}. Faltaron ${Math.max(0, LEVELS[G.level-1].quota - G.kills)} solcitos${G.boss ? ' y el boss' : ''}.`}</p>
      <div class="g-res"><div><b>${G.pts}</b><small>puntos</small></div><div><b>${G.hits}</b><small>aplastados</small></div><div><b>${G.maxCombo}</b><small>combo máx</small></div></div>
      <p class="tiny">Tu récord: ${info.best || G.pts} pts · nivel ${info.bestLevel || G.level}. La banda ya aplastó ${info.total || G.hits} solcitos.</p>
      <div class="row" style="justify-content:center"><button class="btn" data-g="start">${word()}</button><button class="btn ghost" data-g="exit">Salir</button></div>`;
  }
  window.Game = {open, close, _jump:n => { if(G && G.pts !== undefined){ clearTimeout(G.wait); cancelAnimationFrame(G.raf); G.level = n - 1; nextLevel(); } }};
})();
