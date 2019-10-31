const express = require("express");
const Role = require("../models/Role");
const Aws = require("aws-sdk");
const validateAdminRole = require("../middlewares/validateAdminRole");

const usersRoutes = express.Router();

/*****cognito variables*******/
const pool_region = process.env.POOL_REGION;

const cognitoIdentityService = new Aws.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-19",
  region: pool_region
});

/****************get all users***************/
usersRoutes.get("/list", validateAdminRole, (req, res) => {
  cognitoIdentityService.listUsers(
    {
      UserPoolId: process.env.USER_POOL_ID
    },
    (err, data) => {
      if (!err) {
        res.json(data);
      } else {
        res.status(400).json(err);
      }
    }
  );
});

/*************get all roles***************/
usersRoutes.get("/roles", async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (err) {
    res.status(400).json({
      error: err
    });
  }
});

/*****************signup*****************/

usersRoutes.post("/signup", (req, res) => {
  const attributes = [
    "family_name",
    "given_name",
    "email",
    "custom:locations",
    "custom:role"
  ];

  let attributeList = [];
  attributes.forEach(attribute => {
    attributeList.push({
      Name: attribute,
      Value: req.body[attribute]
    });
  });

  let params = {
    ClientId: process.env.CLIENT_ID,
    Password: "Windows2009",
    Username: req.body.email,

    UserAttributes: attributeList
  };
  cognitoIdentityService.signUp(params, function(err, data) {
    if (err) {
      res.status(400).json({ error: err.message });
    } else {
      params = {
        UserPoolId: process.env.USER_POOL_ID /* required */,
        Username: data.UserSub /* required */
      };
      cognitoIdentityService.adminGetUser(params, function(err, data) {
        if (err) {
          res.status(400).json({
            error: "El susario fue creado pero no es posible obtener sus datos"
          });
        } else {
          res.json(data);
        }
      });
    }
  });
});

/**********Update user********/
usersRoutes.put("/update", (req, res) => {
  const attributes = [
    "family_name",
    "given_name",
    "custom:locations",
    "custom:role"
  ];

  let attributeList = [];
  attributes.forEach(attribute => {
    attributeList.push({
      Name: attribute,
      Value: req.body[attribute]
    });
  });

  let params = {
    UserAttributes: attributeList,
    UserPoolId: process.env.USER_POOL_ID,
    Username: req.body.Username
  };
  cognitoIdentityService.adminUpdateUserAttributes(params, function(err, data) {
    if (err) {
      res.status(400).json({ error: err });
    } else {
      params = {
        UserPoolId: process.env.USER_POOL_ID,
        Username: req.body.Username
      };
      cognitoIdentityService.adminGetUser(params, function(err, data) {
        if (err) {
          res.status(400).json({
            error:
              "El susario fue modificado pero no es posible obtener sus datos"
          });
        } else {
          res.json(data);
        }
      });
    }
  });
});

/********/

module.exports = usersRoutes;
