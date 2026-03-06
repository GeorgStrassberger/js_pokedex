"use strict";

/** @type {Array<object>} Enthält alle bereits geladenen Pokemon-Objekte aus der PokeAPI. */
let myPokemonArray = [];
/** @deprecated Wird aktuell nicht verwendet. */
let mySinglePokemon;
/** Anzahl der Pokemon, die pro "Mehr laden"-Aktion nachgeladen werden. */
let loadMorePokemons = 20;
/** Startindex (inklusive) für den nächsten API-Ladeblock. */
let minCountOfPokemons = 1;
/** Endindex (exklusive) für den nächsten API-Ladeblock. */
let maxCountOfPokemons = 21;
/** Sperre für parallele Ladeaufrufe (z. B. bei schnellem Mehrfachklick). */
let isLoading = false;

/** Root-Container für alle Pokemon-Karten in der Hauptansicht. */
let pokedexHTML = document.getElementById("pokedex");

/**
 * Einstiegspunkt der App (wird via body onload aufgerufen).
 */
async function init() {
  await loadPokedex();
}

/**
 * Lädt Pokemon-Daten blockweise aus der PokeAPI in das globale Array.
 * Lädt pro Block parallel (Promise.all), rendert danach die Oberfläche neu.
 */
async function loadPokedex() {
  if (isLoading) {
    return;
  }

  isLoading = true;
  try {
    const indexes = [];
    for (let index = minCountOfPokemons; index < maxCountOfPokemons; index++) {
      indexes.push(index);
    }

    const pokemonBatch = await Promise.all(
      indexes.map(async (index) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${index}/`;
        const responseAPI = await fetch(url);
        if (!responseAPI.ok) {
          throw new Error(`PokeAPI request failed for pokemon ${index} (${responseAPI.status})`);
        }
        return responseAPI.json();
      })
    );

    myPokemonArray.push(...pokemonBatch);
    renderContent();
  } catch (error) {
    console.error("Fehler beim Laden der Pokemon:", error);
    hideLoadingScreen();
    document.getElementById("pokedex").classList.remove("d-none");
    document.getElementById("pokedex").innerHTML =
      '<div class="no-entry">Fehler beim Laden. Bitte Seite neu laden.</div>';
    alert("Beim Laden der Pokemon ist ein Fehler aufgetreten. Bitte versuche es erneut.");
  } finally {
    isLoading = false;
  }
}

/**
 * Re-render der Hauptansicht nach Datenupdates (laden, sortieren, etc.).
 */
function renderContent() {
  renderLoadingButton();
  closePokemonCart();
  renderPokemonCarts();
  hideLoadingScreen();
}

/**
 * Rendert alle Pokemon-Karten aus `myPokemonArray` in den Grid-Container.
 */
function renderPokemonCarts() {
  pokedexHTML.innerHTML = myPokemonArray.map((currentPokemon) => pokemonCartHTML(currentPokemon)).join("");
  myPokemonArray.forEach((currentPokemon) => renderPokemonTypes(currentPokemon));
}

/**
 * Rendert alle Typen eines Pokemon in die jeweilige Karte.
 * @param {object} currentPokemon Pokemon-Datenobjekt aus der API.
 */
function renderPokemonTypes(currentPokemon) {
  const typesContainer = document.getElementById("TypesFrom" + currentPokemon["name"]);
  if (!typesContainer) {
    return;
  }

  typesContainer.innerHTML = "";
  const pokeTypes = currentPokemon["types"];
  for (let i = 0; i < pokeTypes.length; i++) {
    const type = pokeTypes[i];
    showPokemonTypeImg(type, currentPokemon);
  }
}

/**
 * Formatiert Zahlen mit führenden Nullen.
 * Beispiel: leftFillNum(7, 3) -> "007"
 * @param {number} num
 * @param {number} targetLength
 * @returns {string}
 */
function leftFillNum(num, targetLength) {
  return num.toString().padStart(targetLength, 0);
}

/**
 * Blendet ein Element per CSS-Klasse aus.
 * @param {string} id DOM-ID.
 */
function hideElement(id) {
  document.getElementById(id).classList.add("d-none");
}

/**
 * Blendet ein zuvor verstecktes Element wieder ein.
 * @param {string} id DOM-ID.
 */
function showElement(id) {
  document.getElementById(id).classList.remove("d-none");
}
