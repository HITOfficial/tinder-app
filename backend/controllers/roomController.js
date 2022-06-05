const Room = require("../models/Room");

const loadRoom = async (req, res) => {
  try {
    const room = await Room.find({ _id: req.body._id }, { messages: 1 });
    res.send(room);
  } catch (error) {
    console.log("Cannot load room", error);
  }
};

const newMessage = async (req, res) => {
  try {
    Room.updateOne(
      { _id: req.body._id },
      {
        $push: {
          messages: {
            sender: req.body.sender,
            receiver: req.body.receiver,
            message: req.body.message,
            date: req.body.date,
          },
        },
      }
    ).then((message) => {
      console.log(message);
      res.send(message);
    });
  } catch (error) {
    console.log("Cannot load room", error);
  }
};
