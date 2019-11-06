const express = require("express");
const recipesRoutes = express.Router();
const validateRole = require("../middlewares/validateRole");
const Recipe = require("../models/Recipe");

/**************recipes list************/
recipesRoutes.get('/list', async(req,res) => {
    const recipes = await Recipe.find().populate("supplies")
    res.json(recipes)
})


/*************create recipe************/
recipesRoutes.post('/create', async(req,res) => {
    const newRecipe = {
        name: "pollo frito",
        supplies: ["5dbef3c0f8652916296be034", "5dbef41af8652916296be035"],
        quantities: [5,3]
    }
    const createdRecipe = await Recipe.create(newRecipe)
    res.json(createdRecipe)
})

module.exports = recipesRoutes