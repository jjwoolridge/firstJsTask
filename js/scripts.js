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
      //call IIFE for pokemon Modal
      pokeDetailsModal.showModal(pokemon);
    });
  }

  function addButtonClickListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      // show details of pokemon button clicked
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
    message.classList.add('is-visible');
  }

  function hideLoadingMessage() {
    let message = document.querySelector('#loadingmessage');
    message.classList.remove('is-visible');
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

let pokeDetailsModal = (function(){
  let container = document.querySelector('#modal-container');

  function showModal(pokemon) {
    container.innerHTML = ''; // clears existing content

   // create modal in the page
    let modal = document.createElement('div');
    modal.classList.add('modal');

  // create close button with click listener
    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'Close';
    closeButton.addEventListener('click', hideModal);
  //get name of pokemon passed to the showModal function and make it the header
    let modalTitle = document.createElement('h1');
    modalTitle.innerText = pokemon.name;
  // get height of the pokemon and make content for the modal
    let modalContent = document.createElement('p');
    modalContent.innerText = 'Height: ' + pokemon.height;
  // create a div to hold an image, then make img from pokemon image url
    let modalImageDiv = document.createElement('div');
    let modalImage = document.createElement('img');
    modalImage.src = pokemon.imageUrl;
  // append children to parent containers
    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    modalImageDiv.appendChild(modalImage);
    modal.appendChild(modalImageDiv);
    modal.appendChild(closeButton);
    container.appendChild(modal);
  //make the modal visible
    container.classList.add('is-visible');
  }

  let dialogPromiseReject

 // remove visibility of details modal
  function hideModal() {
    container.classList.remove('is-visible');

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

// add esc key listener to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && container.classList.contains('is-visible')){
      hideModal();
    }
  });

// add container click to close modal
  container.addEventListener('click', (e) => {
    let target = e.target;
    if (target === container) {
      hideModal();
    }
 });

  return {
    showModal: showModal,
    hideModal: hideModal
  }

})();


pokemonRepository.loadList().then(function() {
  (pokemonRepository.getAll()).forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//console.log(pokemonRepository.pokeFindFilter(pokemonRepository.getAll(), 'Eevee'));
