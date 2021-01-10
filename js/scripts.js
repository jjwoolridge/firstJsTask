let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    // if (typeof pokemon === 'object' && JSON.stringify(Object.keys(pokemon)) === JSON.stringify(["name", "height", "type"])){
      pokemonList.push(pokemon);
    // }
    // else {
    //   console.log('pokemon is not an array object with keys ["name", "height", "type"]');
    // }
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
    loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
  }

  function addButtonClickListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      console.log(apiUrl);
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
      });
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  function showLoadingMessage() {
    let message = document.querySelector('#loadingmessage');
    message.classList.remove('hidden');
  }

  function hideLoadingMessage() {
    let message = document.querySelector('#loadingmessage');
    message.classList.add('hidden');
  }

  return {
    add: add,
    getAll: getAll,
    pokeFindFilter: pokeFindFilter,
    addListItem: addListItem,
    showDetails: showDetails,
    addButtonClickListener: addButtonClickListener,
    loadList: loadList,
    loadDetails: loadDetails
  };

})();

pokemonRepository.loadList().then(function() {
  (pokemonRepository.getAll()).forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//console.log(pokemonRepository.pokeFindFilter(pokemonRepository.getAll(), 'Eevee'));
