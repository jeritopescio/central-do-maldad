/* Guarda la app en el celu para que abra rápido y sin señal. Los datos viajan aparte (Supabase). */
const CACHE = 'cdm-v12';
const SHELL = ['./', 'index.html', 'css/app.css?v=12', 'js/config.js?v=12', 'js/app.js?v=12', 'js/milktoy.js?v=12', 'js/game.js?v=12', 'js/push.js?v=12', 'js/sync.js?v=12', 'manifest.webmanifest', 'fonts/evvil-regular.woff',
  'img/evvil.svg', 'img/cosito.webp', 'img/fondo.jpg', 'img/jero.webp', 'img/mica.webp', 'img/fran.webp', 'img/bajo.webp', 'img/bata.webp', 'img/guitarra.webp',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'img/cartas/carta1.webp', 'img/cartas/carta1-s.webp', 'img/cartas/carta2.webp', 'img/cartas/carta2-s.webp', 'img/cartas/carta3.webp', 'img/cartas/carta3-s.webp', 'img/cartas/carta4.webp', 'img/cartas/carta4-s.webp', 'img/cartas/carta5.webp', 'img/cartas/carta5-s.webp', 'img/cartas/carta6.webp', 'img/cartas/carta6-s.webp', 'img/cartas/carta7.webp', 'img/cartas/carta7-s.webp', 'img/cartas/carta8.webp', 'img/cartas/carta8-s.webp', 'img/cartas/carta9.webp', 'img/cartas/carta9-s.webp'];
const CACHEABLE = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if(req.method !== 'GET') return;
  if(url.origin !== location.origin && !CACHEABLE.includes(url.hostname)) return;
  // La página siempre se busca primero en internet, así las actualizaciones llegan al toque.
  if(req.mode === 'navigate'){
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }).catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
    return;
  }
  // El resto: lo guardado al toque y actualiza en segundo plano.
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(req);
    const net = fetch(req).then(res => { if(res.ok || res.type === 'opaque') cache.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});

// Avisos al celu: llegan desde la función «push» de Supabase.
self.addEventListener('push', e => {
  let d = {};
  try{ d = e.data ? e.data.json() : {}; }catch(err){ d = {body:e.data ? e.data.text() : ''}; }
  e.waitUntil(self.registration.showNotification(d.title || 'Do Maldad', {
    body:d.body || '', icon:'icons/icon-192.png', badge:'icons/icon-192.png', tag:d.tag || undefined, data:{url:d.url || './'},
  }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || './', self.registration.scope), hash = url.hash;
  e.waitUntil(self.clients.matchAll({type:'window', includeUncontrolled:true}).then(list => {
    const c = list.find(x => x.url.startsWith(self.registration.scope));
    if(c){ c.postMessage({hash}); return c.focus(); }
    return self.clients.openWindow(url.href);
  }));
});
