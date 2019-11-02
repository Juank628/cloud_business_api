const express = require("express");
const suppliesRoutes = express.Router();
const Supply = require("../models/Supply");
const SupplyFamily = require("../models/SupplyFamily")

suppliesRoutes.get("/list", async (req, res, next) => {
  try {
    const supplies = await Supply.find().populate("family", ["name"]);
    res.status(200).json(supplies);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

suppliesRoutes.post("/create", async (req, res, next) => {
  const { description, family, cost } = req.body;
  newSupply = new Supply({
    description,
    family,
    cost
  });
  try {
    const createdSupply = await Supply.create(newSupply);
    //get all family information. The previous response only has family id
    const family = await SupplyFamily.findById(createdSupply.family)
    createdSupply.family = family

    res.json(createdSupply);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = suppliesRoutes;
