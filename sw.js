/* IMPORTANTE: para corroborar que, después de agregar todo el código de este archivo, el ServiceWorker fue detectado correctamente, se deben seguir los siguientes pasos: 


  Corroborar que el ServiceWorker sea detectado:

        1. Acceder a las Herramientas para Desarrolladores de Chrome. 
        2. Acceder a la sección "Application" (Aplicación).
        3. En la barra de navegación del lado izquierdo, seleccionar "Service workers".
        4. Se muestra la casilla "Source", y en ella de debería mostrar el nombre del archivo de ServiceWorker, el cual, en este caso, se llama "sw.js".
        5. Por otro lado, al acceder a la consola, se debería mostrar el mensaje: "Registro de SW (Service Worker) exitoso"


  Comprobar que el ServiceWorker se haya activado correctamente: 
        1. Abrir las herramientas para desarrolladores de Chrome. 
        2. Acceder a "Application".
        3. Seleccionar en el menú de la izquierda la opción "Service workers".
        4. En el lado drecho se mostrará el estado del Service Worker detectado, el cual debería mostrar el Status: "... activated and is running" y mostrar
           un ícono de color verde al lado izquierdo para indicar que está funcionando correctamente. 
        


  Corroborar que se haya creado el Caché en el dispositivo: 
        1. Acceder a las Herramientas para Desarrolladores de Chrome. 
        2. Acceder a la sección "Application" (Aplicación).
        3. En la barra de navegación del lado izquierdo, seleccionar "Cache storage".
        4. Ya debería mostrarse el chaché llamado "v1_chess_mate_club", que se creón dentro de este archivo y el listado de URL que se agregarón dentro
           de la constante "urlsToCache".

        5. Si las variables no se muestran correctamente al acceder en las Herramientas para 
           Desarrolladores de Chrome a "Application/Cache Storage" (regularmente ocurre, después de una modificación del Service Worker),
           es necesario reinicar el Service Worker. Para reinicarlo, se deben seguir los siguientes pasos: 
               - Acceder a las Herramientas para Desarrolladores de Chrome. 
               - Seleccionar la opción "Application".
               - En la barra de navegación de lado izquierdo, seleccionar "Service workers".
               - En el lado derecho, se muestra el botón "Update". Dar clic en él. 
               - Listo.  
        */

/* Las AppProgresivas permiten almacenar todos los recursos estáticos en el disco duro del dispositivo en el que se
esté visualizando la aplicación. 

En una aplicación progresiva (PWA), el caché se utiliza para almacenar recursos estáticos que serán necesarios para que la aplicación 
funcione sin conexión o se cargue más rápido. Los elementos que generalmente se incluyen en el caché son los siguientes:

    - Páginas HTML principales: como index.html o cualquier otra página clave.
    - Archivos CSS: como hojas de estilo personalizadas.
    - JavaScript: scripts que contienen la funcionalidad principal de la aplicación.
    - Imágenes y favicon: todos los recursos gráficos importantes.
    - Fuentes web: cualquier fuente personalizada o de terceros que utilices (como Google Fonts).
    - Recursos externos: cualquier API o CDN que necesite ser cacheado.
    - (NO FUNCIONA CON VIDEOS DE YOUTUBE POR RESTRICCIONES DE "CORS (Cross-Origin Resource Sharing").
*/

//Asignar un nombre y versión al cache
const CACHE_NAME = "v1_andreiarriaza",
  urlsToCache = [
    /* Se encarga de cargar el archivo "index.html". */
    "./",

    /* Se agrega la página web "Mentoría"*/
    "./mentoria/",

    /* Carga las fuentes de Google Fonts. */
    "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap",

    /* Hojas Externas de CSS*/
    "./assets/css/styles.css",

    /* Archivos para descarga */
    "./assets/docs/Curriculum-Vitae-Website.pdf",
    "./assets/docs/Test-Cleaver-John-Doe.pdf",

    /* Hoja Externa de JavaScript.*/
    "./assets/js/dom/index.js",
    "./assets/js/dom/script.js",

    /* Imágenes del sitio web */
    /* IMPORTANTE: las imágenes de los bombillos ("bulb-on-svgrepo-off.svg" y "bulb-on-svgrepo-on") que 
    sirven para activar o desactivar el modo oscuro, no se agregaron acá debido a que el código de cada una de
    esas imágenes SVG fue incluido directamente dentro del código HTML.
    
    Lo mismo sucede con otras imágenes SVG, por la misma razón antes mencionada. 
    Tómese en cuenta que las imágenes SVG antes mencionadas existen dentro de la carpeta "assets/img", pero, salvo
    se indique lo contrario, fueron agregadas inline dentro del código HTML. 
    */

    "./assets/img/loader.svg",

    /* Startup Image */
    "./assets/img/startup-image-750x1334@2x.png",
    "./assets/img/startup-image-1125x2436@3x.png",
    "./assets/img/startup-image-768x1024@2x.png",

    /* Favicon */
    "./assets/img/favicon-16x16.png",
    "./assets/img/favicon-32x32.png",
    "./assets/img/favicon-48x48.png",
    "./assets/img/favicon-76x76.png",
    "./assets/img/favicon-96x96.png",
    "./assets/img/favicon-120x120.png",
    "./assets/img/favicon-144x144.png",
    "./assets/img/favicon-152x152.png",
    "./assets/img/favicon-167x167.png",
    "./assets/img/favicon-180x180.png",
    "./assets/img/favicon-192x192.png",
    "./assets/img/favicon-256x256.png",
    "./assets/img/favicon-384x384.png",
    "./assets/img/favicon-512x512.png",

    /* Apple Touch Icon */
    "./assets/img/apple-touch-icon-57x57.png",
    "./assets/img/apple-touch-icon-60x60.png",
    "./assets/img/apple-touch-icon-72x72.png",
    "./assets/img/apple-touch-icon-76x76.png",
    "./assets/img/apple-touch-icon-114x114.png",
    "./assets/img/apple-touch-icon-120x120.png",
    "./assets/img/apple-touch-icon-144x144.png",
    "./assets/img/apple-touch-icon-152x152.png",
    "./assets/img/apple-touch-icon-167x167.png",
    "./assets/img/apple-touch-icon-180x180.png",

    /* Heroe Image*/
    "./assets/img/hero-image-home.jpg",

    /* Foto de perfil */
    "./assets/img/profile-website.jpg",

    /* Portafolio */
    "./assets/img/portfolio-1-costeo-plastikito.png",
    "./assets/img/portfolio-2-testcleaver-plastikito.png",
    "./assets/img/portfolio-3-plastikito-com.png",
    "./assets/img/portfolio-4-huevito-sorpresa.png",
    "./assets/img/portfolio-5-andreiarriaza-github.png",
  ];

/* Durante la fase de instalación, generalmente se almacenan en caché los activos estáticos. 

El evento "install" ocurre cuando el Service Worker está siendo instalado en el navegador. 
El código dentro del bloque self.addEventListener("install", ...) se ejecuta en ese momento.

*/
self.addEventListener("install", (e) => {
  console.log("Service Worker installing...");
  /* El método e.waitUntil() se asegura que el Service Worker no se considere instalado hasta que todas las tareas dentro de él hayan 
  finalizado correctamente. En este caso, hasta que se hayan agregado todos los archivos al caché.
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
            .then(() => {
              // Mensaje de confirmación en consola
              console.log("Archivos agregados al caché:", urlsToCache);
              return self.skipWaiting();
            })
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

/* 
1. ¿Qué hace self.addEventListener?
    self: es una referencia al contexto global del Service Worker. Es equivalente a window en el navegador, pero en este caso, funciona dentro del entorno aislado   
          del Service Worker.
    addEventListener: se usa para escuchar eventos que ocurren en el ciclo de vida del Service Worker. 
    
    

2. ¿Qué es el evento activate?
    El evento activate se dispara cuando:

      - El Service Worker ha sido instalado exitosamente.
      - Está listo para reemplazar cualquier Service Worker anterior
    
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

            /* Si cacheName NO está en la lista blanca (cacheWhiteList), "indexOf" devolverá "-1"`. */
            if (cacheWhiteList.indexOf(cacheName) === -1) {
              /* caches.delete(cacheName):
                Si la condición anterior es verdadera (es decir, el caché no está en la lista blanca), se llama a caches.delete(cacheName) para eliminar ese caché del navegador. Esta operación devuelve una promesa que indica que el caché se ha 
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
      .then(() => {
        console.log("Service Worker activo y listo para controlar clientes.");
        return self.clients.claim();
      })
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

/* 

Evento "fetch":
Este fragmento de código gestiona el evento fetch en un Service Worker dentro de una Progressive Web App (PWA). El objetivo del código es interceptar las solicitudes de red de la aplicación y responder con los archivos que ya están en el caché o, si no están en el caché, realizar la solicitud a la red (internet). 


*/

/* self.addEventListener("fetch", (e) => { ... }):
        Este código escucha el evento fetch, que se activa cada vez que la aplicación realiza
        una solicitud de red. Cada vez que el navegador pide algún recurso (como una página
        HTML, una imagen o un archivo CSS), el Service Worker intercepta la solicitud con 
        este evento. */

// ... (resto del código)

/* 
self.addEventListener("fetch", (e) => {...}):
  - Registra un event listener para el evento "fetch" en el Service Worker. 
    Este evento se activa cada vez que el navegador realiza una solicitud de red (ya sea para obtener una página, imagen, archivo, etc.).
  - El parámetro "e" es el evento de la solicitud, que contiene detalles sobre la solicitud, como la URL que se está solicitando.

*/
self.addEventListener("fetch", (e) => {
  /* e.respondWith(...):
      - Este método es utilizado para proporcionar una respuesta personalizada al evento fetch. 
        Aquí es donde decidimos qué respuesta se debe devolver: puede ser desde la caché o la red.
      - Todo el código dentro de "respondWith" es una promesa que eventualmente devuelve una respuesta. 
  */
  e.respondWith(
    /* caches.match(e.request):
        - caches.match() busca en el caché disponible para ver si ya existe una entrada que coincida con la solicitud que se 
          está realizando (e.request es la solicitud original que se hace).
        - Retorna una promesa que resuelve la respuesta almacenada en caché si existe, o undefined si no se encuentra una coincidencia. 
    */
    caches
      .match(e.request)

      /* .then((res) => {...}):
            - Si caches.match(e.request) devuelve una respuesta (res), es decir, si la solicitud está en la caché:
                - Se imprime en la consola que la respuesta está siendo servida desde la caché con console.log.
                - Se devuelve esa respuesta inmediatamente con return res. 
      */
      .then((res) => {
        if (res) {
          console.log(`Sirviendo desde caché: ${e.request.url}`);
          return res;
        }
        console.log(`Realizando fetch: ${e.request.url}`);
        /*  return fetch(e.request):
              Si el recurso no está en la caché, realizar una solicitud a la red. Es decir, que si el recurso no está en la caché, se 
              realiza una solicitud "fetch" a la red para obtenerlo. */
        return (
          fetch(e.request)
            /* .then((networkResponse) => {...}):
                  Si la solicitud de red es exitosa, networkResponse es la respuesta de la red. 
            */
            .then((networkResponse) => {
              /* networkResponse.clone():
                  Las respuestas de la red solo pueden ser leídas una vez, por lo que se necesita clonarlas si se quiere tanto usar 
                  la respuesta en el código como almacenarla en la caché.
                
                  clonedRespons:
                    Es una copia de la respuesta original que se puede almacenar en la caché sin afectar la respuesta original.
                  
                  */
              // Clonar la respuesta para poder almacenarla en la caché y devolverla
              let clonedResponse = networkResponse.clone();

              // Verificar que el Service Worker solo intente cachear recursos que provienen de una URL segura: https.

              if (e.request.url.startsWith("https://")) {
                /* caches.open(CACHE_NAME):
                  Abre (o crea, si no existe) un caché con el nombre definido por la constante CACHE_NAME.
              */
                caches.open(CACHE_NAME).then((cache) => {
                  /* cache.put(e.request, clonedResponse):
                    Almacenamos la respuesta clonada (clonedResponse) en la caché con la solicitud original (e.request) como clave.
                    Esto permite que futuras solicitudes a la misma URL se sirvan desde la caché.
                */
                  cache.put(e.request, clonedResponse);
                });
              }

              /* Se devuelve la respuesta de la red (networkResponse) después de que se haya almacenado en la caché. */
              return networkResponse;
            })

            /* .catch((err) => {...}):
                  - Si ocurre un error durante el fetch (por ejemplo, si no hay conexión a la red), se captura el error (err).
                  - Se imprime el error en la consola.
                  - Como medida de contingencia, se intenta devolver una página offline (/offline.html) desde la caché, si está disponible. */
            .catch((err) => {
              console.error("Error fetching resource:", err);
            })
        );
      })

      /* .catch((err) => {...}):
            - Si ocurre un error al intentar buscar en la caché (caches.match()), se captura el error (err).
            - Se imprime el error en la consola.
            - De nuevo, como medida de contingencia, se intenta devolver la página offline (/offline.html) desde la caché. */
      .catch((err) => {
        console.error("Error matching en caché", err);

        /* Resumen del flujo:
            - Si la solicitud se encuentra en la caché, se sirve desde allí.
            - Si no se encuentra en la caché, se hace una solicitud a la red.
            - Si la solicitud a la red es exitosa, se guarda la respuesta en la caché para la próxima vez y se devuelve la respuesta de la red.
            - Si ocurre un error (por ejemplo, falta de conexión a internet), se sirve una página offline desde la caché. 
        */
      })
  );
});
