

//ID ETC

function rellenarFormularioUsuario(){
  document.getElementById("nick").value=nick;
  document.getElementById("avatarImg").src=avatarImg;
  tamanoPanel=parseInt(tamano);
}


////////////////////////////////////////MEMORY/////////////////////////////////////////////////////////

const cards = document.querySelectorAll('.memory-card');

const oakCard = document.getElementById('oak-card');

oakCard.addEventListener('click', resetAndShuffleCards);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1300);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

// Función para restablecer y mezclar las cartas
function resetAndShuffleCards() {
  if (lockBoard) return;

  // Voltea todas las cartas a la back-face, incluyendo la carta "oak-card"
  cards.forEach(card => {
      card.classList.remove('flip'); // Desvoltea todas las cartas
  });

  // Restablece la memoria de las cartas emparejadas
  cards.forEach(card => {
      card.classList.remove('match');
  });

  // Vuelve a habilitar los eventos de clic en todas las cartas
  cards.forEach(card => {
      card.addEventListener('click', flipCard);
  });

  setTimeout(() => {
      // Mezcla las cartas después de un breve retraso
      cards.forEach(card => {
          card.classList.remove('flip'); // Desvoltea las cartas
      });

      setTimeout(() => {
          cards.forEach(card => {
              let randomPos = Math.floor(Math.random() * 12);
              card.style.order = randomPos;
          });
      }, 300); // Puedes ajustar el tiempo de mezcla si lo deseas
  }, 1000); // Puedes ajustar el tiempo de espera antes de desvoltear
}

///////////// CUENTA TIRADAS y PUNTOS //////
// ...

let tiradasRestantes = 1; // Inicializamos el contador de tiradas
let parejasEncontradas = 0; // Inicializamos el contador de parejas encontradas

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  if (isMatch) {
    disableCards();
    incrementarPuntos(); // Incrementamos el contador de puntos al encontrar una pareja
  } else {
    unflipCards();
    decrementarTirada(); // Descontamos una tirada al voltear dos cartas diferentes
  }
}

function incrementarPuntos() {
  parejasEncontradas++;
  document.getElementById('puntos').value = parejasEncontradas;

  // MENSAJE VICTORIA
    if (parejasEncontradas === 12) {
      // Mostrar el mensaje y el botón de "Jugar de nuevo"
      const winMessage = document.getElementById('winMessage');
      winMessage.style.display = 'block'; // Mostrar el mensaje

      const playAgainButton = document.getElementById('playAgainButton');
      playAgainButton.addEventListener('click', () => {
        // Aquí puedes agregar lógica para reiniciar el juego
        resetPoints();
        resetTiradas();
        resetAndShuffleCards();

        // Ocultar el mensaje nuevamente
        winMessage.style.display = 'none';
      });
    }
  
}

function decrementarTirada() {
  tiradasRestantes--;
  document.getElementById('tiradas').value = tiradasRestantes;

  if (tiradasRestantes === 0) {
    // MENSAJE DERROTA
    const loseMessage = document.getElementById('loseMessage');
    loseMessage.style.display = 'block';

    const playAgainButtonLose = document.getElementById('playAgainButtonLose');
    playAgainButtonLose.addEventListener('click', () => {
      // Aquí puedes agregar lógica para reiniciar el juego
      resetPoints();
      resetTiradas();
      resetAndShuffleCards();

      // Ocultar el mensaje nuevamente
      loseMessage.style.display = 'none';
    });
  }
}

//////////// SI SALE OAK -> 0 puntos ///////////////

oakCard.addEventListener('click', () => {
  resetPoints();
  resetTiradas();
  resetAndShuffleCards();
});


function resetPoints() {
  parejasEncontradas = 0;
  document.getElementById('puntos').value = parejasEncontradas;
}

function resetTiradas() {
  tiradasRestantes = 30; 
  document.getElementById('tiradas').value = tiradasRestantes;
}




/////// DATOS USUARIO /////////

//Capturamos datos usuario
getDatosUsuario();

//Comprobamos datos
if(!comprobacionDatosUsuario()) location="index.html";

//rellenar form
rellenarFormularioUsuario();



