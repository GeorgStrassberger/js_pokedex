"use strict";

/**
 * Lädt den nächsten Block von Pokemon-Daten nach.
 * Nutzt die globalen Range-Variablen aus `script.js`.
 */
function showMorePokemons() {
  if (myPokemonArray.length >= 151) {
    alert("Alle Pokemon's wurden geladen !");
    return;
  }

  showLoadingScreen();

  if (myPokemonArray.length < 152 - loadMorePokemons) {
    minCountOfPokemons = maxCountentOfPokemons;
    maxCountentOfPokemons = maxCountentOfPokemons + loadMorePokemons;
  } else {
    // Letzter Ladeblock bis Pokemon #151.
    minCountOfPokemons = maxCountentOfPokemons;
    maxCountentOfPokemons = 152;
  }

  loadPokedex();
}

/**
 * Lädt direkt alle verbleibenden Pokemon bis #151.
 */
function showAllPokemons() {
  if (myPokemonArray.length >= 151) {
    alert("Alle Pokemon's wurden geladen !");
  } else {
    showLoadingScreen();
    minCountOfPokemons = maxCountentOfPokemons;
    maxCountentOfPokemons = 152;
    loadPokedex();
  }
}

/**
 * Zeigt den globalen Lade-Overlay an.
 */
function showLoadingScreen() {
  document.getElementById("page-loader").classList.remove("d-none");
}

/**
 * Blendet den globalen Lade-Overlay aus.
 */
function hideLoadingScreen() {
  document.getElementById("page-loader").classList.add("d-none");
}
