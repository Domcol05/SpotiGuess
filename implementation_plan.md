# Piano di Implementazione - SpotiGuess (Mobile Web App iOS)

SpotiGuess è un gioco musicale web in stile "Heardle / SongPop" progettato espressamente per dispositivi mobile (iPhone Safari/Chrome iOS) con look & feel nativo iOS, architettura audio ibrida con iTunes Search API per i preview clip senza blocchi, modalità Singolo e 1 vs 1 locale (Pass & Play), e 10 brani per partita con 6 scaglioni di tempo.

---

## 1. Architettura e Decisioni Tecniche

### A. Hybrid Audio Engine (Compatibilità iOS Safari)
- **Problematiche iOS:** Spotify Web Playback SDK non supporta Safari Mobile e richiede account Premium + SDK pesante per desktop. Inoltre, iOS richiede che l'audio sia sbloccato da una *user gesture* (tap dell'utente).
- **Soluzione:** 
  - Un unico oggetto singleton `audioPlayer = new Audio()`.
  - Quando l'utente preme il pulsante Play, l'audio viene sbloccato/avviato.
  - Per ciascuna traccia selezionata, l'app interroga la Search API pubblica di iTunes:
    `https://itunes.apple.com/search?term=${encodeURIComponent(artist + ' ' + title)}&entity=song&limit=1`
  - Si ottiene il `previewUrl` (file audio `.m4a` a 256kbps) e `artworkUrl100` (convertibile in 600x600 per copertina HD).
  - Pre-caching intelligente: mentre il giocatore indovina la canzone corrente, l'app pre-carica i dati audio della traccia successiva.
  - Timer preciso: `setTimeout` arresta la riproduzione al termine esatto del millisecondo previsto (`500ms`, `1500ms`, `3000ms`, `5000ms`, `9000ms`, `15000ms`).

### B. Risolutore Playlist Spotify
- Se l'utente incolla un link Spotify (`https://open.spotify.com/playlist/...`), l'app estrae l'ID playlist e interroga l'endpoint `https://open.spotify.com/oembed?url=...` per ottenere il titolo della playlist e metadati.
- In combinazione, includiamo un ricco database di canzoni popolari e un sistema di fallback dinamico per generare la tracklist della playlist Spotify inserita o di quelle più popolari.

### C. Design System iOS Mobile & Temi Dinamici
- **CSS Custom Properties:**
  - Giocatore Singolo / Player A: `--primary: #1db954`, `--primary-gradient: linear-gradient(135deg, #1ed760, #1db954)`, `--primary-glow: rgba(29, 185, 84, 0.3)`.
  - Player B (1 vs 1): `--primary: #8b5cf6`, `--primary-gradient: linear-gradient(135deg, #a78bfa, #8b5cf6)`, `--primary-glow: rgba(139, 92, 246, 0.3)`.
- **UI iOS Look & Feel:**
  - Tipografia: `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif`.
  - Safe Area: `env(safe-area-inset-top)` e `env(safe-area-inset-bottom)` con `viewport-fit=cover`.
  - Raggio di curvatura `border-radius: 24px` e `16px`.
  - Effetti glassmorphism iOS (`backdrop-filter: blur(20px)`), ombre morbide e feedback aptico visivo sui tap.
  - Card centrale misteriosa con tratteggio sottile, animazione di ascolto e rivelazione con effetto flip/fade.

### D. Modalità di Gioco
1. **Modalità Singolo:**
   - 10 brani consecutivi.
   - Punteggio cumulativo (100, 80, 60, 40, 20, 10, 0 pt).
   - Schermata di rivelazione dopo ogni brano + Schermata finale di riepilogo con statistiche.
2. **Modalità 1 vs 1 Locale (Pass & Play):**
   - 10 canzoni totali suddivise a turni alterni: Round 1 (Player A), Round 2 (Player B), ..., Round 10.
   - Cambio tema istantaneo (Verde per A, Viola per B) con badge ben visibile in alto e modal "Passa il telefono a...".
   - Schermata finale podio con proclamazione del vincitore, punteggi a confronto e breakdown dei round.

---

## 2. Database Brani per Categorie Italiane
Includiamo un catalogo curato di oltre 15-20 brani iconici per ciascuna categoria con corrispondenze perfette su iTunes Search:
1. **Misto Italiano:** mix dei classici e hit moderne di tutti i tempi.
2. **Pop Italiana:** Annalisa, Elodie, Fedez, Marco Mengoni, Laura Pausini, Cesare Cremonini, Emma, The Kolors, etc.
3. **Rock Italiano:** Måneskin, Vasco Rossi, Ligabue, Litfiba, Negramaro, PFM, Subsonica, etc.
4. **Rap Italiano:** Marracash, Guè, Sfera Ebbasta, Lazza, Shiva, Geolier, Fabri Fibra, Salmo, Tedua, etc.
5. **Cantautori:** Fabrizio De André, Lucio Battisti, Rino Gaetano, Lucio Dalla, Francesco Guccini, Franco Battiato, Pino Daniele, etc.
6. **Sanremo Hits:** "Due Vite", "Brividi", "Occidentali's Karma", "Zitti e Buoni", "Fai Rumore", "Tango", "Sinceramente", "La Noia", etc.
7. **Indie Italiano:** Calcutta, Gazzelle, Coez, Pinguini Tattici Nucleari, Fulminacci, Coma_Cose, Franco126, etc.

---

## 3. Struttura dei File da Creare

### [NEW] `index.html`
- Metatag per mobile iOS (`viewport`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `theme-color`).
- **Schermata 1:** Selezione Genere e Modalità (Singolo vs 1v1), input link Spotify, sticky footer "Gioca [Genere]".
- **Schermata 2:** Gioco (top bar, turn badge, mistery card, 6 indicatori numerati, play button circolare con timer ad arco, autocomplete search input, tasti "Salta" e "Invia").
- **Schermata 3:** Reveal brano (cover HD, dettagli canzone, pillole tentativi/secondi, tasto riascolta preview, tasto "Prossima Canzone").
- **Schermata 4:** Podio e Risultati finali (Singolo o 1 vs 1 con punteggio comparativo, trofeo, e rigioca).
- **Modal Intermedio:** "Pass & Play" per il passaggio turno in modalità 1 vs 1.

### [NEW] `style.css`
- Design system completo con variabili CSS per il tema dinamico (`--theme-color`, `--theme-gradient`, `--theme-badge`).
- Stile iOS nativo: sfondi chiari eleganti (`#f7f9fa`), glassmorphism, card bianche con ombre sfumate.
- Componente Play Button circolare con pulsazione e anello di progresso SVG sincronizzato con la durata dello step audio.
- Autocomplete dropdown mobile-friendly con scrolling touch fluido.
- Responsiveness e Safe Area iOS (`env(safe-area-inset-bottom)`).

### [NEW] `app.js`
- Database tracce per ciascuna categoria.
- Modulo `AudioEngine`: interroga iTunes Search API, gestisce `audio.play()`, `setTimeout` per il troncamento a 0.5s, 1.5s, 3s, 5s, 9s, 15s, stop e gestione errori/offline.
- Modulo `GameController`: gestione stato partita (10 round), turni Player A / Player B, punteggio progressivo, calcolo statistiche.
- Modulo `Autocomplete`: suggerimenti istantanei mentre si digita, selezione rapida con tap.
- Modulo `SpotifyParser`: gestione link Spotify con estrazione ID e tracklist fallback/oEmbed.

---

## 4. Piano di Verifica e Collaudo

### Verifica Funzionale & Audio
1. **Audio Playback:** Testare la riproduzione di ogni step (0.5s, 1.5s, 3s, 5s, 9s, 15s) verificando che il blocco `pause()` avvenga esattamente al millisecondo previsto e che il pulsante Play torni allo stato di riposo.
2. **Cancellazione / Cambio Step:** Verificare che premendo "Salta", il round avanzi allo step successivo aumentando il tempo ascoltabile.
3. **Punteggio:** Verificare l'assegnazione corretta dei punti (100 al primo tentativo, poi 80, 60, 40, 20, 10, 0 se terminati).
4. **Modalità 1 vs 1:** Verificare l'alternanza esatta dei turni (5 round per Player A e 5 per Player B), la transizione visiva (verde -> viola) e la schermata finale a podio comparativo.
5. **Ricerca e Autocomplete:** Testare la digitazione nella barra di ricerca con visualizzazione dei suggerimenti e selezione immediata.
6. **Schermate e Responsive:** Verificare con il browser subagent su viewport mobile (es. 390x844 iPhone 14/15) l'aderenza ai mockup e l'estetica premium.
