const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateToken");

const auth = require("./auth");
const locations = require("./locations");
const users = require("./users");
const supplies = require("./supplies");
const supplyFamilies = require("./supplyFamilies");
const recipes = require("./recipes");
const recipeFamilies = require("./recipeFamilies");
const tables = require("./tables")
const orders = require("./orders")

/****public routes***/
router.use("/auth", auth);

/****private routes****/
router.use(validateToken);
router.use("/users", users);
router.use("/locations", locations);
router.use("/supplies", supplies);
router.use("/supply_families", supplyFamilies);
router.use("/recipes", recipes);
router.use("/recipe_families", recipeFamilies);
router.use("/tables", tables)
router.use("/orders", orders)

module.exports = router;
