const express = require("express");
const auth = require("basic-auth");
const jwt = require("jsonwebtoken");
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

/******************logout********************/
authRoutes.post("/logout", (req, res) => {
  const idToken = req.headers.authorization;
  let decodedJwt = jwt.decode(idToken, { complete: true });
  let username = decodedJwt.payload["cognito:username"];

  const userData = {
    Username: username,
    Pool: userPool
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.signOut(username);

  res.json({
    message: "session closed"
  });
});

/***************refresh token******************/
// validateToken is needed for security reasons
// due the refreshToken change once in 30 days

authRoutes.post("/refresh", validateToken, (req, res) => {
  const { refreshToken, idToken } = req.body;
  let decodedJwt = jwt.decode(idToken, { complete: true });
  let username = decodedJwt.payload["cognito:username"];

  const RefreshToken = new AmazonCognitoIdentity.CognitoRefreshToken({
    RefreshToken: refreshToken
  });

  const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

  const userData = {
    Username: username,
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
