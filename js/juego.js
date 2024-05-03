var piezas = document.getElementsByClassName('movil');
var tamWidth  = [190, 195, 200, 400, 130, 20, 100, 80, 80, 120, 120, 135, 150, 50, 130, 70, 70, 70, 100, 60, 130, 40, 30, 15, 70];
var tamHeight = [190, 195, 200, 360, 130, 20,  95, 80, 80, 110, 120, 135, 150, 50, 130, 70, 60, 60, 100, 60, 130, 35, 24, 15, 70];
var posicionesInicialesX = [0,   200, 400, 0,   230, 300, 320, 400, 470,  0,    85,  300,   450,  0,    10,  100,  160,   210, 250,  350,   420,  450,  0,   50,  100];
var posicionesInicialesY = [600, 600, 600, 800, 800, 800, 800, 800, 800, 1000, 1000, 1000, 1000, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1400, 1400, 1400];
var tiempoInicio; // Variable para almacenar el tiempo de inicio
var tiempoTranscurrido = 0; // Variable para almacenar el tiempo transcurrido
var intervalID; // Variable para almacenar el ID del intervalo
// Obtener referencia al botón y al contenedor de felicitaciones
var fireworksButton = document.getElementById("fireworksButton");
var felicidadesContainer = document.getElementById("felicidades");

// Agregar un event listener al botón "Finalizar"
fireworksButton.addEventListener("click", function() {
  // Mostrar los fuegos artificiales
  mostrarFuegosArtificiales();
  // Mostrar el mensaje de felicitaciones con un retraso de 1 segundo
  setTimeout(function() {
    mostrarFelicidades();
  }, 1000);
});

// Función para mostrar los fuegos artificiales
function mostrarFuegosArtificiales() {
  var fireworks = document.getElementsByClassName("firework");
  for (var i = 0; i < fireworks.length; i++) {
    fireworks[i].style.display = "block";
  }
}

// Función para mostrar el mensaje de felicitaciones
function mostrarFelicidades() {
  felicidadesContainer.style.display = "block";
}


// Función para iniciar el contador de tiempo
function iniciarContador() {
  tiempoInicio = Date.now(); // Obtiene el tiempo actual en milisegundos
  // Ejecuta la función actualizarTiempo cada segundo (1000 milisegundos)
  intervalID = setInterval(actualizarTiempo, 1000);
}

// Función para actualizar el tiempo transcurrido y mostrarlo en la página en minutos y segundos
function actualizarTiempo() {
  // Calcula el tiempo transcurrido desde el inicio
  var tiempoActual = Date.now();
  var tiempoTotalSegundos = Math.floor((tiempoActual - tiempoInicio) / 1000); // Convierte a segundos

  // Calcula los minutos y los segundos
  var minutos = Math.floor(tiempoTotalSegundos / 60);
  var segundos = tiempoTotalSegundos % 60;

  // Formatea el tiempo transcurrido
var tiempoFormateado = minutos + " minutos y " + segundos + " segundos";

// Actualiza el contenido del elemento HTML con el tiempo formateado
document.getElementById("tiempoTranscurrido").innerHTML = "<h3>Tiempo transcurrido: " + tiempoFormateado + "</h3>";

}

// Llama a la función iniciarContador() para comenzar a medir el tiempo
iniciarContador();

// Agrega un event listener al botón "Finalizar" para detener el contador de tiempo
document.getElementById("fireworksButton").addEventListener("click", function() {
  clearInterval(intervalID); // Detiene el intervalo
});



for (var i = 0; i < piezas.length; i++) {
  piezas[i].setAttribute("width", tamWidth[i]);
  piezas[i].setAttribute("height", tamHeight[i]);
  piezas[i].setAttribute("x", posicionesInicialesX[i]);
  piezas[i].setAttribute("y", posicionesInicialesY[i]);
  piezas[i].addEventListener("touchstart", function(evt) { // Modificación aquí
    seleccionarElemento(evt);
  });
}

function seleccionarElemento(evt) {
  elementSelect = evt.target;
  currentX = evt.touches[0].clientX; // Modificación aquí
  currentY = evt.touches[0].clientY; // Modificación aquí
  currentPosX = parseFloat(elementSelect.getAttribute("x"));
  currentPosY = parseFloat(elementSelect.getAttribute("y"));
  elementSelect.addEventListener("touchmove", function(evt) { // Modificación aquí
    moverElemento(evt);
  });
  elementSelect.addEventListener("touchend", function(evt) { // Modificación aquí
    deseleccionarElemento(evt);
  });
}

function moverElemento(evt) {
  if (elementSelect) {
    var dx = evt.touches[0].clientX - currentX; // Modificación aquí
    var dy = evt.touches[0].clientY - currentY; // Modificación aquí
    currentPosX += dx;
    currentPosY += dy;
    elementSelect.setAttribute("x", currentPosX);
    elementSelect.setAttribute("y", currentPosY);
    currentX = evt.touches[0].clientX; // Modificación aquí
    currentY = evt.touches[0].clientY; // Modificación aquí

    // Reproducir el sonido
    var sound = document.getElementById("sound");
    sound.currentTime = 0; // Reiniciar el sonido para que pueda reproducirse nuevamente
    sound.play();
  }
}

// Función para deseleccionar el elemento y mostrar el modal correspondiente
function deseleccionarElemento(evt) {
  var elementoSuelto = evt.target; // Obtener el elemento soltado directamente del evento
  if (elementoSuelto) {
    var modalId = elementoSuelto.getAttribute("data-modal-id");
    if (modalId) {
      // Mostrar el modal al soltar la imagen
      var modal = new bootstrap.Modal(document.getElementById(modalId));
      modal.show();
    }
  }
}

var entorno = document.getElementById('entorno');

function reordenar(evt) {
  var padre = evt.target.parentNode;
  var clone = padre.cloneNode(true);
  var id = padre.getAttribute("id");
  entorno.removeChild(document.getElementById(id));
  entorno.appendChild(clone);
  return entorno.lastChild.firstChild;
}

var origX = posicionesInicialesX.slice(); // Copiar el arreglo de posiciones iniciales
var origY = posicionesInicialesY.slice(); // Copiar el arreglo de posiciones iniciales

function iman() {
  for (var i = 0; i < piezas.length; i++) {
    if (Math.abs(currentPosX - origX[i]) < 15 && Math.abs(currentPosY - origY[i]) < 15) {
      elementSelect.setAttribute("x", origX[i]);
      elementSelect.setAttribute("y", origY[i]);
    }
  }
}

var confeti = document.getElementsByClassName("confetti");

function testing() {
  var bienUbicada = 0;
  var padres = document.getElementsByClassName('padre');
  for (var i = 0; i < piezas.length; i++) {
    var posX = parseFloat(padres[i].firstChild.getAttribute("x"));
    var posY = parseFloat(padres[i].firstChild.getAttribute("y"));
    ide = padres[i].getAttribute("id");
    if (origX[ide] == posX && origY[ide] == posY) {
      bienUbicada = bienUbicada + 1;
    }
  }
  if (bienUbicada === 10) {
    confeti[0].play();
  }
}

/*
 // Espera a que el DOM esté completamente cargado
 document.addEventListener('DOMContentLoaded', function () {
  // Obtiene una lista de todos los elementos <g> con la clase "padre"
  var gElements = document.querySelectorAll('.padre');
  // Itera sobre todos los elementos <g>
  gElements.forEach(function (element, index) {
    // Agrega un evento de clic a cada elemento <g>
    element.addEventListener('click', function () {
      // Muestra el modal correspondiente según el índice del elemento
      var modalId = "completadoModal" + (index + 1);
      var modal = new bootstrap.Modal(document.getElementById(modalId));
      modal.show();
    });
  });
});*/

var padres = document.querySelectorAll('.padre');
padres.forEach(function(padre, index) {
    var img = padre.querySelector('image');
    img.setAttribute('data-modal-id', 'completadoModal' + (index + 1));
});
