const express = require("express");
const recipesRoutes = express.Router();
const validateRole = require("../middlewares/validateRole");
const Recipe = require("../models/Recipe");

/**************recipes list************/
recipesRoutes.get("/list", async (req, res) => {
  const recipes = await Recipe.find().populate("supplies");
  res.json(recipes);
});

/*************create recipe************/
recipesRoutes.post("/create", async (req, res) => {
  const newRecipe = {
    name: "pollo frito con huevo",
    supplies: ["5dc2f1764482cc33a5535319", "5dc2f2c34482cc33a553531a"],
    req_supp_quantities: [2, 300],
    req_supp_units: ["Kg", "g"],
    req_supp_factor: [1, 1]
  };
  try {
    const alreadyExist = await Recipe.findOne({ name: newRecipe.name });
    if (alreadyExist) {
      res.status(400).json({ error: "El nombre de la receta ya existe" });
    } else {
      const createdRecipe = await Recipe.create(newRecipe);
      res.json(createdRecipe);
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


/******/

module.exports = recipesRoutes;
