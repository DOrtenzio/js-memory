# Gioco del Memory

![Schermata del gioco](https://github.com/user-attachments/assets/ae69b82f-bc4d-4e6c-aa61-2c57ce95964a)

## Indice

- [Descrizione](#descrizione)
- [Funzionalità](#funzionalità)
- [Struttura del progetto](#struttura-del-progetto)
- [Come si gioca](#come-si-gioca)
- [Personalizzazione](#personalizzazione)
- [Screenshot](#screenshot)
- [Crediti](#crediti)

---

## Descrizione

Questo progetto è una semplice implementazione del classico **Gioco del Memory** realizzata in HTML, CSS e JavaScript. L'obiettivo è trovare tutte le coppie di carte uguali nel minor numero di mosse possibile.

## Funzionalità

- Scelta dinamica della dimensione della griglia (solo valori pari).
- Animazioni di flip delle carte.
- Conteggio delle coppie trovate.
- Overlay di vittoria con GIF e pulsanti per ricominciare o cambiare layout.
- Responsive design.

## Struttura del progetto

```
memory_js/
├── index.html         # Pagina principale del gioco
├── script.js          # Logica del gioco in JavaScript
├── style.css          # Stili CSS
├── vittoria.gif       # GIF di vittoria
├── vittoria.jpg       # Immagine alternativa di vittoria
README.md              # Documentazione del progetto
```

## Come si gioca

1. Apri `index.html` in un browser moderno.
2. Inserisci il lato della matrice (numero pari, es: 4, 6, 8).
3. Clicca sulle carte per scoprire le coppie.
4. Trova tutte le coppie per vincere!
5. Alla vittoria puoi scegliere se ricominciare o modificare il layout.

## Personalizzazione

- **Numero di carte**: Modifica il prompt iniziale per cambiare la dimensione della griglia.
- **Emoji**: Puoi cambiare o aggiungere emoji nell'array `emojiArray` in [`script.js`](memory_js/script.js).
- **Immagini di vittoria**: Sostituisci `vittoria.gif` o usa `vittoria.jpg` per cambiare l'immagine di vittoria.

## Screenshot
> v2
![image](https://github.com/user-attachments/assets/ae69b82f-bc4d-4e6c-aa61-2c57ce95964a)
> v1
![image](https://github.com/user-attachments/assets/5d68544e-9df2-4678-8dfb-18e84cb7e000)

## Crediti

- Sviluppo: Moneoo
- Emoji: Unicode
- GIF di vittoria: PicMix / Pinterest

---

