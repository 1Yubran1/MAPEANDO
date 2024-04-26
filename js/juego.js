var piezas = document.getElementsByClassName('movil');
var tamWidth  = [190, 195, 200, 400, 130, 20, 100, 80, 80, 120, 120, 135, 150, 50, 130, 70, 70, 70, 100, 60, 130, 40, 30, 15, 70];
var tamHeight = [190, 195, 200, 360, 130, 20,  95, 80, 80, 110, 120, 135, 150, 50, 130, 70, 60, 60, 100, 60, 130, 35, 24, 15, 70];
var posicionesInicialesX = [0,   200, 400, 550, 800, 0,   50,  150, 250, 350, 450, 550,  0,  150, 200, 350, 450, 550, 650, 750, 200, 850, 0,    50,   100];
var posicionesInicialesY = [600, 600, 600, 600, 600, 800, 800, 800, 800, 800, 800, 800, 900, 900, 900, 950, 950, 950, 950, 950, 980, 950, 1100, 1100, 1100];

for (var i = 0; i < piezas.length; i++) {
  piezas[i].setAttribute("width", tamWidth[i]);
  piezas[i].setAttribute("height", tamHeight[i]);
  piezas[i].setAttribute("x", posicionesInicialesX[i]);
  piezas[i].setAttribute("y", posicionesInicialesY[i]);
  piezas[i].addEventListener("mousedown", function(evt) {
    seleccionarElemento(evt);
  });
}

var elementSelect = null;
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function seleccionarElemento(evt) {
  elementSelect = evt.target;
  currentX = evt.clientX;
  currentY = evt.clientY;
  currentPosX = parseFloat(elementSelect.getAttribute("x"));
  currentPosY = parseFloat(elementSelect.getAttribute("y"));
  elementSelect.addEventListener("mousemove", function(evt) {
    moverElemento(evt);
  });
  elementSelect.addEventListener("mouseup", function(evt) {
    deseleccionarElemento(evt);
  });
}

function moverElemento(evt) {
  if (elementSelect) {
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentPosX += dx;
    currentPosY += dy;
    elementSelect.setAttribute("x", currentPosX);
    elementSelect.setAttribute("y", currentPosY);
    currentX = evt.clientX;
    currentY = evt.clientY;

    // Reproducir el sonido
    var sound = document.getElementById("sound");
    sound.currentTime = 0; // Reiniciar el sonido para que pueda reproducirse nuevamente
    sound.play();
  }
}


function deseleccionarElemento(evt) {
  if (elementSelect) {
    elementSelect.removeEventListener("mousemove", moverElemento);
    elementSelect.removeEventListener("mouseup", deseleccionarElemento);
    elementSelect = null;
    iman(); // Llamar a la función iman() después de soltar el elemento
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
});
