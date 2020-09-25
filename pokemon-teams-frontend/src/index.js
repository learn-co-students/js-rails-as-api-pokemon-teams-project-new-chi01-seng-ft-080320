const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// event listener functions
function addCardListener(){
    let main = document.getElementById('main')
    main.addEventListener('click', function(e){
        if(e.target.className === 'release'){
            alert('Are you sure you want to release pokemon?')
            releasePokemon(e)
        }
        else if (e.target.className === 'add-new-pokemon'){
            catchPokemon(e)
        }
    })
    
}


//rendering functions

function fetchTrainers(){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(response => {
        renderTrainers(response)
        addCardListener()
    });
}



function renderTrainers(trainers){
    let main = document.getElementById("main")
    trainers.forEach(trainer => {
        let trainersHtml = 
        `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
            <button class="add-new-pokemon" data-trainer-id="${trainer.id}">Add Pokemon</button>
            <ul id="pokemon-of-${trainer.id}">
            </ul>
        </div>`
        main.innerHTML += trainersHtml
        renderPokemon(trainer)
    });
}


function renderPokemon(trainer){
    let ul = document.getElementById(`pokemon-of-${trainer.id}`)
    let pokemonLis = ''
    trainer.pokemons.forEach(pokemon => {
        pokemonLis +=
        ` <li>${pokemon.nickname} ${(pokemon.species)} <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    });
    ul.innerHTML = pokemonLis
}

function releasePokemon(e){
    const pokemonId = e.target.dataset.pokemonId
    configObj = {
        method : 'DELETE'
    }
    fetch(POKEMONS_URL+'/'+pokemonId, configObj)
    .then(response => response.json())
    .then(response => {
        alert(response.message)
        e.target.parentElement.remove()
    }); 
}

function catchPokemon(e){
    const trainerId = parseInt(e.target.dataset.trainerId)
    data = {
        trainer_id: trainerId
    }
    configObj = {
        method : 'POST',
        headers : {
            "Content-Type" : "application/json", 
            "Accept" : "application/json"
          },
        body : JSON.stringify(data)
    }

    fetch(POKEMONS_URL, configObj)
    .then(response => response.json())
    .then(response => {
        renderNewPokemon(response, e)
    }); 
}

function renderNewPokemon(pokemon, e){
    if(pokemon.message){
        alert(pokemon.message)
    }
    else{
        const ul = e.target.nextElementSibling
        ul.innerHTML += 
        `<li>${pokemon.nickname} ${(pokemon.species)} <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    }

}




//execution 

const main = () => {
    fetchTrainers()

}


main()