const express = require("express");
const User = require("../models/User");
const Room = require("../models/Room");
const Message = require("../models/Message");

const router = express.Router();

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

router.get("/users/:userID", async (req, res) => {
  const user = await User.findOne({ _id: req.body._id });
  res.send(user);
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
