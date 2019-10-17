const bcrypt = require("bcryptjs");
const express = require("express");
const usersRoutes = express.Router();
const User = require("../models/User");
const authenticateUser = require("../middlewares/authenticateUser");

usersRoutes.post("/", async (req, res) => {
  const reqUser = req.body;

  try {
    const foundUser = await User.findOne({ email: reqUser.email });
    if (foundUser) {
      res.status(400).json({ errors: ["the user alredy exist"] });
    } else {
      if (reqUser.pass) {
        reqUser.pass = bcrypt.hashSync(reqUser.pass);
      } else {
        reqUser.pass = "";
      }
      try {
        await User.create(reqUser);
        res
          .status(201)
          .location("/")
          .end();
      } catch (err) {
        res.status(400).json({ errors: err.errors });
      }
    }
  } catch (err) {
    res.status(400).json({ errors: err.errors });
  }
});

module.exports = usersRoutes;
