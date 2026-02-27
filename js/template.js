"use strict";

function pokemonCartHTML(currentPokemon) {
    return `
    <div id="${currentPokemon["name"]}" class="pokemon-cart ${currentPokemon["types"][0]["type"]["name"]
        }" onclick="openPokemonCart(${currentPokemon["id"] - 1})">
        <div class="cartHeader">
            <div class="cardnr pokefont">#${leftFillNum(
            currentPokemon.id,
            3
        )}</div>
            <div class="cardname pokeFontColor">${currentPokemon["name"]}</div>
        </div>
        <div id="TypesFrom${currentPokemon["name"]}" class="pokemonTypes">
            <span class="pokemonType">${currentPokemon["types"][0]["type"]["name"]
        }</span>
        </div>
        <img class="pokemonImage" src="${currentPokemon["sprites"]["front_shiny"]
        }" alt="PokemonImage">
    </div>
    `;
}

function renderSinglePokemonCartInfoTableAbout(i) {
    document.getElementById("tableAbout").innerHTML = /*html*/ `
                    <tr>
                        <td>Species</td>
                        <td>${myPokemonArray[i]["types"][0]["type"]["name"]}</td>
                    </tr>
                    <tr>
                        <td>Height</td>
                        <td>${myPokemonArray[i]["height"]}0 cm</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>${myPokemonArray[i]["weight"]} kg</td>
                    </tr>
                    <tr>
                        <td>Abilities</td>
                        <td class="capitalize">${myPokemonArray[i]["abilities"][0]["ability"]["name"]}</td> 
                    </tr>
                `;
}

function renderSinglePokemonCartInfoTableBaseStats(i) {
    document.getElementById("tableBaseStats").innerHTML = /*html*/ `
                <tr class="uppercase">
                    <td>${myPokemonArray[i]["stats"][0]["stat"]["name"]}</td>
                    <td>${myPokemonArray[i]["stats"][0]["base_stat"]}</td>
                </tr>
                <tr class="capitalize">
                    <td>${myPokemonArray[i]["stats"][1]["stat"]["name"]}</td>
                    <td>${myPokemonArray[i]["stats"][1]["base_stat"]}</td>
                </tr>
                <tr class="capitalize">
                    <td>${myPokemonArray[i]["stats"][2]["stat"]["name"]}</td>
                    <td>${myPokemonArray[i]["stats"][2]["base_stat"]}</td>
                </tr>
                <tr class="capitalize">
                    <td>${myPokemonArray[i]["stats"][3]["stat"]["name"]}</td>
                    <td>${myPokemonArray[i]["stats"][3]["base_stat"]}</td>
                </tr>
                <tr class="capitalize">
                    <td>${myPokemonArray[i]["stats"][4]["stat"]["name"]}</td>
                    <td>${myPokemonArray[i]["stats"][4]["base_stat"]}</td>
                </tr>
                <tr class="capitalize">
                    <td>${myPokemonArray[i]["stats"][5]["stat"]["name"]}</td>
                    <td>${myPokemonArray[i]["stats"][5]["base_stat"]}</td>
                </tr>
                `;
}

function renderSinglePokemonCart(i) {
    document.getElementById("mainframe").innerHTML = `
    <div id="cartframe" class="card ${myPokemonArray[i]["types"][0]["type"]["name"]}">
        <div class="card__header">
            <div class="card__header-btn">
                <img class="card-btn-like" id="like_${myPokemonArray[i]["name"]}" src="../img/icons/favorite-3-24.png" alt="heart" onclick="like(${i})">
                <img class="card-btn-close" src="../img/icons/x-mark-48.png" alt="arrowback" onclick="closePokemonCart()">
            </div>
            <div class="card__header-content">
                <div class="card__header-info">
                    <span id="pokeName" class="card__header-name capitalize pokeFontColor">['name']</span>
                    <div id="pokeTypes" class="card__header-types">
                        <span class="card__header-type pokeFontColor">Type1</span>
                        <span class="card__header-type pokeFontColor">Type2</span>
                    </div>
                </div>
                <div class="pokefont">
                    <span id="pokeID">#001</span>
                </div>
            </div>
            <div class="card__header-images">
                <div class="card-btn-pre" onclick="previousPokemon(${i})">
                    <img src="../img/icons/arrow-105-48.png">
                </div>
                <div class="card-btn-next" onclick="nextPokemon(${i})">
                    <img src="../img/icons/arrow-4-48.png">                
                </div>

                <img class="pokeImgBG" src="../img/pokemonball-draw.png" alt="pokeball">
                <img id="pokeImg" class="pokeImg" src="../img/pokemon-1536848_640.png" alt="PokeImage">
            </div>
        </div>
        <div class="statsframe">
            <div class="statsContainer">
                <div class="linkframe">
                    <span id="about" onclick="showAbout()">About</span>
                    <span id="baseStat" onclick="showBaseStas()">Base Stats</span>
                </div>
                <div class="tableContainer">
                    <table id="tableAbout" class="tableAbout d-none">
                        <tr>
                            <td>Species</td>
                            <td>Seed</td>
                        </tr>
                        <tr>
                            <td>Height</td>
                            <td>0.70 cm</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>6.9kg</td>
                        </tr>
                        <tr>
                            <td>Abilities</td>
                            <td>Overgrow</td>
                        </tr>
                    </table>
                    <table id="tableBaseStats" class="tableBaseStats">
                        <tr>
                            <td>HP</td>
                            <td>45</td>
                        </tr>
                        <tr>
                            <td>Attack</td>
                            <td>60</td>
                        </tr>
                        <tr>
                            <td>Defense</td>
                            <td>48</td>
                        </tr>
                        <tr>
                            <td>Sp. Atk</td>
                            <td>65</td>
                        </tr>
                        <tr>
                            <td>Sp. Def</td>
                            <td>65</td>
                        </tr>
                        <tr>
                            <td>Speep</td>
                            <td>45</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>317</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>       
    `;
}

function renderLoadingButten() {
    document.getElementById(
        "morePokemonsBtn"
    ).innerText = `+ ${loadMorePokemons} Pokemons`;
}
