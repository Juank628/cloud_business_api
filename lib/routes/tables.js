const express = require("express");
const tablesRoutes = express.Router();
const Table = require("../models/Table");

tablesRoutes.get("/list", async (req, res, next) => {
  try {
    const tables = await Table.find();
    res.status(200).send(tables);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = tablesRoutes;
