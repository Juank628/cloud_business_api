const express = require("express");
const locationsRoutes = express.Router();
const Location = require("../models/Location");

locationsRoutes.get("/list", async (req, res, next) => {
  try {
    const locations = await Location.find();
    res.status(200).send(locations);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = locationsRoutes;
