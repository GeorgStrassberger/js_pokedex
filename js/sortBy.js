"use strict";

/** Select-Feld zum Sortieren der Hauptliste. */
const selectField = document.getElementById("sort-select");

selectField.addEventListener("change", (e) => {
  if (e.target.value === "name") {
    sortByName();
  }
  if (e.target.value === "id") {
    sortById();
  }
});

/**
 * Liefert eine Sortierfunktion für Array.prototype.sort().
 * Unterstützt optional absteigend mit Prefix "-".
 * @param {string} property Feldname im Objekt.
 * @returns {(a: object, b: object) => number}
 */
function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }

  return function (a, b) {
    let result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

/**
 * Sortiert die Liste alphabetisch nach Name und rendert neu.
 */
function sortByName() {
  myPokemonArray.sort(dynamicSort("name"));
  renderContent();
}

/**
 * Sortiert die Liste numerisch nach ID und rendert neu.
 */
function sortById() {
  myPokemonArray.sort(dynamicSort("id"));
  renderContent();
}
