"use strict"
//Valori generali
const tabellone = document.getElementById("game-board");
let primaCarta = null;
let secondaCarta = null;
let bloccaTabellone = false;

// Genera array di coppie di numeri casuali per una matrice quadrata di lato N
function generaArrayCoppie(lato) {
  const numCoppie = (lato * lato) / 2;
    const matriceValori = [];
  for(let i = 1; i <= numCoppie; i++) {
    matriceValori.push(i, i); // Ogni valore due volte
  }
  // Mischia l'array
  return matriceValori.sort(() => 0.5 - Math.random());
}

// Costruisce la matrice e la inserisce nella pagina
function creaTabellone(lato) {
  tabellone.innerHTML = ""; // Pulisce il tabellone
  const arrayCarte = generaArrayCoppie(lato);

  for(let i = 0; i < lato * lato; i++) {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.simbolo = arrayCarte[i];
    carta.textContent = '';
    carta.addEventListener("click", giraCarta); // Corretto qui
    tabellone.appendChild(carta);
  }
  // Imposta la griglia CSS (assicurati che il CSS usi grid)
  tabellone.style.display = "grid";
  tabellone.style.gridTemplateColumns = `repeat(${lato}, 1fr)`;
}

function giraCarta() {
  if (bloccaTabellone) return;
  if (this === primaCarta) return;
  
  this.classList.add("girata");
  this.textContent = this.dataset.simbolo;

  if (!primaCarta) {
    primaCarta = this;
    return;
  }

  secondaCarta = this;
  bloccaTabellone = true;

  controllaCoppia();
}

function controllaCoppia() {
  let coppia = primaCarta.dataset.simbolo === secondaCarta.dataset.simbolo;

  if (coppia) {
    disabilitaCarte();
  } else {
    rigiraCarte();
  }
}

function disabilitaCarte() {
  primaCarta.removeEventListener("click", giraCarta);
  secondaCarta.removeEventListener("click", giraCarta);
  resettaTabellone();
}

function rigiraCarte() {
  setTimeout(() => {
    primaCarta.classList.remove("girata");
    secondaCarta.classList.remove("girata");
    primaCarta.textContent = '';
    secondaCarta.textContent = '';
    resettaTabellone();
  }, 1000);
}

function resettaTabellone() {
  primaCarta = null;
  secondaCarta = null;
  bloccaTabellone = false;
}

// Chiedi il lato della matrice e avvia il gioco
let lato = 0;
do {
  lato = parseInt(prompt("Inserisci il lato della matrice quadrata (deve essere pari): "));
} while (isNaN(lato) || lato % 2 !== 0 || lato < 2);

creaTabellone(lato);