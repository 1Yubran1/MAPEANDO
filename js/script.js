document.addEventListener("DOMContentLoaded", function() {
    const map = document.getElementById('map');
  
    // Función para mostrar el modal cuando se coloca una pieza
    function showModal() {
      const myModal = new bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
    }
  
    // Crear las 22 piezas del rompecabezas
    for (let i = 0; i < 22; i++) {
      const piece = document.createElement('div');
      piece.classList.add('piece');
      piece.style.left = `${Math.random() * 750}px`; // Posición horizontal aleatoria
      piece.style.top = `${Math.random() * 550}px`; // Posición vertical aleatoria
      piece.addEventListener('click', showModal); // Mostrar el modal cuando se hace clic en la pieza
      map.appendChild(piece);
    }
  });
  