const express = require("express");
const recipeFamiliesRoutes = express.Router();
const RecipeFamily = require("../models/RecipeFamily");

recipeFamiliesRoutes.get("/list", async (req, res, next) => {
  try {
    const recipeFamilies = await RecipeFamily.find();
    res.status(200).send(recipeFamilies);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = recipeFamiliesRoutes;