const express = require("express");
const auth = require("basic-auth");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const validateToken = require("../middlewares/validateToken");

const authRoutes = express.Router();
global.fetch = require("node-fetch");

/*****cognito variables*******/

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID
};
const pool_region = process.env.POOL_REGION;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/*************signup*************/
authRoutes.post("/signup", async (req, res) => {
  const attributes = [
    "family_name",
    "given_name",
    "email",
    "custom:locations",
    "custom:role"
  ];

  let attributeList = [];
  attributes.forEach(attribute => {
    attributeList.push(
      new AmazonCognitoIdentity.CognitoUserAttribute({
        Name: attribute,
        Value: req.body[attribute]
      })
    );
  });

  userPool.signUp(
    req.body.email,
    req.body.password,
    attributeList,
    null,
    function(err, result) {
      try {
        if (err) {
          throw err;
        }
        if (result) {
          cognitoUser = result.user;
          res.status(201).json({
            userCreated: cognitoUser.getUsername()
          });
        }
      } catch (err) {
        res.status(400).json(err);
      }
    }
  );
});

/**************login*************/
authRoutes.get("/login", (req, res) => {
  const credentials = auth(req);
  if (credentials) {
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: credentials.name,
        Password: credentials.pass
      }
    );
    let userData = {
      Username: credentials.name,
      Pool: userPool
    };
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        res.status(200).json({
          accessToken: result.getAccessToken().getJwtToken(),
          idToken: result.getIdToken().getJwtToken(),
          refreshToken: result.getRefreshToken().getToken()
        });
      },
      onFailure: function(err) {
        res.status(201).json(err);
      }
    });
  }
});

/***************refresh token******************/
authRoutes.post("/refresh", validateToken, (req, res) => {
  const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
    RefreshToken: req.body.refreshToken
  });

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: req.userData.email,
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.refreshSession(RefreshToken, (err, session) => {
    if (err) {
      res.status(400).json(err);
    } else {
      let retObj = {
        access_token: session.accessToken.jwtToken,
        id_token: session.idToken.jwtToken,
        refresh_token: session.refreshToken.token
      };
      res.json(retObj);
    }
  });
});

/********/

module.exports = authRoutes;