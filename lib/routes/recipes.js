const express = require("express");
const recipesRoutes = express.Router();
const validateRole = require("../middlewares/validateRole");
const Recipe = require("../models/Recipe");

/**************recipes list************/
recipesRoutes.get("/list", async (req, res) => {
  const recipes = await Recipe.find()
    .populate("supplies")
    .populate("family")
  res.json(recipes);
});

/*************create recipe************/
recipesRoutes.post(
  "/create",
  validateRole("business_administrator"),
  async (req, res) => {
    const {
      name,
      supplies,
      req_supp_quantities,
      req_supp_units,
      req_supp_factors,
      price,
      type,
      family
    } = req.body;
    const newRecipe = {
      name,
      supplies,
      req_supp_quantities,
      req_supp_units,
      req_supp_factors,
      price,
      type,
      family
    };
    try {
      const alreadyExist = await Recipe.findOne({ name: newRecipe.name });
      if (alreadyExist) {
        res.status(400).json({ error: "El nombre de la receta ya existe" });
      } else {
        const createdRecipe = await Recipe.create(newRecipe);
        populatedRecipe = await Recipe.findById(createdRecipe._id)
          .populate("supplies")
          .populate("family")
        res.json(populatedRecipe);
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

/**************update recipe**************/
recipesRoutes.put(
  "/update",
  validateRole("business_administrator"),
  async (req, res) => {
    const {
      id,
      name,
      supplies,
      req_supp_quantities,
      req_supp_units,
      req_supp_factors,
      price,
      type,
      family
    } = req.body;
    const newRecipe = {
      name,
      supplies,
      req_supp_quantities,
      req_supp_units,
      req_supp_factors,
      price,
      type,
      family
    };
    try {
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, newRecipe);
      populatedRecipe = await Recipe.findById(updatedRecipe._id)
        .populate("supplies")
        .populate("family")
      res.json(populatedRecipe);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

/******/

module.exports = recipesRoutes;
