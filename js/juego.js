// Variable global para tiradasRestantes
let tiradasRestantes;
// Variable global para la dificultad seleccionada
let selectedDifficulty;

document.addEventListener('DOMContentLoaded', function () {
  // Obtén la dificultad seleccionada del almacenamiento local
  selectedDifficulty = localStorage.getItem('difficulty');

  if (selectedDifficulty === '30') {
    document.getElementById('tiradas').value = '30';
    tiradasRestantes = 30; // Asigna 30 a tiradasRestantes para dificultad fácil
  } else if (selectedDifficulty === '20') {
    document.getElementById('tiradas').value = '20';
    tiradasRestantes = 20; // Asigna 20 a tiradasRestantes para dificultad difícil
  }

  // Restablecer y mezclar cartas al cargar la página
  resetAndShuffleCards();
});

// IDs, etc.

function rellenarFormularioUsuario() {
  document.getElementById("nick").value = nick;
  document.getElementById("avatarImg").src = avatarImg;
}

// MEMORY

const cards = document.querySelectorAll('.memory-card');

const oakCard = document.getElementById('oak-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard;
let secondCard;

cards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  // Verifica si la carta clicada es "oak"
  if (this === oakCard) {
    resetGame(); // Llama a la función de reseteo del juego
    return;
  }

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

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  // Determina el tiempo de giro de la carta en función de la dificultad
  let flipTime = (selectedDifficulty === '30') ? 1300 : 300;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, flipTime);
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

// RESTABLECER Y MEZCLAR CARTAS
function resetAndShuffleCards() {
  if (lockBoard) return;

  // Voltear todas las cartas
  cards.forEach(card => {
    card.classList.remove('flip');
  });

  // Restablecer memoria de cartas emparejadas
  cards.forEach(card => {
    card.classList.remove('match');
  });

  // Rehabilitar el clic en todas las cartas
  cards.forEach(card => {
    card.addEventListener('click', flipCard);
  });

  // Gira la carta de Oak antes de mezclar las cartas
  oakCard.classList.add('flip');

  setTimeout(() => {
    // Retraso mezcla
    cards.forEach(card => {
      card.classList.remove('flip');
    });

    setTimeout(() => {
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
      });
    }, 300);

    // Restablecer la cantidad de tiradas según la dificultad seleccionada
    if (selectedDifficulty === '30') {
      tiradasRestantes = 30;
    } else if (selectedDifficulty === '20') {
      tiradasRestantes = 20;
    }

    document.getElementById('tiradas').value = tiradasRestantes;
  }, 1000);
}

// CUENTA TIRADAS Y PUNTOS

let parejasEncontradas = 0;

function incrementarPuntos() {
  parejasEncontradas++;
  document.getElementById('puntos').value = parejasEncontradas;

  // MENSAJE VICTORIA
  if (parejasEncontradas === 12) {
    // "Jugar de nuevo"
    const winMessage = document.getElementById('winMessage');
    winMessage.style.display = 'block'; // Mostrar el mensaje

    const playAgainButton = document.getElementById('playAgainButton');
    playAgainButton.addEventListener('click', () => {
      resetPoints();
      resetTiradas();
      resetAndShuffleCards();

      winMessage.style.display = 'none';
    });
  }
}

function decrementarTirada() {
  if (tiradasRestantes > 0) {
    tiradasRestantes--;
    document.getElementById('tiradas').value = tiradasRestantes;
  }

  if (tiradasRestantes === 0) {
    // MENSAJE DE DERROTA
    const loseMessage = document.getElementById('loseMessage');
    loseMessage.style.display = 'block';

    const playAgainButtonLose = document.getElementById('playAgainButtonLose');
    playAgainButtonLose.addEventListener('click', () => {
      resetPoints();
      resetTiradas();
      resetAndShuffleCards();
      loseMessage.style.display = 'none';
    });
  }
}

// SI SALE OAK -> 0 puntos

oakCard.addEventListener('click', resetGame);

function resetGame() {
  resetPoints();
  resetTiradas();
  resetAndShuffleCards();
  resetBoard(); // Reinicia los clics acumulados
}

function resetPoints() {
  parejasEncontradas = 0;
  document.getElementById('puntos').value = parejasEncontradas;
}

function resetTiradas() {
  if (selectedDifficulty === '30') {
    tiradasRestantes = 30;
  } else if (selectedDifficulty === '20') {
    tiradasRestantes = 20;
  }
  document.getElementById('tiradas').value = tiradasRestantes;
}

// DATOS USUARIO

// Capturamos datos usuario
getDatosUsuario();

// Comprobamos datos
if (!comprobacionDatosUsuario()) location = "index.html";

// Rellenar formulario
rellenarFormularioUsuario();
