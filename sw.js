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
        .catch(error => console.log("Algo salió mal", error)) // Falla de conexión por ejemplo
    )
  })


  // Cuando se va la conexión este evento busca dentro
 // de sí misma los recursos sin necesidad de internet
  self.addEventListener('active', e=>{
    const controlDeVersion = [NombreDel_Cache] // detecta si hay una versión nueva o un cambio
    e.waitUntil(
    caches.keys()
    .then(cacheNames =>{
        cacheNames.map(cacheName =>{
            // Elimina lo que ya no está en el cache
            if(controlDeVersion.indexOf(cacheName)=== -1){
            return caches.delete(cacheName)
            }
        })
    })

    .then(()=> self.clients.claim())
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



