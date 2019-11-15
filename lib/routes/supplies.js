const express = require("express");
const suppliesRoutes = express.Router();
const validateRole = require("../middlewares/validateRole");
const Supply = require("../models/Supply");
const SupplyFamily = require("../models/SupplyFamily");

/*********************get list************************/
suppliesRoutes.get(
  "/list",
  validateRole("supervisor"),
  async (req, res, next) => {
    try {
      const supplies = await Supply.find().populate("family", ["name"]);
      res.status(200).json(supplies);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

/*********************create supply************************/
suppliesRoutes.post(
  "/create",
  validateRole("business_administrator"),
  async (req, res, next) => {
    const {
      active,
      barCode,
      description,
      family,
      size,
      units,
      factor,
      cost
    } = req.body;

    newSupply = new Supply({
      active,
      barCode,
      description,
      family,
      size,
      units,
      factor,
      cost
    });
    try {
      const createdSupply = await Supply.create(newSupply);
      //get all family information. The previous response only has family id
      const familyObject = await SupplyFamily.findById(createdSupply.family);
      createdSupply.family = familyObject;

      res.json(createdSupply);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

/*********************update supply************************/
suppliesRoutes.put(
  "/update",
  validateRole("business_administrator"),
  async (req, res, next) => {
    const {
      _id,
      active,
      barCode,
      description,
      family,
      size,
      units,
      factor,
      cost
    } = req.body;
    try {
      const updatedSupply = await Supply.findByIdAndUpdate(
        { _id },
        {
          active,
          barCode,
          description,
          family,
          size,
          units,
          factor,
          cost
        },
        { new: true }
      );

      //get all family information. The previous response only has family id
      const familyObject = await SupplyFamily.findById(updatedSupply.family);
      updatedSupply.family = familyObject;

      res.json(updatedSupply);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }
);

/******/
module.exports = suppliesRoutes;
