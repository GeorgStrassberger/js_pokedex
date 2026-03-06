"use strict";

/** Globale Referenz auf das Suchfeld im Header. */
const searchField = document.getElementById("search");

searchField.addEventListener("input", searchPokemon);

/**
 * Liest den aktuellen Suchtext und rendert die gefilterte Pokemon-Liste.
 */
function searchPokemon() {
  const searchValue = searchField.value.trim().toLowerCase();
  renderSearchedContent(searchValue);
}

/**
 * Rendert nur Pokemon-Karten, deren Name den Suchtext enthält.
 * @param {string} searchValue Kleingeschriebener Suchwert.
 */
function renderSearchedContent(searchValue) {
  if (!searchValue) {
    if (typeof showFavorites !== "undefined" && showFavorites) {
      renderFavoritesPokemons();
    } else {
      renderPokemonCarts();
    }
    return;
  }

  const sourcePokemons = typeof showFavorites !== "undefined" && showFavorites ? favoritePokemons : myPokemonArray;
  const filteredPokemons = sourcePokemons.filter((pokemon) => {
    return pokemon["name"].toLowerCase().includes(searchValue);
  });

  if (filteredPokemons.length === 0) {
    document.getElementById("pokedex").innerHTML =
      '<div class="no-entry">Kein Pokemon mit diesem Namen gefunden.</div>';
    return;
  }

  document.getElementById("pokedex").innerHTML = filteredPokemons.map((pokemon) => pokemonCartHTML(pokemon)).join("");
  filteredPokemons.forEach((pokemon) => renderPokemonTypes(pokemon));
}
