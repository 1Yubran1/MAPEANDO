var piezas = document.getElementsByClassName('movil');
var tamWidth  = [190, 195, 200, 400, 130, 20, 100, 80, 80, 120, 120, 135, 150, 50, 130, 70, 70, 70, 100, 60, 130, 40];
var tamHeight = [190, 195, 200, 360, 130, 20,  95, 80, 80, 110, 120, 135, 150, 50, 130, 70, 60, 60, 100, 60, 130, 35];
var posicionesInicialesX = [0,   200, 400, 600, 800, 0,   200, 400, 600, 800,    0,  200,  400,  600,  800,    0,  200,  400,  600,  800,  200,  600];
var posicionesInicialesY = [600, 600, 600, 600, 600, 800, 800, 800, 800, 800, 1000, 1000, 1000, 1000, 1000, 1200, 1200, 1200, 1200, 1200, 1300, 1300];

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

// Definir las variables para controlar si los modales ya se han mostrado
var modal1Mostrado = false;
var modal2Mostrado = false;

// Escuchar el evento de deselección de la imagen para el primer modal
document.addEventListener("mouseup", function(evt) {
  // Verificar si el evento ocurrió fuera de la imagen y el modal aún no se ha mostrado
  if (evt.target.classList.contains('movil') && !modal1Mostrado) {
    mostrarModal1();
    modal1Mostrado = true; // Establecer la bandera a true para indicar que el modal se ha mostrado
  }
});

// Función para mostrar el primer modal
function mostrarModal1() {
  var modal = new bootstrap.Modal(document.getElementById('completadoModal'));
  modal.show();

  // Agregar un evento al modal para restablecer la bandera cuando se cierre el modal
  modal.addEventListener('hidden.bs.modal', function () {
    modal1Mostrado = false; // Establecer la bandera a false cuando se cierre el modal
  });
}

// Escuchar el evento de deselección de la imagen para el segundo modal
document.addEventListener("mouseup", function(evt) {
  // Verificar si el evento ocurrió fuera de la imagen y el modal aún no se ha mostrado
  if (evt.target.classList.contains('movil') && !modal2Mostrado) {
    mostrarModal2();
    modal2Mostrado = true; // Establecer la bandera a true para indicar que el modal se ha mostrado
  }
});

// Función para mostrar el segundo modal
function mostrarModal2() {
  var modal = new bootstrap.Modal(document.getElementById('completadoModal2'));
  modal.show();

  // Agregar un evento al modal para restablecer la bandera cuando se cierre el modal
  modal.addEventListener('hidden.bs.modal', function () {
    modal2Mostrado = false; // Establecer la bandera a false cuando se cierre el modal
  });
}

