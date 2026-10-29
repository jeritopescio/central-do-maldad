/* Datos compartidos: Supabase (tabla items), sin login.
   Cada dispositivo elige una vez quién es y lo recuerda.
   Sin configuración, la app arranca en modo demo y guarda todo en este dispositivo. */
(function(){
  const C = window.CDM_CONFIG || {};
  const live = !!(C.supabaseUrl && C.supabaseAnonKey);
  const Sync = window.Sync = {live, client:null, rows:new Map()};
  const KIND = {task:'tasks', song:'songs', event:'events', mov:'movs', call:'calls', feed:'feed', xp:'xpl', sun:'sunLog'};
  const SB_JS = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';

  function toRows(s){
    const m = new Map();
    for(const [k, key] of Object.entries(KIND)) (s[key] || []).forEach((o, i) => {
      const data = key === 'songs' ? {...o, ord:i} : o;
      m.set(k + ':' + o.id, {kind:k, data});
    });
    for(const [id, d] of Object.entries(s.ach || {})) m.set('ach:' + id, {kind:'ach', data:{id, d}});
    for(const [id, st] of Object.entries(s.stats || {})) m.set('stat:' + id, {kind:'stat', data:{...st, id}});
    return m;
  }
  function fromRows(rows){
    const d = {v:2, ach:{}, stats:{}}; Object.values(KIND).forEach(k => d[k] = []);
    for(const r of rows){
      if(r.kind === 'ach') d.ach[r.data.id] = r.data.d;
      else if(r.kind === 'stat') d.stats[r.data.id] = r.data;
      else if(KIND[r.kind]) d[KIND[r.kind]].push(r.data);
    }
    d.songs.sort((a, b) => (a.ord ?? 0) - (b.ord ?? 0));
    d.feed.sort((a, b) => b.at - a.at);
    d.xpl.sort((a, b) => a.at - b.at);
    return d;
  }

  /* ---------- envío de cambios ---------- */
  let timer = null;
  function diff(){
    const now = toRows(S), ups = [], dels = [];
    for(const [id, r] of now){
      const j = JSON.stringify(r.data), old = Sync.rows.get(id);
      if(!old || old.j !== j){ ups.push({id, kind:r.kind, data:r.data, updated_by:S.me}); Sync.rows.set(id, {kind:r.kind, data:r.data, j}); }
    }
    for(const id of [...Sync.rows.keys()]) if(!now.has(id)){ dels.push(id); Sync.rows.delete(id); }
    return {ups, dels};
  }
  async function flush(){
    clearTimeout(timer); timer = null;
    if(!Sync.client) return;
    const {ups, dels} = diff();
    if(!ups.length && !dels.length) return;
    try{
      if(ups.length){ const {error} = await Sync.client.from('items').upsert(ups); if(error) throw error; }
      if(dels.length){ const {error} = await Sync.client.from('items').delete().in('id', dels); if(error) throw error; }
      status('');
    }catch(e){
      console.error(e);
      ups.forEach(u => Sync.rows.delete(u.id));
      dels.forEach(id => Sync.rows.set(id, {kind:'?', data:null, j:'__retry__'}));
      status('Sin conexión: lo guardo cuando vuelva');
    }
  }
  Sync.push = () => { clearTimeout(timer); timer = setTimeout(flush, 250); };
  addEventListener('online', () => Sync.push());
  addEventListener('pagehide', () => { if(timer) flush(); });

  function status(msg){
    let el = document.getElementById('sync-status');
    if(!msg){ if(el) el.remove(); return; }
    if(!el){ el = document.createElement('div'); el.id = 'sync-status'; el.className = 'sync-status'; document.body.appendChild(el); }
    el.textContent = msg;
  }

  /* ---------- cambios que llegan de los otros ---------- */
  let rb = null;
  function onChange(p){
    if(p.eventType === 'DELETE'){ const id = p.old && p.old.id; if(!id || !Sync.rows.has(id)) return; Sync.rows.delete(id); }
    else { const r = p.new, j = JSON.stringify(r.data), old = Sync.rows.get(r.id); if(old && old.j === j) return; Sync.rows.set(r.id, {kind:r.kind, data:r.data, j}); }
    clearTimeout(rb); rb = setTimeout(rebuild, 120);
  }
  function rebuild(){
    if(timer) flush();                      // lo propio que todavía no salió entra primero
    const keep = {me:S.me, ui:S.ui, splashDay:S.splashDay};
    S = Object.assign(fromRows([...Sync.rows.values()].filter(r => r.data)), keep);
    recalc(); rerender();
    if(!document.querySelector('#sheet form')) refreshSheet();
  }

  /* ---------- quién sos ---------- */
  function gate(html){ const g = document.getElementById('gate'); g.innerHTML = html; g.hidden = !html; }
  const shell = inner => `<div class="gate-card"><img class="gate-logo" src="img/evvil.svg" alt="Evvil"><h1 class="gate-title">Central do Maldad</h1>${inner}</div>`;
  function loading(msg){ gate(shell(`<p class="gate-sub">${msg}</p><div class="gate-sun"><img src="img/cosito.webp" alt=""></div>`)); }
  Sync.pickMember = (then) => {
    gate(shell(`<p class="gate-sub">¿Quién sos? Este celu se va a acordar.</p>
      <div class="gate-who">${IDS.map(i => `<button class="gate-m" data-pick="${i}" style="--c:${M[i].c}"><img src="img/${i}.webp" alt=""><b>${M[i].name}</b><span>${M[i].emoji}</span></button>`).join('')}</div>`));
    const g = document.getElementById('gate');
    g.onclick = e => {
      const b = e.target.closest('[data-pick]'); if(!b) return;
      g.onclick = null; S.me = b.dataset.pick; saveLocal(); gate('');
      if(then) then(); else { rerender(); toast(`«${pick(M[S.me].says)}» · ${M[S.me].name} ${M[S.me].emoji}`); }
    };
  };

  async function fetchAll(){
    const out = [];
    for(let from = 0; ; from += 1000){
      const {data, error} = await Sync.client.from('items').select('id,kind,data').range(from, from + 999);
      if(error) throw error;
      out.push(...data); if(data.length < 1000) break;
    }
    return out;
  }
  function loadScript(src){ return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  const retry = msg => gate(shell(`<p class="gate-sub">${msg}</p><button class="btn" onclick="location.reload()">Reintentar</button>`));

  async function boot(){
    if(!live){ setState(loadDemo() || seed()); startApp(); return; }
    loading('Abriendo la Central…');
    try{ await loadScript(SB_JS); }catch(e){ return retry('No pude conectarme. ¿Hay internet?'); }
    Sync.client = window.supabase.createClient(C.supabaseUrl, C.supabaseAnonKey, {auth:{persistSession:false, autoRefreshToken:false}});
    let rows;
    try{ rows = await fetchAll(); }catch(e){ console.error(e); return retry('No pude traer los datos. ¿Hay internet?'); }
    Sync.rows = new Map(rows.map(r => [r.id, {kind:r.kind, data:r.data, j:JSON.stringify(r.data)}]));
    setState(fromRows(rows));
    Sync.client.channel('items').on('postgres_changes', {event:'*', schema:'public', table:'items'}, onChange).subscribe();
    const chosen = loadLocal().me;
    if(chosen) { gate(''); startApp(); }
    else Sync.pickMember(() => startApp());
  }
  boot();
})();
