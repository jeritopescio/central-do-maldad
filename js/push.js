/* Avisos al celu (Web Push).
   La función «push» de Supabase guarda las suscripciones y manda los avisos; todos los días a las 10
   revisa qué hay hoy y mañana, y los lunes avisa que está el parte de la semana. */
(function(){
  const C = window.CDM_CONFIG || {}, FN = C.supabaseUrl ? C.supabaseUrl + '/functions/v1/push' : '';
  const PKEY = 'cdm-push-v1';
  const ios = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const can = 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  let busy = false;
  const mem = () => { try{ return JSON.parse(localStorage.getItem(PKEY)) || {}; }catch(e){ return {}; } };
  const remember = v => { try{ v ? localStorage.setItem(PKEY, JSON.stringify(v)) : localStorage.removeItem(PKEY); }catch(e){} };
  async function call(body){
    const r = await fetch(FN, {method:'POST', headers:{'Content-Type':'application/json', apikey:C.supabaseAnonKey}, body:JSON.stringify(body)});
    if(!r.ok) throw new Error('push ' + r.status);
    return r.json();
  }
  const bytes = s => { const raw = atob((s + '='.repeat((4 - s.length % 4) % 4)).replace(/-/g, '+').replace(/_/g, '/')); return Uint8Array.from(raw, c => c.charCodeAt(0)); };
  async function current(){ const reg = await navigator.serviceWorker.ready; return {reg, sub:await reg.pushManager.getSubscription()}; }

  window.Push = {
    state(){
      if(!window.Sync || !Sync.live || !FN) return 'demo';
      if(busy) return 'busy';
      if(!can) return ios && !standalone ? 'ios' : 'nope';
      if(Notification.permission === 'denied') return 'denied';
      return Notification.permission === 'granted' && mem().endpoint ? 'on' : 'off';
    },
    // Se llama directo desde el toque: el iPhone solo pide permiso si viene de un toque.
    async enable(){
      const ask = Notification.requestPermission();
      busy = true; rerender();
      try{
        const perm = await ask; if(perm !== 'granted') return perm;
        let {reg, sub} = await current();
        if(!sub){ const {key} = await call({op:'key'}); sub = await reg.pushManager.subscribe({userVisibleOnly:true, applicationServerKey:bytes(key)}); }
        await call({op:'sub', member:S.me, sub:sub.toJSON(), hello:true});
        remember({endpoint:sub.endpoint, member:S.me, at:Date.now()});
        return 'ok';
      } finally { busy = false; }
    },
    async disable(){
      try{ const {sub} = await current(); if(sub){ await call({op:'unsub', endpoint:sub.endpoint}).catch(() => {}); await sub.unsubscribe(); } }
      finally { remember(null); }
    },
    // Una vez por día vuelve a mandar la suscripción, por si cambió quién usa el celu.
    async refresh(){
      if(this.state() !== 'on') return;
      const m = mem(); if(m.member === S.me && Date.now() - m.at < 864e5) return;
      const {sub} = await current(); if(!sub){ remember(null); return; }
      await call({op:'sub', member:S.me, sub:sub.toJSON()}).catch(() => {});
      remember({endpoint:sub.endpoint, member:S.me, at:Date.now()});
    },
    // Avisa a los otros dos. Espera un poco para que el cambio ya esté guardado en la base.
    notify(type, id){
      if(!window.Sync || !Sync.live || !FN) return;
      setTimeout(() => call({op:'notify', type, id, by:S.me}).catch(() => {}), 2500);
    },
  };
})();
