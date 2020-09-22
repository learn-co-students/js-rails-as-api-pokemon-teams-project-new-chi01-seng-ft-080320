const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainHTML = document.querySelector('main')


const main = () => {
  renderTrainers()
  addClickListener()
}

const fetchTrainers = url => fetch(url).then( res => res.json() );

const renderTrainers = () => {
  fetchTrainers(TRAINERS_URL).then( trainers => {
    trainers.forEach(trainer => {
      const pokemonsLis = trainer.pokemons.map(pokemon => {
        return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
      }).join('')

      const trainerCard = 
      `<div class="card" data-id=${trainer.id}>
      <p>${trainer.name}</p>
      <button class="add-pokemon" data-trainer-id=${trainer.id}>Add Pokemon</button>
      <ul data-trainer-id=${trainer.id}>${pokemonsLis}</ul></div>`
      mainHTML.innerHTML += trainerCard
    })
  })
}

const addClickListener = () => {
  mainHTML.addEventListener('click', event => {
    if (event.target.className === 'add-pokemon'){
      addPokemon(event)
    }
    else if (event.target.className === 'release'){
      releasePokemon(event)
    }
  })
}

const addPokemon = event => {
  let numberOfPokemons = event.target.nextElementSibling.children.length
  if (numberOfPokemons > 5) {
    alert('Up to 6 pokemons per Trainer')
    return
  }

  const trainerId = event.target.dataset.trainerId
  const reqObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {trainerId: trainerId} )
  }
  fetch(POKEMONS_URL, reqObj)
    .then(res => res.json())
    .then(pokemon => {
      let pokemonUl = event.target.nextElementSibling
      const pokemonLi = `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
      pokemonUl.innerHTML += pokemonLi
    });
}

const releasePokemon = event => {
  const pokemonId = event.target.dataset.pokemonId
  fetch(`${POKEMONS_URL}/${pokemonId}`, { method: 'DELETE'})
    .then(res => res.json())
    .then(data => {
      event.target.parentNode.remove()
    })
}

main()