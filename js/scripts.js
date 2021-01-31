let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
      pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function pokeFindFilter(pokeList, pokeName) {
    return pokeList.filter(pokemon => pokemon.name === pokeName)
  }

  function addListItem(pokemon) {
    let pokeList = document.querySelector('.list-group');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.setAttribute("type", "button");
    button.classList.add('btn');
    button.classList.add('pokeButton');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#modal-container');
    listItem.classList.add('group-list-item');
    listItem.appendChild(button);
    pokeList.appendChild(listItem);
    button.addEventListener("click", function() {
      showDetails(pokemon)
    });
  }

  function showDetails(pokemon){
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    }).catch(function(e) {
      console.error(e);
    });
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
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
      item.weight = details.weight;
      item.types = details.types;
      hideLoadingMessage();
    }).catch(function(e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  function showLoadingMessage() {
    let message = document.querySelector('#loadingmessage');
    message.classList.add('is-visible');
  }

  function hideLoadingMessage() {
    let message = document.querySelector('#loadingmessage');
    message.classList.remove('is-visible');
  }

  function showModal(pokemon) {
    // creating variables for content
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    // clearing old modal info
    modalTitle.empty();
    modalBody.empty();

    //creating modal content
    let nameOfPokemon = $("<h1>" + pokemon.name + "</h1>");
    let imageOfPokemon = $('<img class="modal-img" style="width=100%">');
    imageOfPokemon.attr("src", pokemon.imageUrl);
    let heightOfPokemon = $("<p>Height: " + pokemon.height + "</p>");
    let weightOfPokemon = $("<p>Weight: " + pokemon.weight + "</p>");

    modalTitle.append(nameOfPokemon);
    modalBody.append(imageOfPokemon);
    modalBody.append(heightOfPokemon);
    modalBody.append(weightOfPokemon);

  }

  return {
    add: add,
    getAll: getAll,
    pokeFindFilter: pokeFindFilter,
    addListItem: addListItem,
    showDetails: showDetails,
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
