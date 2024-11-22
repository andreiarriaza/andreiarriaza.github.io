/* Un ServiceWorker es un archivo JavaScript que funciona en segundo plano. */

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    /* Acá se debe indicar la ubicación del archivo "sw.js" tomando como referencia la ubicación del archivo "index.html". 
    
    Debido a que este archivo será importado en todas las páginas, es necesario definir una ruta absoluta para indicar la ubicación del ServiceWorker. 

    La "/" hace referencia a que buscará en la carpeta raíz, sin embargo, como en este caso la página se subirá a GithubPages, esa ruta raíz es:      
              andreiarriaza.github.io 

    Por lo que para acceder al ServiceWorker es necesario especificar además el nombre del repositorio dentro del cual se encuentra; dicho respositorio es "progressive-web-app", por eso quedó de la siguiente manera: 

        andreiarriaza.github.io/progressive-web-app/assets/js/sw.js

    
    Si solamente se fuera a probar localmente la Progressive Web App, o bien, si esta progressive web app se fuera a subir directamente a la carpeta "Public HTML" de determinado hosting, no haría falta incluir el nombre del repositorio obviamente, porque la ruta raíz directamente apuntaría a la carpeta "public HTML", quedando de la siguiente manera: 

              /assets/js/sw.js"

    */
    .register("./sw.js")
    .then((reg) => console.log("Registro de SW (Service Worker) exitoso", reg))
    .catch((err) =>
      console.error("Error al tratar de registrar el SW (ServiceWorker)", err)
    );
}
