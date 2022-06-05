const express = require("express");
const User = require("../models/User");
const router = express.Router();

const { getRooms } = require("..");

router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.send(user);
});

// router.get("/users/:userID", async (req, res) => {
//   const user = await User.findOne({ _id: req.body._id });
//   res.send(user);
// });

router.get("/rooms/:id", async (req, res) => {
  const teamMembers = await Room.findById(req.params.id);
  res.send(teamMembers);
});

module.exports = router;
