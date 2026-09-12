/**
 * SpotiGuess - Core Game Engine & Audio Manager (iOS Mobile Optimized)
 * 
 * Architecture:
 * - Hybrid Music Engine via Apple iTunes Search API (public previewUrl .m4a stream)
 * - Native HTML5 Audio singleton with exact millisecond pauses
 * - Dynamic color theming: Player A (Emerald Green #1db954) vs Player B (Vivid Purple #8b5cf6)
 * - Single Player & 1 vs 1 Local Pass & Play multiplayer
 */

// ============================================================================
// 1. DATABASE BRANI PER CATEGORIE ITALIANE
// ============================================================================
const CATEGORIES_DATA = [
  {
    id: 'misto',
    name: 'Misto Italiano',
    icon: '🇮🇹',
    description: 'Il meglio della musica italiana con brani sempre casuali',
    searchQueries: ['musica italiana', 'top hit italia', 'canzoni italiane', 'grandi successi italiani', 'tormentoni italia'],
    featuredArtists: ['Marco Mengoni', 'Annalisa', 'Lazza', 'Geolier', 'Mahmood', 'Elodie', 'BLANCO', 'Vasco Rossi', 'Ligabue', 'Pinguini Tattici Nucleari', 'Tananai', 'Emma', 'The Kolors', 'Cesare Cremonini', 'Laura Pausini', 'Fedez', 'Ernia', 'Sfera Ebbasta', 'Mina', 'Lucio Battisti', 'Fabrizio De André', 'Rino Gaetano', 'Zucchero', 'Eros Ramazzotti', 'Jovanotti'],
    tracks: [
      { id: 'm1', title: 'Due Vite', artist: 'Marco Mengoni', year: '2023' },
      { id: 'm2', title: 'Sinceramente', artist: 'Annalisa', year: '2024' },
      { id: 'm3', title: 'Tango', artist: 'Tananai', year: '2023' },
      { id: 'm4', title: 'Cenere', artist: 'Lazza', year: '2023' },
      { id: 'm5', title: 'Italodisco', artist: 'The Kolors', year: '2023' },
      { id: 'm6', title: 'La Noia', artist: 'Angelina Mango', year: '2024' },
      { id: 'm7', title: 'Alba Chiara', artist: 'Vasco Rossi', year: '1979' },
      { id: 'm8', title: 'Brividi', artist: 'Mahmood & BLANCO', year: '2022' },
      { id: 'm9', title: 'Zitti e Buoni', artist: 'Måneskin', year: '2021' },
      { id: 'm10', title: 'I p’ me, tu p’ te', artist: 'Geolier', year: '2024' },
      { id: 'm11', title: 'Pastello Bianco', artist: 'Pinguini Tattici Nucleari', year: '2020' },
      { id: 'm12', title: 'Mon Amour', artist: 'Annalisa', year: '2023' },
      { id: 'm13', title: 'Bellissima', artist: 'Annalisa', year: '2022' },
      { id: 'm14', title: 'Pazza Musica', artist: 'Marco Mengoni & Elodie', year: '2023' },
      { id: 'm15', title: 'Superclassico', artist: 'Ernia', year: '2020' },
      { id: 'm16', title: 'Tuta Gold', artist: 'Mahmood', year: '2024' },
      { id: 'm17', title: 'Apnea', artist: 'Emma', year: '2024' },
      { id: 'm18', title: 'Un Briciolo Di Allegria', artist: 'BLANCO & Mina', year: '2023' }
    ]
  },
  {
    id: 'pop',
    name: 'Pop Italiana',
    icon: '🎤',
    description: 'I grandi successi pop, tormentoni e classifiche radio',
    searchQueries: ['pop italiano', 'musica pop italiana', 'hit pop italia', 'top pop italia'],
    featuredArtists: ['Annalisa', 'Elodie', 'Marco Mengoni', 'Cesare Cremonini', 'Laura Pausini', 'The Kolors', 'Fedez', 'Emma', 'Giorgia', 'Ultimo', 'BLANCO', 'Madame', 'Angelina Mango', 'Mahmood', 'Irama', 'Giusy Ferreri', 'Noemi', 'Loredana Bertè', 'Alessandra Amoroso', 'Tommaso Paradiso', 'Tiziano Ferro', 'Max Pezzali', 'Biagio Antonacci', 'Francesca Michielin', 'Levante'],
    tracks: [
      { id: 'p1', title: 'Bellissima', artist: 'Annalisa', year: '2022' },
      { id: 'p2', title: 'Due Vite', artist: 'Marco Mengoni', year: '2023' },
      { id: 'p3', title: 'Sinceramente', artist: 'Annalisa', year: '2024' },
      { id: 'p4', title: 'Bagno a mezzanotte', artist: 'Elodie', year: '2022' },
      { id: 'p5', title: 'Tribale', artist: 'Elodie', year: '2022' },
      { id: 'p6', title: 'Italodisco', artist: 'The Kolors', year: '2023' },
      { id: 'p7', title: 'La Noia', artist: 'Angelina Mango', year: '2024' },
      { id: 'p8', title: 'Mille', artist: 'Fedez, Achille Lauro & Orietta Berti', year: '2021' },
      { id: 'p9', title: 'Disco Paradise', artist: 'Fedez, Annalisa & Articolo 31', year: '2023' },
      { id: 'p10', title: '50 Special', artist: 'Lùnapop', year: '1999' },
      { id: 'p11', title: 'Marmellata #25', artist: 'Cesare Cremonini', year: '2005' },
      { id: 'p12', title: 'Ti dedico il silenzio', artist: 'Ultimo', year: '2018' },
      { id: 'p13', title: 'I Pianeti', artist: 'Ultimo', year: '2017' },
      { id: 'p14', title: 'Nostalgia', artist: 'BLANCO', year: '2022' },
      { id: 'p15', title: 'Mi fiderò', artist: 'Marco Mengoni & Madame', year: '2021' },
      { id: 'p16', title: 'Taxi sulla Luna', artist: 'Tony Effe & Emma', year: '2023' }
    ]
  },
  {
    id: 'rock',
    name: 'Rock Italiano',
    icon: '🎸',
    description: 'Chitarre elettriche, Vasco, Måneskin e leggende rock',
    searchQueries: ['rock italiano', 'rock italia', 'classici rock italia', 'hard rock italiano'],
    featuredArtists: ['Måneskin', 'Vasco Rossi', 'Ligabue', 'Litfiba', 'Negramaro', 'Subsonica', 'Marlene Kuntz', 'Afterhours', 'Piero Pelù', 'PFM', 'Gianna Nannini', 'Le Vibrazioni', 'Modà', 'Fast Animals and Slow Kids', 'Zen Circus', 'Edoardo Bennato', 'CCCP', 'Verdena', 'Negrita', 'Bluvertigo'],
    tracks: [
      { id: 'rk1', title: 'Zitti e Buoni', artist: 'Måneskin', year: '2021' },
      { id: 'rk2', title: 'Albachiara', artist: 'Vasco Rossi', year: '1979' },
      { id: 'rk3', title: 'Siamo solo noi', artist: 'Vasco Rossi', year: '1981' },
      { id: 'rk4', title: 'Certe Notti', artist: 'Ligabue', year: '1995' },
      { id: 'rk5', title: 'Urlando contro il cielo', artist: 'Ligabue', year: '1991' },
      { id: 'rk6', title: 'Mentre tutto scorre', artist: 'Negramaro', year: '2005' },
      { id: 'rk7', title: 'Regina di cuori', artist: 'Litfiba', year: '1997' },
      { id: 'rk8', title: 'Spitfire', artist: 'Litfiba', year: '1995' },
      { id: 'rk9', title: 'I Wanna Be Your Slave', artist: 'Måneskin', year: '2021' },
      { id: 'rk10', title: 'Nuotando nell’aria', artist: 'Marlene Kuntz', year: '1994' },
      { id: 'rk11', title: 'Tutti i miei sbagli', artist: 'Subsonica', year: '2000' },
      { id: 'rk12', title: 'Rewind', artist: 'Vasco Rossi', year: '1999' },
      { id: 'rk13', title: 'Balliamo sul mondo', artist: 'Ligabue', year: '1990' },
      { id: 'rk14', title: 'A che ora è la fine del mondo?', artist: 'Ligabue', year: '1994' },
      { id: 'rk15', title: 'Torna a casa', artist: 'Måneskin', year: '2018' }
    ]
  },
  {
    id: 'rap',
    name: 'Rap Italiano',
    icon: '🧢',
    description: 'I numeri 1 della scena rap, trap, drill e urban',
    searchQueries: ['rap italiano', 'trap italia', 'hip hop italiano', 'urban italia', 'rap italia'],
    featuredArtists: ['Marracash', 'Guè', 'Sfera Ebbasta', 'Lazza', 'Geolier', 'Shiva', 'Tedua', 'Fabri Fibra', 'Salmo', 'Ernia', 'Baby Gang', 'Simba La Rue', 'Tony Effe', 'Kid Yugi', 'Artie 5ive', 'Paky', 'Capo Plaza', 'Rkomi', 'Bresh', 'Massimo Pericolo', 'Noyz Narcos', 'Nitro', 'Emis Killa', 'Villabanks', 'Rhove', 'Finesse'],
    tracks: [
      { id: 'rp1', title: 'Cenere', artist: 'Lazza', year: '2023' },
      { id: 'rp2', title: 'I p’ me, tu p’ te', artist: 'Geolier', year: '2024' },
      { id: 'rp3', title: 'Infinity Love', artist: 'Marracash & Guè', year: '2021' },
      { id: 'rp4', title: 'Crazy Love', artist: 'Marracash', year: '2021' },
      { id: 'rp5', title: 'Piove', artist: 'Lazza & Sfera Ebbasta', year: '2022' },
      { id: 'rp6', title: 'Calcolatrici', artist: 'Sfera Ebbasta, Baby Gang, Geolier & Simba La Rue', year: '2023' },
      { id: 'rp7', title: 'Superclassico', artist: 'Ernia', year: '2020' },
      { id: 'rp8', title: 'Hoe', artist: 'Tedua & Sfera Ebbasta', year: '2023' },
      { id: 'rp9', title: 'Appartengo', artist: 'Fabri Fibra & Massimo Pericolo', year: '2022' },
      { id: 'rp10', title: 'Tranne Te', artist: 'Fabri Fibra', year: '2010' },
      { id: 'rp11', title: '100 Messaggi', artist: 'Lazza', year: '2024' },
      { id: 'rp12', title: 'Il cielo nella stanza', artist: 'Salmo', year: '2018' },
      { id: 'rp13', title: '90MIN', artist: 'Salmo', year: '2018' },
      { id: 'rp14', title: 'Biscotti', artist: 'Guè', year: '2023' },
      { id: 'rp15', title: 'Come Vuole Dio', artist: 'Geolier', year: '2023' },
      { id: 'rp16', title: 'Gelosa', artist: 'Finesse ft. Shiva, Sfera Ebbasta & Guè', year: '2023' },
      { id: 'rp17', title: 'Cadillac', artist: 'Boro & Artie 5ive', year: '2023' },
      { id: 'rp18', title: 'Cookies N’ Cream', artist: 'Guè, Anna & Sfera Ebbasta', year: '2023' },
      { id: 'rp19', title: 'Auto Blu', artist: 'Shiva & Eiffel 65', year: '2020' },
      { id: 'rp20', title: 'Bambina', artist: 'Sfera Ebbasta', year: '2023' }
    ]
  },
  {
    id: 'cantautori',
    name: 'Cantautori',
    icon: '📻',
    description: 'La poesia in musica: Battisti, Dalla, De André e De Gregori',
    searchQueries: ['cantautori italiani', 'canzone d autore italiana', 'grandi cantautori italiani'],
    featuredArtists: ['Fabrizio De André', 'Lucio Battisti', 'Lucio Dalla', 'Rino Gaetano', 'Francesco De Gregori', 'Franco Battiato', 'Pino Daniele', 'Francesco Guccini', 'Claudio Baglioni', 'Antonello Venditti', 'Renato Zero', 'Roberto Vecchioni', 'Edoardo Bennato', 'Ivano Fossati', 'Paolo Conte', 'Giorgio Gaber', 'Luigi Tenco', 'Bruno Lauzi'],
    tracks: [
      { id: 'c1', title: 'Il mio canto libero', artist: 'Lucio Battisti', year: '1972' },
      { id: 'c2', title: 'La canzone del sole', artist: 'Lucio Battisti', year: '1971' },
      { id: 'c3', title: 'Bocca di Rosa', artist: 'Fabrizio De André', year: '1967' },
      { id: 'c4', title: 'La canzone di Marinella', artist: 'Fabrizio De André', year: '1964' },
      { id: 'c5', title: 'Caruso', artist: 'Lucio Dalla', year: '1986' },
      { id: 'c6', title: 'L’anno che verrà', artist: 'Lucio Dalla', year: '1979' },
      { id: 'c7', title: 'Ma il cielo è sempre più blu', artist: 'Rino Gaetano', year: '1975' },
      { id: 'c8', title: 'Gianna', artist: 'Rino Gaetano', year: '1978' },
      { id: 'c9', title: 'A mano a mano', artist: 'Rino Gaetano', year: '1981' },
      { id: 'c10', title: 'Generale', artist: 'Francesco De Gregori', year: '1978' },
      { id: 'c11', title: 'La donna cannone', artist: 'Francesco De Gregori', year: '1983' },
      { id: 'c12', title: 'La cura', artist: 'Franco Battiato', year: '1996' },
      { id: 'c13', title: 'Centro di gravità permanente', artist: 'Franco Battiato', year: '1981' },
      { id: 'c14', title: 'Napule è', artist: 'Pino Daniele', year: '1977' },
      { id: 'c15', title: 'Quello che non ho', artist: 'Fabrizio De André', year: '1981' }
    ]
  },
  {
    id: 'sanremo',
    name: 'Sanremo Hits',
    icon: '💐',
    description: 'I capolavori che hanno fatto la storia dell’Ariston',
    searchQueries: ['festival di sanremo', 'sanremo 2024', 'sanremo 2023', 'sanremo 2022', 'vincitori sanremo'],
    featuredArtists: ['Marco Mengoni', 'Mahmood', 'Diodato', 'Francesco Gabbani', 'Ermal Meta', 'Il Volo', 'Emma', 'Arisa', 'Angelina Mango', 'Tananai', 'Annalisa', 'Geolier', 'Lazza', 'Ghali', 'Irama', 'Mr. Rain', 'Rose Villain', 'Clara', 'Loredana Bertè', 'Fiorella Mannoia', 'Giorgia', 'Elisa'],
    tracks: [
      { id: 's1', title: 'Due Vite', artist: 'Marco Mengoni', year: '2023' },
      { id: 's2', title: 'Brividi', artist: 'Mahmood & BLANCO', year: '2022' },
      { id: 's3', title: 'Zitti e Buoni', artist: 'Måneskin', year: '2021' },
      { id: 's4', title: 'Fai Rumore', artist: 'Diodato', year: '2020' },
      { id: 's5', title: 'Soldi', artist: 'Mahmood', year: '2019' },
      { id: 's6', title: 'Occidentali’s Karma', artist: 'Francesco Gabbani', year: '2017' },
      { id: 's7', title: 'Non Mi Avete Fatto Niente', artist: 'Ermal Meta & Fabrizio Moro', year: '2018' },
      { id: 's8', title: 'La Noia', artist: 'Angelina Mango', year: '2024' },
      { id: 's9', title: 'Tango', artist: 'Tananai', year: '2023' },
      { id: 's10', title: 'Sinceramente', artist: 'Annalisa', year: '2024' },
      { id: 's11', title: 'Tuta Gold', artist: 'Mahmood', year: '2024' },
      { id: 's12', title: 'Chiamami ancora amore', artist: 'Roberto Vecchioni', year: '2011' },
      { id: 's13', title: 'Grande Amore', artist: 'Il Volo', year: '2015' },
      { id: 's14', title: 'Luce (Tramonti a nord est)', artist: 'Elisa', year: '2001' },
      { id: 's15', title: 'Come saprei', artist: 'Giorgia', year: '1995' }
    ]
  },
  {
    id: 'indie',
    name: 'Indie Italiano',
    icon: '🕶️',
    description: 'Dall’underground ai palazzetti: Calcutta, Gazzelle & Co.',
    searchQueries: ['indie italiano', 'musica indie italiana', 'indie pop italia', 'itpop'],
    featuredArtists: ['Calcutta', 'Gazzelle', 'Coez', 'Pinguini Tattici Nucleari', 'Fulminacci', 'Coma_Cose', 'Franco126', 'Frah Quintale', 'Carl Brave', 'Canova', 'Giorgio Poi', 'Motta', 'Ex-Otago', 'Colapesce', 'Dimartino', 'Ariete', 'Chiello'],
    tracks: [
      { id: 'i1', title: 'Oroscopo', artist: 'Calcutta', year: '2016' },
      { id: 'i2', title: 'Paracetamolo', artist: 'Calcutta', year: '2018' },
      { id: 'i3', title: 'Pesto', artist: 'Calcutta', year: '2018' },
      { id: 'i4', title: 'Destri', artist: 'Gazzelle', year: '2020' },
      { id: 'i5', title: 'Non sei tu', artist: 'Gazzelle', year: '2017' },
      { id: 'i6', title: 'La musica non c’è', artist: 'Coez', year: '2017' },
      { id: 'i7', title: 'È sempre bello', artist: 'Coez', year: '2019' },
      { id: 'i8', title: 'Ringo Starr', artist: 'Pinguini Tattici Nucleari', year: '2020' },
      { id: 'i9', title: 'Pastello Bianco', artist: 'Pinguini Tattici Nucleari', year: '2020' },
      { id: 'i10', title: 'Giovani Wannabe', artist: 'Pinguini Tattici Nucleari', year: '2022' },
      { id: 'i11', title: 'Tommaso', artist: 'Fulminacci', year: '2019' },
      { id: 'i12', title: 'Fiamme negli occhi', artist: 'Coma_Cose', year: '2021' },
      { id: 'i13', title: 'L’addio', artist: 'Coma_Cose', year: '2023' },
      { id: 'i14', title: 'Stanza Singola', artist: 'Franco126 & Tommaso Paradiso', year: '2019' },
      { id: 'i15', title: 'Post Concerto', artist: 'Coma_Cose', year: '2018' }
    ]
  }
];

// ============================================================================
// 2. COSTANTI DI GIOCO E REGOLE
// ============================================================================
// 6 Intervalli di ascolto per brano (in secondi e millisecondi)
const TIME_STEPS = [
  { step: 1, seconds: 0.8, ms: 800, label: '0.5s', points: 100 },
  { step: 2, seconds: 1.5, ms: 1500, label: '1.5s', points: 80 },
  { step: 3, seconds: 3.0, ms: 3000, label: '3s', points: 60 },
  { step: 4, seconds: 5.0, ms: 5000, label: '5s', points: 40 },
  { step: 5, seconds: 9.0, ms: 9000, label: '9s', points: 20 },
  { step: 6, seconds: 15.0, ms: 15000, label: '15s', points: 10 }
];

const TOTAL_SONGS_PER_GAME = 10;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * 48; // r=48 in SVG progress circle

// ============================================================================
// 3. HYBRID AUDIO ENGINE (Mobile iOS Native - Deezer JSONP & Apple iTunes)
// ============================================================================

const STOPWORDS = new Set([
  'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una',
  'di', 'a', 'da', 'in', 'con', 'su', 'per', 'tra', 'fra',
  'the', 'a', 'an', 'of', 'and', 'or', 'to', 'in', 'on', 'at', 'by', 'for', 'with', 'e', 'ed'
]);

function cleanTrackTitle(str) {
  if (!str) return '';
  return str
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/\s*-\s*remix.*$/i, '')
    .replace(/\s*-\s*single.*$/i, '')
    .replace(/\s*-\s*radio.*$/i, '')
    .replace(/\s*-\s*prod\..*$/i, '')
    .replace(/\s*-\s*feat\..*$/i, '')
    .replace(/\s*-\s*ft\..*$/i, '')
    .trim();
}

function normalizeTrackString(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function getSignificantWords(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(w => w.length >= 2 && !STOPWORDS.has(w));
}

function isArtistMatchGlobal(searchedArtist, candidateArtist) {
  if (!searchedArtist) return true;
  if (!candidateArtist) return false;

  const sNorm = normalizeTrackString(searchedArtist);
  const cNorm = normalizeTrackString(candidateArtist);
  if (sNorm === cNorm) return true;
  if (cNorm.includes(sNorm) || sNorm.includes(cNorm)) return true;

  const sWords = getSignificantWords(searchedArtist);
  const cWords = getSignificantWords(candidateArtist);
  const common = sWords.filter(w => w.length >= 3 && cWords.includes(w));
  return common.length >= 1;
}

function isTitleMatchGlobal(searchedTitle, candidateTitle) {
  if (!searchedTitle || !candidateTitle) return false;

  const sClean = cleanTrackTitle(searchedTitle);
  const cClean = cleanTrackTitle(candidateTitle);

  const sNorm = normalizeTrackString(sClean);
  const cNorm = normalizeTrackString(cClean);

  if (!sNorm || !cNorm) return false;

  // 1. Uguaglianza esatta dopo pulizia
  if (sNorm === cNorm) return true;

  // 2. Substring con rapporto lunghezza elevato (minimo 80%)
  if (sNorm.includes(cNorm) || cNorm.includes(sNorm)) {
    const minLen = Math.min(sNorm.length, cNorm.length);
    const maxLen = Math.max(sNorm.length, cNorm.length);
    if (minLen / maxLen >= 0.8) {
      return true;
    }
  }

  // 3. Match parole significative
  const sWords = getSignificantWords(sClean);
  const cWords = getSignificantWords(cClean);

  if (sWords.length === 0 || cWords.length === 0) {
    return sNorm === cNorm;
  }

  // Se la ricerca ha 1 sola parola, DEVE coincidere col titolo base (non può essere un titolo diverso)
  if (sWords.length === 1) {
    return sNorm === cNorm;
  }

  // Se la ricerca ha 2 o più parole significative, almeno il 75% deve essere presente
  const common = sWords.filter(w => cWords.includes(w));
  const ratio = common.length / sWords.length;
  const candidateRatio = common.length / cWords.length;

  return ratio >= 0.75 && candidateRatio >= 0.5;
}

/**
 * Esegue una ricerca JSONP su Deezer: immune a qualsiasi blocco CORS o rate-limit Akamai.
 * Filtra rigorosamente i risultati cercando corrispondenza su titolo e artista per non introdurre brani estranei.
 */
function fetchDeezerTrack(query, searchedTitle = '', searchedArtist = '', timeoutMs = 4500) {
  return new Promise((resolve) => {
    const cbName = 'dz_track_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    const script = document.createElement('script');
    let finished = false;

    const cleanup = () => {
      if (finished) return;
      finished = true;
      if (window[cbName]) delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    const timer = setTimeout(() => {
      cleanup();
      resolve(null);
    }, timeoutMs);

    window[cbName] = (data) => {
      cleanup();
      clearTimeout(timer);
      if (data && data.data && data.data.length > 0) {
        let item = null;
        if (searchedTitle) {
          item = data.data.find(d => 
            d.preview &&
            isTitleMatchGlobal(searchedTitle, d.title) &&
            (!searchedArtist || isArtistMatchGlobal(searchedArtist, d.artist?.name))
          );
        }
        
        // Se non era specificato un titolo da verificare, prendi il primo con preview
        if (!item && !searchedTitle) {
          item = data.data.find(d => d.preview);
        }

        if (item && item.preview) {
          resolve({
            title: item.title,
            artist: (item.artist && item.artist.name) || '',
            previewUrl: item.preview,
            artworkUrl: (item.album && (item.album.cover_big || item.album.cover_medium)) || (item.artist && item.artist.picture_big) || '',
            year: item.release_date ? String(new Date(item.release_date).getFullYear()) : ''
          });
          return;
        }
      }
      resolve(null);
    };

    script.onerror = () => {
      cleanup();
      clearTimeout(timer);
      resolve(null);
    };

    script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&output=jsonp&callback=${cbName}`;
    document.head.appendChild(script);
  });
}

/**
 * Esegue una ricerca multipla JSONP su Deezer per l'autocomplete in tempo reale.
 */
function fetchDeezerSearchList(query, limit = 15, timeoutMs = 3500) {
  return new Promise((resolve) => {
    const cbName = 'dz_search_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    const script = document.createElement('script');
    let finished = false;

    const cleanup = () => {
      if (finished) return;
      finished = true;
      if (window[cbName]) delete window[cbName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    const timer = setTimeout(() => {
      cleanup();
      resolve([]);
    }, timeoutMs);

    window[cbName] = (data) => {
      cleanup();
      clearTimeout(timer);
      if (data && data.data && data.data.length > 0) {
        const items = data.data.slice(0, limit).map(item => ({
          id: `dz_${item.id}`,
          title: item.title,
          artist: item.artist ? item.artist.name : '',
          artworkUrl: (item.album && (item.album.cover_medium || item.album.cover_small)) || '',
          year: item.release_date ? String(new Date(item.release_date).getFullYear()) : '',
          previewUrl: item.preview || null,
          isOnline: true
        }));
        resolve(items);
      } else {
        resolve([]);
      }
    };

    script.onerror = () => {
      cleanup();
      clearTimeout(timer);
      resolve([]);
    };

    script.src = `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=${limit}&output=jsonp&callback=${cbName}`;
    document.head.appendChild(script);
  });
}

class HybridAudioEngine {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    this.audioTimeout = null;
    this.progressInterval = null;
    this.isPlaying = false;
    this.isFullPlaying = false;
    this.currentPreviewUrl = null;
    this.cache = new Map(); // songId -> { previewUrl, artworkUrl, releaseYear, ... }
    
    // Gestione eventi nativi audio
    this.audio.addEventListener('ended', () => this.handleAudioEnded());
    this.audio.addEventListener('error', (e) => this.handleAudioError(e));
  }

  /**
   * Pre-carica il flusso audio nativo dell'anteprima per evitare qualsiasi latenza di buffering.
   */
  prepareTrack(previewUrl) {
    if (!previewUrl) return;
    if (this.currentPreviewUrl !== previewUrl) {
      this.stopPlayback();
      this.currentPreviewUrl = previewUrl;
      this.audio.src = previewUrl;
      this.audio.preload = 'auto';
      try {
        this.audio.load();
      } catch (e) {}
    }
  }

  /**
   * Cerca e memorizza in cache il preview audio e la cover HD da Deezer (JSONP) o Apple iTunes
   */
  async fetchTrackDetails(track) {
    if (!track) return null;

    // Se ha già previewUrl definito (es. da playlist caricata), usalo subito
    if (track.previewUrl) {
      return track;
    }

    if (this.cache.has(track.id)) {
      const cached = this.cache.get(track.id);
      if (cached && cached.previewUrl) return cached;
    }

    const cleanArtist = (track.artist || '').split(/[,&/]/)[0].replace(/\s*ft\.?.*$/i, '').replace(/\s*feat\.?.*$/i, '').trim();
    const cleanTitle = (track.title || '').replace(/\s*-\s*Rmx/i, '').replace(/\s*\(feat\..*?\)/i, '').replace(/\s*\[.*?\]/i, '').trim();
    const searchQueries = [];
    if (track.artist) {
      searchQueries.push(`${track.artist} ${track.title}`);
      if (cleanArtist && (cleanArtist !== track.artist || cleanTitle !== track.title)) {
        searchQueries.push(`${cleanArtist} ${cleanTitle}`);
      }
    } else {
      searchQueries.push(track.title);
    }

    // 1. Prova Deezer JSONP (infallibile da browser, zero CORS, zero blocchi Akamai 403)
    for (const q of searchQueries) {
      if (!q.trim()) continue;
      try {
        const dz = await fetchDeezerTrack(q, track.title, track.artist);
        if (dz && dz.previewUrl && isTitleMatchGlobal(track.title, dz.title) && isArtistMatchGlobal(track.artist, dz.artist)) {
          const details = {
            id: track.id,
            previewUrl: dz.previewUrl,
            artworkUrl: dz.artworkUrl || track.artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
            year: dz.year || track.year || '2023',
            title: track.title,
            artist: track.artist
          };
          this.cache.set(track.id, details);
          return details;
        }
      } catch (e) {}
    }

    // 2. Prova Apple iTunes
    for (const q of searchQueries) {
      if (!q.trim()) continue;
      try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=5&country=IT`;
        const ctrl = new AbortController();
        const timeout = setTimeout(() => ctrl.abort(), 3500);
        const response = await fetch(url, { signal: ctrl.signal });
        clearTimeout(timeout);
        if (!response.ok) continue;
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const item = data.results.find(x => 
            x.previewUrl &&
            isTitleMatchGlobal(track.title, x.trackName) &&
            isArtistMatchGlobal(track.artist, x.artistName)
          );
          if (item && item.previewUrl) {
            const hdArtwork = item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : null;
            const releaseYear = item.releaseDate ? new Date(item.releaseDate).getFullYear() : track.year;
            const details = {
              id: track.id,
              previewUrl: item.previewUrl,
              artworkUrl: hdArtwork || item.artworkUrl100 || track.artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
              year: releaseYear || track.year || '2023',
              title: track.title,
              artist: track.artist
            };
            this.cache.set(track.id, details);
            return details;
          }
        }
      } catch (e) {}
    }

    // 3. Fallback sicuro se l'API non risponde
    const fallback = {
      id: track.id,
      previewUrl: null,
      artworkUrl: track.artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      year: track.year || '2023',
      title: track.title,
      artist: track.artist
    };
    this.cache.set(track.id, fallback);
    return fallback;
  }

  /**
   * Riproduce l'anteprima per l'esatta durata dello step corrente (es. 0.5s, 1.5s, ...)
   * Il conteggio inizia ESCLUSIVAMENTE quando l'audio comincia a suonare realmente nei diffusori ('playing'),
   * garantendo che l'utente ascolti l'intero frammento fin dal primo tap senza tagli anticipati da buffer.
   */
  async playStepClip(previewUrl, durationSeconds, onProgressUpdate, onFinish) {
    this.stopPlayback();

    if (!previewUrl) {
      if (onFinish) onFinish();
      return;
    }

    try {
      this.isPlaying = true;
      this.prepareTrack(previewUrl);

      try {
        this.audio.currentTime = 0;
      } catch (e) {}

      let clipFinished = false;
      let initialAudioTime = null;
      let startWallTime = null;

      const stopAndClean = () => {
        if (clipFinished) return;
        clipFinished = true;
        this.stopPlayback();
        try {
          this.audio.currentTime = 0;
        } catch (e) {}
        if (onProgressUpdate) onProgressUpdate(0);
        if (onFinish) onFinish();
      };

      // Controllo ad alta frequenza (20ms) basato su audio effettivo in uscita
      this.progressInterval = setInterval(() => {
        if (!this.isPlaying || clipFinished) {
          clearInterval(this.progressInterval);
          return;
        }

        const curTime = this.audio.currentTime;

        // Finché l'audio non inizia a far scorrere currentTime, siamo ancora in fase di buffer
        if (curTime > 0.005) {
          if (initialAudioTime === null) {
            initialAudioTime = curTime;
            startWallTime = performance.now();
          }

          const playedAudio = curTime - initialAudioTime;
          const playedWall = startWallTime ? (performance.now() - startWallTime) / 1000 : 0;
          const effectivePlayed = Math.max(playedAudio, playedWall);
          const progress = Math.min(effectivePlayed / durationSeconds, 1);

          if (onProgressUpdate) onProgressUpdate(progress);

          if (effectivePlayed >= durationSeconds) {
            stopAndClean();
          }
        }
      }, 20);

      // Timeout di sicurezza per evitare blocchi se la rete stalla
      this.audioTimeout = setTimeout(() => {
        stopAndClean();
      }, Math.max(durationSeconds * 1000 + 4000, 7000));

      // Avvia riproduzione nativa richiesta dal gesto utente
      const p = this.audio.play();
      if (p !== undefined) {
        await p;
      }

    } catch (err) {
      console.error("Playback error:", err);
      this.stopPlayback();
      if (onFinish) onFinish();
    }
  }

  /**
   * Riproduce il brano per intero (30 secondi di preview) nella schermata di rivelazione
   */
  async toggleFullPlayback(previewUrl, onStateChange) {
    if (this.isFullPlaying) {
      this.stopPlayback();
      this.isFullPlaying = false;
      if (onStateChange) onStateChange(false);
      return;
    }

    if (!previewUrl) return;

    try {
      this.stopPlayback();
      this.prepareTrack(previewUrl);
      try {
        this.audio.currentTime = 0;
      } catch (e) {}
      this.isFullPlaying = true;
      await this.audio.play();
      if (onStateChange) onStateChange(true);

      this.audio.onended = () => {
        this.isFullPlaying = false;
        if (onStateChange) onStateChange(false);
      };
    } catch (e) {
      this.isFullPlaying = false;
      if (onStateChange) onStateChange(false);
    }
  }

  stopPlayback() {
    if (this.audioTimeout) {
      clearTimeout(this.audioTimeout);
      this.audioTimeout = null;
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
    if (this.audio) {
      try {
        this.audio.pause();
      } catch (e) {}
    }
    this.isPlaying = false;
  }

  handleAudioEnded() {
    this.stopPlayback();
  }

  handleAudioError(e) {
    console.warn("Audio element error:", e);
    this.stopPlayback();
  }
}

// ============================================================================
// 4. STATO DELL'APPLICAZIONE (GAME CONTROLLER)
// ============================================================================
class SpotiGuessApp {
  constructor() {
    this.audioEngine = new HybridAudioEngine();

    // Stato di gioco
    this.gameMode = 'solo'; // 'solo' | 'duo'
    this.selectedCategory = CATEGORIES_DATA[0];
    this.playlist = [];
    this.totalSongsInGame = TOTAL_SONGS_PER_GAME;
    this.currentSongIndex = 0;
    this.currentAttempt = 1;
    this.currentSongData = null; // Dati arricchiti da iTunes (previewUrl, cover, year...)
    this.selectedGuess = null; // Traccia selezionata dal dropdown autocomplete

    // Punteggi e statistiche
    this.soloScore = 0;
    this.history = []; // Statistiche per le 10 canzoni

    // Statistiche 1 vs 1 (5 canzoni Giocatore A, 5 canzoni Giocatore B)
    this.duoState = {
      scoreA: 0,
      scoreB: 0,
      historyA: [],
      historyB: []
    };

    // Cache di tutte le canzoni note per l'autocomplete globale
    this.allKnownTracks = this.buildAllTracksList();

    // Proprietà per la ricerca online in tempo reale (iTunes API)
    this.searchDebounceTimer = null;
    this.searchAbortController = null;
    this.itunesSearchCache = new Map();

    // Playlist personalizzate salvate dall'utente in localStorage
    this.customPlaylists = this.loadCustomPlaylists();

    this.initDOM();
    this.attachEvents();
    this.renderCategories();
  }

  buildAllTracksList() {
    const list = [];
    const seen = new Set();
    CATEGORIES_DATA.forEach(cat => {
      cat.tracks.forEach(tr => {
        const key = `${tr.title.toLowerCase()} - ${tr.artist.toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          list.push(tr);
        }
      });
    });
    return list;
  }

  // ==========================================================================
  // DOM ELEMENTS BINDING
  // ==========================================================================
  initDOM() {
    this.dom = {
      app: document.getElementById('app'),
      // Screens
      screens: {
        selection: document.getElementById('screen-selection'),
        game: document.getElementById('screen-game'),
        reveal: document.getElementById('screen-reveal'),
        results: document.getElementById('screen-results')
      },
      // Screen 1: Selection
      modeSoloBtn: document.getElementById('mode-solo-btn'),
      modeDuoBtn: document.getElementById('mode-duo-btn'),
      modeCaptionText: document.getElementById('mode-caption-text'),
      categoriesContainer: document.getElementById('categories-container'),
      categoryCountBadge: document.getElementById('category-badge-count'),
      spotifyUrlInput: document.getElementById('spotify-url-input'),
      btnLoadSpotify: document.getElementById('btn-load-spotify'),
      btnOpenCustomBuilder: document.getElementById('btn-open-custom-builder'),
      spotifyStatusMsg: document.getElementById('spotify-status-msg'),
      btnStartGame: document.getElementById('btn-start-game'),
      btnStartLabel: document.getElementById('btn-start-label'),

      // Modal Custom Playlist Builder
      modalCustomPlaylist: document.getElementById('modal-custom-playlist'),
      modalCustomBackdrop: document.getElementById('modal-custom-backdrop'),
      customModalHeading: document.getElementById('custom-modal-heading'),
      customModalSub: document.getElementById('custom-modal-sub'),
      customPlaylistNameInput: document.getElementById('custom-playlist-name-input'),
      customPlaylistTracksArea: document.getElementById('custom-playlist-tracks-area'),
      customTracksCounterHint: document.getElementById('custom-tracks-counter-hint'),
      btnCancelCustomModal: document.getElementById('btn-cancel-custom-modal'),
      btnSaveCustomPlaylist: document.getElementById('btn-save-custom-playlist'),
      btnSaveCustomLabel: document.getElementById('btn-save-custom-label'),

      // Screen 2: Game
      btnBackHome: document.getElementById('btn-back-to-home'),
      gameCategoryTitle: document.getElementById('game-category-title'),
      gameSongCounter: document.getElementById('game-song-counter'),
      scoreValText: document.getElementById('score-val-text'),
      turnBanner: document.getElementById('turn-banner'),
      turnBannerText: document.getElementById('turn-banner-text'),
      mysteryCardElem: document.getElementById('mystery-card-elem'),
      cardGenrePill: document.getElementById('card-genre-pill'),
      cardYearPill: document.getElementById('card-year-pill'),
      cardAttemptTitle: document.getElementById('card-attempt-title'),
      mysterySongTitle: document.getElementById('mystery-song-title'),
      mysteryArtistName: document.getElementById('mystery-artist-name'),
      attemptsTrackers: document.getElementById('attempts-trackers'),
      btnPlayAudio: document.getElementById('btn-play-audio'),
      iconPlayState: document.getElementById('icon-play-state'),
      iconPauseState: document.getElementById('icon-pause-state'),
      playCircleProgress: document.getElementById('play-circle-progress'),
      playTimeSecondsTag: document.getElementById('play-time-seconds-tag'),
      playFeedbackStatus: document.getElementById('play-feedback-status'),
      guessSearchInput: document.getElementById('guess-search-input'),
      btnClearSearch: document.getElementById('btn-clear-search'),
      autocompleteDropdown: document.getElementById('autocomplete-dropdown'),
      btnSkipAttempt: document.getElementById('btn-skip-attempt'),
      btnSubmitGuess: document.getElementById('btn-submit-guess'),

      // Screen 3: Reveal
      btnBackFromReveal: document.getElementById('btn-back-from-reveal'),
      revealCategoryTitle: document.getElementById('reveal-category-title'),
      revealStatusBanner: document.getElementById('reveal-status-banner'),
      revealIconCircle: document.getElementById('reveal-icon-circle'),
      revealHeadline: document.getElementById('reveal-headline'),
      revealSubtitle: document.getElementById('reveal-subtitle'),
      revealAlbumArt: document.getElementById('reveal-album-art'),
      btnReplayFull: document.getElementById('btn-replay-full'),
      revealTrackName: document.getElementById('reveal-track-name'),
      revealTrackArtist: document.getElementById('reveal-track-artist'),
      revealTrackYear: document.getElementById('reveal-track-year'),
      revealStatAttempts: document.getElementById('reveal-stat-attempts'),
      revealStatTime: document.getElementById('reveal-stat-time'),
      revealStatPoints: document.getElementById('reveal-stat-points'),
      revealDuoScores: document.getElementById('reveal-duo-scores'),
      duoRevealPtsA: document.getElementById('duo-reveal-pts-a'),
      duoRevealPtsB: document.getElementById('duo-reveal-pts-b'),
      btnNextSong: document.getElementById('btn-next-song'),
      btnNextLabel: document.getElementById('btn-next-label'),

      // Screen 4: Results
      resultsSoloView: document.getElementById('results-solo-view'),
      finalSoloScore: document.getElementById('final-solo-score'),
      finalGuessedCount: document.getElementById('final-guessed-count'),
      finalAccuracyPct: document.getElementById('final-accuracy-pct'),
      finalAvgTime: document.getElementById('final-avg-time'),
      resultsDuoView: document.getElementById('results-duo-view'),
      winnerAnnouncementBox: document.getElementById('winner-announcement-box'),
      winnerName: document.getElementById('winner-name'),
      winnerDetail: document.getElementById('winner-detail'),
      cardPlayerAFinal: document.getElementById('card-player-a-final'),
      cardPlayerBFinal: document.getElementById('card-player-b-final'),
      finalPtsPlayerA: document.getElementById('final-pts-player-a'),
      finalGuessedPlayerA: document.getElementById('final-guessed-player-a'),
      finalPtsPlayerB: document.getElementById('final-pts-player-b'),
      finalGuessedPlayerB: document.getElementById('final-guessed-player-b'),
      recapSongsList: document.getElementById('recap-songs-list'),
      btnReplaySame: document.getElementById('btn-replay-same'),
      btnChangeCategory: document.getElementById('btn-change-category'),

      // Pass & Play Modal
      modalPassPlay: document.getElementById('modal-pass-play'),
      modalNextPlayerName: document.getElementById('modal-next-player-name'),
      btnPassReady: document.getElementById('btn-pass-ready')
    };
  }

  // ==========================================================================
  // EVENT LISTENERS
  // ==========================================================================
  attachEvents() {
    // Switch Modalità (Singolo vs 1 vs 1)
    this.dom.modeSoloBtn.addEventListener('click', () => this.setGameMode('solo'));
    this.dom.modeDuoBtn.addEventListener('click', () => this.setGameMode('duo'));

    // Carica Spotify Link
    this.dom.btnLoadSpotify.addEventListener('click', () => this.handleSpotifyLinkLoad());
    this.dom.spotifyUrlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSpotifyLinkLoad();
    });

    // Apri modale composizione playlist personalizzata
    if (this.dom.btnOpenCustomBuilder) {
      this.dom.btnOpenCustomBuilder.addEventListener('click', () => this.openCustomPlaylistModal());
    }
    if (this.dom.btnCancelCustomModal) {
      this.dom.btnCancelCustomModal.addEventListener('click', () => this.closeCustomPlaylistModal());
    }
    if (this.dom.modalCustomBackdrop) {
      this.dom.modalCustomBackdrop.addEventListener('click', () => this.closeCustomPlaylistModal());
    }
    if (this.dom.btnSaveCustomPlaylist) {
      this.dom.btnSaveCustomPlaylist.addEventListener('click', () => this.handleSaveCustomPlaylist());
    }
    if (this.dom.customPlaylistTracksArea) {
      this.dom.customPlaylistTracksArea.addEventListener('input', () => this.updateCustomTracksCounter());
    }

    // Avvia Partita
    this.dom.btnStartGame.addEventListener('click', () => this.startNewGame());

    // Torna alla Home da Game
    this.dom.btnBackHome.addEventListener('click', (e) => {
      e.preventDefault();
      this.returnToHome();
    });

    // Torna alla Home da Reveal
    if (this.dom.btnBackFromReveal) {
      this.dom.btnBackFromReveal.addEventListener('click', (e) => {
        e.preventDefault();
        this.returnToHome();
      });
    }

    // Tap sul pulsante Play Audio
    this.dom.btnPlayAudio.addEventListener('click', () => this.handlePlayAudioTap());

    // Autocomplete Input
    this.dom.guessSearchInput.addEventListener('input', (e) => this.handleSearchInput(e.target.value));
    this.dom.guessSearchInput.addEventListener('focus', (e) => this.handleSearchInput(e.target.value));
    this.dom.guessSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleSubmitGuess();
      }
    });
    this.dom.btnClearSearch.addEventListener('click', () => this.clearSearchInput());

    // Chiudi dropdown se si clicca fuori
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.autocomplete-wrapper')) {
        this.dom.autocompleteDropdown.classList.add('hidden');
      }
    });

    // Salta Tentativo
    this.dom.btnSkipAttempt.addEventListener('click', () => this.handleSkipAttempt());

    // Invia Risposta
    this.dom.btnSubmitGuess.addEventListener('click', () => this.handleSubmitGuess());

    // Riascolta Brano Completo (Schermata Reveal)
    this.dom.btnReplayFull.addEventListener('click', () => this.handleReplayFullTap());

    // Prossima Canzone
    this.dom.btnNextSong.addEventListener('click', () => this.handleNextSongTap());

    // Modal Pass & Play: Pronto
    this.dom.btnPassReady.addEventListener('click', () => {
      this.dom.modalPassPlay.classList.add('hidden');
      this.showScreen('game');
      this.setupTurnUI();
      this.loadActiveSong();
    });

    // Rigioca
    this.dom.btnReplaySame.addEventListener('click', () => this.startNewGame());
    this.dom.btnChangeCategory.addEventListener('click', () => this.showScreen('selection'));
  }

  // ==========================================================================
  // SCREEN ROUTING & THEMES
  // ==========================================================================
  returnToHome() {
    this.audioEngine.stopPlayback();
    this.resetPlayProgressUI();
    this.clearSearchInput();
    this.showScreen('selection');
  }

  showScreen(screenKey) {
    Object.values(this.dom.screens).forEach(scr => scr.classList.remove('active'));
    const target = this.dom.screens[screenKey];
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  setGameMode(mode) {
    this.gameMode = mode;
    if (mode === 'solo') {
      this.dom.modeSoloBtn.classList.add('active');
      this.dom.modeDuoBtn.classList.remove('active');
      this.dom.modeCaptionText.textContent = "10 canzoni per battere il tuo record personale";
      this.dom.turnBanner.classList.add('hidden');
      this.setTheme('player-a');
    } else {
      this.dom.modeDuoBtn.classList.add('active');
      this.dom.modeSoloBtn.classList.remove('active');
      this.dom.modeCaptionText.textContent = "10 canzoni a turni alterni: 5 per Player A, 5 per Player B!";
      this.dom.turnBanner.classList.remove('hidden');
    }
  }

  setTheme(themeName) {
    this.dom.app.classList.remove('theme-player-a', 'theme-player-b');
    this.dom.app.classList.add(`theme-${themeName}`);
  }

  // ==========================================================================
  // SCHERMATA 1: SELEZIONE CATEGORIE & SPOTIFY LINK
  // ==========================================================================
  // ==========================================================================
  // GESTIONE PLAYLIST PERSONALIZZATE (LOCALSTORAGE & SPOTIFY)
  // ==========================================================================
  loadCustomPlaylists() {
    try {
      const saved = localStorage.getItem('spotiguess_custom_playlists');
      if (!saved) return [];
      const list = JSON.parse(saved);
      // Rimuovi playlist di test automatizzati o duplicate
      const filtered = list.filter(c => !c.name?.toLowerCase().includes('top 100 most streamed'));

      // Deduplica i brani all'interno di ciascuna playlist salvata
      filtered.forEach(pl => {
        if (pl.tracks && Array.isArray(pl.tracks)) {
          const seen = new Set();
          pl.tracks = pl.tracks.filter(t => {
            const key = this.normalizeString ? this.normalizeString(t.title) : t.title?.toLowerCase();
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
          });
          pl.description = `${pl.tracks.length} brani reali verificati`;
        }
      });

      localStorage.setItem('spotiguess_custom_playlists', JSON.stringify(filtered));
      return filtered;
    } catch (e) {
      return [];
    }
  }

  saveCustomPlaylists() {
    try {
      localStorage.setItem('spotiguess_custom_playlists', JSON.stringify(this.customPlaylists));
    } catch (e) {}
  }

  renderCategories() {
    this.dom.categoriesContainer.innerHTML = '';
    const allCategories = [...this.customPlaylists, ...CATEGORIES_DATA];
    this.dom.categoryCountBadge.textContent = `${allCategories.length} Generi`;

    allCategories.forEach((cat) => {
      const isSelected = this.selectedCategory.id === cat.id;
      const isCustom = Boolean(cat.isCustom);
      const card = document.createElement('div');
      card.className = `category-card-item ${isSelected ? 'selected' : ''}`;
      card.setAttribute('role', 'radio');
      card.setAttribute('aria-checked', isSelected);
      card.dataset.categoryId = cat.id;

      card.innerHTML = `
        <div class="category-icon-bubble">${cat.icon}</div>
        <div class="category-info-col">
          <div class="category-name-text">${this.escapeHTML(cat.name)}</div>
          <div class="category-sub-desc">${this.escapeHTML(cat.description)}</div>
        </div>
        ${isCustom ? `<button type="button" class="btn-delete-custom" title="Elimina questa playlist" aria-label="Elimina">✕</button>` : ''}
        <div class="category-check-circle">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      `;

      if (isCustom) {
        const delBtn = card.querySelector('.btn-delete-custom');
        if (delBtn) {
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteCustomPlaylist(cat.id);
          });
        }
      }

      card.addEventListener('click', () => {
        this.selectCategory(cat);
      });

      this.dom.categoriesContainer.appendChild(card);
    });

    this.updateStartButtonLabel();
  }

  deleteCustomPlaylist(id) {
    this.customPlaylists = this.customPlaylists.filter(c => c.id !== id);
    this.saveCustomPlaylists();
    if (this.selectedCategory.id === id) {
      this.selectedCategory = CATEGORIES_DATA[0];
    }
    this.renderCategories();
    this.showSpotifyStatus("Playlist personalizzata rimossa con successo.", "success");
  }

  selectCategory(category) {
    this.selectedCategory = category;
    
    // Rimuovi selezione card spotify se attiva
    const spotifyCard = document.querySelector('.spotify-card');
    if (spotifyCard) spotifyCard.classList.remove('active-selected');

    // Aggiorna classi UI
    document.querySelectorAll('.category-card-item').forEach(item => {
      const match = item.dataset.categoryId === category.id;
      item.classList.toggle('selected', match);
      item.setAttribute('aria-checked', match);
    });

    this.updateStartButtonLabel();
  }

  updateStartButtonLabel() {
    this.dom.btnStartLabel.textContent = `Gioca ${this.selectedCategory.name}`;
  }

  openCustomPlaylistModal(suggestedTitle = '', prefilledTracks = '') {
    this.dom.customModalHeading.textContent = suggestedTitle ? `Playlist: ${suggestedTitle}` : "Crea Playlist Personalizzata";
    this.dom.customPlaylistNameInput.value = suggestedTitle || (this.dom.customPlaylistNameInput.value || "La Mia Playlist");
    if (prefilledTracks) {
      this.dom.customPlaylistTracksArea.value = prefilledTracks;
    }
    this.updateCustomTracksCounter();
    this.dom.modalCustomPlaylist.classList.remove('hidden');
  }

  closeCustomPlaylistModal() {
    this.dom.modalCustomPlaylist.classList.add('hidden');
  }

  updateCustomTracksCounter() {
    const text = this.dom.customPlaylistTracksArea.value;
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 2);
    this.dom.customTracksCounterHint.textContent = `${lines.length} brani inseriti (minimo consigliato: 5)`;
  }

  isArtistMatch(searchedArtist, candidateArtist) {
    return isArtistMatchGlobal(searchedArtist, candidateArtist);
  }

  isTitleMatch(searchedTitle, candidateTitle) {
    return isTitleMatchGlobal(searchedTitle, candidateTitle);
  }

  /**
   * Risolve una lista di brani (stringhe o oggetti {title, artist}) su Apple Music / iTunes API
   * per ottenere audio preview reali AAC/m4a, copertine HD e metadati verificati.
   */
  async resolveTracksWithAppleMusic(trackList, onProgress) {
    const resolvedTracks = [];
    const batchSize = 8;
    const total = trackList.length;

    for (let i = 0; i < total; i += batchSize) {
      const batch = trackList.slice(i, i + batchSize);
      const promises = batch.map(async (item) => {
        try {
          const rawTitle = typeof item === 'string' ? item.split('-')[0]?.trim() || item : item.title;
          const rawArtist = typeof item === 'string' ? item.split('-')[1]?.trim() || '' : item.artist;

          // Pulisci artista e titolo per massimizzare la percentuale di successo su Apple Music
          const primaryArtist = (rawArtist || '').split(/[,&/]/)[0].replace(/\s*ft\.?.*$/i, '').replace(/\s*feat\.?.*$/i, '').trim();
          const cleanTitle = (rawTitle || '').replace(/\s*-\s*Rmx/i, '').replace(/\s*\(feat\..*?\)/i, '').replace(/\s*\[.*?\]/i, '').trim();

          const queries = [];
          if (rawArtist) {
            queries.push(`${rawArtist} ${rawTitle}`);
            if (primaryArtist && (primaryArtist !== rawArtist || cleanTitle !== rawTitle)) {
              queries.push(`${primaryArtist} ${cleanTitle}`);
            }
          } else {
            queries.push(rawTitle);
          }

          let match = null;
          for (const q of queries) {
            const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=5&country=IT`;
            const ctrl = new AbortController();
            const timer = setTimeout(() => ctrl.abort(), 4000);
            const res = await fetch(url, { signal: ctrl.signal });
            clearTimeout(timer);
            if (!res.ok) continue;
            const data = await res.json();
            if (!data.results || data.results.length === 0) continue;

            // Valida che il brano trovato su iTunes corrisponda effettivamente al titolo cercato E all'artista
            match = data.results.find(x => 
              x.previewUrl &&
              !x.trackName.toLowerCase().includes('karaoke') &&
              !x.artistName.toLowerCase().includes('karaoke') &&
              this.isTitleMatch(cleanTitle || rawTitle, x.trackName) &&
              this.isArtistMatch(rawArtist, x.artistName)
            );

            if (match) break;
          }

          // Se iTunes non risponde o è bloccato da Akamai (403), usa Deezer JSONP come fallback istantaneo
          if (!match) {
            for (const q of queries) {
              try {
                const dz = await fetchDeezerTrack(q, cleanTitle || rawTitle, rawArtist);
                // Valida corrispondenza rigorosa titolo e artista prima di accettare il brano da Deezer
                if (dz && dz.previewUrl && this.isTitleMatch(cleanTitle || rawTitle, dz.title) && this.isArtistMatch(rawArtist, dz.artist)) {
                  match = {
                    trackId: 'dz_' + Math.random().toString(36).slice(2, 8),
                    trackName: dz.title,
                    artistName: dz.artist,
                    previewUrl: dz.previewUrl,
                    artworkUrl100: dz.artworkUrl,
                    releaseDate: dz.year ? `${dz.year}-01-01` : null
                  };
                  break;
                }
              } catch (e) {}
            }
          }

          if (match) {
            const hdArtwork = match.artworkUrl100 ? match.artworkUrl100.replace('100x100bb', '600x600bb') : (match.artworkUrl60 || '');
            const year = match.releaseDate ? String(new Date(match.releaseDate).getFullYear()) : '2023';

            const trackObj = {
              id: `tr_${match.trackId}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
              title: match.trackName,
              artist: match.artistName,
              year: year,
              previewUrl: match.previewUrl,
              artworkUrl: hdArtwork,
              isCustom: true
            };

            // Pre-carica in cache audio nativo
            this.audioEngine.cache.set(trackObj.id, {
              previewUrl: match.previewUrl,
              artworkUrl: hdArtwork,
              year: year,
              title: match.trackName,
              artist: match.artistName
            });

            return trackObj;
          }
        } catch (e) {
          return null;
        }
      });

      const batchResults = await Promise.all(promises);
      batchResults.forEach(r => {
        if (r) {
          // Deduplica rigorosamente per evitare di inserire la stessa canzone più volte nella playlist
          const normTitle = this.normalizeString(r.title);
          if (!resolvedTracks.some(existing => this.normalizeString(existing.title) === normTitle)) {
            resolvedTracks.push(r);
          }
        }
      });

      if (onProgress) {
        onProgress(resolvedTracks.length, Math.min(i + batchSize, total), total);
      }
    }

    return resolvedTracks;
  }

  async handleSaveCustomPlaylist() {
    const name = this.dom.customPlaylistNameInput.value.trim() || 'Playlist Personalizzata';
    const rawText = this.dom.customPlaylistTracksArea.value;
    const lines = rawText.split('\n')
      .map(l => l.replace(/^\s*\d+\s*[\.\-\)]\s*/, '').replace(/\s+by\s+/i, ' - ').trim())
      .filter(l => l.length > 2);

    if (lines.length < 3) {
      alert("Inserisci almeno 3-5 canzoni per comporre una partita valida (una canzone per riga).");
      return;
    }

    const originalBtnText = this.dom.btnSaveCustomLabel.textContent;
    this.dom.btnSaveCustomLabel.textContent = "Verifica brani su Apple Music...";
    this.dom.btnSaveCustomPlaylist.setAttribute('disabled', 'true');

    try {
      const resolvedTracks = await this.resolveTracksWithAppleMusic(lines);

      if (resolvedTracks.length === 0) {
        alert("Nessuna delle canzoni inserite è stata trovata con anteprima audio su Apple Music. Controlla che i titoli siano scritti correttamente.");
        return;
      }

      // Crea e salva la playlist personalizzata
      const customCategory = {
        id: `custom_${Date.now()}`,
        name: name,
        icon: '🟢',
        description: `${resolvedTracks.length} brani reali verificati`,
        tracks: resolvedTracks,
        isCustom: true
      };

      this.customPlaylists = [customCategory, ...this.customPlaylists];
      this.saveCustomPlaylists();

      // Aggiungi tutti i brani all'autocomplete
      resolvedTracks.forEach(tr => {
        if (!this.allKnownTracks.some(k => this.normalizeString(k.title) === this.normalizeString(tr.title))) {
          this.allKnownTracks.push(tr);
        }
      });

      this.closeCustomPlaylistModal();
      this.renderCategories();
      this.selectCategory(customCategory);

      this.showSpotifyStatus(`✓ Playlist "${name}" creata con ${resolvedTracks.length} brani reali verificati!`, "success");

    } catch (err) {
      console.error("Errore salvataggio playlist personalizzata:", err);
      alert("Si è verificato un errore durante la verifica dei brani.");
    } finally {
      this.dom.btnSaveCustomLabel.textContent = originalBtnText;
      this.dom.btnSaveCustomPlaylist.removeAttribute('disabled');
    }
  }

  async handleSpotifyLinkLoad() {
    const rawUrl = this.dom.spotifyUrlInput.value.trim();
    if (!rawUrl) {
      this.showSpotifyStatus("Incolla prima un link valido di una playlist Spotify.", "error");
      return;
    }

    if (rawUrl.includes('/track/')) {
      this.showSpotifyStatus("Hai inserito il link di una singola traccia. Incolla il link di una Playlist completa!", "error");
      return;
    }

    const match = rawUrl.match(/playlist\/([a-zA-Z0-9]+)/);
    if (!match) {
      this.showSpotifyStatus("URL non riconosciuto. Usa il formato: https://open.spotify.com/playlist/...", "error");
      return;
    }

    const playlistId = match[1];
    const originalBtnText = this.dom.btnLoadSpotify.textContent;
    this.dom.btnLoadSpotify.setAttribute('disabled', 'true');
    this.dom.btnLoadSpotify.textContent = "Caricamento...";
    this.dom.btnStartGame.setAttribute('disabled', 'true');
    this.dom.btnStartLabel.textContent = "Analisi playlist Spotify in corso...";
    this.showSpotifyStatus("🔍 Analisi playlist ed estrazione brani da Spotify in corso...", "loading");

    try {
      // 1. oEmbed Spotify per estrarre il nome autentico della playlist
      let playlistTitle = "Playlist Spotify";
      try {
        const oEmbedUrl = `https://open.spotify.com/oembed?url=${encodeURIComponent('https://open.spotify.com/playlist/' + playlistId)}`;
        const oRes = await fetch(oEmbedUrl);
        if (oRes.ok) {
          const oData = await oRes.json();
          if (oData.title) playlistTitle = oData.title;
        }
      } catch (e) {
        console.warn("oEmbed Spotify fallito:", e);
      }

      // 2. Estrazione tracce autentiche dalla playlist tramite lettore embed
      let rawTracks = [];
      try {
        const jinaUrl = `https://r.jina.ai/https://open.spotify.com/embed/playlist/${playlistId}`;
        const ctrl = new AbortController();
        const timeout = setTimeout(() => ctrl.abort(), 16000);
        const jRes = await fetch(jinaUrl, { signal: ctrl.signal, headers: { 'X-No-Cache': 'true' } });
        clearTimeout(timeout);

        if (jRes.ok) {
          const text = await jRes.text();
          
          const seenRaw = new Set();

          // Pattern 1: Heading markdown (### Title \n #### Artist)
          const regex1 = /###\s+([^\n\r]+)[\r\n]+####\s+(?:E\s+)?([^\n\r]+)/g;
          let m;
          while ((m = regex1.exec(text)) !== null) {
            const title = m[1].trim();
            let artist = m[2].trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
            const key = (title + '|' + artist).toLowerCase();
            if (title && artist && !seenRaw.has(key) && !title.toLowerCase().includes('page not found') && !title.toLowerCase().includes('spotify')) {
              seenRaw.add(key);
              rawTracks.push({ title, artist });
            }
          }

          // Pattern 2: Numbered list format (1. **Title** by Artist)
          if (rawTracks.length === 0) {
            const regex2 = /\d+\.\s+\*\*([^\*]+)\*\*\s+(?:by|-)\s+([^\n\r]+)/gi;
            while ((m = regex2.exec(text)) !== null) {
              const title = m[1].trim();
              const artist = m[2].trim();
              const key = (title + '|' + artist).toLowerCase();
              if (title && artist && !seenRaw.has(key)) {
                seenRaw.add(key);
                rawTracks.push({ title, artist });
              }
            }
          }

          // Pattern 3: Line items
          if (rawTracks.length === 0) {
            const lines = text.split('\n');
            for (let i = 0; i < lines.length - 1; i++) {
              const line = lines[i].trim();
              const nextLine = lines[i+1].trim();
              if (line.startsWith('### ') && nextLine.startsWith('#### ')) {
                const title = line.replace(/^###\s+/, '').trim();
                const artist = nextLine.replace(/^####\s+(?:E\s+)?/, '').trim();
                const key = (title + '|' + artist).toLowerCase();
                if (title && artist && !seenRaw.has(key)) {
                  seenRaw.add(key);
                  rawTracks.push({ title, artist });
                }
              }
            }
          }
        }
      } catch (e) {
        console.warn("Estrazione automatica tracce Spotify fallita:", e);
      }

      // 3. Se abbiamo estratto con successo brani reali dalla playlist Spotify:
      if (rawTracks.length > 0) {
        this.showSpotifyStatus(`Trovati ${rawTracks.length} brani in "${playlistTitle}"! Verifica anteprime audio...`, "loading");

        // Risolvi l'intera playlist (fino a 100 brani) per garantire massima varietà e casualità
        const tracksToResolve = rawTracks.slice(0, 100);
        const resolvedTracks = await this.resolveTracksWithAppleMusic(tracksToResolve, (resolvedCount, processedCount, total) => {
          this.showSpotifyStatus(`Verifica brani... (${processedCount}/${total} analizzati, ${resolvedCount} con anteprima pronta)`, "loading");
        });

        if (resolvedTracks.length >= 3) {
          const customCategory = {
            id: `spotify_${playlistId}_${Date.now()}`,
            name: playlistTitle,
            icon: '🟢',
            description: `${resolvedTracks.length} brani estratti dalla tua playlist Spotify`,
            tracks: resolvedTracks,
            isCustom: true,
            spotifyUrl: rawUrl
          };

          // Salva in customPlaylists eliminando eventuali vecchie playlist di test o duplicate
          this.customPlaylists = [
            customCategory,
            ...this.customPlaylists.filter(c => !c.id.startsWith(`spotify_${playlistId}`) && !c.name?.toLowerCase().includes('top 100 most streamed'))
          ];
          this.saveCustomPlaylists();

          // Aggiungi a allKnownTracks per autocomplete
          resolvedTracks.forEach(tr => {
            if (!this.allKnownTracks.some(k => this.normalizeString(k.title) === this.normalizeString(tr.title))) {
              this.allKnownTracks.push(tr);
            }
          });

          this.renderCategories();
          this.selectCategory(customCategory);

          this.showSpotifyStatus(`✓ Playlist "${playlistTitle}" caricata con ${resolvedTracks.length} brani pronti! Avvio partita...`, "success");
          
          // Avvia direttamente e senza equivoci la partita con la playlist appena caricata
          setTimeout(() => {
            this.startNewGame();
          }, 350);
          return;
        }
      }

      // 4. Se Spotify non permette l'estrazione diretta (playlist privata o non indicizzata)
      this.showSpotifyStatus(`Playlist rilevata: "${playlistTitle}". Spotify limita l'accesso automatico a questa playlist privata. Inserisci o incolla i brani nel compositore.`, "error");
      this.openCustomPlaylistModal(
        playlistTitle,
        rawTracks.map(t => `${t.title} - ${t.artist}`).join('\n')
      );

    } catch (err) {
      console.error("Errore importazione playlist Spotify:", err);
      this.showSpotifyStatus("Impossibile importare la playlist. Verifica che il link sia pubblico.", "error");
    } finally {
      this.dom.btnLoadSpotify.removeAttribute('disabled');
      this.dom.btnLoadSpotify.textContent = originalBtnText;
      this.dom.btnStartGame.removeAttribute('disabled');
      this.updateStartButtonLabel();
    }
  }

  showSpotifyStatus(msg, type) {
    this.dom.spotifyStatusMsg.textContent = msg;
    this.dom.spotifyStatusMsg.className = `spotify-status ${type}`;
  }

  // ==========================================================================
  // SCHERMATA 2: AVVIO E GESTIONE DELLA PARTITA
  // ==========================================================================
  /**
   * Estrae dinamicamente e in modo realmente casuale un pool di brani da Apple Music / iTunes.
   * Alterna artisti famosi del genere e ricerche tematiche, garantendo varietà infinita.
   */
  async fetchDynamicTracksForCategory(category) {
    const candidates = [];

    try {
      // 1. Seleziona fino a 2 artisti casuali dal pool di artisti di questa categoria
      const artistsPool = category.featuredArtists || [];
      const selectedArtists = this.shuffleArray(artistsPool).slice(0, 2);

      // 2. Seleziona 1 query di genere casuale
      const queriesPool = category.searchQueries || [category.name];
      const selectedQuery = queriesPool[Math.floor(Math.random() * queriesPool.length)];

      const searchTerms = [...selectedArtists, selectedQuery];

      // Esegui fetch parallele su iTunes Music Italia (country=IT)
      const promises = searchTerms.map(term =>
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=25&country=IT`)
          .then(r => r.ok ? r.json() : { results: [] })
          .catch(() => ({ results: [] }))
      );

      const resultsSets = await Promise.all(promises);

      resultsSets.forEach(dataset => {
        if (dataset.results) {
          dataset.results.forEach(item => {
            if (item.previewUrl && item.trackName && item.artistName) {
              const hdArtwork = item.artworkUrl100 ? item.artworkUrl100.replace('100x100bb', '600x600bb') : item.artworkUrl60;
              const year = item.releaseDate ? String(new Date(item.releaseDate).getFullYear()) : '2023';

              const trackObj = {
                id: `dynamic_${item.trackId}`,
                title: item.trackName,
                artist: item.artistName,
                year: year,
                previewUrl: item.previewUrl,
                artworkUrl: hdArtwork,
                isDynamic: true
              };

              candidates.push(trackObj);

              // Salva subito in cache audio per riproduzione a latenza zero
              this.audioEngine.cache.set(trackObj.id, {
                previewUrl: item.previewUrl,
                artworkUrl: hdArtwork,
                year: year,
                title: item.trackName,
                artist: item.artistName
              });
            }
          });
        }
      });
    } catch (err) {
      console.warn("Dynamic songs fetch fallback:", err);
    }

    return candidates;
  }

  async startNewGame() {
    this.audioEngine.stopPlayback();

    // Se l'utente ha incollato un link Spotify nell'input che non è ancora stato caricato:
    const spotifyUrlInInput = this.dom.spotifyUrlInput ? this.dom.spotifyUrlInput.value.trim() : '';
    if (spotifyUrlInInput && spotifyUrlInInput.includes('spotify.com/playlist') && (!this.selectedCategory.isCustom || this.selectedCategory.spotifyUrl !== spotifyUrlInInput)) {
      await this.handleSpotifyLinkLoad();
      return;
    }

    const originalBtnText = this.dom.btnStartLabel.textContent;
    this.dom.btnStartLabel.textContent = "Preparazione partita...";

    try {
      if (this.selectedCategory.isCustom) {
        // PLAYLIST PERSONALIZZATA O SPOTIFY:
        // Usa RIGOROSAMENTE ED ESCLUSIVAMENTE le canzoni della playlist utente!
        // NON mescolare MAI con generi esterni o brani estranei!
        // Deduplica rigorosamente per garantire che ogni canzone sia unica nella partita
        const uniquePool = [];
        const seen = new Set();
        (this.selectedCategory.tracks || []).forEach(tr => {
          const key = this.normalizeString(tr.title);
          if (!seen.has(key)) {
            seen.add(key);
            uniquePool.push(tr);
          }
        });
        this.playlist = this.shuffleArray(uniquePool);
        this.totalSongsInGame = Math.min(TOTAL_SONGS_PER_GAME, this.playlist.length);
        this.playlist = this.playlist.slice(0, this.totalSongsInGame);
      } else {
        // CATEGORIA STANDARD PREDEFINITA:
        // 1. Estrai un pool fresco e dinamico da Apple Music / iTunes
        const dynamicTracks = await this.fetchDynamicTracksForCategory(this.selectedCategory);

        // 2. Combina con le tracce base della categoria
        const combinedPool = [...this.selectedCategory.tracks, ...dynamicTracks];

        // 3. Deduplica per titolo normalizzato
        const uniquePool = [];
        const seen = new Set();
        combinedPool.forEach(tr => {
          const key = this.normalizeString(tr.title);
          if (!seen.has(key)) {
            seen.add(key);
            uniquePool.push(tr);
          }
        });

        // 4. Mescola completamente e prendi 10 canzoni uniche
        this.totalSongsInGame = TOTAL_SONGS_PER_GAME;
        this.playlist = this.shuffleArray(uniquePool).slice(0, TOTAL_SONGS_PER_GAME);

        // Se necessario, completa dal catalogo generale
        if (this.playlist.length < TOTAL_SONGS_PER_GAME) {
          const extra = this.shuffleArray(this.allKnownTracks).filter(t => !this.playlist.some(p => this.normalizeString(p.title) === this.normalizeString(t.title)));
          this.playlist = this.playlist.concat(extra.slice(0, TOTAL_SONGS_PER_GAME - this.playlist.length));
        }
      }

      // Aggiorna l'elenco delle canzoni note per l'autocomplete
      this.playlist.forEach(tr => {
        if (!this.allKnownTracks.some(k => this.normalizeString(k.title) === this.normalizeString(tr.title))) {
          this.allKnownTracks.push(tr);
        }
      });

    } catch (e) {
      console.warn("Fallback to baseline tracks:", e);
      const pool = [...this.selectedCategory.tracks];
      this.totalSongsInGame = Math.min(TOTAL_SONGS_PER_GAME, pool.length);
      this.playlist = this.shuffleArray(pool).slice(0, this.totalSongsInGame);
    } finally {
      this.dom.btnStartLabel.textContent = originalBtnText;
    }

    // Reset punteggi
    this.currentSongIndex = 0;
    this.soloScore = 0;
    this.history = [];
    this.duoState = {
      scoreA: 0,
      scoreB: 0,
      historyA: [],
      historyB: []
    };

    this.showScreen('game');
    this.setupTurnUI();
    this.loadActiveSong();
  }

  getCurrentPlayer() {
    if (this.gameMode === 'solo') return 'solo';
    // 1 vs 1: Turni alterni (Index 0 = Player A, Index 1 = Player B, etc.)
    return this.currentSongIndex % 2 === 0 ? 'player-a' : 'player-b';
  }

  setupTurnUI() {
    const player = this.getCurrentPlayer();
    
    if (this.gameMode === 'solo') {
      this.setTheme('player-a');
      this.dom.turnBanner.classList.add('hidden');
      this.dom.scoreValText.textContent = this.soloScore;
    } else {
      if (player === 'player-a') {
        this.setTheme('player-a');
        this.dom.turnBanner.classList.remove('hidden');
        this.dom.turnBannerText.textContent = "Turno di: Giocatore A";
        this.dom.scoreValText.textContent = this.duoState.scoreA;
      } else {
        this.setTheme('player-b');
        this.dom.turnBanner.classList.remove('hidden');
        this.dom.turnBannerText.textContent = "Turno di: Giocatore B";
        this.dom.scoreValText.textContent = this.duoState.scoreB;
      }
    }

    this.dom.gameCategoryTitle.textContent = this.selectedCategory.name;
    this.dom.gameSongCounter.textContent = `Canzone ${this.currentSongIndex + 1} di ${this.totalSongsInGame || TOTAL_SONGS_PER_GAME}`;
  }

  async loadActiveSong() {
    this.currentAttempt = 1;
    this.selectedGuess = null;
    this.clearSearchInput();
    this.audioEngine.stopPlayback();
    this.resetPlayProgressUI();

    const currentTrack = this.playlist[this.currentSongIndex];
    
    // UI Reset della Mystery Card (Mockup 1)
    this.dom.cardGenrePill.textContent = this.selectedCategory.name;
    this.dom.cardYearPill.textContent = "????";
    this.dom.cardAttemptTitle.textContent = "TENTATIVO 1/6";
    this.dom.mysterySongTitle.textContent = "Canzone Sconosciuta";
    this.dom.mysteryArtistName.textContent = "Artista Sconosciuto";
    this.dom.mysteryCardElem.classList.remove('playing');

    // Reset indicatori 6 tentativi
    this.renderAttemptSlots();

    // Reset Play Button Info
    this.updatePlayIntervalUI();

    // Pre-carica i dati audio da Deezer/iTunes in background
    this.isLoadingSongData = true;
    this.dom.playFeedbackStatus.textContent = "Caricamento audio...";
    this.currentSongData = await this.audioEngine.fetchTrackDetails(currentTrack);
    this.isLoadingSongData = false;
    
    // Pre-carica immediatamente il file audio in memoria
    if (this.currentSongData && this.currentSongData.previewUrl) {
      this.audioEngine.prepareTrack(this.currentSongData.previewUrl);
      this.dom.playFeedbackStatus.textContent = "Tocca per ascoltare";
      if (this.currentSongData.year) {
        this.dom.cardYearPill.textContent = this.currentSongData.year;
      }
    } else {
      this.dom.playFeedbackStatus.textContent = "Audio non disponibile";
    }

    // Pre-carica anche la canzone successiva per performance istantanea su iPhone
    if (this.currentSongIndex + 1 < this.playlist.length) {
      this.audioEngine.fetchTrackDetails(this.playlist[this.currentSongIndex + 1]);
    }
  }

  renderAttemptSlots() {
    const slots = this.dom.attemptsTrackers.querySelectorAll('.attempt-slot');
    slots.forEach((slot, idx) => {
      const stepNum = idx + 1;
      slot.className = 'attempt-slot';
      slot.textContent = stepNum;

      if (stepNum === this.currentAttempt) {
        slot.classList.add('active');
      } else if (stepNum < this.currentAttempt) {
        // Marcato come tentativo sprecato/errato in precedenza
        slot.classList.add('wrong');
      }
    });
  }

  updatePlayIntervalUI() {
    const currentStepConfig = TIME_STEPS[this.currentAttempt - 1];
    this.dom.playTimeSecondsTag.textContent = currentStepConfig.label;
    this.dom.cardAttemptTitle.textContent = `TENTATIVO ${this.currentAttempt}/6`;
    this.resetPlayProgressUI();
  }

  resetPlayProgressUI() {
    this.dom.iconPlayState.classList.remove('hidden');
    this.dom.iconPauseState.classList.add('hidden');
    this.dom.playCircleProgress.style.strokeDashoffset = CIRCLE_CIRCUMFERENCE;
    this.dom.mysteryCardElem.classList.remove('playing');
  }

  // ==========================================================================
  // GESTIONE AUDIO NATIVO
  // ==========================================================================
  handlePlayAudioTap() {
    if (this.audioEngine.isPlaying) {
      this.audioEngine.stopPlayback();
      this.resetPlayProgressUI();
      this.dom.playFeedbackStatus.textContent = "In pausa. Tocca per ascoltare";
      return;
    }

    if (this.isLoadingSongData) {
      this.dom.playFeedbackStatus.textContent = "Caricamento audio in corso, attendi...";
      return;
    }

    if (!this.currentSongData || !this.currentSongData.previewUrl) {
      this.dom.playFeedbackStatus.textContent = "Audio non disponibile per questo brano";
      return;
    }

    const currentStepConfig = TIME_STEPS[this.currentAttempt - 1];
    const durationSeconds = currentStepConfig.seconds;

    // Aggiorna UI a stato "In riproduzione"
    this.dom.iconPlayState.classList.add('hidden');
    this.dom.iconPauseState.classList.remove('hidden');
    this.dom.mysteryCardElem.classList.add('playing');
    this.dom.playFeedbackStatus.textContent = `Ascolto (${currentStepConfig.label})...`;

    this.audioEngine.playStepClip(
      this.currentSongData.previewUrl,
      durationSeconds,
      (progress) => {
        // Anima anello circolare SVG
        const offset = CIRCLE_CIRCUMFERENCE * (1 - progress);
        this.dom.playCircleProgress.style.strokeDashoffset = offset;
      },
      () => {
        // Al termine esatto del clip temporale
        this.resetPlayProgressUI();
        this.dom.playFeedbackStatus.textContent = "Tocca per riascoltare";
      }
    );
  }

  // ==========================================================================
  // AUTOCOMPLETE LIVE & RICERCA CANZONI (Locale + Live Apple Music / Deezer JSONP)
  // ==========================================================================
  async fetchItunesSearch(query) {
    const clean = query.trim().toLowerCase();
    if (!clean || clean.length < 2) return [];

    if (this.itunesSearchCache.has(clean)) {
      return this.itunesSearchCache.get(clean);
    }

    // 1. Prova con Apple iTunes
    try {
      if (this.searchAbortController) {
        this.searchAbortController.abort();
      }
      this.searchAbortController = new AbortController();

      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(clean)}&entity=song&limit=15&country=IT`;
      const res = await fetch(url, { signal: this.searchAbortController.signal });
      if (res.ok) {
        const data = await res.json();
        if (data.results && data.results.length > 0) {
          const results = data.results.map(item => ({
            id: `itunes_${item.trackId}`,
            title: item.trackName,
            artist: item.artistName,
            artworkUrl: item.artworkUrl60 || item.artworkUrl100,
            year: item.releaseDate ? new Date(item.releaseDate).getFullYear() : '',
            isOnline: true
          }));
          this.itunesSearchCache.set(clean, results);
          return results;
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return [];
    }

    // 2. Se iTunes fallisce o rate-limita (403), fallback istantaneo su Deezer JSONP
    try {
      const dzResults = await fetchDeezerSearchList(clean, 15);
      if (dzResults && dzResults.length > 0) {
        this.itunesSearchCache.set(clean, dzResults);
        return dzResults;
      }
    } catch (e) {}

    return [];
  }

  handleSearchInput(query) {
    const cleanQuery = query.trim();
    
    if (cleanQuery.length > 0) {
      this.dom.btnClearSearch.classList.remove('hidden');
    } else {
      this.dom.btnClearSearch.classList.add('hidden');
      this.dom.autocompleteDropdown.classList.add('hidden');
      this.selectedGuess = null;
      this.dom.btnSubmitGuess.setAttribute('disabled', 'true');
      return;
    }

    // Se l'utente digita almeno 2 caratteri, abilita il tasto di invio risposta
    if (cleanQuery.length >= 2) {
      this.dom.btnSubmitGuess.removeAttribute('disabled');
    }

    // 1. Risultati locali istantanei (0ms latency)
    const localMatches = this.allKnownTracks.filter(track => {
      const matchTitle = track.title.toLowerCase().includes(cleanQuery.toLowerCase());
      const matchArtist = track.artist.toLowerCase().includes(cleanQuery.toLowerCase());
      return matchTitle || matchArtist;
    }).slice(0, 6);

    // Mostra subito i risultati locali
    this.renderAutocompleteDropdown(localMatches, true);

    // 2. Query in background in tempo reale all'API di Apple Music / iTunes
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }

    this.searchDebounceTimer = setTimeout(async () => {
      const onlineResults = await this.fetchItunesSearch(cleanQuery);
      
      // Assicura che l'input non sia cambiato nel frattempo
      if (cleanQuery !== this.dom.guessSearchInput.value.trim()) return;

      // Unisci e deduplica i risultati
      const combined = [...localMatches];
      const seenSignatures = new Set(localMatches.map(t => this.normalizeString(t.title) + '|' + this.normalizeString(t.artist)));

      onlineResults.forEach(item => {
        const sig = this.normalizeString(item.title) + '|' + this.normalizeString(item.artist);
        if (!seenSignatures.has(sig)) {
          seenSignatures.add(sig);
          combined.push(item);
        }
      });

      this.renderAutocompleteDropdown(combined.slice(0, 10), false);
    }, 200);
  }

  renderAutocompleteDropdown(items, isSearchingMore) {
    this.dom.autocompleteDropdown.innerHTML = '';

    if (items.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'dropdown-empty';
      empty.textContent = isSearchingMore 
        ? 'Ricerca online su Apple Music...' 
        : 'Nessun suggerimento. Puoi comunque inviare ciò che hai scritto!';
      this.dom.autocompleteDropdown.appendChild(empty);
      this.dom.autocompleteDropdown.classList.remove('hidden');
      return;
    }

    items.forEach(item => {
      const li = document.createElement('li');
      li.className = 'dropdown-item';
      li.setAttribute('role', 'option');

      const thumbHtml = item.artworkUrl 
        ? `<img src="${item.artworkUrl}" alt="cover" loading="lazy" />`
        : `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>`;

      li.innerHTML = `
        <div class="dropdown-item-thumb">${thumbHtml}</div>
        <div class="dropdown-item-info">
          <span class="item-song-title">${this.escapeHTML(item.title)}</span>
          <span class="item-song-artist">${this.escapeHTML(item.artist)}</span>
        </div>
      `;

      li.addEventListener('click', () => {
        this.selectGuessItem(item);
      });

      this.dom.autocompleteDropdown.appendChild(li);
    });

    this.dom.autocompleteDropdown.classList.remove('hidden');
  }

  selectGuessItem(item) {
    this.selectedGuess = item;
    this.dom.guessSearchInput.value = `${item.title} - ${item.artist}`;
    this.dom.autocompleteDropdown.classList.add('hidden');
    this.dom.btnSubmitGuess.removeAttribute('disabled');
  }

  clearSearchInput() {
    this.dom.guessSearchInput.value = '';
    this.selectedGuess = null;
    this.dom.btnClearSearch.classList.add('hidden');
    this.dom.autocompleteDropdown.classList.add('hidden');
    this.dom.btnSubmitGuess.setAttribute('disabled', 'true');
    if (this.searchDebounceTimer) {
      clearTimeout(this.searchDebounceTimer);
    }
  }

  // ==========================================================================
  // SALTA O INVIA TENTATIVO
  // ==========================================================================
  handleSkipAttempt() {
    this.audioEngine.stopPlayback();
    this.resetPlayProgressUI();

    // Segna lo slot corrente come sprecato/saltato
    const currentSlot = this.dom.attemptsTrackers.querySelector(`[data-step="${this.currentAttempt}"]`);
    if (currentSlot) currentSlot.classList.add('skipped');

    if (this.currentAttempt < 6) {
      this.currentAttempt++;
      this.renderAttemptSlots();
      this.updatePlayIntervalUI();
      this.clearSearchInput();
    } else {
      // 6 tentativi esauriti
      this.finishSongRound(false, 0);
    }
  }

  handleSubmitGuess() {
    const rawInput = this.dom.guessSearchInput.value.trim();
    if (!this.selectedGuess && !rawInput) return;

    // Se l'utente non ha selezionato dal dropdown ma ha premuto Invia o Invio, valuta il testo digitato
    const guessToEvaluate = this.selectedGuess || {
      title: rawInput,
      artist: ''
    };

    this.audioEngine.stopPlayback();
    this.resetPlayProgressUI();

    const activeTrack = this.playlist[this.currentSongIndex];
    
    // Normalizza e controlla uguaglianza con tolleranza elevata
    const isCorrect = this.isGuessCorrect(guessToEvaluate, activeTrack);

    if (isCorrect) {
      // Slot verde indovinato
      const currentSlot = this.dom.attemptsTrackers.querySelector(`[data-step="${this.currentAttempt}"]`);
      if (currentSlot) {
        currentSlot.classList.remove('active', 'wrong');
        currentSlot.classList.add('correct');
      }

      const pointsEarned = TIME_STEPS[this.currentAttempt - 1].points;
      this.finishSongRound(true, pointsEarned);

    } else {
      // Slot rosso errato
      const currentSlot = this.dom.attemptsTrackers.querySelector(`[data-step="${this.currentAttempt}"]`);
      if (currentSlot) {
        currentSlot.classList.remove('active');
        currentSlot.classList.add('wrong');
      }

      // Animazione scuotimento feedback visivo
      this.dom.mysteryCardElem.style.transform = 'translateX(-6px)';
      setTimeout(() => this.dom.mysteryCardElem.style.transform = 'translateX(6px)', 80);
      setTimeout(() => this.dom.mysteryCardElem.style.transform = 'translateX(0)', 160);

      if (this.currentAttempt < 6) {
        this.currentAttempt++;
        this.renderAttemptSlots();
        this.updatePlayIntervalUI();
        this.clearSearchInput();
      } else {
        // Fine tentativi
        this.finishSongRound(false, 0);
      }
    }
  }

  normalizeString(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // rimuove accenti
      .replace(/\(.*?\)|\[.*?\]/g, '') // rimuove parentesi e feat.
      .replace(/feat\..*|ft\..*|with.*/gi, '') // rimuove feat
      .replace(/[^a-z0-9]/g, '') // rimuove spazi e caratteri speciali
      .trim();
  }

  isGuessCorrect(guess, target) {
    if (!guess || !target) return false;
    if (guess.id && target.id && guess.id === target.id) return true;

    const normTargetTitle = this.normalizeString(target.title);
    const normGuessTitle = this.normalizeString(guess.title);

    const normTargetArtist = this.normalizeString(target.artist);
    const normGuessArtist = this.normalizeString(guess.artist);

    // Controllo titolo
    const titleExact = normTargetTitle === normGuessTitle;
    const titleContains = normTargetTitle.includes(normGuessTitle) || (normGuessTitle.length >= 3 && normGuessTitle.includes(normTargetTitle));

    const isTitleMatch = titleExact || titleContains;

    // Se l'artista non è specificato nel guess (es. digitato solo "gelosa")
    if (!normGuessArtist) {
      return isTitleMatch;
    }

    // Controllo artista con tolleranza feat e collaborazioni
    const artistExact = normTargetArtist === normGuessArtist;
    const artistContains = normTargetArtist.includes(normGuessArtist) || normGuessArtist.includes(normTargetArtist);
    
    // Controlla se almeno uno degli artisti coincide (es. Finesse, Shiva, Sfera Ebbasta, Guè)
    const targetWords = (target.artist || '').toLowerCase().split(/[\s,&+]+/);
    const guessWords = (guess.artist || '').toLowerCase().split(/[\s,&+]+/);
    const hasSharedArtist = targetWords.some(w => w.length > 3 && guessWords.includes(w));

    return isTitleMatch && (artistExact || artistContains || hasSharedArtist);
  }

  // ==========================================================================
  // SCHERMATA 3: RIVELAZIONE BRANO (Mockup 4)
  // ==========================================================================
  finishSongRound(guessed, points) {
    const activeTrack = this.playlist[this.currentSongIndex];
    const player = this.getCurrentPlayer();
    const timeUsed = TIME_STEPS[this.currentAttempt - 1].label;

    // Registra dati nel punteggio
    const roundData = {
      song: activeTrack,
      details: this.currentSongData,
      guessed: guessed,
      attemptsUsed: guessed ? this.currentAttempt : 6,
      timeUsed: timeUsed,
      points: points,
      player: player
    };

    this.history.push(roundData);

    if (this.gameMode === 'solo') {
      this.soloScore += points;
      this.dom.scoreValText.textContent = this.soloScore;
      this.dom.revealDuoScores.classList.add('hidden');
    } else {
      if (player === 'player-a') {
        this.duoState.scoreA += points;
        this.duoState.historyA.push(roundData);
      } else {
        this.duoState.scoreB += points;
        this.duoState.historyB.push(roundData);
      }

      // Mostra punteggi parziali 1 vs 1
      this.dom.revealDuoScores.classList.remove('hidden');
      this.dom.duoRevealPtsA.textContent = `${this.duoState.scoreA} pt`;
      this.dom.duoRevealPtsB.textContent = `${this.duoState.scoreB} pt`;
    }

    // Configura Schermata Rivelazione
    this.setupRevealUI(roundData);
    this.showScreen('reveal');
  }

  setupRevealUI(roundData) {
    const details = this.currentSongData || {};
    
    if (this.dom.revealCategoryTitle) {
      this.dom.revealCategoryTitle.textContent = this.selectedCategory.name;
    }

    // Status Header
    if (roundData.guessed) {
      this.dom.revealStatusBanner.classList.remove('failed');
      this.dom.revealIconCircle.innerHTML = `<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>`;
      this.dom.revealHeadline.textContent = "Fantastico!";
      this.dom.revealSubtitle.textContent = `+${roundData.points} Punti guadagnati`;
    } else {
      this.dom.revealStatusBanner.classList.add('failed');
      this.dom.revealIconCircle.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      this.dom.revealHeadline.textContent = "Peccato!";
      this.dom.revealSubtitle.textContent = "Canzone non indovinata (0 pt)";
    }

    // Copertina Album HD e Titoli
    this.dom.revealAlbumArt.src = details.artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80';
    this.dom.revealTrackName.textContent = details.title || roundData.song.title;
    this.dom.revealTrackArtist.textContent = details.artist || roundData.song.artist;
    this.dom.revealTrackYear.textContent = details.year || roundData.song.year;

    // Statistiche Round
    this.dom.revealStatAttempts.textContent = roundData.guessed ? `${roundData.attemptsUsed}/6` : 'Fallito';
    this.dom.revealStatTime.textContent = roundData.timeUsed;
    this.dom.revealStatPoints.textContent = `+${roundData.points}`;

    // Testo bottone bottom
    const totalCount = this.totalSongsInGame || TOTAL_SONGS_PER_GAME;
    const isLastSong = this.currentSongIndex >= totalCount - 1;
    this.dom.btnNextLabel.textContent = isLastSong ? "Vedi Risultati 🏆" : "Prossima Canzone";
  }

  handleReplayFullTap() {
    if (!this.currentSongData || !this.currentSongData.previewUrl) return;

    this.audioEngine.toggleFullPlayback(this.currentSongData.previewUrl, (isPlaying) => {
      this.dom.btnReplayFull.innerHTML = isPlaying 
        ? `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1.5"></rect><rect x="14" y="4" width="4" height="16" rx="1.5"></rect></svg>`
        : `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
    });
  }

  handleNextSongTap() {
    this.audioEngine.stopPlayback();

    const totalCount = this.totalSongsInGame || TOTAL_SONGS_PER_GAME;
    const isLastSong = this.currentSongIndex >= totalCount - 1;
    if (isLastSong) {
      this.showFinalResults();
      return;
    }

    // Incrementa canzone
    this.currentSongIndex++;

    // In 1 vs 1: Mostra schermata modale Pass & Play
    if (this.gameMode === 'duo') {
      const nextPlayer = this.getCurrentPlayer();
      const nextPlayerName = nextPlayer === 'player-a' ? 'Giocatore A' : 'Giocatore B';
      this.dom.modalNextPlayerName.textContent = nextPlayerName;
      this.showScreen('game');
      this.dom.modalPassPlay.classList.remove('hidden');
    } else {
      this.setupTurnUI();
      this.loadActiveSong();
      this.showScreen('game');
    }
  }

  // ==========================================================================
  // SCHERMATA 4: RISULTATI FINALI
  // ==========================================================================
  showFinalResults() {
    this.showScreen('results');

    const totalCount = this.totalSongsInGame || TOTAL_SONGS_PER_GAME;

    if (this.gameMode === 'solo') {
      this.dom.resultsSoloView.classList.remove('hidden');
      this.dom.resultsDuoView.classList.add('hidden');

      const totalGuessed = this.history.filter(h => h.guessed).length;
      const accuracyPct = Math.round((totalGuessed / (totalCount || 1)) * 100);

      this.dom.finalSoloScore.textContent = this.soloScore;
      this.dom.finalGuessedCount.textContent = `${totalGuessed}/${totalCount}`;
      this.dom.finalAccuracyPct.textContent = `${accuracyPct}%`;
      
      // Calcolo tempo medio
      const totalSeconds = this.history.reduce((acc, h) => {
        const val = parseFloat(h.timeUsed.replace('s', '')) || 0;
        return acc + val;
      }, 0);
      const avgTime = (totalSeconds / (totalCount || 1)).toFixed(1);
      this.dom.finalAvgTime.textContent = `${avgTime}s`;

    } else {
      // Modalità 1 vs 1 Locale
      this.dom.resultsSoloView.classList.add('hidden');
      this.dom.resultsDuoView.classList.remove('hidden');

      const ptsA = this.duoState.scoreA;
      const ptsB = this.duoState.scoreB;
      const guessedA = this.duoState.historyA.filter(h => h.guessed).length;
      const guessedB = this.duoState.historyB.filter(h => h.guessed).length;

      const songsA = Math.ceil(totalCount / 2);
      const songsB = Math.floor(totalCount / 2);

      this.dom.finalPtsPlayerA.textContent = `${ptsA} pt`;
      this.dom.finalGuessedPlayerA.textContent = `${guessedA}/${songsA} Indovinate`;

      this.dom.finalPtsPlayerB.textContent = `${ptsB} pt`;
      this.dom.finalGuessedPlayerB.textContent = `${guessedB}/${songsB} Indovinate`;

      this.dom.cardPlayerAFinal.classList.remove('is-winner');
      this.dom.cardPlayerBFinal.classList.remove('is-winner');

      if (ptsA > ptsB) {
        this.dom.winnerName.textContent = "🏆 Vince Giocatore A!";
        this.dom.winnerDetail.textContent = `Con un distacco di ${ptsA - ptsB} punti`;
        this.dom.cardPlayerAFinal.classList.add('is-winner');
      } else if (ptsB > ptsA) {
        this.dom.winnerName.textContent = "🏆 Vince Giocatore B!";
        this.dom.winnerDetail.textContent = `Con un distacco di ${ptsB - ptsA} punti`;
        this.dom.cardPlayerBFinal.classList.add('is-winner');
      } else {
        this.dom.winnerName.textContent = "🤝 Incredibile Pareggio!";
        this.dom.winnerDetail.textContent = "Stesso identico punteggio per entrambi i giocatori";
      }
    }

    // Renderizza la lista delle 10 canzoni
    this.renderSongsRecapList();
  }

  renderSongsRecapList() {
    this.dom.recapSongsList.innerHTML = '';

    this.history.forEach((h, idx) => {
      const row = document.createElement('div');
      row.className = 'recap-item-row';

      const statusIcon = h.guessed 
        ? `<div class="recap-status-icon success">✓</div>` 
        : `<div class="recap-status-icon fail">✕</div>`;

      const playerTag = this.gameMode === 'duo' 
        ? `<span style="font-size: 0.68rem; font-weight: 700; color: ${h.player === 'player-a' ? 'var(--player-a-color)' : 'var(--player-b-color)'}">[P${h.player === 'player-a' ? 'A' : 'B'}] </span>`
        : '';

      row.innerHTML = `
        <div class="recap-track-desc">
          ${statusIcon}
          <span class="recap-track-text">${playerTag}${idx + 1}. ${this.escapeHTML(h.song.title)} - ${this.escapeHTML(h.song.artist)}</span>
        </div>
        <div class="recap-track-pts">${h.guessed ? `+${h.points} pt` : '0 pt'}</div>
      `;

      this.dom.recapSongsList.appendChild(row);
    });
  }

  // ==========================================================================
  // HELPERS
  // ==========================================================================
  shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  escapeHTML(str) {
    return (str || '').replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

// Inizializza l'applicazione al caricamento del DOM
document.addEventListener('DOMContentLoaded', () => {
  window.app = new SpotiGuessApp();
});
