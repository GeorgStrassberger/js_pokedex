"use strict";

/** Hintergrundmusik der App. */
let pokemonThema = new Audio("./assets/audio/PokemonTheme.mp3");
/** UI-Click-Sound. */
let clickSound = new Audio("./assets/audio/Pokemonmenu.mp3");
/**
 * Interner Schalter für den Audio-Zustand.
 * `false` = Musik läuft, `true` = pausiert.
 */
let playing = true;

pokemonThema.volume = 0.1;
clickSound.volume = 0.1;

/**
 * Toggelt die Hintergrundmusik an/aus.
 */
function playingAudio() {
  playing = !playing;
  if (!playing) {
    playPokemonThema();
  } else {
    pausePokemonThema();
  }
}

/** Startet die Hintergrundmusik. */
function playPokemonThema() {
  pokemonThema.play();
}

/** Pausiert die Hintergrundmusik. */
function pausePokemonThema() {
  pokemonThema.pause();
}

/** Spielt den UI-Click-Sound ab. */
function playClickSound() {
  clickSound.play();
}
