/* Guarda la app en el celu para que abra rápido y sin señal. Los datos viajan aparte (Supabase). */
const CACHE = 'cdm-v8';
const SHELL = ['./', 'index.html', 'css/app.css?v=8', 'js/config.js?v=8', 'js/app.js?v=8', 'js/milktoy.js?v=8', 'js/game.js?v=8', 'js/sync.js?v=8', 'manifest.webmanifest', 'fonts/evvil-regular.woff',
  'img/evvil.svg', 'img/cosito.webp', 'img/fondo.jpg', 'img/jero.webp', 'img/mica.webp', 'img/fran.webp', 'img/bajo.webp', 'img/bata.webp', 'img/guitarra.webp',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];
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
