# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
 
Trainer.destroy_all
Pokemon.destroy_all
 
trainers_name = [
  'Natalie',
  'Prince',
  'Dick',
  'Rachel',
  'Garry',
  'Jason',
  'Matt',
  'Niky',
  'Ashley'
]
 
trainer_collection = []
 
trainers_name.each do |name|
  trainer_collection << Trainer.create(name: name)
end
 
trainer_collection.each do |trainer|

  rand(1..6).times do
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
  end

end

