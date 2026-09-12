# 🎵 SpotiGuess - Il Gioco Musicale Italiano (Heardle / SongPop)

**SpotiGuess** è una Mobile Web App (PWA) in stile *Heardle / SongPop*, progettata con design e look & feel nativo iOS (Safari e Chrome iOS), per indovinare canzoni italiane dal primo secondo di ascolto.

---

## 📱 Caratteristiche Principali

- **Hybrid Music Engine (iOS Safari Friendly):** 
  - Compatibilità mobile nativa: aggira i limiti dello Spotify SDK su iPhone sfruttando l'API pubblica di iTunes Search (`previewUrl` in `.m4a` a 256kbps e copertine HD 600x600).
  - Gestione audio istantanea con `new Audio()` nativo e interruzioni millimetriche con `setTimeout` (0.5s, 1.5s, 3s, 5s, 9s, 15s).
  - Pre-caching intelligente delle tracce per azzerare i tempi di caricamento.
- **Design System iOS Mobile:**
  - Layout centrato ottimizzato a 420px (dimensioni iPhone).
  - Supporto alle Safe Area iOS (`padding-bottom: env(safe-area-inset-bottom)` e `viewport-fit=cover`).
  - Card glassmorphism, angoli arrotondati a 24px, font SF Pro / Inter e feedback aptico visivo.
- **Modalità di Gioco:**
  - 👤 **Singolo:** 10 brani per scalare il record di punteggio (fino a 1000 pt).
  - 👥 **1 vs 1 Locale (Pass & Play):** Due giocatori condividono lo stesso iPhone a turni alterni (10 round totali: 5 per Giocatore A, 5 per Giocatore B).
    - **Tema Verde Smeraldo** (`#1db954`) per Turno Giocatore A.
    - **Tema Viola Vivido** (`#8b5cf6`) per Turno Giocatore B.
    - Schermo di passaggio dispositivo ("Passa l'iPhone a...") e podio finale di confronto.
- **Categorie e Canzoni Incluse:**
  - 🇮🇹 Misto Italiano
  - 🎤 Pop Italiana
  - 🎸 Rock Italiano
  - 🧢 Rap Italiano
  - 📻 Cantautori
  - 💐 Sanremo Hits
  - 🕶️ Indie Italiano
- **Supporto Playlist Spotify Reali:** Incolla qualsiasi link pubblico di playlist Spotify (`https://open.spotify.com/playlist/...`): l'app estrae automaticamente l'elenco autentico dei brani, ne ricava le anteprime audio e le copertine HD e ti permette di giocare **esclusivamente** con le canzoni della tua playlist (zero brani fittizi). Include anche un compositore manuale per creare o modificare playlist salvate in `localStorage`.
- **Sistema di Punteggio Progressivo:**
  - 1° tentativo (0.5s): **100 pt**
  - 2° tentativo (1.5s): **80 pt**
  - 3° tentativo (3.0s): **60 pt**
  - 4° tentativo (5.0s): **40 pt**
  - 5° tentativo (9.0s): **20 pt**
  - 6° tentativo (15.0s): **10 pt**
  - Fallita: **0 pt**

---

## 🚀 Pubblicazione su GitHub Pages

L'app è sviluppata in puro **HTML5, CSS3 e Vanilla JavaScript ES6+**, senza dipendenze o passaggi di compilazione.

### Guida Rapida:
1. Crea un repository su GitHub (es. `SpotiGuess`).
2. Fai il push di questi file:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of SpotiGuess iOS Web App"
   git branch -M main
   git remote add origin https://github.com/TUO_USERNAME/SpotiGuess.git
   git push -u origin main
   ```
3. Su GitHub, vai in **Settings** > **Pages**.
4. Sotto **Build and deployment** seleziona:
   - Source: **Deploy from a branch**
   - Branch: **main** / folder: **/ (root)**
   - Clicca **Save**.
5. In meno di un minuto, l'app sarà raggiungibile su:
   `https://TUO_USERNAME.github.io/SpotiGuess/`

---

## 📲 Installazione su iPhone (Come App Nativa PWA)
1. Apri il sito su **Safari** sul tuo iPhone.
2. Tocca l'icona di **Condivisione** (il quadrato con la freccia verso l'alto in basso al centro).
3. Scorri verso il basso e seleziona **"Aggiungi alla schermata Home"**.
4. Tocca **Aggiungi** in alto a destra. SpotiGuess apparirà come una vera app a schermo intero senza barre di Safari!
