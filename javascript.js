function generarLaHora(){
  
let laHoraActual = new Date();

let segundos = laHoraActual.getSeconds().toString().length<2 ? "0"+laHoraActual.getSeconds() : laHoraActual.getSeconds();
let minutos = laHoraActual.getMinutes().toString().length<2 ? "0"+laHoraActual.getMinutes() : laHoraActual.getMinutes();
let horas = laHoraActual.getHours().toString().length<2 ? "0"+laHoraActual.getHours() : laHoraActual.getHours();
   
let enEsteInstante =`${horas}:${minutos}:${segundos}`;

document.getElementById("time").innerHTML= enEsteInstante;
}

setInterval(()=>{
    generarLaHora();
}, 1000);

if('serviceWorker'in navigator){
    navigator.serviceWorker.register('sw.js')
    .then(registro => console.log('Registro de SW realizado', registro))
    .catch(error=> console.warn('No se logró registrar el SW', error))
}