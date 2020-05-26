const NombreDel_Cache = 'Que_Hora_Es_Version_1',
linksParaCache=[
    '/',
    'style.css',
    'javascript.js',
    'Imagenes/Icon512.png',
    'Imagenes/Icon64.png'
 ] // Implementamos un cache para que se guarden los
  // datos más importantes o que necesitamos carguen rápido
 


  //Aqui se da la cache de la fase de instalación
  self.addEventListener('install', e=>{
    e.waitUntil(
        caches.open(NombreDel_Cache)
        .then(cache => {
            return cache.addAll(linksParaCache) //Agregue al cache del Cel 
                                                //lo que agregue a la lista del cache
            .then(()=> self.skipWaiting())
            
        })
        .catch(error => console.log("Algo salió mal con el cache", error)) // Falla de conexión por ejemplo
    )
  })
 

  // Cuando se va la conexión este evento busca dentro
 // de sí misma los recursos sin necesidad de internet
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
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
  })

// Recupera o actualiza desde el link, es decir para el cambio de version
    self.addEventListener('fetch', e=>{

e.respondWith(
    caches.match(e.request)
    .then(respuesta =>{
        if(respuesta){
            // Si se cumple es que no hay ningún cambio de version
            return respuesta;
        }
        //Sino tiene que ir a traer datosgit
        return fetch(e.request)
    })
    )
})



