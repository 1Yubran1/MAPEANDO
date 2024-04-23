var piezas = document.getElementsByClassName('movil');
var tamWidth  = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
var tamHeight = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50];
var posicionesInicialesX = [0,    50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550, 0, 50, 100, 150, 200, 350, 400, 450, 500, 550];
var posicionesInicialesY = [600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 600, 700, 700, 700, 700, 700, 700, 700, 700, 700, 700];


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
