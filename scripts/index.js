const log = (msg) => console.log(msg);

const globalRefs = {
    pokedexSectionRef : document.querySelector('#pokedexSection'),
    generateSectionRef : document.querySelector('#generateSection'),
    searchSectionRef : document.querySelector('#searchSection')
}

pageSetup();

function pageSetup() {
    log('pageSetup()');

    globalRefs.generateSectionRef.classList.add('d-none');
    globalRefs.searchSectionRef.classList.add('d-none');

    const listItemRefs = document.querySelectorAll('.header__menu-item');
    for(let ref of listItemRefs) {
        ref.addEventListener('click', displayActiveSection);
    }
    pokedexSetup();
    generatorSetup();
    searchSetup();
}

function displayActiveSection(event) {
    log(event.target.id);
    const activeSection = event.target.id;

    if(activeSection === 'pokedexLink') {
        globalRefs.pokedexSectionRef.classList.remove('d-none');
        globalRefs.generateSectionRef.classList.add('d-none');
        globalRefs.searchSectionRef.classList.add('d-none');
    } else if(activeSection === 'generateLink') {
        globalRefs.pokedexSectionRef.classList.add('d-none');
        globalRefs.generateSectionRef.classList.remove('d-none');
        globalRefs.searchSectionRef.classList.add('d-none');
    } else if(activeSection === 'searchLink') {
        globalRefs.pokedexSectionRef.classList.add('d-none');
        globalRefs.generateSectionRef.classList.add('d-none');
        globalRefs.searchSectionRef.classList.remove('d-none');
    }
}

function pokedexSetup() {
    log('pokedexSetup()');

    const pokedexRef = document.querySelector('#pokedex');

    for(let pokemon of pokemons) {
        const card = createCard(pokemon);
        pokedexRef.appendChild(card);
    }
}

function generatorSetup() {
    log('generatorSetup()');

    document.querySelector('#generateBtn').addEventListener('click', generatePokemon);
}

function generatePokemon(event) {
    event.preventDefault();
    log('generatePokemon()');

    const type = document.querySelector('#pokemonTypes').value;
    let teamSize = Number(document.querySelector('#teamSize').value);

    if(teamSize < 1 || teamSize > 151) teamSize = 6;

    const pokemonsTemp = [...pokemons];
    const team = [];

    if(type === '') {
        for(let i = 0; i < teamSize; i++) {
            const randomIndex = Math.floor(Math.random() * pokemonsTemp.length);
            const randomPokemon = pokemonsTemp.splice(randomIndex, 1)[0];
            team.push(randomPokemon);
        }
    } else {
        const filtered = pokemonsTemp.filter(pokemon => {
            for(let pokemonType of pokemon.type) {
                if(pokemonType.name.toLowerCase() === type.toLowerCase()) {
                    return true;
                }
            } 
            return false;
        });

        if(filtered.length < teamSize) {
            teamSize = filtered.length;
        }

        for(let i = 0; i < teamSize; i++) {
            const randomIndex = Math.floor(Math.random() * filtered.length);
            const randomPokemon = filtered.splice(randomIndex, 1)[0];
            team.push(randomPokemon);
        }
    }

    const generateRef = document.querySelector('#generate');
    generateRef.innerHTML = '';

    for(let pokemon of team) {
        const card = createCard(pokemon);
        generateRef.appendChild(card);
    }
}

function searchSetup() {
    log('searchSetup()');

    document.querySelector('#searchBtn').addEventListener('click', searchPokemon);
}

function searchPokemon(event) {
    event.preventDefault();
    log('searchPokemon()');

    let query = document.querySelector('#pokemonName').value.toLowerCase().trim();
    let results = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(query));
    log(results);

    const searchRef = document.querySelector('#search');
    searchRef.innerHTML = '';

    for(let pokemon of results) {
        const card = createCard(pokemon);
        searchRef.appendChild(card);
    }
}

function createCard(pokemon) {
    const cardRef = document.createElement('article');
    cardRef.classList.add('card');

    const cardTemplate = `
        <div class="card__top">
            <img
                src="${pokemon.image}"
                alt="${pokemon.name}"
                class="card__image"
                style="background-color: ${pokemon.type[0].color};"
            />
            <span class="card__index">${getIndexString(pokemon.id)}</span>
        </div>
        <div class="card__middle">
            <h3 class="card__name">${pokemon.name}</h3>
            <h4 class="card__type">${getTypeString(pokemon.type)}</h4>
        </div>
        <div class="card__bottom">
            <p class="card__stat">Attack: ${pokemon.stats.attack}</p>
            <p class="card__stat">Defense: ${pokemon.stats.defense}</p>
            <p class="card__stat">Sp. Attack: ${pokemon.stats.specialAttack}</p>
            <p class="card__stat">Sp. Defense: ${pokemon.stats.specialDefense}</p>
            <p class="card__stat">HP: ${pokemon.stats.hp}</p>
            <p class="card__stat">Speed: ${pokemon.stats.speed}</p>
            <p class="card__stat card__stat--span-two">
                Total: ${pokemon.stats.total}
            </p>
        </div>
    `;

    cardRef.innerHTML = cardTemplate;

    // let divRef = document.createElement('div');
    // divRef.classList.add('card__top');
    // cardRef.appendChild(divRef);

    // const image = createImage(pokemon);
    // divRef.appendChild(image);

    // const index = createIndex(pokemon.id);
    // divRef.appendChild(index);

    // divRef = document.createElement('div');
    // divRef.classList.add('card__middle');
    // cardRef.appendChild(divRef);

    // const name = createName(pokemon.name);
    // divRef.appendChild(name);

    // const type = createType(pokemon.type);
    // divRef.appendChild(type);

    // divRef = document.createElement('div');
    // divRef.classList.add('card__bottom');
    // cardRef.appendChild(divRef);

    // let stat = createStat('Attack', pokemon.stats.attack, false);
    // divRef.appendChild(stat);

    // stat = createStat('Defense', pokemon.stats.defense, false);
    // divRef.appendChild(stat);

    // stat = createStat('Sp. Attack', pokemon.stats.specialAttack, false);
    // divRef.appendChild(stat);

    // stat = createStat('Sp. Defense', pokemon.stats.specialDefense, false);
    // divRef.appendChild(stat);

    // stat = createStat('HP', pokemon.stats.hp, false);
    // divRef.appendChild(stat);

    // stat = createStat('Speed', pokemon.stats.speed, false);
    // divRef.appendChild(stat);

    // stat = createStat('Total', pokemon.stats.total, true);
    // divRef.appendChild(stat);

    return cardRef;
}

function createImage(pokemon) {
    const imgRef = document.createElement('img');
    imgRef.src = pokemon.image;
    imgRef.alt = pokemon.name;
    imgRef.style.backgroundColor = pokemon.type[0].color;
    imgRef.classList.add('card__image');
    return imgRef;
}

function createIndex(id) {
    const indexRef = document.createElement('span');
    indexRef.classList.add('card__index');
    indexRef.textContent = getIndexString(id);

    return indexRef;
}

function getIndexString(id) {
    let indexString = '';
    if(id < 10) {
        indexString = '#00' + id;
    } else if(id >= 10 && id < 100) {
        indexString = '#0' + id;
    } else {
        indexString = '#' + id;
    }
    return indexString;
}

function createName(name) {
    const nameRef = document.createElement('h3');
    nameRef.classList.add('card__name');
    nameRef.textContent = name;
    return nameRef;
}

function createType(type) {
    const typeRef = document.createElement('h4');
    typeRef.classList.add('card__type');
    typeRef.textContent = getTypeString(type);

    return typeRef;
}

function getTypeString(type) {
    if(type.length === 1) {
        return type[0].name;
    } else {
        return `${type[0].name} / ${type[1].name}`;
    }
}

function createStat(stat, value, modifier) {
    const statRef = document.createElement('p');
    statRef.classList.add('card__stat');
    if(modifier) statRef.classList.add('card__stat--span-two');
    statRef.textContent = `${stat}: ${value}`;
    return statRef;
}

/*
<article class="card">
    <div class="card__top">
        <img
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png"
            alt="Bulbasaur"
            class="card__image"
        />
        <span class="card__index">#001</span>
    </div>
    <div class="card__middle">
        <h3 class="card__name">Bulbasaur</h3>
        <h4 class="card__type">Grass / Poison</h4>
    </div>
    <div class="card__bottom">
        <p class="card__stat">Attack: 49</p>
        <p class="card__stat">Defense: 49</p>
        <p class="card__stat">Sp. Attack: 65</p>
        <p class="card__stat">Sp. Defense: 65</p>
        <p class="card__stat">HP: 45</p>
        <p class="card__stat">Speed: 45</p>
        <p class="card__stat card__stat--span-two">
            Total: 318
        </p>
    </div>
</article>
*/