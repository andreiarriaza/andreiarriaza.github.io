/* IMPORTANTE: para corroborar que, después de agregar todo el código de este archivo, el ServiceWorker fue detectado correctamente, se deben seguir los siguientes pasos: 


  Corroborar que el ServiceWorker sea detectado:

        1. Acceder a las Herramientas para Desarrolladores de Chrome. 
        2. Acceder a la sección "Application" (Aplicación).
        3. En la barra de navegación del lado izquierdo, seleccionar "Service workers".
        4. Se muestra la casilla "Source", y en ella de debería mostrar el nombre del archivo de ServiceWorker, el cual, en este caso, se llama "sw.js".
        5. Por otro lado, al acceder a la consola, se debería mostrar el mensaje: "Registro de SW (Service Worker) exitoso"


  Corroborar que se haya creado el Caché en el dispositivo: 
        1. Acceder a las Herramientas para Desarrolladores de Chrome. 
        2. Acceder a la sección "Application" (Aplicación).
        3. En la barra de navegación del lado izquierdo, seleccionar "Cache storage".
        4. Ya debería mostrarse el chaché llamado "v1_chess_mate_club", que se creón dentro de este archivo y el listado de URL que se agregarón dentro
           de la constante "urlsToCache".

        5. Si las variables no se muestran correctamente al acceder en las Herramientas para Desarrolladores de Chrome a "Application/Cache Storage",
           es necesario reinicar el Service Worker. Para reinicarlo, se deben seguir los siguientes pasos: 
               - Acceder a las Herramientas para Desarrolladores de Chrome. 
               - Seleccionar la opción "Application".
               - En la barra de navegación de lado izquierdo, seleccionar "Service workers".
               - En el lado derecho, se muestra el botón "Update". Dar clic en él. 
               - Listo.

      

        
        */

/* Las AppProgresivas permiten almacenar todos los recursos estáticos en el disco duro del dispositivo en el que se
esté visualizando la aplicación. 

En una aplicación progresiva (PWA), el caché se utiliza para almacenar recursos estáticos que serán necesarios para que la aplicación funcione sin conexión o se cargue más rápido. Los elementos que generalmente se incluyen en el caché son los siguientes:

    - Páginas HTML principales: como index.html o cualquier otra página clave.
    - Archivos CSS: como hojas de estilo personalizadas.
    - JavaScript: scripts que contienen la funcionalidad principal de la aplicación.
    - Imágenes y favicon: todos los recursos gráficos importantes.
    - Fuentes web: cualquier fuente personalizada o de terceros que utilices (como Google Fonts).
    - Recursos externos: cualquier API o CDN que necesite ser cacheado.
    - (NO FUNCIONA CON VIDEOS DE YOUTUBE POR RESTRICCIONES DE "CORS (Cross-Origin Resource Sharing").
*/

//Asignar un nombre y versión al cache
const CACHE_NAME = "v1_andrei_arriaza",
  urlsToCache = [
    /* Se encarga de cargar el archivo "index.html". */
    "../../index.html",
    /* Carga las fuentes de Google Fonts. */
    "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap",
    /* Kit de Font Awesome Icons */
    "https://kit.fontawesome.com/f1bff8ec54.js",

    /* Hojas Externas de CSS*/
    "../css/main.css",
    "../../aperturas/assets/css/aperturas.css",
    "../../libros/assets/css/libros.css",
    "../../mates/assets/css/mates.css",

    /* Hoja Externa de JavaScript. */
    "sw-register",

    /* Imágenes del sitio web */
    "../../assets/img/ProgramadorFitness.png",

    /* Favicon */
    "../../assets/img/favicon-16x16.png",
    "../../assets/img/favicon-32x32.png",
    "../../assets/img/favicon-48x48.png",
    "../../assets/img/favicon-76x76.png",
    "../../assets/img/favicon-96x96.png",
    "../../assets/img/favicon-120x120.png",
    "../../assets/img/favicon-144x144.png",
    "../../assets/img/favicon-152x152.png",
    "../../assets/img/favicon-167x167.png",
    "../../assets/img/favicon-180x180.png",
    "../../assets/img/favicon-192x192.png",
    "../../assets/img/favicon-256x256.png",
    "../../assets/img/favicon-384x384.png",
    "../../assets/img/favicon-512x512.png",

    /* Apple Touch Icon */
    "../../assets/img/apple-touch-icon-57x57.png",
    "../../assets/img/apple-touch-icon-60x60.png",
    "../../assets/img/apple-touch-icon-72x72.png",
    "../../assets/img/apple-touch-icon-76x76.png",
    "../../assets/img/apple-touch-icon-114x114.png",
    "../../assets/img/apple-touch-icon-120x120.png",
    "../../assets/img/apple-touch-icon-144x144.png",
    "../../assets/img/apple-touch-icon-152x152.png",
    "../../assets/img/apple-touch-icon-167x167.png",
    "../../assets/img/apple-touch-icon-180x180.png",

    /* Aperturas */
    "../../assets/img/Apertura-Ruy-López.png",
    "../../assets/img/Apertura-Italiana.png",
    "../../assets/img/Defensa-Alekhine.png",
    "../../assets/img/Defensa-Caro-Kann.png",
    "../../assets/img/Defensa-Escandinava.png",
    "../../assets/img/Defensa-Escocesa.png",
    "../../assets/img/Defensa-Francesa.png",
    "../../assets/img/Defensa-Siciliana.png",
    "../../assets/img/Defensa-Vienesa.png",
    "../../assets/img/Gambito-de-Rey.png",

    /* Mates */
    "../../assets/img/mate-arabe.gif",
    "../../assets/img/mate-cola-de-golondrina.gif",
    "../../assets/img/mate-de-anastasia.gif",
    "../../assets/img/mate-de-blackburne.gif",
    "../../assets/img/mate-de-boen.gif",
    "../../assets/img/mate-de-cozio.gif",
    "../../assets/img/mate-de-damiano.gif",
    "../../assets/img/mate-de-la-coz.gif",
    "../../assets/img/mate-de-la-opera.gif",
    "../../assets/img/mate-de-las-hombreras.gif",
    "../../assets/img/mate-de-morphy.gif",

    /* Libros */
    "../../assets/img/mis-60-partidas-memorables.jpg",
    "../../assets/img/curso-completo-de-ajedrez.jpg",
  ];

/* Durante la fase de instalación, generalmente se almacenan en caché los activos estáticos. 

El evento "install" ocurre cuando el Service Worker está siendo instalado en el navegador. 
El código dentro del bloque self.addEventListener("install", ...) se ejecuta en ese momento.

*/
self.addEventListener("install", (e) => {
  console.log("Service Worker installing...");
  /* El método e.waitUntil() se asegura que el Service Worker no se considere instalado hasta que todas las tareas dentro de él hayan finalizado correctamente. En este caso, 
  hasta que se hayan agregado todos los archivos al caché.
  */
  e.waitUntil(
    caches

      /* El método caches.open(CACHE_NAME) abre un caché (almacenamiento local en el
       navegador, es decir, que ese caché será almacenado en el dispositivo) con el nombre que se define en CACHE_NAME. Esta operación devuelve una 
       promesa. Si la promesa se resuelve correctamente, pasa al siguiente bloque .then(). */
      .open(CACHE_NAME)

      .then((cache) => {
        console.log("Caching files...");
        /* Se agrega un return, dentro del cual se ejecutará el método "addAll", el cual se encargará de agregar todas las URL que se encuentran dentro de la
    constante "urlToCache" a la memoria caché del dispositivo dentro del cual se instale la Progressive Web App. 
    
    Esta lista podría contener recursos como archivos HTML, CSS, JavaScript, imágenes, etc., que se desean almacenar en el caché para ser usados sin conexión.
    
    */
        return (
          cache
            .addAll(urlsToCache)

            /* Una vez que se han añadido todos los archivos al caché, se llama a self.skipWaiting(). Este método obliga al Service Worker a activarse inmediatamente después de la instalación, sin esperar a que los usuarios cierren las pestañas actuales donde la aplicación esté en uso. Es decir, el nuevo Service Worker reemplaza al anterior más rápidamente.   */
            .then(() => self.skipWaiting())
        );
      })

      /* En caso de que haya un error con alguna URL o se pierda la conexión, se desplegará
  en consola el mensaje "Falló registro de caché".
  
  Si ocurre algún error durante el proceso (como problemas al abrir el caché o añadir las URLs), se captura con el método .catch() y se muestra un mensaje en la consola: "Falló registro de caché", junto con el error específico err para mayor claridad.*/
      .catch((err) => console.log("Falló registro de caché", err))

    /* 
    Resumen del flujo:
      - Se intercepta el evento de instalación.
      - Se abre un caché.
      - Se añaden archivos al caché (almacenamiento local).
      - Se asegura que el Service Worker tome control inmediatamente (skipWaiting()).
      - Si algo falla, se informa del error en la consola.
*/
  );
});

/* Una vez que se instale el Service Worker, se activa y buscar los recursos para hacer que funcione sin conexión.Si se pierde la conexión en algún momento, este evento se encarga de buscar en caché los recursos necesarios para el funcionamiento de la Progressive Web App 


Se está utilizando el evento "activate" para ejecutar código cuando el Service Worker se activa. La activación ocurre después de que el Service Worker ha sido instalado (cuando ya se ha cargado y almacenado el caché en el dispositivo del usuario).
*/
self.addEventListener("activate", (e) => {
  console.log("Service Worker activating...");
  /* Aquí se crea una lista blanca de caché llamada "cacheWhiteList", 
  que contiene los nombres de los cachés que se desean conservar. 
  
  "CACHE_NAME" es una constante que contiene el nombre del caché actual, el cual 
  contiene los archivos más recientes de la aplicación. 
  Solo este caché debe mantenerse activo.
  */
  const cacheWhiteList = [CACHE_NAME];

  /* 

El método e.waitUntil() extiende el evento de activación hasta que todas las promesas dentro de él se resuelvan. Esto garantiza que el Service Worker no finalice su activación hasta que se hayan ejecutado correctamente las acciones dentro de este bloque (en este caso, la limpieza de caché y la activación del nuevo caché).*/
  e.waitUntil(
    /* caches.keys():
Este método devuelve una promesa que se resuelve con una lista de todos los nombres }
de caché almacenados en el navegador. Cada vez que el caché se actualiza, se crea un 
nuevo caché con un nombre diferente (versión nueva). */
    caches
      .keys()
      /* .then((cacheNames) => { ... }):
Cuando la promesa de caches.keys() se resuelve, el argumento cacheNames contendrá un array 
con los nombres de todos los cachés actuales. Este bloque de código se utiliza para comparar 
estos nombres con la lista blanca cacheWhiteList y decidir cuáles cachés deben eliminarse. */
      .then((cacheNames) => {
        /* Promise.all() se utiliza para ejecutar varias promesas en paralelo y esperar a que
         todas se resuelvan. En este caso, se espera que todas las eliminaciones de caché 
         innecesario se completen antes de continuar con la activación. */
        return Promise.all(
          /* Se usa para recorrer cada nombre de caché en cacheNames. Para cada caché, se ejecuta una comparación con la lista blanca cacheWhiteList. */
          cacheNames.map((cacheName) => {
            // Eliminando lo que ya no se necesita en el caché.
            /* Esta condición verifica si el cacheName actual no está en la lista blanca 
            (cacheWhiteList). Si el nombre del caché no se encuentra en la lista blanca 
            (lo que significa que es un caché antiguo o no deseado), se procede a eliminarlo. */
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              /* caches.delete(cacheName):
                Si la condición anterior es verdadera (es decir, el caché no está en la lista blanca), se llama a caches.delete(cacheName) para eliminar ese caché del 
                navegador. Esta operación devuelve una promesa que indica que el caché se ha 
                eliminado correctamente. */
              return caches.delete(cacheName);
            }
          })
        );
      })
      // Le indica al Service Worker activar el caché actual.
      /* .then(() => self.clients.claim()):
            Después de que todas las promesas de Promise.all() se hayan 
            resuelto (lo que indica que todos los cachés innecesarios se han eliminado), 
            se llama a self.clients.claim(). */

      /* self.clients.claim() hace que el nuevo Service Worker tome el control de todas las páginas de la aplicación sin necesidad de que los usuarios cierren y vuelvan a abrir las pestañas. Es decir, asegura que el nuevo Service Worker y los cachés actualizados se utilicen inmediatamente, sin esperar a que se recarguen las páginas. */
      .then(() => self.clients.claim())
  );

  /*  Resumen del flujo:
        - Se intercepta el evento de activación del Service Worker.
        - Se define una lista blanca de cachés permitidos (en este caso, solo uno).
        - Se obtienen todos los nombres de los cachés almacenados en el navegador.
        - Se compara cada caché con la lista blanca, y si un caché no está en la lista, se elimina.
        - Una vez que se eliminan todos los cachés antiguos, el nuevo Service Worker toma el control de las páginas abiertas de la aplicación con self.clients.claim().  
        
        Este proceso es importante para garantizar que solo se conserve la versión más reciente del caché, eliminando las versiones anteriores y asegurando que la aplicación esté siempre actualizada.
        */
});

/* Este fragmento de código gestiona el evento fetch en un Service Worker dentro de una Progressive Web App (PWA). El objetivo del código es interceptar las solicitudes de red de la aplicación y responder con los archivos que ya están en el caché o, si no están en el caché, realizar la solicitud a la red (internet). 


*/

/* self.addEventListener("fetch", (e) => { ... }):
        Este código escucha el evento fetch, que se activa cada vez que la aplicación realiza
        una solicitud de red. Cada vez que el navegador pide algún recurso (como una página
        HTML, una imagen o un archivo CSS), el Service Worker intercepta la solicitud con 
        este evento. */
self.addEventListener("fetch", (e) => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  /*  e.respondWith():
        El método e.respondWith() se utiliza para interceptar la solicitud y proporcionar 
        una respuesta personalizada. Dentro de este método, se decide si la respuesta debe
        provenir del caché o de una petición a la red (url real). */
  e.respondWith(
    /* caches.match(e.request):
          caches.match() es una función que busca en el caché del navegador el recurso
          solicitado (e.request). Si el recurso ya fue almacenado en caché anteriormente,
          devolverá una promesa que se resuelve con la respuesta almacenada en caché (por
          ejemplo, un archivo CSS, una imagen, etc.).
          
          En resumen, está intentando encontrar una versión almacenada del recurso 
          solicitado en la caché. */

    /*  .then((res) => { ... }):
              Este bloque de código se ejecuta cuando la promesa de caches.match() se 
              resuelve. El argumento "res" contiene la respuesta encontrada en el 
              caché (si es que existe). */
    caches.match(e.request).then((res) => {
      /* if (res):
            Aquí se verifica si "res" tiene un valor (es decir, si la solicitud al caché 
            fue exitosa y encontró el recurso solicitado).  */
      if (res) {
        //recuperar del cache
        /* return res;:
              Si el recurso fue encontrado en el caché, se devuelve esa respuesta. Esto 
              significa que el recurso se obtiene del caché y se evita realizar una nueva 
              solicitud a la red. Este es el principal beneficio de las PWA: pueden 
              trabajar offline o con recursos guardados, mejorando el rendimiento 
              y reduciendo el uso de datos. */
        return res;
      }
      //recuperar de la petición a la url
      /* return fetch(e.request);:
            Si res es null o undefined (es decir, el recurso no está en el caché), 
            se ejecuta la siguiente línea.
            Se llama a fetch(e.request), que realiza una solicitud normal a la red 
            para obtener el recurso solicitado desde el servidor.
            Este código asegura que si el recurso no se encuentra en el caché, la 
            aplicación lo descargue de la red de manera habitual. */
      return fetch(e.request);

      /* Resumen del flujo:
            - El Service Worker intercepta cada solicitud de la aplicación (evento fetch).
            - Se busca en el caché si el recurso solicitado ya está guardado.
            - Si el recurso está en el caché, se devuelve directamente del caché, lo que 
              permite que la aplicación funcione sin conexión o cargue más rápido.
            - Si el recurso no está en el caché, se realiza una solicitud a la red utilizando 
              fetch() para obtenerlo desde el servidor.
            - Este enfoque combina lo mejor de los dos mundos:
                - Velocidad y eficiencia cuando los recursos ya están en el caché.
                - Flexibilidad al permitir que los recursos faltantes se obtengan de la red cuando sea necesario. */
    })
  );
});
