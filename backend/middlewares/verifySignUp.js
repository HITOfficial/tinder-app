//const db = require("../models");
//const ROLES = db.ROLES;

const User = require("../models/User")

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  //console.log(req);
  User.findOne({
    name: req.query.name
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.query.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  
};

module.exports = verifySignUp;