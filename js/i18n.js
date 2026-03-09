"use strict";

/** Verschachtelte Sprach-Texte für DE/EN inklusive UI-, Detail- und Meldungskeys. */
const translations = {
  de: {
    appTitle: "Pokedex",
    loader: {
      loading: "Pokemon werden geladen ...",
    },
    header: {
      searchPlaceholder: "Pokemon suchen",
      sortById: "Sortieren: ID",
      sortByName: "Sortieren: Name",
      favorites: "Favoriten",
      back: "Zurueck",
      language: "Sprache",
    },
    footer: {
      loadMore: "+ {count} Pokemon",
      loadAll: "Alle 151 Pokemon",
    },
    detail: {
      about: "Info",
      baseStats: "Basiswerte",
      species: "Spezies",
      height: "Groesse",
      weight: "Gewicht",
      abilities: "Faehigkeit",
      favoriteIcon: "Favorit",
      close: "Schliessen",
      previousPokemon: "Vorheriges Pokemon",
      nextPokemon: "Naechstes Pokemon",
    },
    messages: {
      loadErrorInline: "Fehler beim Laden. Bitte Seite neu laden.",
      loadErrorAlert: "Beim Laden der Pokemon ist ein Fehler aufgetreten. Bitte versuche es erneut.",
      allLoaded: "Alle Pokemon wurden bereits geladen.",
      noResult: "Kein Pokemon mit diesem Namen gefunden.",
      noFavorites: "Du hast noch keine Favoriten ausgewaehlt.",
    },
    stats: {
      hp: "KP",
      attack: "Angriff",
      defense: "Verteidigung",
      "special-attack": "Spezial-Angriff",
      "special-defense": "Spezial-Verteidigung",
      speed: "Initiative",
    },
  },
  en: {
    appTitle: "Pokedex",
    loader: {
      loading: "Loading Pokemon ...",
    },
    header: {
      searchPlaceholder: "Search Pokemon",
      sortById: "Sort by: ID",
      sortByName: "Sort by: Name",
      favorites: "Favorites",
      back: "Back",
      language: "Language",
    },
    footer: {
      loadMore: "+ {count} Pokemon",
      loadAll: "Load all 151 Pokemon",
    },
    detail: {
      about: "About",
      baseStats: "Base Stats",
      species: "Species",
      height: "Height",
      weight: "Weight",
      abilities: "Abilities",
      favoriteIcon: "Favorite",
      close: "Close",
      previousPokemon: "Previous Pokemon",
      nextPokemon: "Next Pokemon",
    },
    messages: {
      loadErrorInline: "Failed to load data. Please reload the page.",
      loadErrorAlert: "Loading Pokemon failed. Please try again.",
      allLoaded: "All Pokemon are already loaded.",
      noResult: "No Pokemon found for this name.",
      noFavorites: "You have not selected any favorites yet.",
    },
    stats: {
      hp: "HP",
      attack: "Attack",
      defense: "Defense",
      "special-attack": "Sp. Atk",
      "special-defense": "Sp. Def",
      speed: "Speed",
    },
  },
};

/** Aktuell aktive Sprache der UI (`de` oder `en`). */
let currentLanguage = "de";

/**
 * Ermittelt die bevorzugte Sprache aus dem Browser.
 * @returns {"de"|"en"} Normalisierter Sprachcode.
 */
function getUserLanguage() {
  const browserLanguage = navigator.language || "en";
  return browserLanguage.toLowerCase().startsWith("de") ? "de" : "en";
}

/**
 * Liest einen verschachtelten Übersetzungseintrag per Punkt-Pfad aus.
 * @param {"de"|"en"} language Zielsprache.
 * @param {string} keyPath Punkt-separierter Pfad, z. B. `detail.about`.
 * @returns {string|undefined} Gefundene Übersetzung oder `undefined`.
 */
function getNestedTranslation(language, keyPath) {
  return keyPath.split(".").reduce((value, key) => value?.[key], translations[language]);
}

/**
 * Übersetzt einen Key und ersetzt optional Platzhalter wie `{count}`.
 * Fällt bei fehlenden Keys auf Englisch und danach auf den Key selbst zurück.
 * @param {string} keyPath Punkt-separierter Übersetzungs-Key.
 * @param {Record<string, string|number>} [params={}] Platzhalter-Werte.
 * @returns {string} Aufgelöster UI-Text.
 */
function t(keyPath, params = {}) {
  const fallbackLanguage = "en";
  const translation = getNestedTranslation(currentLanguage, keyPath) ?? getNestedTranslation(fallbackLanguage, keyPath) ?? keyPath;

  return Object.entries(params).reduce((text, [paramKey, paramValue]) => {
    return text.replaceAll(`{${paramKey}}`, String(paramValue));
  }, translation);
}

/**
 * Übersetzt einen Stat-Namen aus der API (z. B. `special-attack`).
 * @param {string} statName API-Stat-Key.
 * @returns {string} Lokalisierter Stat-Name.
 */
function translateStatName(statName) {
  return t(`stats.${statName}`);
}

/**
 * Setzt die Sprache, sofern sie im Übersetzungsobjekt vorhanden ist.
 * Anschließend wird die Oberfläche komplett neu lokalisiert.
 * @param {"de"|"en"} language Gewünschte Sprache.
 */
function setLanguage(language) {
  if (!translations[language]) {
    return;
  }

  currentLanguage = language;
  applyTranslations();
}

/**
 * Initialisiert i18n beim App-Start:
 * - erkennt Browsersprache
 * - verbindet den Sprach-Switch
 * - rendert initial alle Texte
 */
function initializeI18n() {
  currentLanguage = getUserLanguage();

  const languageSelect = document.getElementById("lang-select");
  if (languageSelect) {
    languageSelect.value = currentLanguage;
    languageSelect.addEventListener("change", (event) => setLanguage(event.target.value));
  }

  applyTranslations();
}

/**
 * Überträgt alle übersetzbaren Texte/ARIA-Labels in die aktuelle UI.
 * Aktualisiert außerdem ggf. Such-/Detailansicht, damit bestehender Content
 * unmittelbar in der gewählten Sprache angezeigt wird.
 */
function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  const isDetailViewOpen = !document.getElementById("mainframe")?.classList.contains("d-none");
  if (!isDetailViewOpen) {
    document.title = t("appTitle");
  }

  const loaderText = document.getElementById("loader-text");
  if (loaderText) {
    loaderText.textContent = t("loader.loading");
  }

  const searchField = document.getElementById("search");
  if (searchField) {
    searchField.placeholder = t("header.searchPlaceholder");
    searchField.setAttribute("aria-label", t("header.searchPlaceholder"));
  }

  const sortOptions = document.querySelectorAll("#sort-select option");
  if (sortOptions[0]) {
    sortOptions[0].textContent = t("header.sortById");
  }
  if (sortOptions[1]) {
    sortOptions[1].textContent = t("header.sortByName");
  }

  if (typeof updateFavoriteToggleLabel === "function") {
    updateFavoriteToggleLabel();
  }

  const favoriteButton = document.getElementById("fav-link");
  if (favoriteButton) {
    favoriteButton.setAttribute("aria-label", t("header.favorites"));
  }

  if (typeof renderLoadingButton === "function") {
    renderLoadingButton();
  }

  const loadMoreButton = document.getElementById("morePokemonsBtn");
  if (loadMoreButton) {
    loadMoreButton.setAttribute("aria-label", t("footer.loadMore", { count: loadMorePokemons }));
  }

  const loadAllButton = document.getElementById("allPokemonsBtn");
  if (loadAllButton) {
    loadAllButton.setAttribute("aria-label", t("footer.loadAll"));
  }

  const languageSelect = document.getElementById("lang-select");
  if (languageSelect) {
    languageSelect.setAttribute("aria-label", t("header.language"));
  }

  if (typeof showFavorites !== "undefined" && typeof searchPokemon === "function") {
    searchPokemon();
  }

  if (typeof currentPokemonIndex === "number" && typeof renderSinglePokemonCartInfo === "function") {
    const aboutIsActive = document.getElementById("about")?.classList.contains("is-active");
    renderSinglePokemonCartInfo(currentPokemonIndex);
    if (aboutIsActive && typeof showAbout === "function") {
      showAbout();
    } else if (typeof showBaseStats === "function") {
      showBaseStats();
    }
  }
}
