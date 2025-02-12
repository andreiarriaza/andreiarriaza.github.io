/* Se utilizarán funciones anónimas autoejecutables para así poder reutilizar
las funciones en otros proyectos.

Debido a que son funciones anónimas autoejecutables, ya sea consumidas aquí o llevadas a otro proyecto, 
no habrá problema con duplicidad en el nombre de las variables, porque todas las variables
definidas dentro de estas funciones tienen un ámbito o alcance (scope) solamente dentro de ellas, ya que
están encapsuladas. 
*/

/* *********************** Menu *********************** */
((d) => {
  /* El objeto "document" se recibe como un parámetro con el nombre "d". */

  /* El método "querySelector" obtiene un elemento a partir del nombre del selector. Si hay varios 
       elementos con el mismo nombre, solamente obtiene el primero de ellos.  */
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    /*
    Dentro de JavaScript se utilizará el método "firstElementChild.classList.toggle("none")" para agregar y quitar
    automáticamente con cada clic la clase "none" del primer elemento hijo del elemento al que se le asignó
    la clase "menu-btn". El primer elemento hijo es la imagen SVG del botón "hamburguesa". 
    Pero como desde el principio la clase "none" NO ESTÁ ASIGNADA 
    a la imagen SVG del botón "hamburguesa", esto conseguirá que cuando se dé el primer clic sobre el botón del menú
    hamburguesa, se agregue la clase "none" a la imagen del botón "hamburguesa", logrando con esto que dicha imagen se oculte.
  */
    $btnMenu.firstElementChild.classList.toggle("none");

    /*    
        Dentro de JavaScript se utilizará el método "flastElementChild.classList.toggle("none")" para agregar y quitar
    automáticamente con cada clic la clase "none" del último elemento hijo del elemento al que se le asignó
    la clase "menu-btn". El último elemento hijo es la imagen SVG del botón "cerrar". 
    Pero como desde el principio la clase "none" ya está asignada 
    a la imagen SVG del botón "cerrar", esto conseguirá que cuando se dé el primer clic sobre el botón hamburguesa,
    se quite la clase "none" de la imagen del botón "cerrar", logrando con esto que dicha imagen se haga visible.
    */
    $btnMenu.lastElementChild.classList.toggle("none");

    /* Se agrega y elimina dinámicamente la clase "is-active" al elemento que tiene asignada la clase "menu". */
    $menu.classList.toggle("is-active");
  });

  /* *********** Ocultar menú *********** */

  /* Esta delegación de eventos es necesaria cuando se creará una Langin Page (página de destino), 
    es decir, una página que redirige al usuario a otra sección de la misma página, sin abrir otra URL. Esto debido
    a que es necesario programar que, cuando se hay dado clic en una opción del menú, dicho menú se oculte automáticamente. 

    Si no se hiciera este procedimiento, al dar clic en una opción del menú, el menú seguiría siendo visible.  */
  d.addEventListener("click", (e) => {
    /* Se verifica mediante el método "matches()" si el objeto que originó el evento (e.target), NO tiene asignada la clase
      "menu" y si el elemento "a" NO es hijo descendiente de dicha clase. Es decir, se comprueba si NO SE DIO CLIC en algún elemento "a"
      dentro del elemento al que se le asignó la clase "menu".
      
      Si no se dio clic en ningún elemento "a" que sea hijo descendiente del elemento al que se le asignó la clase "menu", 
      se retornará el valor "false", lo cual significa que no pasará absolutamente nada.
      */

    if (!e.target.matches(".menu a")) return false;

    /* Si el anterior "if" se cumple, se retornará falso y el navegador saldrá de la función actual sin ejecutar el código que está
      a continuación. Sin embargo, si el anterior "if" no se cumple, se continuará ejecutando el código que está continuación. No es necesario
      un "else" para el anterior "if", porque el "if" funciona como un interruptor, el cual, en caso de que las condiciones se cumplan, 
      hará que se interrumpa el flujo de la función actual mediante el "return false", pero si las condiciones no se cumplen, 
      entonces la función seguirá ejecutándose con normalidad. */

    /* Se remueve la clase "none" del botón "hamburguesa" para que este sea visible. */
    $btnMenu.firstElementChild.classList.remove("none");

    /* Se agrega la clase "none" del botón "cerrar" para que este se oculte. */
    $btnMenu.lastElementChild.classList.add("none");

    /* Se remueve la clase "is-active" del menú para que este se oculte. */
    $menu.classList.remove("is-active");
  });
})(document); /* Se envía como argumento el objeto "document". */

/* *********** ContactForm *********** */
((d) => {
  const $form = d.querySelector(".contact-form");
  /* Si no existe el formulario ($form), no ejecutamos el resto del código (eso evitará errores en la página mentoría).
  Si no se agregará, y se añadieran más páginas al sitio web (como mentoría), debido a que comparten el mismo script, 
  provocaría un error pues ejecutaría el evento "submit" vacío, sin datos para enviar. 
  
  Si en dado caso una página no tiene formulario de contacto (contact-form), simplemente no se ejecutará el código.
  */
  if (!$form) return;

  const $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  /* Se utiliza la delegación de eventos para agregar el evento "submit" al elemento al que hace
  referencia la variable del DOM llamada "$form". Esto significa que
  cuando se envíe el formulario se ejecutará la Arrow Function indicada.*/
  $form.addEventListener("submit", (e) => {
    /* El método "preventDefault" impide que el formulario se envíe. */
    e.preventDefault();

    /* Se elimina la clase "none" del elemento al que hace referencia la variable
    del DOM llamada "loader". */
    $loader.classList.remove("none");

    /* Se ejecuta la función "fetch" que realizará la petición a la api de "Form Submit" para
    realizar el envío del formulario mediante AJAX. */
    fetch("https://formsubmit.co/ajax/andreiarriaza@gmail.com", {
      /* Se define el método POST como método de envío. */
      method: "POST",
      /* Se envía dentro del atributo "body", una instancia del método FormData y se le envía como argumento
      el objeto "e.target", es decir, el formulario que originó el evento "submit". */
      body: new FormData(e.target),
    })
      /* Si utiliza un operadore ternario:
          - Si la respuesta es correcta (res.ok), se retornará la respuesta (res) convertida en objeto javascript mediante el método "res.json()".
          - Si la propiedad "res.ok" es "falsa", se rechazará el objeto "res" devuelto por la promesa y se ejecutará el método "catch()".

      */
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        /* El objeto "location" permite redirigir al usuario a una URL determinada. 
        Si se utiliza junto con la propiedad "hash", permite redirigir la URL actual hacia el id indicado. 

        En este caso, redirigirá el sitio Web hacia el id llamado "gracias" (es decir, que ubicará
        el foco (target) del sitio Web en el id llamado "gracias"); haciendo esto, 
        se conseguirá que se despliegue la ventana modal de confirmación de envío del formulario. 
        */
        location.hash = "#gracias";
        /* Se resetea el formulario mediante el método "reset()". */
        $form.reset();
      })

      .catch((err) => {
        console.log(err);
        /* Se agrega un operador de cortocircuito. Si la propiedad "statusText" del objeto "err" (error) NO ESTÁ VACÍA, se retornará el valor
           de la propiedad "statusText"; de lo contrario, si la propiedad "statusText" SÍ ESTÁ VACÍa, 
           se desplegará el mensaje de error: "Ocurrió un error al enviar.": */
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente.";
        /* El método "querySelector" únicamente devuelve el primer elemento encontrado. Es decir, que si hay varios elementos a los que se les asignó el selector,
      solamente almacenará la referencia al primero de ellos. */
        /* Se modifica el contenido del primer elemento "h3" que se encuentre dentro del elemento al que se hace referencia medainte la variable "$response". */
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`; /* Se envía como argumento una template string con el contenido de la propiedad "status" del objeto "err"
         y el contenido de la variable "message".*/
      })
      /* El método "finally()" se ejecutará siempre, ya sea que la respuesta sea exitosa o no. */
      .finally(() => {
        /*Se remueve la clase "none" del elemento al que hace referencia la variable del DOM llamada "$loader". */
        $loader.classList.add("none");

        /* setTimeout: recibe  como argumento la función que se va a ejecutar (callback) 
      y recibe además un tiempo expresado en milisegundos. El temporizador "setTimeout()" solamente se ejecuta una vez. 
      
      */
        /* Este temporizador es necesario para que después de "3 segundos", la ventana modal se cierre automáticamente.  */
        setTimeout(() => {
          /* El objeto "location" permite redirigir al usuario a una URL determinada. 
        Si se utiliza junto con la propiedad "hash", permite redirigir la URL actual hacia el id indicado. 

        En este caso, redirigirá el sitio Web hacia el id llamado "close" (es decir, que ubicará
        el foco (target) del sitio Web en el id llamado "close"); haciendo esto, 
        se conseguirá que se cierre la ventana modal de confirmación de envío del formulario.
        
        El id "close" realmente no está asignado a ningún elemento del formulario.
        Se utiliza únicamente para quitar el foco del id "gracias" para que así
        la ventana modal se cierre. 
        */
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);
