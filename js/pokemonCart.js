"use strict";

/**
 * Öffnet die Detailansicht für ein Pokemon anhand des Array-Index.
 * @param {number} i Index in `myPokemonArray`.
 */
function openPokemonCart(i) {
  document.getElementById("body").classList.add("backgroundCard");
  renderSinglePokemonCart(i);
  document.getElementById("pokedex").classList.add("d-none");
  document.getElementById("mainframe").classList.remove("d-none");
  document.title = `${myPokemonArray[i]["name"]}`;
  document.getElementById("about").style.color = "grey";
  renderSinglePokemonCartInfo(i);

  hideElement("header");
  hideElement("footer");
}

/**
 * Öffnet die Detailansicht über eine Pokemon-ID.
 * Damit bleibt die Zuordnung auch nach Sortierung/Filterung korrekt.
 * @param {number} pokemonId Eindeutige Pokemon-ID aus der API.
 */
function openPokemonCartById(pokemonId) {
  const index = myPokemonArray.findIndex((pokemon) => pokemon.id === pokemonId);
  if (index === -1) {
    return;
  }
  openPokemonCart(index);
}

/**
 * Schließt die Detailansicht und zeigt wieder die Hauptansicht.
 */
function closePokemonCart() {
  document.getElementById("body").classList.remove("backgroundCard");
  document.getElementById("pokedex").classList.remove("d-none");
  document.getElementById("mainframe").classList.add("d-none");
  document.title = `Pokedex`;

  showElement("header");
  showElement("footer");
}

/**
 * Befüllt die Detailansicht mit den aktuellen Pokemon-Daten.
 * @param {number} i Index in `myPokemonArray`.
 */
function renderSinglePokemonCartInfo(i) {
  document.getElementById("pokeName").innerHTML = `${myPokemonArray[i]["name"]}`;
  document.getElementById("pokeID").innerHTML = `#${leftFillNum(myPokemonArray[i].id, 3)}`;
  document.getElementById("pokeImg").src = `${myPokemonArray[i]["sprites"]["other"]["home"]["front_default"]}`;

  checkPokemonInArray(i);
  renderSinglePokemonCartInfoTableAbout(i);
  renderSinglePokemonCartInfoTableBaseStats(i);
  renderSingelPokemonCartTypes(i);
}

/**
 * Rendert die Typ-Badges im Header der Detailkarte.
 * @param {number} i Index in `myPokemonArray`.
 */
function renderSingelPokemonCartTypes(i) {
  document.getElementById("pokeTypes").innerHTML = ``;
  for (let j = 0; j < myPokemonArray[i]["types"].length; j++) {
    const singelCartType = myPokemonArray[i]["types"][j];
    document.getElementById("pokeTypes").innerHTML += /*html*/ `
    <span class="card__header-type pokeFontColor ${singelCartType["type"]["name"]}">${singelCartType["type"]["name"]}</span>
    `;
  }
}

/**
 * Schaltet in der Detailkarte auf den "About"-Tab.
 */
function showAbout() {
  document.getElementById("about").style.fontWeight = "bolder";
  document.getElementById("about").style.color = "black";
  document.getElementById("baseStat").style.color = "grey";
  document.getElementById("baseStat").style.fontWeight = "normal";
  document.getElementById("tableBaseStats").classList.add("d-none");
  document.getElementById("tableAbout").classList.remove("d-none");
}

/**
 * Schaltet in der Detailkarte auf den "Base Stats"-Tab.
 */
function showBaseStas() {
  document.getElementById("baseStat").style.fontWeight = "bolder";
  document.getElementById("baseStat").style.color = "black";
  document.getElementById("about").style.fontWeight = "normal";
  document.getElementById("about").style.color = "grey";
  document.getElementById("tableAbout").classList.add("d-none");
  document.getElementById("tableBaseStats").classList.remove("d-none");
}

/**
 * Wechselt zum nächsten Pokemon (am Ende zyklisch zurück auf 0).
 * @param {number} i Aktueller Index.
 */
function nextPokemon(i) {
  if (i === myPokemonArray.length - 1) {
    openPokemonCart(0);
  } else {
    openPokemonCart(i + 1);
  }
}

/**
 * Wechselt zum vorherigen Pokemon (am Anfang zyklisch auf letztes).
 * @param {number} i Aktueller Index.
 */
function previousPokemon(i) {
  if (i === 0) {
    openPokemonCart(myPokemonArray.length - 1);
  } else {
    openPokemonCart(i - 1);
  }
}
