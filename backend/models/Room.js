const mongoose = require("mongoose");
const Message = require("./Message");

const RoomSchema = new mongoose.Schema({
  user1: {
    type: String,
    required: true,
  },
  user2: {
    type: String,
    required: true,
  },
  user1Avatar: {
    type: String,
    required: true,
  },
  user2Avatar: {
    type: String,
    required: true,
  },
  user1Name: {
    type: String,
    required: true,
  },
  user2Name: {
    type: String,
    required: true,
  },
  messages: [
    {
      type: MessageSchema,
    },
  ],
});

module.exports = mongoose.model("Room", RoomSchema);
