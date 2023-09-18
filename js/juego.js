
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
        card.classList.add('flip'); // Voltea todas las cartas
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


///////////////////////////////////////////////////////////////////////////////////////

//Capturamos datos usuario
getDatosUsuario();

//Comprobamos datos
if(!comprobacionDatosUsuario()) location="index.html";

//rellenar form
rellenarFormularioUsuario();
pintarPanelJuego();
programarEventosJuego();


