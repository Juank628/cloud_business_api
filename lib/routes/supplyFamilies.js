const express = require("express");
const supplyFamiliesRoutes = express.Router();
const SupplyFamily = require("../models/SupplyFamily");

supplyFamiliesRoutes.get("/list", async (req, res, next) => {
  try {
    const supplyFamilies = await SupplyFamily.find();
    res.status(200).send(supplyFamilies);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = supplyFamiliesRoutes;