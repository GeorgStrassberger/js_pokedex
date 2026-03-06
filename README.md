# Pokedex (Vanilla JavaScript)

Interaktive Pokedex-Web-App mit Fokus auf saubere UI, gute Lesbarkeit und modularem Frontend-Code.
Die Anwendung laedt Pokemon-Daten aus der [PokeAPI](https://pokeapi.co/) und bietet Suche, Sortierung, Favoriten und eine Detailansicht.

## Live-Funktionen

- Grid-Ansicht mit den ersten 151 Pokemon
- Nachladen in Bloecken oder kompletter Schnell-Load
- Suche nach Namen in Echtzeit
- Sortierung nach ID oder Name
- Favoritenmodus inkl. Toggle im Header
- Detailansicht mit Navigation (vor/zurueck), About- und Base-Stats-Tab
- Responsives Layout fuer Desktop, Tablet und Mobile

## Tech Stack

- HTML5
- CSS3 (modular in `style/*.css`)
- Vanilla JavaScript (modular in `js/*.js`)
- Externe API: PokeAPI

## Projektstruktur

```text
.
|- index.html
|- README.md
|- js/
|  |- script.js
|  |- template.js
|  |- pokemonCart.js
|  |- search.js
|  |- sortBy.js
|  |- favorites.js
|  |- switchtypes.js
|  |- loader.js
|  `- pokeSounds.js
|- style/
|  |- style.css
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

## Lokales Starten

Die App sollte ueber einen lokalen Webserver laufen.

### Option 1: VS Code Live Server

1. Projekt in VS Code oeffnen
2. Extension "Live Server" installieren
3. `index.html` mit "Open with Live Server" starten

### Option 2: Python HTTP Server

```bash
python3 -m http.server 5500
```

Dann im Browser oeffnen:

```text
http://localhost:5500
```

## Architektur-Kurzueberblick

1. `init()` startet den ersten Ladezyklus.
2. `loadPokedex()` laedt Pokemon blockweise parallel via `Promise.all`.
3. `renderContent()` aktualisiert Listenansicht und UI-Zustaende.
4. Feature-Module (`search`, `sort`, `favorites`, `pokemonCart`) steuern Interaktionen.

## Portfolio-Kontext

Dieses Projekt zeigt:

- API-Integration im Frontend
- Zustandshandling ohne Framework
- komponentenartige Template-Aufteilung mit modularem CSS/JS
- responsives UI-Design und grundlegende Accessibility-Massnahmen

## Moegliche naechste Schritte

- Persistente Favoriten mit `localStorage`
- Unit-Tests fuer Utility- und Rendering-Funktionen
- Tastatursteuerung fuer die Detailansicht (Esc / Pfeiltasten)
- Pagination-Strategie fuer mehr als 151 Pokemon
