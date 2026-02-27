# JS Pokedex

Ein clientseitiges Pokedex-Projekt mit Vanilla JavaScript, HTML und CSS.
Die App laedt Pokemon-Daten aus der [PokeAPI](https://pokeapi.co/) und bietet Suche, Sortierung, Favoriten sowie eine Detailansicht.

---

## Features

- Pokemon-Liste mit Kartenansicht
- Nachladen in Bloecken oder direkt alle 151 Pokemon laden
- Paralleles Laden je Block via `Promise.all` (schneller als sequentielle Requests)
- Suche nach Namen
- Sortierung nach ID oder Name
- Favoritenmodus (inkl. Toggle im Header)
- Detailansicht pro Pokemon mit:
  - Navigation zum naechsten/vorherigen Pokemon
  - About- und Base-Stats-Tab
  - Favoriten-Icon
- Korrektes Oeffnen der Detailansicht ueber Pokemon-ID (stabil nach Sortierung/Filterung)
- Audio-Funktionen (Theme + Click-Sound)
- Responsives UI fuer Desktop, Tablet und Mobile

---

## Tech Stack

- HTML5
- CSS3 (modular aufgeteilt in `style/*.css`)
- Vanilla JavaScript (modular aufgeteilt in `js/*.js`)
- Externe Datenquelle: PokeAPI

---

## Projektstruktur

```text
.
|- index.html
|- README.md
|- js/
|  |- script.js         # App-Start, Daten laden, globales Rendering
|  |- template.js       # HTML-Templates fuer Karten und Detailansicht
|  |- pokemonCart.js    # Logik der Detailansicht
|  |- search.js         # Suchlogik
|  |- sortBy.js         # Sortierlogik
|  |- favorites.js      # Favoritenlogik
|  |- switchtypes.js    # Typ-Badge/Icon-Mapping
|  |- loader.js         # Nachladen / Alle laden / Loader-Steuerung
|  `- pokeSounds.js     # Audiofunktionen
|- style/
|  |- style.css         # Globales Styling + Variablen
|  |- header.css
|  |- footer.css
|  |- pokedex.css
|  |- pokemonCart.css
|  |- button.css
|  |- colors.css
|  |- helper.css
|  `- loader.css
`- assets/
   |- img/
   `- audio/
```

---

## Lokale Nutzung

Da die App mit relativen Pfaden arbeitet, am besten ueber einen lokalen Webserver starten.

### Option 1: VS Code Live Server

1. Projekt in VS Code oeffnen
2. Extension "Live Server" installieren
3. `index.html` mit "Open with Live Server" starten

### Option 2: Python HTTP Server

```bash
python3 -m http.server 5500
```

Dann im Browser aufrufen:

```text
http://localhost:5500
```

---

## Datenfluss (Kurzueberblick)

1. `init()` in `js/script.js` startet beim Laden der Seite.
2. `loadPokedex()` laedt Pokemon-Daten blockweise und parallel aus der PokeAPI in `myPokemonArray`.
3. `renderContent()` rendert die Hauptansicht.
4. Interaktionen (Suche, Sortierung, Favoriten, Detailansicht) aktualisieren die Anzeige ueber Re-Render.

---

## Wichtige globale Zustaende

- `myPokemonArray`: Alle geladenen Pokemon
- `favoritePokemons` / `favoritePokemonsIdOnly`: Favoritenverwaltung
- `minCountOfPokemons` / `maxCountentOfPokemons`: Bereich fuer API-Nachladebloecke
- `isLoading`: Sperre gegen doppelte parallele Ladevorgaenge

---

## Hinweise

- Die App ist auf die ersten 151 Pokemon ausgelegt.
