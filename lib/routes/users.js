const express = require("express");
const Role = require("../models/Role")
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
      UserPoolId: process.env.USER_POOL_ID,
      AttributesToGet: [
        "given_name",
        "family_name",
        "email",
        "custom:role",
        "custom:locations"
      ]
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
usersRoutes.get('/roles', async(req,res)=>{
  const roles = await Role.find();
  res.status(200).send(roles);
})

/********/

module.exports = usersRoutes;
