const LKEY = 'cdm-local-v1', DKEY = 'cdm-demo-v1';
const M = {
  jero:{name:'Jero', emoji:'🧙‍♂️', role:'Batería, SPD y coros', alias:'el mago', c:'var(--jero)', sup:'El ojo de la banda: fotos, videos, bocetos de tapa y el SPD.', says:['Uesa','Wepa','Que ondas','Que onda evvils','Holis','Biuriful']},
  mica:{name:'Mica', emoji:'🧚‍♀️', role:'Bajo y voz principal', alias:'el hada', c:'var(--mica)', sup:'La que ordena: punteo de reuniones, devoluciones de mezcla, el calendario y el contacto con Dani.', says:['En un cachito','No voy']},
  fran:{name:'Fran', emoji:'🦄', role:'Guitarra y voz principal', alias:'el unicornio', c:'var(--fran)', sup:'El que consigue fechas y arma planes: shows, Fraxu, prensa y Spotify. Y la radio.', says:['Oku','Petacular','Roc on','Lo amo']},
};
const IDS = ['jero','mica','fran'];
const ET = {
  show:{label:'Show', c:'var(--ember)'}, mie:{label:'Miércoles', c:'var(--t-ensayo)'}, ensayo:{label:'Ensayo extra', c:'var(--t-extra)'}, grab:{label:'Grabación', c:'var(--t-grab)'},
  reunion:{label:'Reunión', c:'var(--t-reu)'}, deadline:{label:'Fecha límite', c:'var(--t-dead)'}, lanz:{label:'Lanzamiento', c:'var(--gold)'}
};
const CAT = {promo:'Promo', contenido:'Contenido', produccion:'Producción', single:'Singles'};
const STAGES = ['Grabado','Mezcla','Master','Tapa','Distribuidora','Contenido','OUT'];
const CALL_ST = ['Vista','Preparando','Enviada','Resultado'];
const LV = [[0,'Primer solcito'],[120,'Jornada de roc'],[300,'Mate y distorsión'],[550,'Terapia de grupo'],[850,'Metal simpático'],[1200,'Alerta do maldad'],[1600,'Re tight'],[2150,'Los amigos de Evvil'],[2800,'Cabelleras al viento'],[3550,'Trilogía'],[4400,'Evvil, Evvil, Evvil'],[5350,'Roc on'],[6400,'Leyenda platense']];
const ARISTAS = [{id:'musica',name:'Música'},{id:'escenario',name:'Escenario'},{id:'contenido',name:'Contenido'},{id:'produccion',name:'Producción'},{id:'comunidad',name:'Comunidad'},{id:'banda',name:'Banda'},{id:'juego',name:'Pasatiempo'},{id:'bizarro',name:'Bizarros'}];
const ACH = [
  {id:'single1',ar:'musica',ic:'🚀',name:'Primer single',desc:'«Los Chicos» OUT en todas las plataformas.'},
  {id:'master2',ar:'musica',ic:'🎚️',name:'Master en mano',desc:'«Los Papás» masterizado por Fermín Irigoyen.'},
  {id:'coros',ar:'musica',ic:'😇',name:'Coros celestiales',desc:'Terminar de grabar las voces que faltan en lo de Fraxu, los tres.'},
  {id:'mezcla',ar:'musica',ic:'🎛️',name:'Todo mezclado',desc:'Los 11 temas mezclados en lo de Fraxu.'},
  {id:'kidclip',ar:'musica',ic:'🎬',name:'Luz, cámara, Kid',desc:'Filmar el video de «El Kid».'},
  {id:'nuevo',ar:'musica',ic:'✍️',name:'Tema nuevo',desc:'Terminar un tema que no esté en el disco.'},
  {id:'doble',ar:'musica',ic:'⚔️',name:'Doble filo',desc:'Dos singles OUT.',hint:'Se desbloquea solo cuando «Los Papás» pasa a OUT.',prog:'out',goal:2},
  {id:'disco',ar:'musica',ic:'👑',name:'Evvil, Evvil, Evvil',desc:'Los 11 temas publicados.',prog:'out',goal:11},
  {id:'show1',ar:'escenario',ic:'1️⃣',name:'El primer show de Evvil',desc:'Pura Vida, junto a Poderes Extraños.'},
  {id:'show2',ar:'escenario',ic:'2️⃣',name:'El segundo show de Evvil',desc:'Guajira, junto a Morfar.'},
  {id:'trilogia',ar:'escenario',ic:'3️⃣',name:'Trilogía',desc:'El tercer y último show de Evvil (hasta el año que viene).',hint:'Sábado 19/12 en Pura Vida.'},
  {id:'ruta',ar:'escenario',ic:'🛣️',name:'Ruta',desc:'Tocar fuera de La Plata.',hint:'¿Mar del Plata con Macabra?'},
  {id:'lleno',ar:'escenario',ic:'🎟️',name:'Lleno total',desc:'Que se agoten las entradas de un show.'},
  {id:'otra',ar:'escenario',ic:'🔁',name:'¡Otra!',desc:'Que el público pida un tema más.'},
  {id:'invitados',ar:'escenario',ic:'🎤',name:'Invitados',desc:'Que alguien suba a tocar o cantar un tema con nosotros.'},
  {id:'vuelta',ar:'escenario',ic:'🌱',name:'La vuelta',desc:'El primer show de 2027.'},
  {id:'reel1',ar:'contenido',ic:'🎬',name:'Primer reel',desc:'El primer reel de la banda.'},
  {id:'tras',ar:'contenido',ic:'🎥',name:'Detrás de escena',desc:'Subir un video de ensayo o de grabación.'},
  {id:'reels10',ar:'contenido',ic:'🎞️',name:'Reelero',desc:'Subir 10 reels.'},
  {id:'vivo',ar:'contenido',ic:'🔴',name:'En vivo',desc:'Hacer un vivo en Instagram.'},
  {id:'hito',ar:'contenido',ic:'📈',name:'Hito en redes',desc:'Las métricas aparecen solo así: cuando cruzan un hito.',hint:'Ejemplo: 1.000 oyentes mensuales.'},
  {id:'stickers',ar:'produccion',ic:'🏷️',name:'Stickers',desc:'Stickers de Evvil para regalar en los shows.'},
  {id:'parche',ar:'produccion',ic:'🥁',name:'Parche de bombo',desc:'El bombo con el logo de Evvil.'},
  {id:'remeras',ar:'produccion',ic:'👕',name:'Remeras',desc:'Remeras de Evvil.'},
  {id:'rider',ar:'produccion',ic:'📋',name:'Rider listo',desc:'Rider técnico y backline armados para mandar.'},
  {id:'merch',ar:'produccion',ic:'🛍️',name:'Puesto de merch',desc:'Vender merch en un show.'},
  {id:'promo',ar:'produccion',ic:'🐉',name:'Final Boss derrotado',desc:'Toda la promo del tercer show, hecha.',hint:'Quests del Final Boss.',auto:true},
  {id:'amigos',ar:'comunidad',ic:'💌',name:'Los amigos de Evvil',desc:'Entradas con precio «amigo que ayuda» y «súper amigo».'},
  {id:'primerfan',ar:'comunidad',ic:'⭐',name:'Primer fan',desc:'Que nos escriba alguien que no es familia ni amigo.'},
  {id:'radio',ar:'comunidad',ic:'📻',name:'Suena en la radio',desc:'Que pasen un tema de Evvil en una radio.'},
  {id:'medio',ar:'comunidad',ic:'🗞️',name:'Salimos en un medio',desc:'Primera nota o entrevista.'},
  {id:'convo',ar:'comunidad',ic:'🏆',name:'Convocatoria ganada',desc:'Quedar en un fondo, festival o ciclo.'},
  {id:'nivel0',ar:'banda',ic:'🌅',name:'Levvel 0',desc:'Arrancamos la Central do Maldad.'},
  {id:'firstquest',ar:'banda',ic:'✅',name:'Primera quest',desc:'Cerrar la primera quest en la app.',prog:'quests',goal:1},
  {id:'quests25',ar:'banda',ic:'🛠️',name:'Quest machine',desc:'Cerrar 25 quests.',prog:'quests',goal:25},
  {id:'quests100',ar:'banda',ic:'🏗️',name:'Quest legend',desc:'Cerrar 100 quests.',prog:'quests',goal:100},
  {id:'semana',ar:'banda',ic:'🔒',name:'Semana asegurada',desc:'3 quests cerradas en una misma semana.',auto:true},
  {id:'streak4',ar:'banda',ic:'🔥',name:'Cuatro al hilo',desc:'Una racha de 4 semanas seguidas.',prog:'streak',goal:4},
  {id:'triplesol',ar:'banda',ic:'☀️',name:'Triple sol',desc:'Los tres encendieron su sol el mismo día.',prog:'triple',goal:1},
  {id:'triple7',ar:'banda',ic:'🌞',name:'Semana de sol',desc:'Siete días de triple sol.',prog:'triple',goal:7},
  {id:'todosvan',ar:'banda',ic:'🙌',name:'Los tres van',desc:'Los tres responden «Voy» al mismo miércoles.',auto:true},
  {id:'notas',ar:'banda',ic:'🗒️',name:'Hablamos',desc:'Dejar 10 notas en eventos.',prog:'notes',goal:10},
  {id:'aplausos',ar:'banda',ic:'🤘',name:'Aplausos',desc:'Diez 🤘 en el feed.',prog:'cheers',goal:10},
  {id:'ovacion',ar:'banda',ic:'🏟️',name:'Ovación',desc:'Cien 🤘 en el feed.',prog:'cheers',goal:100},
  {id:'caja',ar:'banda',ic:'⚖️',name:'Caja en orden',desc:'Todas las cuentas saldadas entre los tres.',auto:true},
  {id:'aplaston',ar:'juego',ic:'👟',name:'Primer aplastón',desc:'Aplastá tu primer solcito.',prog:'squash',goal:1},
  {id:'killer',ar:'juego',ic:'🔪',name:'Evvil killer',desc:'Matá 200 solcitos.',prog:'squash',goal:200},
  {id:'exterminador',ar:'juego',ic:'💥',name:'Exterminador solar',desc:'Matá 1.000 solcitos.',prog:'squash',goal:1000},
  {id:'apocalipsis',ar:'juego',ic:'☄️',name:'Apocalipsis solar',desc:'Matá 5.000 solcitos.',prog:'squash',goal:5000},
  {id:'combo',ar:'juego',ic:'⚡',name:'Combo x15',desc:'15 solcitos seguidos sin errarle a ninguno.',prog:'combo',goal:15},
  {id:'mitad',ar:'juego',ic:'🎮',name:'Mitad del camino',desc:'Llegar al nivel 5.',prog:'lvl',goal:5},
  {id:'jefazo',ar:'juego',ic:'🐉',name:'Le ganamos al boss',desc:'Derrotar al Final Boss del juego (nivel 8).',prog:'bossKills',goal:1},
  {id:'imposible',ar:'juego',ic:'💀',name:'Imposible',desc:'Pasar los 10 niveles.',prog:'wins',goal:1},
  {id:'record',ar:'juego',ic:'🏅',name:'Mano rápida',desc:'150 puntos en una partida.',prog:'best',goal:150},
  {id:'maraton',ar:'juego',ic:'🕹️',name:'Maratón',desc:'Jugar 20 partidas.',prog:'plays',goal:20},
  {id:'milktoy',ar:'bizarro',ic:'🥛',name:'Muñeco de leche',desc:'Atrapá a MilkToy por primera vez.',hint:'Aparece muy de vez en cuando. Hay que tocarlo antes de que se escape.',prog:'milk',goal:1},
  {id:'milkdanger',ar:'bizarro',ic:'⚠️',name:'MilkToy danger',desc:'Atrapá a MilkToy 5 veces.',prog:'milk',goal:5},
  {id:'cafeconleche',ar:'bizarro',ic:'☕',name:'Café con leche',desc:'Atrapá a MilkToy antes de las 10 de la mañana.',auto:true},
  {id:'cortada',ar:'bizarro',ic:'🫗',name:'Leche cortada',desc:'Que MilkToy se te escape 3 veces.',prog:'milkEsc',goal:3},
  {id:'ordenador',ar:'bizarro',ic:'🤫',name:'El que sabe, sabe',desc:'Encontrar el truco escondido en el cartel del Levvel.',auto:true},
  {id:'madrugador',ar:'bizarro',ic:'🐓',name:'Madrugador',desc:'Encender el sol antes de las 8.',auto:true},
  {id:'buho',ar:'bizarro',ic:'🦉',name:'Búho',desc:'Cerrar una quest después de medianoche.',auto:true},
  {id:'sindrama',ar:'bizarro',ic:'🧘',name:'Sin drama',desc:'Pedir 3 prórrogas. Está todo bien.',prog:'prorrogas',goal:3},
  {id:'ctrlz',ar:'bizarro',ic:'↩️',name:'Ctrl+Z',desc:'Usar «Deshacer» 10 veces.',prog:'undos',goal:10},
];

const WORDS = ['Wepa', 'Oku', 'Okarola', 'Ok', 'Dale', 'Incre', 'Perfe'];
if(typeof seed !== 'function') window.seed = () => ({v:2, xpl:[], sunLog:[], stats:{}, ach:{}, tasks:[], songs:[], events:[], movs:[], calls:[], feed:[]});

/* ---------- utils ---------- */
const $ = (s, el=document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DOW = ['dom','lun','mar','mié','jue','vie','sáb'];
const DOWL = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
const MON = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const MONL = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
function pd(s, t){ const [y,m,d] = s.split('-').map(Number); let hh=0, mm=0; if(t) [hh,mm] = t.split(':').map(Number); return new Date(y, m-1, d, hh, mm); }
function sod(d){ return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function isoDay(d){ return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
function dd(s){ return Math.round((sod(pd(s)) - sod(new Date())) / 864e5); }
function dueTxt(s){ const n = dd(s); if(n===0) return 'hoy'; if(n===1) return 'mañana'; if(n>1) return n<=60 ? `en ${n} días` : fmtShort(s); if(n===-1) return 'se pasó ayer'; return `se pasó hace ${-n} días`; }
function dueCls(s){ const n = dd(s); return n<0 ? 'late' : n<=3 ? 'soon' : ''; }
function fmtShort(s){ const d = pd(s); return `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`; }
function rel(at){ const m = Math.round((Date.now()-at)/6e4); if(m<1) return 'recién'; if(m<60) return `hace ${m} min`; const h = Math.round(m/60); if(h<24) return `hace ${h} h`; const d = Math.round(h/24); return d===1 ? 'ayer' : `hace ${d} días`; }
function weekStart(d){ const x = sod(d); x.setDate(x.getDate() - (x.getDay()+6)%7); return x; }
const money = n => new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(Math.round(n));
const num = n => new Intl.NumberFormat('es-AR').format(n);
function rng(seed){ let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function hash(s){ let h = 2166136261; for(const c of s){ h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

/* hand-cut sun, like the paper "cosito" */
function sunPath(seed, n=9, r0=21, r1=48){
  const R = rng(seed); let d = '';
  const p = (rad, a) => `${(Math.cos(a)*rad).toFixed(1)} ${(Math.sin(a)*rad).toFixed(1)}`;
  for(let i=0;i<n;i++){
    const a = i/n*Math.PI*2 + (R()-.5)*.38, len = r1*(.7 + R()*.3), w = .12 + R()*.08;
    d += `M${p(r0-3,a-w)}L${p(len,a+(R()-.5)*.1)}L${p(r0-3,a+w)}Z`;
  }
  return d;
}
function sun({size=40, seed=3, n=9, cls='', style=''}={}){
  return `<svg class="sun ${cls}" viewBox="-50 -50 100 100" width="${size}" height="${size}" style="${style}" aria-hidden="true"><path d="${sunPath(seed,n)}" fill="currentColor"/><circle r="22" fill="currentColor"/></svg>`;
}
const star4 = `<svg viewBox="-10 -10 20 20" aria-hidden="true"><path d="M0-10L2.2-2.2 10 0 2.2 2.2 0 10-2.2 2.2-10 0-2.2-2.2Z" fill="currentColor"/></svg>`;
const CATS = {thelma:['Thelma','#a7acb4'], tony:['Tony','#8d9097'], rober:['Rober','#f4f0e8']};
const LIVES = ['thelma','tony','rober'];
function catSVG(kind, on){
  const [name, c] = CATS[kind];
  const stripes = kind==='tony' ? '<path d="M10.2 9.4l.9 2M12 8.9v2.3M13.8 9.4l-.9 2M4.6 12.6l2 .5M19.4 12.6l-2 .5M5 15.2l2-.1M19 15.2l-2-.1" stroke="#575a60" stroke-width="1.1" stroke-linecap="round"/>' : '';
  return `<svg class="cat ${on?'on':'off'}" viewBox="0 0 24 24" role="img" aria-label="${name}"><path d="M3 3.5 8.2 8h7.6L21 3.5V13a9 8.2 0 0 1-18 0Z" fill="${c}"/>${stripes}<circle cx="8.6" cy="13" r="1.5" fill="#060912"/><circle cx="15.4" cy="13" r="1.5" fill="#060912"/><path d="M11 15.6h2l-1 1.1Z" fill="#e88a9a"/></svg>`;
}
const ICON = {
  hoy:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 1.8v3M12 19.2v3M1.8 12h3M19.2 12h3M4.8 4.8l2.1 2.1M17.1 17.1l2.1 2.1M4.8 19.2l2.1-2.1M17.1 6.9l2.1-2.1"/></svg>',
  agenda:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/><circle cx="15.5" cy="15" r="1.4" fill="currentColor" stroke="none"/></svg>',
  misiones:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4M5 4h11l-2.5 4L16 12H5"/></svg>',
  caja:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><ellipse cx="12" cy="6.5" rx="7.5" ry="3"/><path d="M4.5 6.5v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-5M4.5 11.5v5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-5"/></svg>',
  banda:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.5l1.6 5.4 5.4 1.6-5.4 1.6L12 16.5l-1.6-5.4L5 9.5l5.4-1.6Z"/><path d="M18.5 15.5l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7Z"/><path d="M5 16l.5 1.5L7 18l-1.5.5L5 20l-.5-1.5L3 18l1.5-.5Z"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7"/></svg>',
  close:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  prev:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  next:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
};

/* ---------- state ---------- */
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function defaultUI(){ return {view:'hoy', calY:null, calM:null, calSel:null, mis:'todo', misWho:'all', misBoss:false, movF:'todo', achOpen:{}}; }
function loadLocal(){ try{ return JSON.parse(localStorage.getItem(LKEY)) || {}; }catch(e){ return {}; } }
function saveLocal(){ try{ localStorage.setItem(LKEY, JSON.stringify({me:S.me, ui:S.ui, splashDay:S.splashDay})); }catch(e){} }
function loadDemo(){ try{ const s = JSON.parse(localStorage.getItem(DKEY)); return s && s.v===2 ? s : null; }catch(e){ return null; } }
function dataOf(s){ const {me, ui, splashDay, xp, lives, streak, suns, ...d} = s; return d; }
function save(){
  saveLocal();
  if(Sync.live) Sync.push(); else { try{ localStorage.setItem(DKEY, JSON.stringify(dataOf(S))); }catch(e){} }
}
let S = null;
function setState(data){
  const L = loadLocal();
  S = Object.assign({}, data, {me:L.me || 'jero', ui:Object.assign(defaultUI(), L.ui || {}), splashDay:L.splashDay || ''});
  S.xpl = S.xpl || []; S.sunLog = S.sunLog || []; S.ach = S.ach || {}; S.stats = S.stats || {};
  ['tasks','songs','events','movs','calls','feed'].forEach(k => S[k] = S[k] || []);
  const now = new Date();
  if(S.ui.calY == null){ S.ui.calY = now.getFullYear(); S.ui.calM = now.getMonth(); S.ui.calSel = isoDay(now); }
  const h = (location.hash || '').slice(1);
  if(['hoy','agenda','misiones','caja','banda'].includes(h)) S.ui.view = h;
  recalc();
}
function streakCalc(){
  const wk = {}; S.tasks.forEach(t => { if(t.done && t.doneAt){ const k = isoDay(weekStart(new Date(t.doneAt))); wk[k] = (wk[k] || 0) + 1; } });
  const d = weekStart(new Date()); let n = 0;
  if((wk[isoDay(d)] || 0) < 3) d.setDate(d.getDate() - 7);
  while((wk[isoDay(d)] || 0) >= 3){ n++; d.setDate(d.getDate() - 7); }
  return n;
}
/* 3 vvidas por semana: cada lunes vuelven a 3. Se pierde una por cada quest de la semana que venció
   sin cerrarse (la prórroga la corre de fecha, así que no cuenta). Lo de semanas anteriores no resta. */
const MAXL = 3, WK_FROM = '2026-11-02';
function lateIn(ws, until, at){
  const a = isoDay(ws);
  return S.tasks.filter(t => t.due >= a && t.due < until && !(t.done && (!t.doneAt || t.doneAt < at))).length;
}
const lateThisWeek = t => !t.done && t.due < isoDay(new Date()) && t.due >= isoDay(weekStart(new Date()));
// Al empezar una semana nueva, cada vvida que quedó de la anterior suma 10 XP (una sola vez, con id fijo).
function weekBonus(){
  const nx = weekStart(new Date()), prev = new Date(nx); prev.setDate(prev.getDate() - 7);
  const k = isoDay(prev); if(k < WK_FROM || S.xpl.some(x => x.id === 'wk' + k)) return;
  const left = Math.max(0, MAXL - lateIn(prev, isoDay(nx), nx.getTime())), xp = left * 10;
  S.xpl.push({id:'wk' + k, n:xp, at:Date.now(), who:'band'});
  S.feed.unshift({id:'fwk' + k, who:'band', text:left ? `cerró la semana con ${left} ${left===1 ? 'vvida' : 'vvidas'}` : 'arrancó otra semana: vuelven las 3 vvidas', xp, at:Date.now(), cheers:[]});
  recalc(); save(); rerender();
  setTimeout(() => toast(left ? `Semana cerrada con ${left} ${left===1 ? 'vvida' : 'vvidas'}: +${xp} XP` : 'Semana nueva: vuelven las 3 vvidas'), 1200);
}
function recalc(){
  const today = isoDay(new Date()), ws = weekStart(new Date());
  S.xp = Math.max(0, S.xpl.reduce((a, x) => a + x.n, 0));
  S.lives = Math.max(0, MAXL - lateIn(ws, today, Date.now()));
  S.suns = {}; IDS.forEach(i => S.suns[i] = S.sunLog.some(x => x.d===today && x.who===i));
  S.streak = streakCalc();
}
function stat(k, n=1){ const s = S.stats[S.me] = Object.assign({id:S.me}, S.stats[S.me]); s[k] = (s[k] || 0) + n; return s[k]; }
function statMax(k, v){ const s = S.stats[S.me] = Object.assign({id:S.me}, S.stats[S.me]); s[k] = Math.max(s[k] || 0, v); return s[k]; }
const sumStat = k => Object.values(S.stats).reduce((a, s) => a + (s[k] || 0), 0);
const maxStat = k => Object.values(S.stats).reduce((a, s) => Math.max(a, s[k] || 0), 0);
const PROG = {
  squash:() => sumStat('squash'), combo:() => maxStat('combo'), best:() => maxStat('best'), plays:() => sumStat('plays'),
  milk:() => sumStat('milk'), milkEsc:() => sumStat('milkEsc'), undos:() => sumStat('undos'),
  lvl:() => maxStat('lvl'), bossKills:() => sumStat('boss'), wins:() => sumStat('wins'),
  quests:() => S.tasks.filter(t => t.done).length, notes:() => allNotes(), cheers:() => S.feed.reduce((a, f) => a + (f.cheers || []).length, 0),
  triple:() => { const d = {}; S.sunLog.forEach(x => { (d[x.d] = d[x.d] || new Set()).add(x.who); }); return Object.values(d).filter(s => s.size >= 3).length; },
  prorrogas:() => S.feed.filter(f => /pidió prórroga/.test(f.text)).length, streak:() => S.streak, out:() => S.songs.filter(s => s.stage===6).length,
};
function checkAch(){ ACH.forEach(a => { if(a.prog && !S.ach[a.id] && PROG[a.prog]() >= a.goal) unlock(a.id); }); }
function addXP(n){ if(n) S.xpl.push({id:uid(), n, at:Date.now(), who:S.me}); recalc(); }

function lvl(xp){
  let i = 0; while(i+1 < LV.length && xp >= LV[i+1][0]) i++;
  const cur = LV[i], nx = LV[i+1];
  return {n:i, name:cur[1], from:cur[0], to:nx ? nx[0] : cur[0], next:nx ? nx[1] : null, pct:nx ? (xp-cur[0])/(nx[0]-cur[0]) : 1};
}
function boss(){
  const t = S.tasks.filter(x => x.boss), tot = t.reduce((a,x) => a+x.xp, 0), left = t.filter(x => !x.done).reduce((a,x) => a+x.xp, 0);
  return {tot, left, pct:tot ? left/tot : 0, n:t.length, done:t.filter(x => x.done).length};
}
const showEv = () => S.events.find(e => e.id==='e16') || {id:'e16', type:'show', title:'El tercer y último show de Evvil', date:'2026-12-19', time:'21:00', place:'Pura Vida, La Plata', rsvp:{}, notes:[]};
function weekCount(who){ const ws = weekStart(new Date()).getTime(); return S.tasks.filter(t => t.done && t.doneAt >= ws && (!who || t.doneBy===who)).length; }
function weekNotes(who){ const ws = weekStart(new Date()).getTime(); return S.events.reduce((a,e) => a + (e.notes||[]).filter(n => n.who===who && n.at >= ws).length, 0); }
function allNotes(){ return S.events.reduce((a,e) => a + (e.notes||[]).length, 0); }
const byDue = (a,b) => a.due.localeCompare(b.due);
function upcoming(){ const t = isoDay(new Date()); return S.events.filter(e => e.date >= t).sort((a,b) => (a.date+(a.time||'')).localeCompare(b.date+(b.time||''))); }
function whoChip(w){
  if(w==='all') return `<span class="whochip">${IDS.map(i => M[i].emoji).join('')} Todos</span>`;
  return `<span class="whochip" style="--c:${M[w].c}">${M[w].emoji} ${M[w].name}</span>`;
}

/* ---------- gamification ---------- */
function gain(xp, who, text, at){
  const before = lvl(S.xp).n;
  if(xp) S.xpl.push({id:uid(), n:xp, at:Date.now(), who:who || S.me});
  recalc();
  if(text) S.feed.unshift({id:'f'+uid(), who, text, xp:xp>0 ? xp : 0, at:Date.now(), cheers:[]});
  if(xp > 0 && at) burst(at.x, at.y, xp);
  const pill = $('#lvlpill'); pill.classList.remove('bump'); void pill.offsetWidth; pill.classList.add('bump');
  if(lvl(S.xp).n > before) queueOverlay(levelHTML(lvl(S.xp)));
  save();
}
function checkStreak(){
  if(weekCount() === 3){ unlock('semana'); setTimeout(() => toast(`Racha: ${S.streak} ${S.streak===1?'semana':'semanas'} en movimiento`), 1400); }
}
function unlock(id){
  if(S.ach[id]) return; const a = ACH.find(x => x.id===id); if(!a) return;
  const d = new Date(); S.ach[id] = `${d.getDate()} ${MON[d.getMonth()]} ${d.getFullYear()}`; save();
  queueOverlay(`<div class="ov-sun" style="width:150px;height:150px">${sun({size:150, seed:hash(id)%97, n:12})}<b style="font-size:50px">${a.ic}</b></div><div class="ov-k">Achievvilment unlocked</div><h2 class="ov-t">${esc(a.name)}</h2><p class="ov-d">${esc(a.desc)}</p>`);
}
const CARTAS = [1,2,3,4,5,6,7,8,9];
function levelHTML(L){
  if(CARTAS.includes(L.n)) return `<img class="ov-carta" src="img/cartas/carta${L.n}.webp" alt="Carta ${L.n} del álbum"><div class="ov-k">LEVVEL UP! · NUEVA CARTA</div><h2 class="ov-t">${esc(L.name)}</h2><p class="ov-d">Lo desbloquearon entre los tres. La carta ya está en el álbum, en Banda.</p>`;
  return `<div class="ov-sun">${sun({size:180, seed:L.n+40, n:11})}<b>${L.n}</b></div><div class="ov-k">LEVVEL UP!</div><h2 class="ov-t">${esc(L.name)}</h2><p class="ov-d">Lo desbloquearon entre los tres. Próximo: «${esc(L.next || '—')}».</p>`;
}
const OVQ = [];
function queueOverlay(html){ OVQ.push(html); if($('#overlay').hidden) nextOverlay(); }
function nextOverlay(){
  const o = $('#overlay'); const h = OVQ.shift();
  if(!h){ o.hidden = true; o.className = ''; o.innerHTML = ''; return; }
  o.hidden = false; o.className = 'overlay'; o.setAttribute('role','dialog'); o.setAttribute('aria-modal','true');
  o.innerHTML = `<div class="ov-card">${h}<button class="btn" data-act="ov-next">${pick(WORDS)}</button></div>`;
  setTimeout(() => o.querySelector('button')?.focus(), 50);
}
function burst(x, y, xp){
  if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for(let i=0;i<9;i++){
    const s = document.createElement('span'); s.className = 'spark';
    s.innerHTML = sun({size:12 + Math.random()*14, seed:i*7+1});
    const a = Math.random()*Math.PI*2, d = 46 + Math.random()*70;
    s.style.left = x+'px'; s.style.top = y+'px';
    s.style.setProperty('--dx', Math.cos(a)*d+'px'); s.style.setProperty('--dy', Math.sin(a)*d-28+'px');
    document.body.appendChild(s); setTimeout(() => s.remove(), 950);
  }
  const f = document.createElement('span'); f.className = 'xpfloat'; f.textContent = `+${xp} XP`;
  f.style.left = x+'px'; f.style.top = (y-10)+'px'; document.body.appendChild(f); setTimeout(() => f.remove(), 1050);
}
let toastT, UNDO = null;
function snap(){ UNDO = {s:JSON.stringify(S), fresh:true, until:0}; }
function toast(msg){
  const t = $('#toast');
  if(UNDO && UNDO.fresh){ UNDO.fresh = false; UNDO.until = Date.now() + 6000; }
  const u = !!(UNDO && UNDO.until > Date.now());
  t.innerHTML = `<span>${esc(msg)}</span>${u ? '<button class="undo" data-act="undo">Deshacer</button>' : ''}`;
  t.classList.toggle('has-undo', u); t.classList.add('on'); clearTimeout(toastT);
  toastT = setTimeout(() => t.classList.remove('on', 'has-undo'), u ? Math.max(2800, UNDO.until - Date.now()) : 2800);
}
function pick(list){ return list[Math.floor(Math.random()*list.length)]; }
function posOf(ev, el){
  if(ev && ev.clientX) return {x:ev.clientX, y:ev.clientY};
  const r = el.getBoundingClientRect(); return {x:r.left + r.width/2, y:r.top + r.height/2};
}

/* ---------- header + nav ---------- */
function renderTop(){
  const L = lvl(S.xp);
  $('#lvlpill').innerHTML = `${sun({size:20, seed:7, n:9})} Levvel ${L.n} · ${num(S.xp)} XP`;
  $('#who').innerHTML = Sync.live
    ? `<button class="av on" style="--c:${M[S.me].c}" data-act="members" aria-label="Ver a ${M[S.me].name} y la banda" title="${M[S.me].name}">${M[S.me].emoji}</button>`
    : IDS.map(id => `<button class="av ${S.me===id?'on':''}" style="--c:${M[id].c}" data-act="me" data-id="${id}" aria-pressed="${S.me===id}" aria-label="Soy ${M[id].name}" title="${M[id].name}">${M[id].emoji}</button>`).join('');
  const items = [['hoy','Hoy'],['agenda','Calendario'],['misiones','Quests'],['caja','Caja']];
  $('#nav').innerHTML = items.map(([v,l]) => `<button class="${S.ui.view===v?'on':''} ${TOUR && HELP[TOUR.i][0]===v ? 'tour-on' : ''}" data-act="nav" data-v="${v}" ${S.ui.view===v?'aria-current="page"':''}>${ICON[v]}<span>${l}</span></button>`).join('') + `<p class="nav-brand">Central do Maldad${Sync.live ? '' : ' · demo'}</p>`;
  const pt = (r, a) => `${(Math.cos(a)*r).toFixed(1)} ${(Math.sin(a)*r).toFixed(1)}`;
  let rays = ''; for(let i=0;i<10;i++){ const a = i/10*Math.PI*2 - Math.PI/2; rays += `M${pt(19,a-.17)}L${pt(i%2 ? 41 : 48,a)}L${pt(19,a+.17)}Z`; }
  $('#fab').innerHTML = `<svg viewBox="-50 -50 100 100" aria-hidden="true"><path d="${rays}" fill="#f2426a"/><circle r="23" fill="#f2426a"/><path d="M-10 0H10M0-10V10" stroke="#160f1a" stroke-width="5.5" stroke-linecap="round"/></svg>`;
}

/* ---------- HOY ---------- */
function renderHoy(){
  const L = lvl(S.xp), B = boss(), show = showEv();
  const mine = S.tasks.filter(t => !t.done && (t.who===S.me || t.who==='all')).sort(byDue).slice(0,3);
  let week = upcoming().filter(e => dd(e.date) <= 7), wkTitle = 'Esta semana';
  if(!week.length){ week = upcoming().slice(0,2); wkTitle = 'Lo que viene'; }
  week = week.slice(0,4);
  const ask = week.find(e => !['deadline','lanz'].includes(e.type));
  const lit = IDS.filter(i => S.suns[i]).length, myLit = S.suns[S.me];
  const lg = S.movs.length ? ledger() : null, owed = lg ? settlePlan(lg.bal).length : 0;
  return `<div class="hoy">
    ${Sync.live ? '' : `<div class="proto o0"><b>DEMO</b><span>Lo que hagas queda solo en este celu. Cualquier cosa se deshace.</span> <button class="link" data-act="info">Qué es esto</button></div>`}
    <div class="col-a">
      <button class="showstrip o1" data-act="event" data-id="${show.id}" aria-label="Ver el tercer show">
        <span class="ss-count"><b data-days>–</b><small data-unit>días</small></span>
        <span class="ss-body"><span class="kicker">${fmtShort(show.date).toUpperCase()} · ${(show.time || '').replace(':00', '')} HS · ${esc((show.place || '').split(',')[0].toUpperCase())}</span>
          <span class="ss-title">El tercer y último show</span>
          <span class="ss-boss"><span class="hp"><i style="width:${(B.pct*100).toFixed(1)}%"></i></span><span>Boss ${B.done}/${B.n}</span></span></span>
        ${ICON.next}
      </button>
      <section class="card o2">
        <div class="r-head"><h2 class="h">${wkTitle}</h2><button class="more-link" data-act="nav" data-v="agenda">Ver calendario</button></div>
        ${week.length ? `<ul class="evlist">${week.map(e => e===ask ? askRow(e) : evRow(e)).join('')}</ul>` : '<p class="empty">No hay nada agendado.</p>'}
      </section>
    </div>
    <div class="col-b">
      <section class="card o3">
        <div class="r-head"><h2 class="h">Tus quests</h2><button class="more-link" data-act="nav" data-v="misiones" data-mis="todo">Ver todas</button></div>
        ${mine.length ? `<ul class="tasks">${mine.map(taskRow).join('')}</ul>` : `<p class="empty">No tenés nada pendiente. Fijate si alguien necesita una mano en <button class="link" data-act="nav" data-v="misiones" data-mis="todo">Quests</button>.</p>`}
      </section>
      <section class="card cajamini o4">
        <button class="cm-main" data-act="nav" data-v="caja"><span class="eyebrow">Caja común</span><span class="cm-money">${lg ? money(lg.caja) : '—'}</span>
          <span class="tiny">${!lg ? 'Todavía no hay movimientos' : owed ? `${owed} ${owed===1?'cuenta':'cuentas'} para saldar` : 'Caja en orden'}</span>
          ${lg && Math.abs(lg.bal[S.me]) > 1.5 ? `<span class="tiny cm-me">${lg.bal[S.me] > 0 ? `Tenés ${money(lg.bal[S.me])} a favor` : `Ponés ${money(-lg.bal[S.me])}`}</span>` : ''}</button>
        <div class="cm-btns"><button class="btn sm" data-act="new-mov" data-k="gasto">+ Gasto</button><button class="btn ghost sm" data-act="new-mov" data-k="ingreso">+ Ingreso</button></div>
      </section>
      <section class="card gameline o5">
        <button class="gl-lvl" data-act="nav" data-v="banda" aria-label="Ver el Levvel de la banda">
          <span class="lvl-badge">${sun({size:44, seed:7, n:10})}<span>${L.n}</span></span>
          <span class="gl-body"><b>${esc(L.name)}</b><span class="xpbar"><i style="width:${(L.pct*100).toFixed(1)}%"></i></span>
            <span class="tiny">${S.lives}/${MAXL} vvidas · ${num(S.xp-L.from)}/${num(L.to-L.from)} XP</span></span>
        </button>
        <div class="soles-wrap"><div class="soles">${IDS.map(i => solHTML(i)).join('')}</div>
          <p class="tiny gl-hint">${lit===3 ? '¡Triple sol! Los tres encendieron el suyo.' : myLit ? `Soles de hoy: ${lit} de 3. Con los tres, triple sol: +15 XP.` : 'Tocá tu sol para encenderlo: +5 XP. Con los tres, triple sol.'}</p></div>
      </section>
    </div>
  </div>`;
}
/* Soles del día: apagado es un carbón; encendido brilla y gira despacio */
let JUST_LIT = null;
function solHTML(i){
  const lit = S.suns[i], mine = i===S.me, cls = `sol ${lit ? 'on' : ''} ${mine ? 'mine' : ''} ${JUST_LIT===i ? 'just' : ''}`;
  const inner = `${sun({size:46, seed:hash(i)%50, n:9, cls:lit ? 'lit' : 'coal'})}<span class="sol-n">${M[i].emoji} ${M[i].name}</span>`;
  return mine && !lit
    ? `<button class="${cls}" data-act="sun" data-id="${i}" aria-label="Encender tu sol de hoy">${inner}</button>`
    : `<span class="${cls}" role="img" aria-label="Sol de ${M[i].name}: ${lit ? 'encendido' : 'apagado'}">${inner}</span>`;
}
function askRow(e){
  return `<li class="ev-ask">${evBtn(e)}<div class="ask-row">${Object.keys(RS).map(k => `<button class="pill ${e.rsvp?.[S.me]===k?'on':''}" data-act="rsvp" data-id="${e.id}" data-k="${k}" aria-pressed="${e.rsvp?.[S.me]===k}">${RS[k]}</button>`).join('')}</div></li>`;
}
function statusHTML(L, cls='', size=84){
  const wc = weekCount();
  return `<section class="card status ${cls}">
    <div class="lvl-badge">${sun({size, seed:7, n:10})}<span>${L.n}</span></div>
    <div><div class="eyebrow">Levvel de la banda</div><div class="lvl-name">${esc(L.name)}</div>
      <div class="xpbar" role="progressbar" aria-valuemin="0" aria-valuemax="${L.to-L.from}" aria-valuenow="${S.xp-L.from}"><i style="width:${(L.pct*100).toFixed(1)}%"></i></div>
      <div class="tiny"><b>${num(S.xp-L.from)}</b> / ${num(L.to-L.from)} XP para «${esc(L.next || 'el infinito')}»</div></div>
    <div class="meters">
      <div class="meter"><div class="m-lab">${MAXL} vvidas</div><div class="cats" aria-label="${S.lives} de ${MAXL} vvidas">${LIVES.map((k,i) => catSVG(k, i < S.lives)).join('')}</div><div class="tiny" style="margin-top:6px">${S.lives}/${MAXL} · vuelven cada lunes. Las que queden el domingo suman +10 XP cada una.</div></div>
      <div class="meter"><div class="m-lab">Racha</div><div class="m-val">${S.streak ? `${S.streak} <small>${S.streak===1?'semana':'semanas'} en movimiento</small>` : 'Primera <small>semana</small>'}</div><div class="wk"><i style="width:${Math.min(1, wc/3)*100}%"></i></div><div class="tiny">${wc>=3 ? 'Semana asegurada' : `${wc}/3 quests esta semana`}</div></div>
    </div>
  </section>`;
}
function taskRow(t){
  return `<li class="task ${t.done?'done':''}">
    <button class="check" data-act="complete" data-id="${t.id}" aria-label="${t.done?'Volver a pendiente':'Marcar hecha'}: ${esc(t.title)}">${ICON.check}</button>
    <button class="t-main" data-act="task" data-id="${t.id}"><span class="t-title">${esc(t.title)}</span>
      <span class="t-meta">${whoChip(t.who)}<span class="due ${t.done?'':dueCls(t.due)}">${t.done?'hecha':dueTxt(t.due)}</span>${t.boss?'<span class="chip boss">Boss 19/12</span>':''}</span></button>
    <span class="xp">+${t.xp}<span class="xp-s">XP</span></span>
  </li>`;
}
function evRow(e){ return `<li>${evBtn(e)}</li>`; }
function evBtn(e){
  const d = pd(e.date), T = ET[e.type];
  return `<button class="ev" data-act="event" data-id="${e.id}" style="--tc:${T.c}">
    <span class="ev-date"><b>${d.getDate()}</b><small>${DOW[d.getDay()]}</small></span>
    <span class="ev-body"><span class="ev-type">${T.label}${e.time?` · ${e.time} hs`:''}</span><span class="ev-title">${esc(e.title)}</span>${e.notes?.length ? `<span class="ev-notes">${e.notes.length} ${e.notes.length===1?'nota':'notas'} · ${e.notes.map(n => M[n.who].emoji).join(' ')}</span>` : ''}</span>
    <span class="ev-when">${dueTxt(e.date)}</span></button>`;
}
function feedRow(f){
  const band = f.who==='band';
  return `<li class="fi"><span class="fi-av" style="--c:${band?'var(--ember)':M[f.who].c}">${band ? sun({size:22, seed:9}) : M[f.who].emoji}</span>
    <div><p><b>${band?'La banda':M[f.who].name}</b> ${esc(f.text)}${f.xp?` <span class="fi-xp">+${f.xp} XP</span>`:''}</p><span class="tiny">${rel(f.at)}</span></div>
    <button class="cheer ${f.cheers.includes(S.me)?'on':''}" data-act="cheer" data-id="${f.id}" aria-pressed="${f.cheers.includes(S.me)}" aria-label="Aplaudir">🤘<span>${f.cheers.length||''}</span></button></li>`;
}

/* ---------- AGENDA ---------- */
function renderAgenda(){
  const y = S.ui.calY, m = S.ui.calM, first = new Date(y, m, 1), off = (first.getDay()+6)%7, days = new Date(y, m+1, 0).getDate();
  const cells = Math.ceil((off+days)/7)*7, today = isoDay(new Date());
  let grid = ['L','M','M','J','V','S','D'].map(d => `<div class="dow" aria-hidden="true">${d}</div>`).join('');
  for(let i=0;i<cells;i++){
    const d = new Date(y, m, 1-off+i), iso = isoDay(d), evs = S.events.filter(e => e.date===iso);
    const isShow = evs.some(e => e.type==='show');
    grid += `<button class="day ${d.getMonth()!==m?'out':''} ${iso===today?'today':''} ${iso===S.ui.calSel?'sel':''} ${isShow?'showday':''}" data-act="cal-day" data-d="${iso}" aria-label="${d.getDate()} de ${MONL[d.getMonth()]}${evs.length?`, ${evs.length} eventos`:''}"><span class="dn">${d.getDate()}</span><span class="dots">${evs.slice(0,3).map(e => `<i class="dot" style="--tc:${ET[e.type].c}"></i>`).join('')}</span>${isShow ? sun({size:14, seed:5}) : ''}</button>`;
  }
  const sel = S.events.filter(e => e.date===S.ui.calSel).sort((a,b) => (a.time||'').localeCompare(b.time||''));
  const selD = pd(S.ui.calSel);
  return `<div class="agenda">
    <section class="card">
      <div class="cal-head"><button class="icon-btn" data-act="cal-move" data-d="-1" aria-label="Mes anterior">${ICON.prev}</button><h1 class="h">${MONL[m][0].toUpperCase()+MONL[m].slice(1)} ${y}</h1><button class="icon-btn" data-act="cal-move" data-d="1" aria-label="Mes siguiente">${ICON.next}</button></div>
      <div class="cal">${grid}</div>
      <div class="legend">${Object.values(ET).map(t => `<span><i style="--tc:${t.c}"></i>${t.label}</span>`).join('')}</div>
    </section>
    <div class="stack">
      <section class="card">
        <div class="cal-head"><h2 class="h">${DOWL[selD.getDay()]} ${selD.getDate()} de ${MONL[selD.getMonth()]}</h2><button class="btn sm" data-act="new-event">+ Evento</button></div>
        ${sel.length ? `<ul class="evlist">${sel.map(evRow).join('')}</ul>` : `<p class="empty">Nada ese día.</p>`}
      </section>
      <section class="card"><h2 class="h">Lo que viene</h2><ul class="evlist">${upcoming().slice(0,8).map(evRow).join('')}</ul>
      <p class="tiny" style="margin-top:10px">Pronto: se sincroniza con el calendar de Evvil, así lo ven también en el Google Calendar de cada uno.</p></section>
    </div>
  </div>`;
}

/* ---------- MISIONES ---------- */
const MIS_TABS = [['todo','Por hacer'],['hechas','Hechas'],['singles','Singles'],['convocatorias','Convocatorias']];
function renderMisiones(){
  if(!MIS_TABS.some(([k]) => k===S.ui.mis)) S.ui.mis = 'todo';
  let body = '';
  const w = S.ui.misWho, onlyBoss = !!S.ui.misBoss, B = boss();
  const filt = list => list.filter(t => (w==='all' || t.who===w || t.who==='all') && (!onlyBoss || t.boss));
  const filters = `<div class="filters">${[['all','Todos'],...IDS.map(i => [i, `${M[i].emoji} ${M[i].name}`])].map(([k,l]) => `<button class="fchip ${w===k?'on':''}" data-act="mis-who" data-k="${k}">${l}</button>`).join('')}<button class="fchip boss ${onlyBoss?'on':''}" data-act="mis-boss" aria-pressed="${onlyBoss}">Boss 19/12</button></div>`;
  const bossTop = onlyBoss
    ? `<section class="card bosscard"><div>${bossSVG(B.pct)}</div><div style="min-width:0"><div class="eyebrow">Final Boss 2026 · sáb 19 dic</div><h2 class="h">La promo del tercer show</h2>
      <div class="hp big"><i style="width:${(B.pct*100).toFixed(1)}%"></i></div>
      <p class="tiny" style="margin-top:8px">Le quedan <b style="color:var(--bone)">${B.left}</b> de ${B.tot} HP. Cada quest cerrada le pega. Si lo derrotan antes del show, la banda gana 300 XP.</p></div></section>`
    : `<button class="bossbar" data-act="mis-boss"><span class="bm-top"><span>Final Boss 2026: la promo del show</span><span>${B.done}/${B.n} quests</span></span><span class="hp"><i style="width:${(B.pct*100).toFixed(1)}%"></i></span></button>`;
  const grp = (title, list) => list.length ? `<h2 class="grp">${title} <span>${list.length}</span></h2><ul class="tasks">${list.map(taskRow).join('')}</ul>` : '';
  if(S.ui.mis==='todo'){
    const p = filt(S.tasks.filter(t => !t.done)).sort(byDue);
    body = `${bossTop}<section class="card">${filters}${p.length ? grp('Esta semana', p.filter(t => dd(t.due) <= 7)) + grp('Más adelante', p.filter(t => dd(t.due) > 7)) : '<p class="empty">Nada pendiente acá.</p>'}</section>`;
  } else if(S.ui.mis==='hechas'){
    const d = filt(S.tasks.filter(t => t.done)).sort((a,b) => b.due.localeCompare(a.due));
    body = `<section class="card">${filters}${d.length ? `<ul class="tasks">${d.map(taskRow).join('')}</ul>` : '<p class="empty">Todavía ninguna.</p>'}</section>`;
  } else if(S.ui.mis==='singles'){
    const main = S.songs.filter(s => s.note), lata = S.songs.filter(s => !s.note);
    body = `<div class="songs">${main.map(songCard).join('')}</div>
      <section class="card" style="margin-top:16px"><h2 class="h">En lo de Fer <span class="h-sub">${lata.length} temas grabados que Fer le tiene que pasar a Fraxu</span></h2><div class="lata">${lata.map(s => `<span>${esc(s.name)}</span>`).join('')}</div></section>`;
  } else {
    body = `<section class="card radar"><svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="32" cy="32" r="28" opacity=".35"/><circle cx="32" cy="32" r="18" opacity=".55"/><circle cx="32" cy="32" r="8"/><path d="M32 32 52 14" stroke-width="3" stroke-linecap="round"/><circle cx="45" cy="22" r="3" fill="currentColor"/><circle cx="20" cy="42" r="2.5" fill="currentColor" opacity=".7"/></svg>
      <div><h2 class="h" style="margin-bottom:6px">Radar de convocatorias</h2><p>Cada semana Claude busca fondos, festivales, concursos y ciclos abiertos y los carga acá con su fecha de cierre. Los pasos se pueden mover para adelante y para atrás.</p></div></section>
      <div class="calls" style="margin-top:16px">${S.calls.slice().sort((a,b) => (a.close||'9999').localeCompare(b.close||'9999')).map(callCard).join('') || '<p class="empty">No hay convocatorias cargadas.</p>'}</div>`;
  }
  return `<div class="mis-top"><h1 class="h">Quests</h1><button class="btn sm" data-act="new-task">+ Nueva quest</button></div>
    <div class="tabs" role="tablist">${MIS_TABS.map(([k,l]) => `<button class="tab ${S.ui.mis===k?'on':''}" role="tab" aria-selected="${S.ui.mis===k}" data-act="mis-tab" data-k="${k}">${l}</button>`).join('')}</div>${body}`;
}
function bossSVG(pct){
  const eye = (cx) => { let r = ''; for(let i=0;i<9;i++){ const a = i/9*Math.PI*2; r += `<line x1="${(cx+Math.cos(a)*8).toFixed(1)}" y1="${(-6+Math.sin(a)*6).toFixed(1)}" x2="${(cx+Math.cos(a)*12.5).toFixed(1)}" y2="${(-6+Math.sin(a)*10).toFixed(1)}" stroke="#ffc2d0" stroke-width="1.6" stroke-linecap="round"/>`; } return r + `<ellipse cx="${cx}" cy="-6" rx="7" ry="4.6" fill="#fff"/><circle cx="${cx}" cy="-6" r="2.4" fill="#1a0510"/>`; };
  const sc = (.72 + .28*pct).toFixed(3);
  return `<svg class="boss-svg" viewBox="-60 -60 120 120" style="transform:scale(${sc})" aria-hidden="true"><g style="color:#a8102f"><path d="${sunPath(77, 11, 28, 59)}" fill="currentColor"/><circle r="32" fill="currentColor"/></g>${eye(-13)}${eye(13)}<path d="M-13 15l6-5 7 5 7-5 6 5" stroke="#1a0510" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}
function songCard(s){
  const ts = S.tasks.filter(t => t.song===s.id && !t.done).sort(byDue);
  return `<article class="song ${s.hot?'hot':''}">
    <div class="song-head"><h3 class="song-name">${esc(s.name)}</h3><span class="chip" style="${s.stage===6?'background:var(--ember);color:#1a0510':''}">${STAGES[s.stage]}</span></div>
    <ol class="stages" aria-label="Etapa: ${STAGES[s.stage]}">${STAGES.map((st,i) => `<li class="${i<s.stage?'past':i===s.stage?'cur':''}"><span class="bar"></span><span class="sl">${st}</span></li>`).join('')}</ol>
    <p class="song-note">${esc(s.note)}</p>
    ${ts.length ? `<ul class="mini-tasks">${ts.map(t => `<li>${t.who==='all'?'👥':M[t.who].emoji} <b>${esc(t.title)}</b> · ${dueTxt(t.due)}</li>`).join('')}</ul>` : ''}
    <div class="row" style="gap:12px">${s.stage < 6 ? `<button class="btn ghost sm" data-act="advance" data-id="${s.id}">Pasar a ${STAGES[s.stage+1]} · +${s.stage===5?150:80} XP</button>` : ''}${s.stage > 0 ? `<button class="mini-link" data-act="stage-back" data-id="${s.id}">← Volver a ${STAGES[s.stage-1]}</button>` : ''}</div>
  </article>`;
}
function callCard(k){
  return `<article class="call"><div class="call-top"><div><div class="row"><span class="chip">${esc(k.type)}</span>${k.scope?`<span class="chip">${esc(k.scope)}</span>`:''}${k.ex?'<span class="chip ex">Ejemplo</span>':''}</div><h3>${esc(k.name)}</h3></div><span class="due ${k.close?dueCls(k.close):''}" style="font-size:12.5px;white-space:nowrap">${k.close ? `cierra ${dueTxt(k.close)}` : 'sin fecha'}</span></div>
    ${k.desc ? `<p class="tiny" style="margin:0;color:var(--bone)">${esc(k.desc)}</p>` : ''}
    <div class="steps">${CALL_ST.map((st,i) => `<span class="${i<k.status?'past':i===k.status?'cur':''}">${st}</span>`).join('')}</div>
    <div class="row" style="justify-content:space-between;gap:8px"><span class="tiny">${whoChip(k.who)}${k.hint?` · ${esc(k.hint)}`:''}</span><span class="row" style="gap:6px">${k.status>0?`<button class="btn ghost sm" data-act="call-prev" data-id="${k.id}">← ${CALL_ST[k.status-1]}</button>`:''}${k.status<3?`<button class="btn ghost sm" data-act="call-next" data-id="${k.id}">${CALL_ST[k.status+1]} →</button>`:''}</span></div>
    <div class="row" style="justify-content:space-between">${k.url?`<a class="mini-link" href="${esc(k.url)}" target="_blank" rel="noopener">Ver bases</a>`:'<span></span>'}<button class="mini-link" data-act="call-del" data-id="${k.id}">Descartar</button></div></article>`;
}

/* ---------- CAJA ---------- */
function ledger(){
  const bal = {jero:0, mica:0, fran:0}; let caja = 0, ing = 0, gasCaja = 0;
  for(const x of S.movs){
    if(x.k==='gasto'){ if(x.by==='caja'){ caja -= x.amt; gasCaja += x.amt; } else { const sp = splitOf(x); bal[x.by] += x.amt; sp.forEach(i => bal[i] -= x.amt/sp.length); } }
    else if(x.k==='ingreso'){ caja += x.amt; ing += x.amt; }
    else if(x.k==='pago'){ bal[x.from] += x.amt; bal[x.to] -= x.amt; }
  }
  return {bal, caja, ing, gasCaja};
}
// Entre quiénes se divide un gasto: los tres, salvo que diga otra cosa (ej: lo que le debe uno solo).
const splitOf = x => x.split && x.split.length ? x.split : IDS;
function settlePlan(bal){
  const cr = IDS.filter(i => bal[i] > 1.5).map(i => ({i, v:bal[i]})).sort((a,b) => b.v-a.v);
  const db = IDS.filter(i => bal[i] < -1.5).map(i => ({i, v:-bal[i]})).sort((a,b) => b.v-a.v);
  const out = []; let a = 0, b = 0;
  while(a < db.length && b < cr.length){ const m = Math.min(db[a].v, cr[b].v); out.push({from:db[a].i, to:cr[b].i, amt:m}); db[a].v -= m; cr[b].v -= m; if(db[a].v < 1.5) a++; if(cr[b].v < 1.5) b++; }
  return out;
}
function renderCaja(){
  if(!S.movs.length) return `<div class="caja">
    <section class="card cajabox"><div class="eyebrow">Caja común</div><div class="big-money">—</div>
      <div class="tiny">Todavía no hay movimientos. Anotá el primer gasto o ingreso y aparecen la caja y lo que tiene a favor cada uno.</div>
      <div class="row"><button class="btn" data-act="new-mov" data-k="gasto">+ Gasto</button><button class="btn ghost" data-act="new-mov" data-k="ingreso">+ Ingreso</button></div></section>
    <section class="card"><h2 class="h">Cómo funciona</h2><p class="tiny">Cada gasto se divide en partes iguales (los tres, si no se aclara) y los ingresos entran a la caja común. Lo personal (palillos, cuerdas) no se carga. La app dice quién le pasa plata a quién para quedar a mano. Anotar un movimiento suma 10 XP, sin importar el monto.</p></section>
  </div>`;
  const {bal, caja, ing, gasCaja} = ledger(), plan = settlePlan(bal), f = S.ui.movF;
  const movs = S.movs.filter(x => f==='todo' || (f==='gastos' && x.k==='gasto') || (f==='ingresos' && x.k==='ingreso')).slice().sort((a,b) => b.date.localeCompare(a.date));
  return `<div class="caja">
    <section class="card cajabox"><div class="eyebrow">Caja común</div><div class="big-money">${money(caja)}</div>
      <div class="tiny">Entró ${money(ing)} · se pagó ${money(gasCaja)} con la caja</div>
      <div class="row"><button class="btn" data-act="new-mov" data-k="gasto">+ Gasto</button><button class="btn ghost" data-act="new-mov" data-k="ingreso">+ Ingreso</button></div></section>
    <section class="card"><h2 class="h">Cuentas entre ustedes</h2>
      ${plan.length ? plan.map(p => `<div class="debt"><span class="pair">${M[p.from].emoji}→${M[p.to].emoji}</span><p>${M[p.from].name} le pasa a ${M[p.to].name}<br><span class="money">${money(p.amt)}</span></p><button class="btn sm" data-act="settle" data-from="${p.from}" data-to="${p.to}">Saldar</button></div>`).join('') : `<div class="allgood">${sun({size:40, seed:12})}<div><b>Caja en orden.</b><div class="tiny">Nadie le debe nada a nadie.</div></div></div>`}
      <div class="split">${IDS.map(i => `<div class="sp"><span class="e">${M[i].emoji}</span><span>${M[i].name}</span><b class="money ${bal[i] >= -1.5 ? 'pos' : 'neg'}">${bal[i] >= 0 ? '+' : '−'}${money(Math.abs(bal[i]))}</b></div>`).join('')}</div>
      <p class="tiny">Cada gasto se divide en partes iguales entre los que lo comparten: los tres, si no se aclara. Lo personal (palillos, cuerdas) no se carga. Anotar un movimiento suma 10 XP, sin importar el monto.</p></section>
    <section class="card movs"><h2 class="h">Movimientos</h2>
      <div class="filters">${[['todo','Todo'],['gastos','Gastos'],['ingresos','Ingresos']].map(([k,l]) => `<button class="fchip ${f===k?'on':''}" data-act="mov-f" data-k="${k}">${l}</button>`).join('')}</div>
      <div>${movs.map(movRow).join('') || '<p class="empty">Nada por acá.</p>'}</div>
      <p class="tiny" style="margin-top:8px">Tocá un movimiento para borrarlo.</p></section>
  </div>`;
}
function movRow(x){
  const ic = x.k==='gasto' ? ['g','−'] : x.k==='ingreso' ? ['i','+'] : ['p','⇄'];
  const sp = splitOf(x), sub = x.k==='gasto' ? (x.by==='caja' ? 'pagó la caja' : `pagó ${M[x.by].emoji} ${M[x.by].name} · ${sp.length===1 ? `lo debe ${M[sp[0]].name}` : sp.length===3 ? `${money(x.amt/3)} c/u` : `${money(x.amt/sp.length)} c/u, ${sp.map(i => M[i].name).join(' y ')}`}`) : x.k==='ingreso' ? 'entró a la caja' : `${M[x.from].name} le pasó a ${M[x.to].name}`;
  return `<button class="mov" data-act="mov" data-id="${x.id}"><span class="mov-ic ${ic[0]}">${ic[1]}</span><span style="min-width:0;display:block"><span class="mov-c">${esc(x.concept)}</span><span class="tiny">${fmtShort(x.date)} · ${sub}</span></span><b class="money ${x.k==='ingreso'?'pos':''}">${x.k==='gasto'?'−':x.k==='ingreso'?'+':''}${money(x.amt)}</b></button>`;
}

/* ---------- BANDA ---------- */
function renderBanda(){
  const L = lvl(S.xp), on = ACH.filter(a => S.ach[a.id]).length;
  const hist = [
    ['Ene 2024','Fran crea el grupo: arranca Evil Formica','img/evil_formica.webp','logo'],
    ['21 mar 2025','Con Colapso y Ortiba en Casa Únclan, como Evil Formica','img/flyer_colapso.jpg'],
    ['Jun 2025','«Somos eVVil»: nueva banda, viejas canciones'],
    ['5 jul 2025','Festival Mugre o Muerte vol. 22 · Fábrica Cita, como Evvil (ex Fórmica)','img/flyer_mugre.jpg'],
    ['25 oct 2025','Ciudad de Gatos, con Mister y Los Misterios','img/flyer_mister.jpg'],['Dic 2025','Grabamos 11 temas en lo de Ferna'],
    ['21 feb 2026','Ciclo Un Verano en Guajira, con Ortiba y No Me Toques','img/flyer_verano.jpg'],
    ['Abr 2026','Arrancan mezclas y voces en lo de Fraxu'],['16 may 2026','El primer show de Evvil · Pura Vida, con Poderes Extraños','img/flyer_pura.jpg'],
    ['14 jun 2026','Con Bloques Irreconciliables · Pura Vida','img/flyer_bi.jpg'],['17 jul 2026','Mundial de bandas · Ciudad de Gatos'],
    ['7 ago 2026','Sale «Los Chicos»','img/tapa_loschicos.jpg'],['14 ago 2026','Tocamos en vivo en un stream'],
    ['15 ago 2026','El segundo show de Evvil · Guajira, con Morfar','img/flyer_morfar.jpg'],
    ['17 oct 2026','Espantoctubre x Batalla de Videos'],['28 oct 2026','Master de «Los Papás»'],['Oct 2026','Arranca la Central do Maldad · levvel 0'],
  ];
  return `<div class="banda">
    ${statusHTML(L, 'lvlcard wide', 120)}
    ${albumHTML(L)}
    <section class="card wide gamecard"><div><h2 class="h">Aplastá solcitos</h2><p class="tiny" style="margin:2px 0 0">Pasatiempo: no da XP, pero cuenta para los achievvilments. La banda ya aplastó <b style="color:var(--bone)">${num(sumStat('squash'))}</b>. Tu récord: <b style="color:var(--bone)">${num((S.stats[S.me]||{}).best || 0)}</b>.</p></div><button class="btn" data-act="game">Jugar</button></section>
    <section class="card wide"><div class="r-head"><h2 class="h">Achievvilments <span class="h-sub">${on} de ${ACH.length} unlocked</span></h2><button class="mini-link" data-act="ach-all">${ARISTAS.every(a => S.ui.achOpen[a.id]) ? 'Cerrar todo' : 'Abrir todo'}</button></div>
      <p class="tiny" style="margin:-4px 0 12px">Algunos se desbloquean solos y otros los marca cualquiera de los tres. Las métricas de redes aparecen solo cuando cruzan un hito, nunca como meta.</p>
      <div class="achs">${ARISTAS.map(achCatHTML).join('')}</div></section>
    <section class="card"><h2 class="h">En la banda</h2>${S.feed.length ? `<ul class="feed">${S.feed.slice(0,8).map(feedRow).join('')}</ul>` : '<p class="empty">Todavía no pasó nada.</p>'}</section>
    <section class="card"><h2 class="h">Evvolución</h2><ol class="timeline">${hist.map(([w,t,img,kind]) => `<li><div class="tw">${w}</div><div class="tt">${t}</div>${img ? `<button class="tl-img ${kind || ''}" data-act="img" data-src="${img}" aria-label="Ver imagen: ${esc(t)}"><img src="${img}" alt="" loading="lazy"></button>` : ''}</li>`).join('')}
      <li class="now"><div class="tw">Hoy</div><div class="tt">Levvel ${L.n} · ${esc(L.name)}</div></li>
      <li class="fut"><div class="tw">19 dic 2026</div><div class="tt">El tercer y último show de Evvil</div></li></ol>
      <p class="tiny" style="margin-top:12px">Armada con la carpeta, la gacetilla y los chats de Evvil.</p></section>
    <section class="card bio"><h2 class="h">Bioevvil</h2>
      <p class="bio-t">Nacida en La Plata, Evvil es una banda de <b>METAL simpático</b>, apta para todo público. Cortes intrincados, apretadas armonías vocales, ominosos solos de guitarra y machaques rabiosos para sacudir la cabellera conviven en un universo que no se ata a una sola forma de entender el género.</p>
      <p class="bio-t">Arrancó con ganas de profundizar en el metal, pero se deja distraer por lo que el corazón y la oreja le piden: toca lo que le suena en las tripas.</p>
      <div class="members">${IDS.map(i => `<div class="mem" style="--c:${M[i].c}"><div class="mem-av"><img src="img/${i}.webp" alt="${M[i].name}"></div>
      <div style="min-width:0"><b>${M[i].name}</b> <span class="al">${M[i].alias}</span><div class="tiny">${M[i].role}</div><div class="tiny mem-sup">${M[i].sup}</div><div class="tiny">${M[i].says.map(s => `«${esc(s)}»`).join(' ')}</div><div class="tiny" style="color:var(--bone);margin-top:3px">Esta semana: ${weekCount(i)} ${weekCount(i)===1?'quest':'quests'} · ${weekNotes(i)} ${weekNotes(i)===1?'nota':'notas'} · sol ${S.suns[i]?'encendido':'apagado'}</div></div></div>`).join('')}</div>
      <details class="creds"><summary>Créditos y contacto</summary><ul>
        <li><b>Grabación:</b> Fernando Aguilar (Ferna)</li><li><b>Guitarras de «Los Chicos»:</b> Luq Nacional (Salvadori)</li><li><b>Mezcla y voces:</b> Fraxu (Fran Labaqui)</li>
        <li><b>Master:</b> Fermín Irigoyen</li><li><b>Arte:</b> Dani (@danielaojoenblanco)</li><li><b>Videoclip:</b> Aaron Marshall</li><li><b>Mail:</b> evvil.lml@gmail.com</li></ul></details>
      <p class="tiny" style="margin-top:10px">Sin ranking: todo lo que hace cada uno suma al levvel de la banda.</p></section>
    <section class="card" id="avisos"><h2 class="h">Avisos al celu</h2>${pushCard()}
      <div class="pushes">${pushes().map(p => `<div class="push"><span class="push-ic">${sun({size:22, seed:9})}</span><div style="min-width:0"><div class="push-h"><span>Do Maldad</span><span>${p[0]}</span></div><p>${p[1]}</p></div></div>`).join('')}</div>
      <p class="tiny" style="margin-top:10px">Avisa cuando te cargan una quest, cuando alguien agenda algo o deja una nota, a las 10 si hay algo hoy o mañana, y los lunes con el parte para el grupo. Cada celu los activa una vez.</p></section>
    <section class="card"><h2 class="h">Parte para el grupo</h2><pre class="wa" id="wa-text">${esc(weeklyText())}</pre>
      <div class="row"><a class="btn" href="https://wa.me/?text=${encodeURIComponent(weeklyText())}" target="_blank" rel="noopener">Mandar por WhatsApp</a><button class="btn ghost" data-act="wa-copy">Copiar texto</button></div>
      <p class="tiny" style="margin-top:10px">Todos los lunes la app arma este parte. Un toque y lo mandás al grupo.</p></section>
    <section class="card wide"><div class="row" style="justify-content:space-between"><button class="link" data-act="info">Qué es la Central</button>${Sync.live ? `<span class="tiny">Este celu es de ${M[S.me].name} ${M[S.me].emoji} · <button class="mini-link" data-act="whoami">Cambiar</button></span>` : '<button class="btn ghost sm" data-act="reset" id="reset-btn">Reiniciar demo</button>'}</div></section>
  </div>`;
}
function albumHTML(L){
  const got = CARTAS.filter(n => n <= L.n).length;
  return `<section class="card wide album"><div class="r-head"><h2 class="h">Álbum Evvil <span class="h-sub">${got} de ${CARTAS.length} cartas</span></h2></div>
    <p class="tiny" style="margin:-4px 0 12px">Cada Levvel nuevo da vuelta una carta. Tocala para verla grande.</p>
    <div class="cartas">${CARTAS.map(n => n <= L.n
      ? `<button class="carta" data-act="img" data-src="img/cartas/carta${n}.webp" aria-label="Ver la carta ${n}"><img src="img/cartas/carta${n}-s.webp" alt="" loading="lazy"></button>`
      : `<button class="carta back" data-act="carta-lock" data-n="${n}" aria-label="Carta ${n}: se da vuelta en el Levvel ${n}">${sun({size:46, seed:n*7+3, n:9})}<span>Levvel ${n}</span></button>`).join('')}</div></section>`;
}
function achCatHTML(ar){
  const list = ACH.filter(a => a.ar===ar.id), on = list.filter(a => S.ach[a.id]).length, open = !!S.ui.achOpen[ar.id];
  return `<div class="ach-cat ${open?'open':''}"><button class="ach-h" data-act="ach-cat" data-k="${ar.id}" aria-expanded="${open}"><span class="ach-name">${ar.name}</span><span class="ach-prog"><i style="width:${(on/list.length*100).toFixed(0)}%"></i></span><span class="ach-n">${on}/${list.length}</span><span class="chev" aria-hidden="true">${ICON.next}</span></button>
    ${open ? `<div class="ach-grid">${list.map(a => { const on = S.ach[a.id], pv = a.prog && !on ? Math.min(PROG[a.prog](), a.goal) : null; return `<button class="badge ${on?'on':''}" data-act="ach" data-id="${a.id}"><span class="b-ic">${sun({size:38, seed:hash(a.id)%60, n:9})}<b>${a.ic}</b></span><span>${esc(a.name)}</span>${pv !== null && a.goal > 1 ? `<span class="b-prog"><i style="width:${(pv/a.goal*100).toFixed(0)}%"></i></span><span class="b-n">${num(pv)}/${num(a.goal)}</span>` : ''}</button>`; }).join('')}</div>` : ''}</div>`;
}
// Ejemplos de los avisos que manda la función «push» (los textos salen de lo que hay cargado).
function pushes(){
  const out = [], e1 = upcoming().find(e => !['deadline','lanz'].includes(e.type)), B = boss(), show = showEv();
  out.push(['lun 10:00', `Arranca la semana: faltan ${Math.max(0, dd(show.date))} días para el tercer show y al Final Boss le queda ${Math.round(B.pct*100)}% de HP. El parte está listo para el grupo.`]);
  if(e1) out.push(['10:00', `${dd(e1.date)===0 ? 'Hoy' : dd(e1.date)===1 ? 'Mañana' : 'El ' + fmtShort(e1.date)}${e1.time ? ` a las ${e1.time}` : ''}: ${e1.title}.`]);
  const other = IDS.find(i => i !== S.me), t = S.tasks.find(x => !x.done && (x.who===S.me || x.who==='all'));
  if(t) out.push(['ahora', `${M[other].name} te cargó una quest: «${t.title}», para el ${fmtShort(t.due)}.`]);
  const k = S.calls.filter(c => c.status<2 && c.close && dd(c.close) >= 0).sort((a,b) => a.close.localeCompare(b.close))[0]; if(k) out.push(['10:00', `«${k.name}» cierra ${dueTxt(k.close)}.`]);
  return out;
}
function pushCard(){
  const st = window.Push ? Push.state() : 'demo';
  const [msg, btn] = {
    demo:['En el modo demo no hay avisos.', ''],
    ios:['En iPhone, primero agregala a inicio (Compartir → «Agregar a inicio») y abrila desde ese ícono. Después los activás acá.', ''],
    nope:['Este navegador no puede recibir avisos. Probá desde la app instalada.', ''],
    denied:['Los avisos están bloqueados para la Central. Se destraban desde los ajustes del celu.', ''],
    on:['Los avisos llegan a este celu.', '<button class="mini-link" data-act="push-off">Apagarlos</button>'],
    off:['', '<button class="btn" data-act="push-on">Activar avisos en este celu</button>'],
    busy:['Activando…', ''],
  }[st];
  return `<div class="push-st ${st}">${msg ? `<p class="tiny">${msg}</p>` : ''}${btn}</div>`;
}
function parteSheet(){
  const txt = weeklyText();
  return `<div class="sh-head"><h2 class="sh-title">Parte de la semana</h2><p class="sh-sub">Uno de los tres lo manda al grupo de WhatsApp.</p></div>
    <pre class="wa" id="wa-text">${esc(txt)}</pre>
    <div class="row"><a class="btn" href="https://wa.me/?text=${encodeURIComponent(txt)}" target="_blank" rel="noopener">Mandar por WhatsApp</a><button class="btn ghost" data-act="wa-copy">Copiar texto</button></div>`;
}
function weeklyText(){
  const L = lvl(S.xp), B = boss(), show = showEv(), lim = isoDay(new Date(Date.now()+7*864e5));
  const wk = upcoming().filter(e => e.date <= lim);
  const nxt = IDS.map(i => { const t = S.tasks.filter(x => !x.done && x.who===i).sort(byDue)[0]; return t ? `${M[i].emoji} ${M[i].name}: ${t.title} (${dueTxt(t.due)})` : null; }).filter(Boolean);
  return [`✷ EVVIL · parte de la semana ✷`, ``,
    `Faltan ${Math.max(0, dd(show.date))} días para El tercer y último show (sáb 19/12, Pura Vida).`,
    `Levvel ${L.n} · ${L.name} (${num(S.xp-L.from)}/${num(L.to-L.from)} XP)`,
    `Al Final Boss 2026 le queda ${Math.round(B.pct*100)}% de HP.`, ``,
    `Esta semana:`, ...(wk.length ? wk.map(e => `• ${fmtShort(e.date)}: ${e.title}${e.time?` ${e.time} hs`:''}`) : ['• Sin eventos']), ``,
    `Lo próximo de cada uno:`, ...nxt, ``, `Entren a encender su sol ☀️`].join('\n');
}

/* ---------- sheets ---------- */
let sheetFn = null;
function openSheet(fn){ sheetFn = fn; const s = $('#sheet'); s.hidden = false; s.innerHTML = `<div class="sheet-panel" role="dialog" aria-modal="true"><button class="sh-close" data-act="close" aria-label="Cerrar">${ICON.close}</button><div id="sheet-body">${fn()}</div></div>`; sheetArt(); setTimeout(() => s.querySelector('input,textarea,.sh-close')?.focus(), 60); }
function refreshSheet(){ if(sheetFn && !$('#sheet').hidden){ $('#sheet-body').innerHTML = sheetFn(); sheetArt(); } }
function sheetArt(){ tick(); requestAnimationFrame(drawHero); }
function closeSheet(){ const s = $('#sheet'); s.hidden = true; s.innerHTML = ''; sheetFn = null; }
const RS = {voy:'Voy', tarde:'Llego tarde', no:'No puedo'};
function evSheet(id){
  const e = S.events.find(x => x.id===id); if(!e) return '<p class="empty">Ese evento ya no existe.</p>';
  const T = ET[e.type], d = pd(e.date, e.time), canGo = !['deadline','lanz'].includes(e.type);
  return `${e.id==='e16' ? `<section class="hero sh-hero" aria-label="Cuenta regresiva al tercer show">
      <canvas class="hero-art" aria-hidden="true"></canvas>
      <img class="hero-inst i-bajo" src="img/bajo.webp" alt="" aria-hidden="true"><img class="hero-inst i-bata" src="img/bata.webp" alt="" aria-hidden="true"><img class="hero-inst i-guit" src="img/guitarra.webp" alt="" aria-hidden="true">
      ${sun({size:118, seed:21, n:9, cls:'hero-sun'})}
      <div class="hero-in"><div class="kicker">Faltan</div><div class="count"><span class="num" data-days>–</span><span class="unit" data-unit>días</span><span class="clock" data-clock></span></div></div>
    </section>` : ''}<div class="sh-head" style="--tc:${T.c}"><div class="chips"><span class="chip type">${T.label}</span><span class="chip">${dueTxt(e.date)}</span></div><h2 class="sh-title">${esc(e.title)}</h2>
    <p class="sh-sub">${DOWL[d.getDay()]} ${d.getDate()} de ${MONL[d.getMonth()]}${e.time?` · ${e.time} hs`:''}${e.place?` · ${esc(e.place)}`:''}</p>${e.with?`<p class="sh-sub">Junto a ${esc(e.with)}</p>`:''}</div>
    ${canGo ? `<div class="sh-sec"><h3 class="sh-h">¿Vas?</h3><div class="pills">${Object.keys(RS).map(k => `<button class="pill ${e.rsvp?.[S.me]===k?'on':''}" data-act="rsvp" data-id="${e.id}" data-k="${k}" aria-pressed="${e.rsvp?.[S.me]===k}">${RS[k]}</button>`).join('')}</div>
      <div class="att">${IDS.map(i => `<span>${M[i].emoji} ${M[i].name}: <b>${e.rsvp?.[i] ? RS[e.rsvp[i]] : 'sin responder'}</b></span>`).join('')}</div></div>` : ''}
    <div class="sh-sec"><h3 class="sh-h">Notas</h3><div class="notes">${(e.notes||[]).map(noteHTML).join('') || '<p class="empty">Todavía no hay notas.</p>'}</div>
      <form class="note-form" data-form="note" data-id="${e.id}"><label class="sr" for="f-note">Nota de ${M[S.me].name}</label><textarea id="f-note" name="text" rows="2" maxlength="160" required placeholder="Nota de ${M[S.me].name}: llevo trípode, llego tarde…"></textarea><button class="btn sm" type="submit">Pegar nota · +3 XP</button></form></div>
    ${e.id!=='e16' ? `<div class="sh-sec"><button class="mini-link" data-act="ev-del" data-id="${e.id}">Borrar evento</button></div>` : ''}`;
}
function noteHTML(n){ const r = ((hash(n.text) % 50) / 10 - 2.5).toFixed(1); return `<figure class="note" style="--c:${M[n.who].c};--rot:${r}deg"><figcaption>Nota de ${M[n.who].name} ${M[n.who].emoji}</figcaption><blockquote>${esc(n.text)}</blockquote></figure>`; }
function taskSheet(id){
  const t = S.tasks.find(x => x.id===id); if(!t) return '<p class="empty">Esa quest ya no existe.</p>';
  const late = !t.done && dd(t.due) < 0, song = t.song && S.songs.find(s => s.id===t.song);
  return `<div class="sh-head"><div class="chips"><span class="chip">${CAT[t.cat]}</span>${t.boss?'<span class="chip boss">Boss 19/12</span>':''}${song?`<span class="chip">${esc(song.name)}</span>`:''}</div><h2 class="sh-title">${esc(t.title)}</h2>
    <p class="sh-sub">${whoChip(t.who)} · ${fmtShort(t.due)} (${t.done?'hecha':dueTxt(t.due)}) · <b>+${t.xp} XP</b>${t.by?` · la cargó ${M[t.by].name}`:''}</p></div>
    ${late ? `<div class="soft"><b>Se pasó la fecha.</b> ${lateThisWeek(t) ? 'Esta semana se fue una vvida, nada más. Si la cierran, vuelve. ' : ''}Si necesitan más tiempo, pidan prórroga: es gratis.</div>` : ''}
    <div class="row"><button class="btn" data-act="complete" data-id="${t.id}" data-close="1">${t.done?'Volver a pendiente':'Marcar hecha'}</button>${!t.done?`<button class="btn ghost" data-act="extend" data-id="${t.id}">Prórroga de 7 días</button>`:''}</div>
    <div class="row" style="margin-top:14px;gap:16px"><button class="mini-link" data-act="task-edit" data-id="${t.id}">Editar</button><button class="mini-link" data-act="task-del" data-id="${t.id}">Borrar</button></div>
    <p class="tiny" style="margin-top:12px">Pedir prórroga no quita vvidas. Una se pierde solo si la fecha pasa sin que nadie diga nada, y el lunes vuelven a 3.</p>`;
}
function plus(n){ return isoDay(new Date(Date.now() + n*864e5)); }
function nextDow(dow){ const d = new Date(); d.setDate(d.getDate() + (((dow - d.getDay() + 7) % 7) || 7)); return isoDay(d); }
function addSheet(){
  const it = (act, ic, t, d, k='') => `<button class="add-it" data-act="${act}" ${k?`data-k="${k}"`:''}><span class="ai-ic">${ic}</span><span><b>${t}</b><span class="tiny">${d}</span></span></button>`;
  return `<div class="sh-head"><h2 class="sh-title">¿Qué querés agregar?</h2></div>
  <div class="add-list">
    ${it('new-task','🎯','Quest','Algo que hay que hacer: quién y para cuándo. +5 XP')}
    ${it('new-event','📅','Evento','Algo con día y hora: miércoles, show, grabación, reunión.')}
    ${it('new-mov','💸','Gasto','Algo que se pagó. Se divide en partes iguales. +10 XP','gasto')}
    ${it('new-mov','💰','Ingreso','Plata que entró a la caja. +10 XP','ingreso')}
  </div>`;
}
function taskForm(id){
  const t = id ? S.tasks.find(x => x.id===id) : null;
  const when = [['Mañana', plus(1)], ['El miércoles', nextDow(3)], ['En una semana', plus(7)], ['Antes del show', '2026-12-18']];
  const due = t ? t.due : plus(7), who = t ? t.who : S.me, xp = t ? t.xp : 25;
  return `<div class="sh-head"><h2 class="sh-title">${t ? 'Editar quest' : 'Nueva quest'}</h2><p class="sh-sub">${t ? 'Cambiá lo que haga falta.' : 'Tres cosas y listo: qué, quién y para cuándo. Planificar suma +5 XP.'}</p></div>
  <form class="form" data-form="task" ${t ? `data-id="${t.id}"` : ''}>
    <label for="f-title">Qué hay que hacer<input type="text" id="f-title" name="title" required maxlength="80" placeholder="Ej: mandar a hacer stickers" value="${t ? esc(t.title) : ''}"></label>
    <fieldset><legend>Quién</legend><div class="opts">${[...IDS,'all'].map(i => `<label class="opt"><input type="radio" name="who" value="${i}" ${i===who?'checked':''}><span>${i==='all'?'👥 Todos':`${M[i].emoji} ${M[i].name}`}</span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Para cuándo</legend><div class="opts">${when.map(([l,d]) => `<label class="opt"><input type="radio" name="when" value="${d}" ${d===due?'checked':''}><span>${l}</span></label>`).join('')}</div>
      <input type="date" id="f-due" name="due" required value="${due}" aria-label="O elegí otro día"></fieldset>
    <details class="more-opts" ${t ? 'open' : ''}><summary>Más opciones</summary><div class="form-inner">
      <fieldset><legend>Tamaño</legend><div class="opts">${[[10,'Chica'],[25,'Mediana'],[60,'Grande']].map(([x,l]) => `<label class="opt"><input type="radio" name="xp" value="${x}" ${x===xp?'checked':''}><span>${l} · +${x} XP</span></label>`).join('')}</div></fieldset>
      <label for="f-cat">Tipo<select id="f-cat" name="cat">${Object.entries(CAT).map(([k,l]) => `<option value="${k}" ${t && t.cat===k ? 'selected' : ''}>${l}</option>`).join('')}</select></label>
      <label for="f-song">De qué tema<select id="f-song" name="song"><option value="">Ninguno</option>${S.songs.map(s => `<option value="${s.id}" ${t && t.song===s.id ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select></label>
      <label class="check-row" for="f-boss"><input type="checkbox" id="f-boss" name="boss" ${t && t.boss ? 'checked' : ''}> Le pega al Final Boss (19/12)</label>
    </div></details>
    <button class="btn" type="submit">${t ? 'Guardar' : 'Crear quest'}</button>
  </form>`;
}
function eventForm(){
  return `<div class="sh-head"><h2 class="sh-title">Nuevo evento</h2></div>
  <form class="form" data-form="event">
    <label for="f-etitle">Qué es<input type="text" id="f-etitle" name="title" required maxlength="70" placeholder="Ej: Ensayo con SPD nuevo"></label>
    <label for="f-etype">Tipo<select id="f-etype" name="type">${Object.entries(ET).map(([k,t]) => `<option value="${k}">${t.label}</option>`).join('')}</select></label>
    <div class="row" style="flex-wrap:nowrap"><label for="f-edate" style="flex:1">Día<input type="date" id="f-edate" name="date" required value="${S.ui.calSel}"></label><label for="f-etime" style="flex:1">Hora<input type="time" id="f-etime" name="time" value="17:00"></label></div>
    <label for="f-eplace">Dónde<input type="text" id="f-eplace" name="place" maxlength="60" placeholder="Sala, bar, casa de Fran…"></label>
    <button class="btn" type="submit">Agendar</button>
  </form>`;
}
function movForm(k){
  const g = k==='gasto';
  return `<div class="sh-head"><h2 class="sh-title">${g?'Nuevo gasto':'Nuevo ingreso'}</h2><p class="sh-sub">${g?'Se divide en partes iguales.':'Entra a la caja común.'} Anotarlo suma 10 XP.</p></div>
  <form class="form" data-form="mov" data-k="${k}">
    <label for="f-concept">Concepto<input type="text" id="f-concept" name="concept" required maxlength="60" placeholder="${g?'Ej: sala de ensayo, impresión de stickers':'Ej: venta de merch, cachet'}"></label>
    <label for="f-amt">Monto en pesos<input type="number" id="f-amt" name="amt" required min="1" step="1" inputmode="numeric" placeholder="0"></label>
    ${g ? `<fieldset><legend>Quién pagó</legend><div class="opts">${[...IDS,'caja'].map(i => `<label class="opt"><input type="radio" name="by" value="${i}" ${i===S.me?'checked':''}><span>${i==='caja'?'La caja':`${M[i].emoji} ${M[i].name}`}</span></label>`).join('')}</div></fieldset>
    <fieldset><legend>Entre quiénes se divide</legend><div class="opts">${IDS.map(i => `<label class="opt"><input type="checkbox" name="split" value="${i}" checked><span>${M[i].emoji} ${M[i].name}</span></label>`).join('')}</div></fieldset><p class="preview" id="split-prev"></p>` : ''}
    <label for="f-mdate">Fecha<input type="date" id="f-mdate" name="date" required value="${isoDay(new Date())}"></label>
    <button class="btn" type="submit">Anotar</button>
  </form>`;
}
function movSheet(id){
  const x = S.movs.find(m => m.id===id); if(!x) return '<p class="empty">Ese movimiento ya no existe.</p>';
  return `<div class="sh-head"><div class="chips"><span class="chip">${x.k==='gasto'?'Gasto':x.k==='ingreso'?'Ingreso':'Pago entre ustedes'}</span></div><h2 class="sh-title">${esc(x.concept)}</h2><p class="sh-sub">${fmtShort(x.date)} · ${money(x.amt)}</p></div>
    <button class="btn ghost danger" data-act="mov-del" data-id="${x.id}">Borrar movimiento</button>`;
}
function achSheet(id){
  const a = ACH.find(x => x.id===id), on = S.ach[id];
  return `<div class="sh-head"><div class="chips"><span class="chip">${ARISTAS.find(r => r.id===a.ar).name}</span><span class="chip ${on?'boss':''}">${on?`Unlocked · ${esc(on)}`:'Locked'}</span>${(a.auto || a.prog) && !on ? '<span class="chip">Se desbloquea solo</span>' : ''}</div><h2 class="sh-title">${a.ic} ${esc(a.name)}</h2><p class="sh-sub">${esc(a.desc)}</p></div>
    ${!on && a.hint ? `<p class="soft" style="background:rgba(60,180,216,.08);border-color:rgba(60,180,216,.3)">${esc(a.hint)}</p>` : ''}
    ${a.prog && !on ? `<p class="soft" style="background:rgba(242,66,106,.08);border-color:rgba(242,66,106,.3)">Van ${num(Math.min(PROG[a.prog](), a.goal))} de ${num(a.goal)}.</p>` : ''}
    ${on ? `<button class="mini-link" data-act="ach-off" data-id="${id}">Volver a bloquear</button>` : (a.prog || a.auto) ? '<p class="tiny">Se desbloquea solo.</p>' : `<button class="btn hold" data-hold="ach-on" data-id="${id}"><span class="hold-fill" aria-hidden="true"></span><span class="hold-t">¡Lo logramos! · +20 XP</span></button><p class="tiny hold-hint">Mantenelo apretado 5 segundos.</p>`}`;
}
/* Tutorial: oscurece y desenfoca la pantalla, menos el botón del que se habla en cada paso */
const HELP = [
  ['hoy', 'Hoy', 'Lo importante de un vistazo: cuánto falta para el show, lo que pasa esta semana, tus quests y la caja. Abajo, el Levvel de la banda y los soles del día.'],
  ['agenda', 'Calendario', 'Los miércoles, shows, grabaciones y fechas límite. Tocá un evento para decir si vas o dejar una nota para los otros dos.'],
  ['misiones', 'Quests', 'Lo que hay que hacer, quién y para cuándo. Cada quest cerrada suma XP para la banda. Si no llegás, pedí prórroga: es gratis.'],
  ['caja', 'Caja', 'La plata de la banda: lo que pagó cada uno, lo que entró y quién le pasa a quién para quedar a mano.'],
  ['banda', 'Banda', 'Tocando el logo de Evvil: el Levvel, el álbum de cartas, los achievvilments, el juego, la Evvolución y los avisos al celu.'],
  ['swipe', 'Moverse', 'Deslizá a los costados para pasar de Hoy a Calendario, Quests y Caja. Desde Hoy, hacia el otro lado, aparece Banda.'],
];
let TOUR = null;
const tourTarget = v => v==='banda' ? $('.logo-btn') : v==='swipe' ? null : $(`#nav [data-v="${v}"]`);
function tourOpen(){ closeSheet(); TOUR = {i:0, from:S.ui.view}; tourShow(); }
function tourShow(){
  const [v, t, d] = HELP[TOUR.i], last = TOUR.i === HELP.length-1, el = $('#tour'), view = v==='swipe' ? TOUR.from : v;
  if(S.ui.view !== view){ S.ui.view = view; render(); } else renderTop();
  scrollTo(0, 0);
  document.querySelectorAll('.tour-on').forEach(x => x.classList.remove('tour-on'));
  const tg = tourTarget(v); if(tg) tg.classList.add('tour-on');
  el.hidden = false; el.className = `tour ${v==='banda' ? 'at-top' : v==='swipe' ? 'at-mid' : 'at-bottom'}`;
  el.innerHTML = `<div class="tour-dim"></div>${tg ? '<button class="tour-ring" data-act="help-next" aria-label="Siguiente"></button>' : ''}
    <div class="tour-box" role="dialog" aria-modal="true" aria-labelledby="tour-t"><span class="tour-arrow" aria-hidden="true"></span>
      <div class="tour-k">${TOUR.i+1} de ${HELP.length}</div><h2 class="tour-t" id="tour-t">${t}</h2><p class="tour-d">${d}</p>
      ${v==='swipe' ? '<div class="tour-swipe" aria-hidden="true"><i></i></div>' : ''}
      <div class="tour-dots" aria-hidden="true">${HELP.map((_, i) => `<i class="${i===TOUR.i ? 'on' : ''}"></i>`).join('')}</div>
      <div class="tour-btns">${TOUR.i ? '<button class="btn ghost sm" data-act="help-prev">Atrás</button>' : ''}<button class="btn sm" data-act="${last ? 'help-end' : 'help-next'}">${last ? '¡Listo!' : 'Siguiente'}</button>${last ? '' : '<button class="mini-link tour-skip" data-act="help-end">Saltar</button>'}</div></div>`;
  tourPlace(); setTimeout(() => el.querySelector('.tour-btns .btn:last-of-type')?.focus(), 60);
}
function holePath(W, H, x, y, w, h, r){
  return `M0 0H${W}V${H}H0Z M${x+r} ${y}H${x+w-r}A${r} ${r} 0 0 1 ${x+w} ${y+r}V${y+h-r}A${r} ${r} 0 0 1 ${x+w-r} ${y+h}H${x+r}A${r} ${r} 0 0 1 ${x} ${y+h-r}V${y+r}A${r} ${r} 0 0 1 ${x+r} ${y}Z`;
}
function tourPlace(){
  if(!TOUR) return;
  const el = $('#tour'), v = HELP[TOUR.i][0], tg = tourTarget(v), W = innerWidth, H = innerHeight;
  const dim = el.querySelector('.tour-dim'), ring = el.querySelector('.tour-ring'), box = el.querySelector('.tour-box');
  const bw = Math.min(380, W - 32); box.style.width = bw + 'px';
  if(!tg){ dim.style.clipPath = ''; box.style.left = (W - bw)/2 + 'px'; return; }
  const r = tg.getBoundingClientRect(), pad = 5, x = Math.round(r.left - pad), y = Math.round(r.top - pad), w = Math.round(r.width + pad*2), h = Math.round(r.height + pad*2);
  dim.style.clipPath = `path(evenodd, '${holePath(W, H, x, y, w, h, 14)}')`;
  Object.assign(ring.style, {left:x + 'px', top:y + 'px', width:w + 'px', height:h + 'px'});
  const cx = r.left + r.width/2, left = Math.max(16, Math.min(W - bw - 16, cx - bw/2));
  box.style.left = left + 'px'; box.style.setProperty('--ax', Math.max(18, Math.min(bw - 18, cx - left)) + 'px');
  if(v==='banda'){ box.style.top = (y + h + 18) + 'px'; box.style.bottom = ''; } else { box.style.bottom = (H - y + 18) + 'px'; box.style.top = ''; }
}
function tourEnd(){
  if(!TOUR) return; const back = TOUR.from, el = $('#tour'); TOUR = null;
  el.hidden = true; el.innerHTML = ''; document.querySelectorAll('.tour-on').forEach(x => x.classList.remove('tour-on'));
  if(S.ui.view !== back) goView(back); else renderTop();
}
function imgSheet(src){ return `<img class="sheet-img" src="${esc(src)}" alt="">`; }
function infoSheet(){
  return `<div class="sh-head"><h2 class="sh-title">Central do Maldad</h2><p class="sh-sub">La central de Evvil: agenda, quests, caja y achievvilments.</p></div>
  <div class="sh-sec"><h3 class="sh-h">Cómo funciona</h3><p>Lo que carga cada uno lo ven los otros dos al instante. Si algo se toca sin querer, el aviso de abajo tiene «Deshacer», y las quests se pueden editar o borrar. Claude también puede cargar convocatorias, achievvilments y la caja directo en la base.</p></div>
  ${Sync.live ? '' : `<div class="sh-sec"><h3 class="sh-h">Modo demo</h3><p>Todavía no está conectada a la base compartida: lo que hagas queda solo en este dispositivo y se reinicia desde Banda.</p></div>`}
  <div class="sh-sec"><h3 class="sh-h">Instalarla en el celu</h3><p>iPhone: en Safari, Compartir → «Agregar a inicio». Android: en Chrome, menú ⋮ → «Instalar app». Abre en pantalla completa, con su ícono.</p></div>`;
}
/* ---------- canvases ---------- */
function drawSky(){
  const c = $('#sky'), dpr = Math.min(2, devicePixelRatio || 1), w = innerWidth, h = innerHeight;
  c.width = w*dpr; c.height = h*dpr; const g = c.getContext('2d'); g.scale(dpr, dpr);
  const gr = g.createLinearGradient(0, 0, 0, h); gr.addColorStop(0, '#05080f'); gr.addColorStop(.65, '#070a14'); gr.addColorStop(1, '#170812');
  g.fillStyle = gr; g.fillRect(0, 0, w, h);
  const R = rng(11), n = Math.round(w*h/2400);
  for(let i=0;i<n;i++){ const x = R()*w, y = R()*h, r = R() < .93 ? R()*.7+.25 : R()*1.3+.7; g.globalAlpha = .2 + R()*.55; g.fillStyle = R() < .1 ? '#ffb3c4' : '#ffffff'; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); }
  g.globalAlpha = 1;
}
function drawHero(){
  const c = document.querySelector('.hero-art'); if(!c) return;
  const r = c.getBoundingClientRect(), w = r.width, h = r.height; if(!w || !h) return;
  const dpr = Math.min(2, devicePixelRatio || 1); c.width = w*dpr; c.height = h*dpr; const g = c.getContext('2d'); g.scale(dpr, dpr);
  const base = h - 70, wave = x => base + Math.sin(x*.017 + 1.3)*6 + Math.sin(x*.049)*2.6;
  const sky = g.createLinearGradient(0, 0, 0, base); sky.addColorStop(0, '#03060d'); sky.addColorStop(.5, '#0b0711'); sky.addColorStop(.82, '#3a0718'); sky.addColorStop(1, '#93102f');
  g.fillStyle = sky; g.fillRect(0, 0, w, h);
  const R = rng(5), n = Math.round(w*base/700);
  for(let i=0;i<n;i++){ const x = R()*w, y = R()*(base-8); g.globalAlpha = (.25 + R()*.7) * (1 - y/base*.6); g.fillStyle = '#fff'; g.beginPath(); g.arc(x, y, R() < .94 ? R()*.8+.2 : 1.5, 0, 7); g.fill(); }
  g.globalAlpha = 1;
  g.save(); g.shadowColor = '#ff2457'; g.shadowBlur = 28; g.strokeStyle = 'rgba(255,45,95,.95)'; g.lineWidth = 7; g.beginPath();
  for(let x=0;x<=w+4;x+=4){ const y = wave(x); x ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
  g.fillStyle = '#0c546c'; g.beginPath(); g.moveTo(0, h); for(let x=0;x<=w+4;x+=4) g.lineTo(x, wave(x)); g.lineTo(w, h); g.closePath(); g.fill();
  const cols = ['#0c546c','#106a84','#0a4458','#13809a','#0e5f78','#08394a'];
  g.lineCap = 'round';
  for(let x=-4;x<w+4;x+=1.15){ for(let k=0;k<3;k++){
    const y0 = wave(x) + R()*14 - 3, a = -Math.PI/2 + (R()-.5)*1.4, L = 3 + R()*11;
    g.strokeStyle = (y0 < wave(x)+2 && R() < .4) ? `rgba(255,70,110,${(.3 + R()*.45).toFixed(2)})` : cols[(R()*cols.length)|0];
    g.lineWidth = .6 + R()*.9; g.beginPath(); g.moveTo(x, y0); g.lineTo(x + Math.cos(a)*L, y0 + Math.sin(a)*L); g.stroke(); } }
  for(let i=0;i<w*2.2;i++){ const x = R()*w, y = wave(x) + 10 + R()*(h - wave(x)), a = R()*Math.PI*2, L = 2 + R()*6; g.strokeStyle = cols[(R()*cols.length)|0]; g.lineWidth = .7; g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a)*L, y + Math.sin(a)*L); g.stroke(); }
}
function tick(){
  if(!document.querySelector('[data-days]')) return;
  const set = (sel, txt) => document.querySelectorAll(sel).forEach(el => el.textContent = txt);
  const show = showEv(), ms = pd(show.date, show.time) - Date.now();
  if(ms <= 0){ set('[data-days]', '¡Hoy!'); set('[data-unit]', ''); set('[data-clock]', ''); return; }
  const d = Math.floor(ms/864e5), hh = Math.floor(ms%864e5/36e5), mm = Math.floor(ms%36e5/6e4), ss = Math.floor(ms%6e4/1e3), p = v => String(v).padStart(2,'0');
  set('[data-days]', d); set('[data-unit]', d===1 ? 'día' : 'días');
  set('[data-clock]', `y ${p(hh)} h ${p(mm)} min ${p(ss)} s`);
}

/* ---------- render ---------- */
const VIEWS = {hoy:renderHoy, agenda:renderAgenda, misiones:renderMisiones, caja:renderCaja, banda:renderBanda};
function render(){
  recalc();
  renderTop();
  $('#view').innerHTML = VIEWS[S.ui.view]();
  tick();
}
function rerender(){ const y = scrollY; render(); scrollTo(0, y); }

/* ---------- actions ---------- */
const A = {
  nav(b){ if(b.dataset.mis) S.ui.mis = b.dataset.mis; goView(b.dataset.v); milkChance(.04); },
  me(b){ S.me = b.dataset.id; save(); rerender(); toast(`«${pick(M[S.me].says)}» · ${M[S.me].name} ${M[S.me].emoji}`); },
  info(){ openSheet(infoSheet); },
  close(){ closeSheet(); },
  'ov-next'(){ nextOverlay(); },
  sun(b, ev){
    const id = b.dataset.id; if(id!==S.me || S.suns[id]) return;
    const today = isoDay(new Date()); S.sunLog.push({id:today+':'+id, d:today, who:id}); gain(5, S.me, 'encendió su sol', posOf(ev, b));
    if(new Date().getHours() < 8) unlock('madrugador');
    if(IDS.every(i => S.suns[i])){ setTimeout(() => { gain(15, 'band', 'tuvo triple sol: los tres encendieron el suyo'); toast('¡Triple sol! +15 XP'); unlock('triplesol'); rerender(); }, 1100); }
    JUST_LIT = id; rerender(); setTimeout(() => { JUST_LIT = null; }, 1000);
    milkChance(.12);
  },
  complete(b, ev){
    const t = S.tasks.find(x => x.id===b.dataset.id); if(!t) return;
    const at = posOf(ev, b);
    if(b.dataset.close) closeSheet();
    if(t.done){ t.done = false; t.doneAt = null; addXP(-t.xp); toast(`«${t.title}» volvió a pendientes`); save(); rerender(); return; }
    const first = !S.tasks.some(x => x.done && x.doneAt), extra = lateThisWeek(t) ? ' · volvió una vvida' : '';
    t.done = true; t.doneAt = Date.now(); t.doneBy = S.me;
    gain(t.xp, S.me, `cerró «${t.title}»`, at);
    toast(`+${t.xp} XP para la banda${extra}`);
    if(first) unlock('firstquest');
    if(new Date().getHours() < 5) unlock('buho');
    milkChance(.15);
    checkStreak();
    if(t.boss && boss().left===0){ gain(300, 'band', 'derrotó al Final Boss: la promo del tercer show está completa'); unlock('promo'); }
    rerender();
  },
  extend(b){
    const t = S.tasks.find(x => x.id===b.dataset.id); const base = dd(t.due) < 0 ? isoDay(new Date()) : t.due; const d = pd(base); d.setDate(d.getDate()+7); t.due = isoDay(d);
    S.feed.unshift({id:'f'+uid(), who:S.me, text:`pidió prórroga para «${t.title}»`, at:Date.now(), cheers:[]});
    save(); refreshSheet(); rerender(); toast(`Listo, ahora vence el ${fmtShort(t.due)}. Sin drama.`);
  },
  task(b){ const id = b.dataset.id; openSheet(() => taskSheet(id)); },
  event(b){ const id = b.dataset.id; openSheet(() => evSheet(id)); },
  rsvp(b){ const e = S.events.find(x => x.id===b.dataset.id); e.rsvp = e.rsvp || {}; e.rsvp[S.me] = b.dataset.k; save(); refreshSheet(); rerender(); toast(`Anotado: ${RS[b.dataset.k]}`); if(e.type==='mie' && IDS.every(i => e.rsvp[i]==='voy')) unlock('todosvan'); },
  cheer(b, ev){
    const f = S.feed.find(x => x.id===b.dataset.id); if(!f) return;
    if(f.cheers.includes(S.me)){ f.cheers = f.cheers.filter(x => x!==S.me); addXP(-2); save(); }
    else { f.cheers.push(S.me); gain(2, null, null, posOf(ev, b)); if(S.feed.reduce((a,x) => a + x.cheers.length, 0) >= 10) unlock('aplausos'); }
    rerender();
  },
  'cal-move'(b){ let m = S.ui.calM + Number(b.dataset.d), y = S.ui.calY; if(m < 0){ m = 11; y--; } if(m > 11){ m = 0; y++; } S.ui.calM = m; S.ui.calY = y; save(); rerender(); },
  'cal-day'(b){ S.ui.calSel = b.dataset.d; const d = pd(b.dataset.d); S.ui.calM = d.getMonth(); S.ui.calY = d.getFullYear(); save(); rerender(); },
  'mis-tab'(b){ S.ui.mis = b.dataset.k; save(); rerender(); },
  'mis-who'(b){ S.ui.misWho = b.dataset.k; save(); rerender(); },
  'mis-boss'(){ S.ui.misBoss = !S.ui.misBoss; S.ui.mis = 'todo'; save(); rerender(); },
  'mov-f'(b){ S.ui.movF = b.dataset.k; save(); rerender(); },
  add(){ openSheet(addSheet); },
  'new-task'(){ openSheet(taskForm); },
  'new-event'(){ openSheet(eventForm); },
  'new-mov'(b){ const k = b.dataset.k; openSheet(() => movForm(k)); },
  advance(b, ev){
    const s = S.songs.find(x => x.id===b.dataset.id); if(!s || s.stage >= 6) return;
    s.stage++; const big = s.stage===6;
    if(big) s.note = `OUT desde el ${new Date().getDate()} de ${MONL[new Date().getMonth()]}.`;
    gain(big ? 150 : 80, 'band', `«${s.name}» pasó a ${STAGES[s.stage].toUpperCase()}`, posOf(ev, b));
    if(big && S.songs.filter(x => x.stage===6).length >= 2) unlock('doble');
    toast(`«${s.name}» pasó a ${STAGES[s.stage]}`);
    rerender();
  },
  'stage-back'(b){
    const s = S.songs.find(x => x.id===b.dataset.id); if(!s || s.stage <= 0) return;
    addXP(-(s.stage===6 ? 150 : 80)); s.stage--;
    toast(`«${s.name}» volvió a ${STAGES[s.stage]}`); save(); rerender();
  },
  'call-next'(b, ev){
    const k = S.calls.find(x => x.id===b.dataset.id); if(!k || k.status >= 3) return; k.status++;
    const xp = k.status===2 ? 40 : 10;
    gain(xp, S.me, k.status===2 ? `mandó la carpeta a «${k.name}»` : `movió «${k.name}» a ${CALL_ST[k.status]}`, posOf(ev, b));
    toast(`«${k.name}»: ${CALL_ST[k.status]}`); rerender();
  },
  'call-prev'(b){
    const k = S.calls.find(x => x.id===b.dataset.id); if(!k || k.status <= 0) return;
    addXP(-(k.status===2 ? 40 : 10)); k.status--;
    toast(`«${k.name}» volvió a ${CALL_ST[k.status]}`); save(); rerender();
  },
  'call-del'(b){ const k = S.calls.find(x => x.id===b.dataset.id); if(!k) return; S.calls = S.calls.filter(x => x!==k); toast(`Descartaste «${k.name}»`); save(); rerender(); },
  'task-edit'(b){ const id = b.dataset.id; openSheet(() => taskForm(id)); },
  'task-del'(b){ const t = S.tasks.find(x => x.id===b.dataset.id); if(!t) return; S.tasks = S.tasks.filter(x => x!==t); if(t.done) addXP(-t.xp); closeSheet(); toast(`Borraste «${t.title}»`); save(); rerender(); },
  'ev-del'(b){ const e = S.events.find(x => x.id===b.dataset.id); if(!e || e.id==='e16') return; S.events = S.events.filter(x => x!==e); closeSheet(); toast(`Borraste «${e.title}»`); save(); rerender(); },
  mov(b){ const id = b.dataset.id; openSheet(() => movSheet(id)); },
  'mov-del'(b){ const x = S.movs.find(m => m.id===b.dataset.id); if(!x) return; S.movs = S.movs.filter(m => m!==x); closeSheet(); toast(`Borraste «${x.concept}»`); save(); rerender(); },
  'ach-on'(b){ const a = ACH.find(x => x.id===b.dataset.id); if(!a || S.ach[a.id]) return; closeSheet(); unlock(a.id); gain(20, S.me, `desbloqueó «${a.name}»`); toast(`Unlocked: ${a.name} · +20 XP`); rerender(); },
  'ach-off'(b){ const a = ACH.find(x => x.id===b.dataset.id); if(!a) return; delete S.ach[a.id]; toast(`«${a.name}» volvió a bloquearse`); save(); refreshSheet(); rerender(); },
  enter(b){
    const sp = $('#splash'); S.splashDay = isoDay(new Date()); saveLocal();
    sp.classList.add('leaving'); setTimeout(() => { sp.hidden = true; sp.innerHTML = ''; }, 750);
    setTimeout(() => milkChance(.35), 900);
  },
  pill(){
    const now = Date.now(); PILL.push(now); while(PILL.length && now - PILL[0] > 2500) PILL.shift();
    if(PILL.length >= 5 && window.MilkToy){ PILL.length = 0; unlock('ordenador'); MilkToy.appear(MILK); }
  },
  img(b){ const src = b.dataset.src; openSheet(() => imgSheet(src)); },
  'carta-lock'(b){ toast(`Esta carta se da vuelta en el Levvel ${b.dataset.n}`); },
  help(){ tourOpen(); },
  'help-next'(){ if(!TOUR) return; if(TOUR.i < HELP.length-1){ TOUR.i++; tourShow(); } else tourEnd(); },
  'help-prev'(){ if(!TOUR || !TOUR.i) return; TOUR.i--; tourShow(); },
  'help-end'(){ tourEnd(); },
  'push-on'(){
    if(!window.Push) return;
    Push.enable().then(r => { rerender(); toast(r==='ok' ? 'Listo: te mandé un aviso de prueba' : r==='denied' ? 'Quedaron bloqueados' : 'No se activaron'); })
      .catch(e => { console.error(e); rerender(); toast('No pude activar los avisos. Probá de nuevo.'); });
  },
  'push-off'(){ if(window.Push) Push.disable().then(() => { rerender(); toast('Avisos apagados en este celu'); }); },
  parte(){ openSheet(parteSheet); },
  'ach-cat'(b){ const k = b.dataset.k; S.ui.achOpen[k] = !S.ui.achOpen[k]; saveLocal(); rerender(); },
  'ach-all'(){ const all = ARISTAS.every(a => S.ui.achOpen[a.id]); ARISTAS.forEach(a => S.ui.achOpen[a.id] = !all); saveLocal(); rerender(); },
  whoami(){ Sync.pickMember(); },
  game(){ Game.open({onEnd(r){
    stat('squash', r.hits); stat('plays'); const best = statMax('best', r.pts); statMax('combo', r.combo); const bestLevel = statMax('lvl', r.level);
    if(r.boss) stat('boss', r.boss); if(r.win) stat('wins');
    save(); checkAch(); rerender(); return {best, bestLevel, total:sumStat('squash')}; }}); },
  members(){ S.ui.view = 'banda'; saveLocal(); render(); const el = document.querySelector('.bio'); if(el) el.scrollIntoView({behavior:'smooth', block:'start'}); },
  undo(){
    if(!UNDO) return; const keep = {me:S.me, ui:S.ui, splashDay:S.splashDay};
    S = Object.assign(JSON.parse(UNDO.s), keep); UNDO = null; recalc(); stat('undos');
    save(); refreshSheet(); rerender(); toast('Deshecho');
  },
  settle(b, ev){
    const {bal} = ledger(), p = settlePlan(bal).find(x => x.from===b.dataset.from && x.to===b.dataset.to); if(!p) return;
    S.movs.push({id:'m'+uid(), k:'pago', concept:'Saldar cuentas', amt:p.amt, from:p.from, to:p.to, date:isoDay(new Date())});
    gain(10, S.me, `anotó que ${M[p.from].name} le pasó ${money(p.amt)} a ${M[p.to].name}`, posOf(ev, b));
    if(settlePlan(ledger().bal).length===0){ toast('Caja en orden'); unlock('caja'); }
    rerender();
  },
  ach(b){ const id = b.dataset.id; openSheet(() => achSheet(id)); },
  'wa-copy'(b){
    const txt = weeklyText();
    const fallback = () => { const r = document.createRange(); r.selectNodeContents($('#wa-text')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('Texto seleccionado: copialo con el menú'); };
    try{ navigator.clipboard.writeText(txt).then(() => toast('Parte copiado'), fallback); }catch(e){ fallback(); }
  },
  reset(b){
    if(b.dataset.armed !== '1'){ b.dataset.armed = '1'; b.textContent = '¿Seguro? Tocá de nuevo'; setTimeout(() => { if(b.isConnected){ b.dataset.armed = ''; b.textContent = 'Reiniciar demo'; } }, 3500); return; }
    if(Sync.live) return;
    try{ localStorage.removeItem(DKEY); }catch(e){}
    setState(seed()); S.ui.view = 'hoy';
    save(); render(); scrollTo(0, 0); toast('Demo reiniciada');
  },
};
const PILL = [];
const MILK = {
  onCatch(){ stat('milk'); if(new Date().getHours() < 10) unlock('cafeconleche'); gain(50, S.me, 'atrapó a MilkToy'); checkAch(); toast('¡Atrapaste a MilkToy! +50 XP'); rerender(); },
  onEscape(){ stat('milkEsc'); save(); checkAch(); toast('MilkToy se escapó…'); rerender(); },
};
function milkChance(p){ if(window.MilkToy) MilkToy.maybe(p, MILK); }
function notify(type, id){ if(window.Push) Push.notify(type, id); }
const VIEW_ONLY = new Set(['nav','me','info','close','ov-next','task','event','cal-move','cal-day','mis-tab','mis-who','mov-f','add','new-task','new-event','new-mov','ach','mov','task-edit','wa-copy','reset','undo','cheer','enter','pill','img','ach-cat','ach-all','whoami','game','members','help','help-next','help-prev','help-end','carta-lock','mis-boss','push-on','push-off','parte']);
function runAct(b, act, e){
  const f = A[act]; if(!f) return;
  const undoable = !VIEW_ONLY.has(act); if(undoable) snap();
  f(b, e); recalc(); if(undoable) checkAch();
  if(undoable && UNDO && UNDO.fresh){ if(JSON.stringify(S) !== UNDO.s) toast('Listo'); else UNDO = null; }
}
document.addEventListener('click', e => {
  if(e.target.id==='sheet'){ closeSheet(); return; }
  const b = e.target.closest('[data-act]'); if(!b || b.getAttribute('aria-disabled')==='true' || !A[b.dataset.act]) return;
  e.preventDefault(); runAct(b, b.dataset.act, e);
});

/* Mantener apretado: «¡Lo logramos!» se desbloquea a los 5 segundos y la tarjeta tiembla cada vez más */
const HOLD_MS = 5000;
let hold = null, iosSw = null;
function haptic(ms){
  try{
    if(navigator.vibrate) navigator.vibrate(ms);
    else { // iPhone: tocar un switch nativo da un golpecito háptico
      if(!iosSw){ iosSw = document.createElement('label'); iosSw.className = 'sr'; iosSw.setAttribute('aria-hidden', 'true'); iosSw.innerHTML = '<input type="checkbox" switch tabindex="-1">'; document.body.appendChild(iosSw); }
      iosSw.click();
    }
  }catch(e){}
}
function holdStart(b){
  if(hold) return;
  const card = b.closest('.sheet-panel') || b, t = b.querySelector('.hold-t');
  hold = {b, card, t, label:t.textContent, t0:performance.now(), next:0};
  b.classList.add('holding'); card.classList.add('shaking');
  const step = now => {
    if(!hold) return;
    const p = Math.min(1, (now - hold.t0) / HOLD_MS), amp = .8 + p*p*9, j = () => (Math.random() - .5) * amp;
    card.style.transform = `translate(${j().toFixed(1)}px,${j().toFixed(1)}px) rotate(${(j()*.22).toFixed(2)}deg) scale(${(1 + p*.025).toFixed(3)})`;
    b.style.setProperty('--p', p.toFixed(3));
    const left = Math.ceil((HOLD_MS - (now - hold.t0)) / 1000); t.textContent = left > 0 ? `Seguí apretando… ${left}` : '¡Ahí va!';
    if(now >= hold.next){ haptic(Math.round(10 + p*45)); hold.next = now + 460 - p*380; }
    if(p >= 1){ const h = hold; holdEnd(false); haptic(160); runAct(h.b, h.b.dataset.hold); return; }
    hold.raf = requestAnimationFrame(step);
  };
  hold.raf = requestAnimationFrame(step);
}
function holdEnd(cancel){
  if(!hold) return; const h = hold; hold = null; cancelAnimationFrame(h.raf);
  h.card.style.transform = ''; h.card.classList.remove('shaking'); h.b.classList.remove('holding'); h.b.style.setProperty('--p', 0); h.t.textContent = h.label;
  if(cancel && performance.now() - h.t0 < 1500) toast('Mantenelo apretado 5 segundos');
}
document.addEventListener('pointerdown', e => { const b = e.target.closest('[data-hold]'); if(b && e.button === 0){ e.preventDefault(); holdStart(b); } });
document.addEventListener('pointerup', () => holdEnd(true));
document.addEventListener('pointercancel', () => holdEnd(true));
document.addEventListener('contextmenu', e => { if(e.target.closest('[data-hold]')) e.preventDefault(); });

function goView(v){ S.ui.view = v; try{ history.replaceState(null, '', '#'+v); }catch(e){} save(); render(); scrollTo(0, 0); }
/* Deslizar a los costados: la sección de al lado acompaña al dedo, se puede espiar y volver.
   Banda ← Hoy → Calendario → Quests → Caja */
const SWIPE_ORDER = ['banda', 'hoy', 'agenda', 'misiones', 'caja'];
const SWIPE_BLOCK = ['#sheet', '#overlay', '#splash', '#gate', '#game', '#tour'];
let sw = null;
function peekFor(s, dir){
  if(s.peeks[dir] !== undefined) return s.peeks[dir];
  const v = SWIPE_ORDER[s.i + dir]; if(!v) return s.peeks[dir] = null;
  const p = document.createElement('div'); p.className = 'peek'; p.setAttribute('aria-hidden', 'true');
  Object.assign(p.style, {top:s.top + 'px', left:s.left + 'px', width:s.w + 'px', transform:`translateX(${dir*s.W}px)`});
  p.innerHTML = VIEWS[v](); $('.shell').appendChild(p);
  return s.peeks[dir] = p;
}
function peekMove(s, dx){
  const dir = dx < 0 ? 1 : -1, p = peekFor(s, dir), x = p ? dx : dx * .22; // en las puntas, resiste
  s.dx = x; s.view.style.transform = `translateX(${x}px)`;
  for(const d of [1, -1]){ const el = s.peeks[d]; if(el){ el.style.transform = `translateX(${x + d*s.W}px)`; el.style.visibility = d===dir ? '' : 'hidden'; } }
}
function peekEnd(s, cancel){
  const dir = s.dx < 0 ? 1 : -1, p = s.peeks[dir], fast = Math.abs(s.vx) > .5 && Math.abs(s.dx) > 30 && Math.sign(s.vx) === Math.sign(s.dx);
  const go = !cancel && p && (Math.abs(s.dx) > s.W * .35 || fast);
  const all = [s.view, s.peeks[1], s.peeks[-1]].filter(Boolean), ms = 240;
  all.forEach(el => el.style.transition = `transform ${ms}ms cubic-bezier(.2,.8,.2,1)`);
  requestAnimationFrame(() => {
    if(go){ s.view.style.transform = `translateX(${-dir*s.W}px)`; p.style.transform = 'translateX(0)'; }
    else { s.view.style.transform = 'translateX(0)'; for(const d of [1, -1]) if(s.peeks[d]) s.peeks[d].style.transform = `translateX(${d*s.W}px)`; }
  });
  setTimeout(() => {
    if(go){ goView(SWIPE_ORDER[s.i + dir]); milkChance(.04); }
    s.view.style.transition = s.view.style.transform = s.view.style.willChange = '';
    [s.peeks[1], s.peeks[-1]].forEach(el => el && el.remove());
    sw = null;
  }, ms + 20);
}
document.addEventListener('touchstart', e => {
  if(sw && sw.lock === 'x') return; // todavía termina el anterior
  sw = null;
  if(e.touches.length !== 1 || SWIPE_BLOCK.some(s => !$(s).hidden) || matchMedia('(min-width:960px)').matches) return;
  if(e.target.closest('input, textarea, select, .tabs, .filters, [data-hold]')) return;
  const t = e.touches[0]; sw = {x:t.clientX, y:t.clientY, lx:t.clientX, lt:performance.now(), vx:0, dx:0, lock:null};
}, {passive:true});
document.addEventListener('touchmove', e => {
  if(!sw || sw.done) return;
  const t = e.touches[0], dx = t.clientX - sw.x, dy = t.clientY - sw.y;
  if(!sw.lock){
    if(Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    sw.lock = Math.abs(dx) > Math.abs(dy) * 1.15 ? 'x' : 'y';
    if(sw.lock === 'x'){
      const i = SWIPE_ORDER.indexOf(S.ui.view), view = $('#view'), r = view.getBoundingClientRect();
      if(i < 0){ sw.lock = 'y'; return; }
      Object.assign(sw, {i, view, W:innerWidth, left:r.left, w:r.width, top:r.top + scrollY, peeks:{}});
      view.style.transition = 'none'; view.style.willChange = 'transform';
    }
  }
  if(sw.lock !== 'x') return;
  e.preventDefault();
  const now = performance.now(), dt = Math.max(1, now - sw.lt); sw.vx = sw.vx*.6 + ((t.clientX - sw.lx) / dt)*.4; sw.lx = t.clientX; sw.lt = now;
  peekMove(sw, dx);
}, {passive:false});
const swipeEnd = cancel => () => { if(!sw) return; if(sw.lock === 'x' && !sw.done){ sw.done = true; peekEnd(sw, cancel); } else if(sw.lock !== 'x') sw = null; };
document.addEventListener('touchend', swipeEnd(false), {passive:true});
document.addEventListener('touchcancel', swipeEnd(true), {passive:true});
document.addEventListener('keydown', e => {
  if(e.key==='Escape'){ if(TOUR) tourEnd(); else if(!$('#overlay').hidden) nextOverlay(); else if(!$('#sheet').hidden) closeSheet(); }
  const h = e.target.closest && e.target.closest('[data-hold]');
  if(h && (e.key===' ' || e.key==='Enter')){ e.preventDefault(); if(!e.repeat) holdStart(h); }
});
document.addEventListener('keyup', e => { if(e.key===' ' || e.key==='Enter') holdEnd(true); });
addEventListener('resize', () => tourPlace());
document.addEventListener('change', e => {
  const t = e.target, f = t.closest('form[data-form="task"]'); if(!f) return;
  if(t.name==='when') f.due.value = t.value;
  else if(t.name==='due') f.querySelectorAll('[name=when]').forEach(r => r.checked = r.value===t.value);
  else if(t.name==='song' && t.value) f.cat.value = 'single';
});
document.addEventListener('input', e => {
  const f = e.target.closest('form[data-form="mov"]'); if(!f || f.dataset.k!=='gasto') return;
  const amt = Number(f.amt.value) || 0, by = f.by.value, p = $('#split-prev'); if(!p) return;
  const sp = [...f.querySelectorAll('[name=split]:checked')].map(x => x.value), n = sp.length, mine = sp.includes(by) ? amt/n : 0;
  p.textContent = !amt ? '' : by==='caja' ? 'Sale de la caja común.' : !n ? 'Elegí entre quiénes se divide.' : `${money(amt/n)} ${n===1 ? `lo pone ${M[sp[0]].name}` : 'cada uno'}. ${M[by].name} queda con ${money(amt - mine)} a favor.`;
});
document.addEventListener('submit', e => {
  const f = e.target.closest('form[data-form]'); if(!f) return; e.preventDefault();
  const kind = f.dataset.form, fd = new FormData(f);
  snap(); setTimeout(checkAch, 50);
  if(kind==='note'){
    const text = String(fd.get('text')||'').trim(); if(!text) return;
    const ev = S.events.find(x => x.id===f.dataset.id); ev.notes = ev.notes || []; ev.notes.push({who:S.me, text, at:Date.now()});
    gain(3, S.me, `dejó una nota en «${ev.title}»`); if(allNotes() >= 10) unlock('notas'); notify('note', ev.id);
    refreshSheet(); rerender(); toast('Nota pegada · +3 XP');
  } else if(kind==='task'){
    const vals = {title:String(fd.get('title')).trim(), who:fd.get('who'), due:fd.get('due'), xp:Number(fd.get('xp')), cat:fd.get('cat'), boss:!!fd.get('boss'), song:fd.get('song') || undefined};
    const old = f.dataset.id && S.tasks.find(x => x.id===f.dataset.id);
    if(old){ if(old.done && old.xp !== vals.xp) addXP(vals.xp - old.xp); Object.assign(old, vals); closeSheet(); save(); rerender(); toast('Quest actualizada'); return; }
    const t = {id:'u'+uid(), by:S.me, ...vals};
    S.tasks.push(t); closeSheet(); gain(5, S.me, `cargó la quest «${t.title}»`); rerender(); if(t.who !== S.me) notify('task', t.id);
    toast(`Quest creada${t.who===S.me ? '' : ` para ${t.who==='all' ? 'todos' : M[t.who].name}`} · +5 XP`);
  } else if(kind==='event'){
    const ev = {id:'ue'+uid(), type:fd.get('type'), title:String(fd.get('title')).trim(), date:fd.get('date'), time:fd.get('time')||'', place:String(fd.get('place')||'').trim(), rsvp:{}, notes:[]};
    S.events.push(ev); S.ui.calSel = ev.date; const d = pd(ev.date); S.ui.calM = d.getMonth(); S.ui.calY = d.getFullYear();
    closeSheet(); save(); rerender(); toast('Evento agendado'); notify('event', ev.id);
  } else if(kind==='mov'){
    const k = f.dataset.k, amt = Math.round(Number(fd.get('amt'))); if(!(amt > 0)) return;
    const m = {id:'m'+uid(), k, concept:String(fd.get('concept')).trim(), amt, date:fd.get('date')};
    if(k==='gasto'){ m.by = fd.get('by'); const sp = fd.getAll('split'); if(m.by !== 'caja' && !sp.length){ toast('Elegí entre quiénes se divide'); return; } if(m.by !== 'caja' && sp.length < 3) m.split = sp; }
    S.movs.push(m); closeSheet(); gain(10, S.me, `anotó ${k==='gasto'?'el gasto':'el ingreso'} «${m.concept}»`); rerender(); toast('Anotado · +10 XP');
  }
});
let rz; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { drawSky(); drawHero(); }, 150); });
function startApp(){
  drawSky(); render(); setInterval(tick, 1000);
  if(document.fonts && document.fonts.ready) document.fonts.ready.then(() => drawHero());
  maybeSplash(); weekBonus();
  if('serviceWorker' in navigator && location.protocol.startsWith('http')){
    navigator.serviceWorker.register('sw.js').then(() => window.Push && Push.refresh()).catch(() => {});
    navigator.serviceWorker.addEventListener('message', e => { if(e.data && e.data.hash) openHash(e.data.hash); });
  }
  if(location.hash === '#parte') openHash('#parte');
}
// Los avisos al celu abren la app en una sección o en el parte de la semana.
function openHash(h){
  const v = (h || '').replace('#', '');
  if(v === 'parte'){ openSheet(parteSheet); try{ history.replaceState(null, '', '#' + S.ui.view); }catch(e){} }
  else if(VIEWS[v]) goView(v);
}
const SOLES = [[46, 11, '#c4123d'], [30, 23, '#f2426a'], [62, 5, '#93102f'], [38, 31, '#cc3c54'], [26, 17, '#ffcf4a']];
function maybeSplash(){
  const sp = $('#splash');
  sp.innerHTML = `<div class="sp-bg"></div>
    <div class="sp-top"><img class="sp-letras" src="img/evvil.svg" alt="Evvil"><h1 class="sp-title">Central do Maldad</h1></div>
    <button class="sp-sun" data-act="enter" aria-label="Entrar a la Central"><img src="img/cosito.webp" alt=""></button>
    <p class="sp-hint">Tocá el sol para entrar</p>
    ${SOLES.map(([size, seed, color], i) => `<span class="sp-sol s${i+1}" style="color:${color}">${sun({size, seed, n:9})}</span>`).join('')}
    <img class="sp-fly f1" src="img/guitarra.webp" alt=""><img class="sp-fly f2" src="img/bata.webp" alt=""><img class="sp-fly f3" src="img/bajo.webp" alt="">
    <div class="sp-band"><img class="sp-m sp-mica" src="img/mica.webp" alt=""><img class="sp-m sp-jero" src="img/jero.webp" alt=""><img class="sp-m sp-fran" src="img/fran.webp" alt=""></div>`;
  sp.hidden = false; sp.className = 'splash';
}
