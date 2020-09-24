class PokemonSerializer < ActiveModel::Serializer
  attributes :id, :nickname, :species

  belongs_to :trainer
end
