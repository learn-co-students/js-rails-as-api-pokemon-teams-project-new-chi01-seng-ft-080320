const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainElm = document.querySelector('main')

function main(){
    loadTrainers()
    mainElm.addEventListener('click', eventHandler)
}

function eventHandler(e){
    if(e.target.className === 'add-btn'){
        let LiCount = e.target.nextElementSibling.children.length
        if(LiCount < 6){
        addPokemon(e)
        } else {
            alert("hey bud thats to many pokemon")
        }
    } else if(e.target.className === 'release'){
        e.target.parentElement.remove()
        deletePoke(e)
    }
}

function loadTrainers(){
    fetch('http://localhost:3000/trainers')
    .then(resp => resp.json())
    .then(trainers => renderTrainers(trainers))
}

function renderTrainers(trainers){
    trainers.forEach(trainer => {
        mainElm.innerHTML += `
        <div class="card" data-id=${trainer.id}><p>${trainer.name}</p>
  <button class="add-btn" data-trainer-id=${trainer.id}>Add Pokemon</button>
  <ul>${renderLis(trainer.pokemons)}</ul></div>
        `
    })
}

function renderLis(pokemons){
    let pokeLis = ""
    pokemons.forEach(pokemon => {
        pokeLis += `
        <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>
        `
    })
    return pokeLis
}

function addPokemon(e){
    let trainerId = e.target.dataset.trainerId,
    reqObj = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({trainer_id: trainerId})
    }

    fetch('http://localhost:3000/pokemons', reqObj)
    .then(resp => resp.json())
    .then(pokemon => {
        const trainerPos = pokemon.trainer.id - 1,
        trainerCard = document.getElementsByClassName('card')[trainerPos]
        trainerCard.children[2].innerHTML += renderLis([pokemon])
    })
}

function deletePoke(e){
    let pokeId = e.target.dataset.pokemonId

    fetch(`http://localhost:3000/pokemons/${pokeId}`, {method: 'DELETE'})
}

main()