"use strict";

/** Enthält komplette Pokemon-Objekte, die als Favorit markiert wurden. */
let favoritePokemons = [];
/** Enthält nur Pokemon-IDs (für schnelle Includes-Checks). */
let favoritePokemonsIdOnly = [];
/** Merker, ob gerade die Favoritenansicht angezeigt wird. */
let showFavorites = false;

/**
 * Setzt das Like-Icon in der Detailkarte passend zum Favoritenstatus.
 * @param {number} i Index in `myPokemonArray`.
 */
function checkPokemonInArray(i) {
  if (favoritePokemonsIdOnly.includes(myPokemonArray[i].id)) {
    document.getElementById(`like_${myPokemonArray[i]["name"]}`).src = "./assets/img/icons/heart-69-24.png";
  } else {
    document.getElementById(`like_${myPokemonArray[i]["name"]}`).src = "./assets/img/icons/favorite-3-24.png";
  }
}

/**
 * Toggelt den Favoritenstatus eines Pokemon in der Detailkarte.
 * @param {number} i Index in `myPokemonArray`.
 */
function like(i) {
  if (!favoritePokemonsIdOnly.includes(myPokemonArray[i].id)) {
    pushToFavorites(i);
  } else {
    deleteFromFavorites(i);
  }

  if (showFavorites) {
    renderFavoritesPokemons();
  }

  playClickSound();
}

/**
 * Fügt ein Pokemon zu den Favoriten hinzu.
 * @param {number} i Index in `myPokemonArray`.
 */
function pushToFavorites(i) {
  if (favoritePokemonsIdOnly.includes(myPokemonArray[i].id)) {
    return;
  }

  favoritePokemons.push(myPokemonArray[i]);
  favoritePokemonsIdOnly.push(myPokemonArray[i].id);
  document.getElementById(`like_${myPokemonArray[i]["name"]}`).src = "./assets/img/icons/heart-69-24.png";
}

/**
 * Entfernt ein Pokemon aus den Favoriten.
 * @param {number} i Index in `myPokemonArray`.
 */
function deleteFromFavorites(i) {
  const favoriteIndex = favoritePokemons.findIndex((pokemon) => pokemon.id === myPokemonArray[i].id);
  const favoriteIdIndex = favoritePokemonsIdOnly.indexOf(myPokemonArray[i].id);
  if (favoriteIndex !== -1) {
    favoritePokemons.splice(favoriteIndex, 1);
  }
  if (favoriteIdIndex !== -1) {
    favoritePokemonsIdOnly.splice(favoriteIdIndex, 1);
  }
  document.getElementById(`like_${myPokemonArray[i]["name"]}`).src = "./assets/img/icons/favorite-3-24.png";
}

/** Favoriten-Link im Header (zwischen Favorites/Home umschalten). */
const favLink = document.getElementById("fav-link");

/**
 * Setzt das Label des Favoriten-Toggles abhängig vom aktuellen Modus.
 */
function updateFavoriteToggleLabel() {
  const label = showFavorites ? t("header.back") : t("header.favorites");
  favLink.innerHTML = label;
  favLink.setAttribute("aria-label", label);
}

favLink.addEventListener("click", () => {
  showFavorites = !showFavorites;

  if (showFavorites) {
    renderFavoritesPokemons();
  } else {
    renderPokemonCarts();
  }

  updateFavoriteToggleLabel();
});

/**
 * Rendert ausschließlich die aktuell gespeicherten Favoriten.
 */
function renderFavoritesPokemons() {
  if (favoritePokemons.length === 0) {
    document.getElementById("pokedex").innerHTML = `<div class="no-entry">${t("messages.noFavorites")}</div>`;
    return;
  }

  document.getElementById("pokedex").innerHTML = favoritePokemons.map((pokemon) => pokemonCartHTML(pokemon)).join("");
  favoritePokemons.forEach((pokemon) => renderPokemonTypes(pokemon));
}
