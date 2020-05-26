const NombreDel_Cache = 'Que_Hora_Es_Version_1',
 var linksParaCache=[
    'index.html',
    'style.css',
    'javascript.js',
    'Imagenes/Icon512.png',
    'Imagenes/Icon64.png', 
    'sw.js', 
    'manifest.json'
 ] // Implementamos un cache para que se guarden los
  // datos más importantes o que necesitamos carguen rápido
 
//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(NombreDel_Cache)
        .then(cache => {
          return cache.addAll(linksParaCache)
            .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
  })
  
  //una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
  self.addEventListener('activate', e => {
    const cacheWhitelist = [NombreDel_Cache]
  
    e.waitUntil(
      caches.keys()
        .then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              //Eliminamos lo que ya no se necesita en cache
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName)
              }
            })
          )
        })// Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
           )
    
  })
  
  self.addEventListener('fetch', function(e){
	e.respondWith(
		caches.match(e.request).then(function(response){
            return response || fetch(e.request);}
            ))})