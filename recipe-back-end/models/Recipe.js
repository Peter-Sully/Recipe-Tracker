const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema({
    name:String,
    url: String,
    review: String,
    tags: [String]
})

const Recipe = mongoose.model('Recipe', RecipeSchema)
module.exports = Recipe