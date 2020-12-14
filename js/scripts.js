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


/* code used to practice during reading
let day = 'Sunday';

if (day === 'Sunday' || day === 'Saturday') {
  console.log('Today is the weekend');
} else {
  console.log('Today is not the weekend');
}

let age = 32;

let result = age > 21 ? 'bet you drink alot' : 'you should not be drinking';
console.log(result);

let dogs = ['gidjit', 'stewie', 'peaches', 'steve', 'oreo']
for (let i = 0; i < dogs.length; i++) {
  console.log(dogs[i]);
}
*/

/* iterating through pokemon list */
for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')');
  /* labels the fairy pokemon of the list*/
  if (pokemonList[i].type === 'fairy' || pokemonList[i].type === 'dragon') {
    document.write(" - it's a mytical pokemon!")
  }
  /* labels the smallest pokemon of the list, regardless of if it may also be the mythical pokemon */
  if (pokemonList[i].height < 0.5) {
    document.write(" - it's a tiny pokemon!")
  }
  document.write('<br>');
}
