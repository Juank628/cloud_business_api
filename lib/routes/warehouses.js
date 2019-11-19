const express = require("express");
const warehousesRoutes = express.Router();
const Warehouse = require("../models/Warehouse");

warehousesRoutes.get("/list", async (req, res, next) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).send(warehouses);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = warehousesRoutes;
