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
  const {
    name,
    supplies,
    req_supp_quantities,
    req_supp_units,
    req_supp_factors,
    price
  } = req.body;
  const newRecipe = {
    name,
    supplies,
    req_supp_quantities,
    req_supp_units,
    req_supp_factors,
    price
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

/**************update recipe**************/
recipesRoutes.put("/update", async (req, res) => {
  const {
    id,
    name,
    supplies,
    req_supp_quantities,
    req_supp_units,
    req_supp_factors,
    price
  } = req.body;
  const newRecipe = {
    name,
    supplies,
    req_supp_quantities,
    req_supp_units,
    req_supp_factors,
    price
  };
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, newRecipe);
    res.json(updatedRecipe);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/******/

module.exports = recipesRoutes;
