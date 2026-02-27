"use strict";

/** Globale Referenz auf das Suchfeld im Header. */
const searchField = document.getElementById("search");

searchField.addEventListener("keyup", searchPokemon);
searchField.addEventListener("blur", clearInputField);

/**
 * Liest den aktuellen Suchtext und rendert die gefilterte Pokemon-Liste.
 */
function searchPokemon() {
  let searchValue = searchField.value.toLowerCase();
  renderSearchedContent(searchValue);
}

/**
 * Rendert nur Pokemon-Karten, deren Name den Suchtext enthält.
 * @param {string} searchValue Kleingeschriebener Suchwert.
 */
function renderSearchedContent(searchValue) {
  document.getElementById("pokedex").innerHTML = ``;
  for (let i = 0; i < myPokemonArray.length; i++) {
    const pokemon = myPokemonArray[i];
    if (pokemon["name"].toLowerCase().includes(searchValue)) {
      document.getElementById("pokedex").innerHTML += pokemonCartHTML(pokemon);
      renderPokemonTypes(pokemon);
    }
  }
}

/**
 * Setzt das Suchfeld zurück und rendert wieder die vollständige Liste.
 */
function clearInputField() {
  searchField.value = "";
  renderPokemonCarts();
}
