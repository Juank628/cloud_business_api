const express = require("express");
const usersRoutes = express.Router();
const validateToken = require("../middlewares/validateToken");

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require("aws-sdk");
global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: process.env.USER_POOL_ID,
  ClientId: process.env.CLIENT_ID
};
const pool_region = process.env.POOL_REGION;

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/*************signup*************/
usersRoutes.post("/create", async (req, res) => {
  let attributeList = [];
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "name",
      Value: req.body.name
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: req.body.email
    })
  );
  attributeList.push(
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "custom:role",
      Value: "waiter"
    })
  );

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
usersRoutes.post("/login", (req, res) => {
  let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: req.body.email,
    Password: req.body.password
  });

  let userData = {
    Username: req.body.email,
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
});

/***************refresh token******************/
usersRoutes.post("/refresh", validateToken, (req, res) => {
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

/************test************/
usersRoutes.post("/test", validateToken, (req, res) => {
  res.json({
    userData: req.userData
  });
});


module.exports = usersRoutes;
