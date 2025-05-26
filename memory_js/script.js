"use strict"

/*VALORI GENERALI*/
const gameBoard = document.getElementById('game-board');
const counter = document.getElementById('counter');
const emojiArray = [
  "🐶", "🐱", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷",
  "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦆", "🦅", "🦉", "🦇",
  "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜",
  "🕷️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐",
  "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊"
];
// Variabili per il punteggio e il numero di coppie trovate
let coppieTrovate = 0;
let coppieTotali=0; 
// Variabili per le carte
let primaCarta = null;
let secondaCarta = null;
let bloccaTabellone = false;


/*MAIN*/

// Chiedi il lato della matrice e avvia il gioco
let lato = 0;
do {
  lato = parseInt(prompt("Inserisci il lato della matrice quadrata (deve essere pari): "));
} while (isNaN(lato) || lato % 2 !== 0 || lato < 2 || (lato * lato) / 2 > 49);
coppieTotali = (lato * lato) / 2; // Calcola il numero totale di coppie

creaTabellone(lato);
aggiornaCounter(-1); // Inizializza il contatore all'avvio del gioco


/*CREAZIONE DELLE CARTE E DELLA TABELLA*/
function creaTabellone(lato){
  creaCarte(lato); // Crea le carte con i simboli
  posizionaCarte(lato); // Crea il tabellone con le carte
}

function creaCarte(lato) {
  const numCoppie = (lato * lato) / 2; // Calcola il numero di coppie necessarie in base al lato della matrice
  if (numCoppie > 49) { 
    alert("Massimo 49 coppie consentite (max 98 carte). Riduci la dimensione della griglia.");
    chiudiModificaLayout();
  }

  const simboliDisponibili = emojiArray.slice(0, numCoppie); // Prende i primi `numCoppie` simboli dall'array di emoji
  // Inizializza un array vuoto per contenere i simboli duplicati
  const matriceValori = [];
  for (let element of simboliDisponibili) {
    matriceValori.push(element, element); // Aggiunge ogni simbolo due volte per creare le coppie
  }
  return matriceValori.sort(() => 0.5 - Math.random()); // Mischia casualmente l'array e lo restituisce
}

function posizionaCarte(lato) {
  gameBoard.style.gridTemplateColumns = `repeat(${lato}, 1fr)`; // Imposta le colonne
  gameBoard.innerHTML = ''; // Pulisce l'html in caso di avanzi

  const simboli = creaCarte(lato); // Genera simboli casuali
  for (let i = 0; i < lato * lato; i++) {
    const carta = document.createElement('div');
    carta.classList.add('carta'); // Classe generica per lo stile
    carta.dataset.simbolo = simboli[i]; // utilizzati per memorizzare informazioni personalizzate direttamente negli elementi HTML.
    carta.addEventListener('click', giraCarta); // Aggiunge il listener per girare la carta
    gameBoard.appendChild(carta);
  }
}



/*FUNZIONI PER AZIONI IN GAME*/
function giraCarta() {
  if (bloccaTabellone) return; // Non permette di cliccare se il tabellone è bloccato (Blocco attivato da due carte girate)
  if (this === primaCarta) return; // Non permette di cliccare due volte la stessa carta
  
  this.classList.add("girata"); // Aggiunge la classe css per girare la carta visibilmente
  this.textContent = this.dataset.simbolo;

  if (!primaCarta) { // Se non c'è una carta selezionata
    primaCarta = this;
  } else { // Se c'è già una carta selezionata
    secondaCarta = this;
    bloccaTabellone = true;
    controllaCoppia();
  }
  return;
}

function controllaCoppia() {
  if (!primaCarta || !secondaCarta) return; // Se non ci sono due carte selezionate, esce dalla funzione
  else{
    if (primaCarta.dataset.simbolo == secondaCarta.dataset.simbolo) {
      disabilitaCarte();
      aggiornaCounter(1); // Aggiorna il contatore anche nel html
      if (coppieTrovate === coppieTotali) {
        mostraOverlayVittoria(); // Fine partita
      }
    } else {
      rigiraCarte();
    }
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

function aggiornaCounter(valContatore) {
  if (valContatore == -1) {
    coppieTrovate=0; // Inizializza il contatore all'avvio del gioco
  }else{
    coppieTrovate+=valContatore;
    counter.textContent = `Coppie trovate: ${coppieTrovate} / ${coppieTotali}`;
  }
}

/*Overlay Vittoria*/
function mostraOverlayVittoria() {
  const overlay = document.getElementById('overlay-vittoria');
  overlay.style.display = 'flex';
}

function chiudiOverlayVittoria() {
  const overlay = document.getElementById('overlay-vittoria');
  overlay.style.display = 'none';
  // Reset del gioco
  aggiornaCounter(-1);
  creaTabellone(lato);
}

function chiudiModificaLayout(){
  location.reload();
}