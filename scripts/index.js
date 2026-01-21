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

    const card = createCard(pokemons[0]);
}

function createCard(pokemon) {
    log('createCard()');
    log(pokemon);
}