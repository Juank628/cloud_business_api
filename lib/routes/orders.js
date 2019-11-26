const express = require("express");
const ordersRoutes = express.Router();
const validateRole = require("../middlewares/validateRole");
const Order = require("../models/Order");

/**************order list************/
ordersRoutes.get("/list", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("recipes")
      .populate("location")
      .populate("table");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

/*******find open orders by table********/
ordersRoutes.get("/open/:tableId", async (req, res) => {
  try {
    const orders = await Order.find({
      table: req.params.tableId,
      status: "open"
    })
      .populate("recipes")
      .populate("location")
      .populate("table");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = ordersRoutes;
