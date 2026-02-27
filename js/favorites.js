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
  playClickSound();
}

/**
 * Fügt ein Pokemon zu den Favoriten hinzu.
 * @param {number} i Index in `myPokemonArray`.
 */
function pushToFavorites(i) {
  favoritePokemons.push(myPokemonArray[i]);
  favoritePokemonsIdOnly.push(myPokemonArray[i].id);
  document.getElementById(`like_${myPokemonArray[i]["name"]}`).src = "./assets/img/icons/heart-69-24.png";
}

/**
 * Entfernt ein Pokemon aus den Favoriten.
 * @param {number} i Index in `myPokemonArray`.
 */
function deleteFromFavorites(i) {
  favoritePokemons.splice(favoritePokemons.indexOf(myPokemonArray[i]), 1);
  favoritePokemonsIdOnly.splice(favoritePokemonsIdOnly.indexOf(myPokemonArray[i].id), 1);
  document.getElementById(`like_${myPokemonArray[i]["name"]}`).src = "./assets/img/icons/favorite-3-24.png";
}

/** Favoriten-Link im Header (zwischen Favorites/Home umschalten). */
const favLink = document.getElementById("fav-link");

favLink.addEventListener("click", () => {
  if (!showFavorites) {
    renderFavorietesPokemons();
    favLink.innerHTML = "Home";
    showFavorites = true;
  } else {
    renderPokemonCarts();
    favLink.innerHTML = "Favorites";
    showFavorites = false;
  }
});

/**
 * Rendert ausschließlich die aktuell gespeicherten Favoriten.
 */
function renderFavorietesPokemons() {
  document.getElementById("pokedex").innerHTML = ``;
  for (let i = 0; i < favoritePokemons.length; i++) {
    const currentPokemon = favoritePokemons[i];
    document.getElementById("pokedex").innerHTML += pokemonCartHTML(currentPokemon);
    renderPokemonTypes(currentPokemon);
  }
}
