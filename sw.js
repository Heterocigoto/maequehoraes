const cacheName = 'Que_Hora_Es_Version_1';
 let appShellFiles=[
    'index.html',
    'style.css',
    'javascript.js',
    'Imagenes/Icon512.png',
    'Imagenes/Icon64.png', 
    'sw.js', 
    'manifest.json'
 ];
 var contentToCache = appShellFiles;
 self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
      caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(contentToCache);
      })
    );
  });

  self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
  });