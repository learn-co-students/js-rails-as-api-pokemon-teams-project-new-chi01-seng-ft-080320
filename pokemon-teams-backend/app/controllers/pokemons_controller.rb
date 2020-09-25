class PokemonsController < ApplicationController

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainer_id =  params[:pokemon]["trainer_id"]
        trainer = Trainer.find(trainer_id)
        
        if trainer.pokemons.length < 6
            pokemon = Pokemon.create(nickname:name, species: species, trainer_id: trainer_id)
            render json:  PokemonSerializer.new(pokemon).to_serialized_json
        else 
            render json: {message: 'Pokemon team limit is 6'}
        end
    end


    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: { message: "Pokemon was released"}
    end

end
