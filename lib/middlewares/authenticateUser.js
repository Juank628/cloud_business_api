const bcrypt = require("bcryptjs");
const auth = require("basic-auth");
const User = require("../models/User");

const authenticateUser = (req, res, next) => {
  const credentials = auth(req);
  if (credentials) {
    User.findOne({
      email: credentials.name
    }).then(user => {
      if (user) {
        const authenticated = bcrypt.compareSync(
          credentials.pass,
          user.pass
        );
        if (authenticated) {
          req.logedUser = user;
          next();
        } else {
          res.status(401).json({ errors: ["access denied"] });
        }
      } else {
        res.status(401).json({ errors: ["user does not exist"] });
      }
    });
  } else {
    res.status(401).json({ errors: ["no credentials received"] });
  }
};

module.exports = authenticateUser