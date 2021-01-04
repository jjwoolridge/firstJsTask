let pokemonRepository = (function () {
  let pokemonList = [];
  pokemonList[0] = {
    name: 'Eevee',
    height: 0.3,
    type: 'field'
  }

  pokemonList[1] = {
    name: 'Vulpix',
    height: 0.6,
    type: 'field'
  }

  pokemonList[2] = {
    name: 'Ponyta',
    height: 1.0,
    type: 'field'
  }

  pokemonList[3] = {
    name: 'Chansey',
    height: 1.1,
    type: 'fairy'
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && JSON.stringify(Object.keys(pokemon)) === JSON.stringify(["name", "height", "type"])){
      pokemonList.push(pokemon);
    }
    else {
      console.log('pokemon is not an array object with keys ["name", "height", "type"]');
    }
  }

  function getAll() {
    return pokemonList;
  }

  function pokeFindFilter(pokeList, pokeName) {
    return pokeList.filter(pokemon => pokemon.name === pokeName)
  }

  function addListItem(pokemon) {
    let pokeList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokeButton');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    addButtonClickListener(button, pokemon);
  }

  function showDetails(pokemon){
    console.log(pokemon);
  }

  function addButtonClickListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    pokeFindFilter: pokeFindFilter,
    addListItem: addListItem,
    showDetails: showDetails,
    addButtonClickListener: addButtonClickListener
  };

})();

(pokemonRepository.getAll()).forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

//console.log(pokemonRepository.pokeFindFilter(pokemonRepository.getAll(), 'Eevee'));
