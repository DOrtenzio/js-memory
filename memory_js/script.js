"use strict"

//Valori generali
const tabellone = document.getElementById("game-board");
const gameBoard = document.getElementById('game-board');
const counter = document.getElementById('counter');

// Variabili per il punteggio e il numero di coppie trovate
let coppieTrovate = 0;
let coppieTotali=0; 

// Variabili per le carte
let primaCarta = null;
let secondaCarta = null;
let bloccaTabellone = false;

// Genera array di coppie di numeri casuali per una matrice quadrata di lato N
function generaArrayCoppie(lato) {
  const matriceValori = [];
  for(let i = 1; i <= ((lato * lato) / 2); i++) matriceValori.push(i, i); // Ogni valore due volte
  return matriceValori.sort(() => 0.5 - Math.random()); // Mischia l'array
}

function creaTabellone(lato) {
  const gameBoard = document.getElementById('game-board');
  gameBoard.style.gridTemplateColumns = `repeat(${lato}, 1fr)`; // Imposta le colonne
  gameBoard.innerHTML = ''; // Pulisce il tabellone

  const simboli = generaArrayCoppie(lato); // Genera simboli casuali

  for (let i = 0; i < lato * lato; i++) {
    const carta = document.createElement('div');
    carta.classList.add('carta'); // Classe generica per lo stile, puoi rimuovere 'disabilitata' se non serve
    carta.dataset.index = i;
    carta.dataset.simbolo = simboli[i]; // Assegna simbolo
    carta.addEventListener('click', giraCarta); // Aggiunge il listener per girare la carta
    gameBoard.appendChild(carta);
  }
}

function giraCarta() {
  if (bloccaTabellone) return; // Non permette di cliccare se il tabellone è bloccato
  if (this === primaCarta) return; // Non permette di cliccare due volte la stessa carta
  
  this.classList.add("girata"); // Aggiunge la classe per girare la carta visibilmente
  this.textContent = this.dataset.simbolo; // Mostra il "simbolo" della carta --> numero

  if (!primaCarta) { // Se non c'è una carta selezionata
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
    coppieTrovate++; // Incrementa il contatore delle coppie trovate
    aggiornaCounter(); // Aggiorna il contatore nel DOM

    if (coppieTrovate === coppieTotali) {
      mostraOverlayVittoria(); // <-- nuova funzione
    }
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
    primaCarta.textContent = ''; // Nasconde il numero
    secondaCarta.textContent = '';
    resettaTabellone();
  }, 1000);
}

function resettaTabellone() {
  primaCarta = null;
  secondaCarta = null;
  bloccaTabellone = false;
}

// Aggiorna il contatore
function aggiornaCounter() {
  const counter = document.getElementById('counter');
  counter.textContent = `Coppie trovate: ${coppieTrovate} / ${coppieTotali}`;
}

function mostraOverlayVittoria() {
  const overlay = document.getElementById('overlay-vittoria');
  overlay.style.display = 'flex';
}


// Chiedi il lato della matrice e avvia il gioco
let lato = 0;
do {
  lato = parseInt(prompt("Inserisci il lato della matrice quadrata (deve essere pari): "));
} while (isNaN(lato) || lato % 2 !== 0 || lato < 2); // Deve essere un numero pari e maggiore di 2
coppieTotali = (lato * lato) / 2; // Calcola il numero totale di coppie

creaTabellone(lato);

// Inizializza il contatore all'avvio del gioco
aggiornaCounter();