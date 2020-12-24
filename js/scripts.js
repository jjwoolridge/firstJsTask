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

  return {
    add: add,
    getAll: getAll,
    pokeFindFilter: pokeFindFilter
  };

})();

/* iterating through pokemon list - old style
for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
  /* labels the fairy pokemon of the list*
  if (pokemonList[i].type === 'fairy' || pokemonList[i].type === 'dragon') {
    document.write(" - it's a mytical pokemon!")
  }
  /* labels the smallest pokemon of the list, regardless of if it may also be the mythical pokemon *
  if (pokemonList[i].height < 0.5) {
    document.write(" - it's a tiny pokemon!")
  }
  document.write('<br>');
}
*/

(pokemonRepository.getAll()).forEach(function(pokemon) {
  document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
  if (pokemon.type === 'fairy' || pokemon.type === 'dragon') {
    document.write(" - it's a mythical pokemon!")
  }
  if (pokemon.height <.5) {
    document.write(" - it's a tiny pokemon!")
  }
  document.write('<br>');
});

console.log(pokemonRepository.pokeFindFilter(pokemonRepository.getAll(), 'Eevee'));
