const express = require("express");
const User = require("../models/User");
const Room = require("../models/Room");
const Message = require("../models/Message");
const verifySignUp = require("../middlewares/verifySignUp");
const config = require("../config/auth.config");

var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const router = express.Router();
const { authJwt } = require("../middlewares");
/*
router.get("/users/:userID", async (req, res) => {
  const user = await User.findOne({ _id: req.params._id });
  res.send(user);
});
*/
router.get("/users", [authJwt.verifyToken], async (req, res) => {
  try{
  const users = await User.find();
  res.send(users)
}
  catch (err) {
      console.log(err);
      return;
  }

})

// router.get("/users/:name", [authJwt.verifyToken], async (req, res) => {
// const user = await User.findOne({ name: req.params.name })
// res.send(user)
// })

router.post("/api/auth/signin/:name/:password",async(req, res) => {

  const user = await User.findOne({
    name: req.params.name,
    
  }).then( user=> {
      if (!user) {
       res.status(404).send({ message: "User Not found." });
        return;
      } 
      
     
      var passwordIsValid = bcrypt.compareSync(
      req.params.password,
      user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          token: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
     
      console.log(token);
      res.send({user, token: token})
    });
 
  })

router.post( "/api/auth/signup",
[verifySignUp.checkDuplicateUsernameOrEmail],
async (req, res) => {
   try{
  console.log(req.query);
 
   }
   catch (err) {
      console.log(err);
      return;
  }
 //console.log( bcrypt.hashSync(req.query.password, 8));
  const user = new User({
      name: req.query.name,
      email: req.query.email,
      password: bcrypt.hashSync(req.query.password, 8),
      description : "-",
      sexPreference: req.query.sexPreference,
      sex:  req.query.sex,
      location: req.query.location,
      age: req.query.age

    });
  await user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
      res.send({ message: "User was registered successfully!" });
  });

})

router.put('/users/update',[authJwt.verifyToken], async(req, res) => {
  try{
  var db = req.db;
  var userToUpdate = req.query;
  console.log(userToUpdate)
  const users = await User.updateOne({ email: req.query.email}, req.query)
  const user = await User.findOne({ email: req.query.email});
 
  var token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // 24 hours
  });
 
  res.status(200).send({
    user, token: token
});
}
catch (err) {
  res.status(500).send({ message: err });
  return;
}
});

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.send(user);
});

router.get("/rooms/:id/", async (req, res) => {
  const room = await Room.findOne({ _id: req.params.id });
  res.send(room);
});

router.get("/rooms", async (req, res) => {
  const rooms = await Room.find();
  res.send(rooms);
});


router.get("/rooms/:id", async (req, res) => {
  const room = await Room.findById(req.params.id);
  res.send(room);
});

router.post("/rooms/:id", async (req, res) => {
  const message = new Message({
    sender: req.body.sender,
    receiver: req.body.sender,
    message: req.body.sender,
    date: req.body.sender,
  });
  await Room.updateOne(
    { _id: req.body._id },
    {
      $push: {
        messages: message,
      },
    }
  );
  io.emit("message", { ...req.body, _id: message._id });
});

module.exports = router;
