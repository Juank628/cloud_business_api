const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  token = req.body.token;
  request(
    {
      url: `https://cognito-idp.${process.env.POOL_REGION}.amazonaws.com/${process.env.USER_POOL_ID}/.well-known/jwks.json`,
      json: true
    },
    function(error, response, body) {
      if (!error && response.statusCode === 200) {
        pems = {};
        var keys = body["keys"];
        for (var i = 0; i < keys.length; i++) {
          //Convert each key to PEM
          var key_id = keys[i].kid;
          var modulus = keys[i].n;
          var exponent = keys[i].e;
          var key_type = keys[i].kty;
          var jwk = { kty: key_type, n: modulus, e: exponent };
          var pem = jwkToPem(jwk);
          pems[key_id] = pem;
        }
        //validate the token
        var decodedJwt = jwt.decode(token, { complete: true });
        if (!decodedJwt) {
          res.status(401).json({
            error: "Not a valid JWT token"
          });
        }

        var kid = decodedJwt.header.kid;
        var pem = pems[kid];
        if (!pem) {
          res.status(401).json({
            error: "Invalid token"
          });
        }

        jwt.verify(token, pem, function(err, payload) {
          if (err) {
            res.status(401).json(err);
          } else {
            req.userData = payload;
            next();
          }
        });
      } else {
        res.status(400).json({
          error: "Unable to download JWKs"
        });
      }
    }
  );
}

module.exports = validateToken;
