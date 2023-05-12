// varible to control pokemonApiUrl
let pokemonApiUrlMakerNumber = 1;

// variables to store HTML tags
let aElement = document.querySelector("#namePokemon");
let aElementHeight = document.querySelector("#heightPokemon");
let aElementWeight = document.querySelector("#weightPokemon");

// variable to create img HTML tag
let pokemonImageSprite = document.createElement("img");

// variables to store and control pokemon images sprites
let listImages = [];
let listMakerNumber = 0;

// variable of fetch pokemon api
let pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/1";

// function that fetch infomation of api
async function fetchPokemonApi() {
    // variables to store fetched information
    let fetchResponse = await fetch(pokemonApiUrl);
    let fetchResponseJson = await fetchResponse.json();

    // variable to store fetched pokemon images sprites
    let listSpritePokemon = fetchResponseJson.sprites;

    listImages = [
        listSpritePokemon.front_default,
        listSpritePokemon.back_default,
        listSpritePokemon.front_shiny,
        listSpritePokemon.back_shiny,
    ];

    valitationLastPokemon();

    createSpritePokemon(listImages);

    aElement.innerHTML = fetchResponseJson.name;
    aElementHeight.innerHTML = fetchResponseJson.height;
    aElementWeight.innerHTML = fetchResponseJson.weight;
}

// function that remove an img tag and setup pokemon image sprite
function createSpritePokemon(sprite) {
    if (document.querySelector(".imageSprite") != null) {
        document.querySelector(".imageSprite").remove();
    }

    pokemonImageSprite.className = "imageSprite";
    pokemonImageSprite.src = sprite[0];
    document.querySelector(".containerPokemon").appendChild(pokemonImageSprite);
}

// function that validate when is the last pokemon
function valitationLastPokemon() {
    if (listImages[0] == null) {
        pokemonApiUrlMakerNumber = 1;
    }
}

// funciton that validate pokemonApiUrl
function validationPokemonApiUrl() {
    if (pokemonApiUrlMakerNumber == 0 || pokemonApiUrlMakerNumber == -1) {
        pokemonApiUrl = "https://pokeapi.co/api/v2/pokemon/1";
        pokemonApiUrlMakerNumber = 1;
    }
}
// function that validate control of function rotatePokemon
function validationRotatePokemon() {
    if (listMakerNumber == listImages.length) {
        listMakerNumber = 0;
    }
}

// function that change to next pokemon image sprite
function rotatePokemon() {
    listMakerNumber = listMakerNumber + 1;
    validationRotatePokemon();
    pokemonImageSprite.src = listImages[listMakerNumber];
}

// function that change to past pokemon
function pastPokemon() {
    pokemonApiUrlMakerNumber = pokemonApiUrlMakerNumber - 1;
    pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonApiUrlMakerNumber}`;
    validationPokemonApiUrl();
    fetchPokemonApi();
}

// function that change to next pokemon
function nextPokemon() {
    pokemonApiUrlMakerNumber = pokemonApiUrlMakerNumber + 1;
    pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonApiUrlMakerNumber}`;
    validationPokemonApiUrl();
    fetchPokemonApi();
}

fetchPokemonApi();
