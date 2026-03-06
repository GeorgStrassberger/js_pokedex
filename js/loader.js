"use strict";

/**
 * Lädt den nächsten Block von Pokemon-Daten nach.
 * Nutzt die globalen Range-Variablen aus `script.js`.
 */
function showMorePokemons() {
  if (myPokemonArray.length >= 151) {
    alert(t("messages.allLoaded"));
    return;
  }

  showLoadingScreen();

  if (myPokemonArray.length < 152 - loadMorePokemons) {
    minCountOfPokemons = maxCountOfPokemons;
    maxCountOfPokemons = maxCountOfPokemons + loadMorePokemons;
  } else {
    // Letzter Ladeblock bis Pokemon #151.
    minCountOfPokemons = maxCountOfPokemons;
    maxCountOfPokemons = 152;
  }

  loadPokedex();
}

/**
 * Lädt direkt alle verbleibenden Pokemon bis #151.
 */
function showAllPokemons() {
  if (myPokemonArray.length >= 151) {
    alert(t("messages.allLoaded"));
  } else {
    showLoadingScreen();
    minCountOfPokemons = maxCountOfPokemons;
    maxCountOfPokemons = 152;
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
