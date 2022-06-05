const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const route = require("./routes/routes");

app.use(cors());
app.use(route);
//MongoDB
const mongoose = require("mongoose");
const db = require("./connection");
// Mongo Schema
const Room = require("./models/Room");
const User = require("./models/User");
const Message = require("./models/Message");

const Rooms = mongoose.model("Room");
const Users = mongoose.model("User");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected user: ", socket.id);
  // new room
  // const room = new Room({
  //   user1: "629b86e2055f68ce3922f274",
  //   user1Avatar:
  //     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80",
  //   user2: "62825b67f5c2addc780c65e1",
  //   user2Avatar:
  //     "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  //   messages: [],
  // });
  // room.save();

  // new user
  // const user = new User({
  //   name: "natasha",
  //   email: "natasha@gmail.com",
  //   password: "natasha1",
  //   rooms: [],
  //   age: 25,
  //   location: "Cracow",
  //   sex: "woman",
  //   sexPreference: "men",
  //   description: "just friends with benefits ;*",
  //   gallery: [],
  // });
  // user.save();

  // User.updateOne(
  //   { _id: "62825b67f5c2addc780c65e1" },
  //   { $push: { rooms: "62825b67f5c2addc780c65e1" } }
  // ).then((x) => console.log(x));

  // User.findOne({ _id: "629b86e2055f68ce3922f274" }).then((user) =>
  //   console.log(user)
  // );

  // loading room messages
  socket.on("load_room", (roomID) => {
    Room.find({ _id: roomID }, { messages: 1 }, (err, data) => {
      io.emit("messages", data);
    });
  });

  socket.on("new_message", (roomID, message) => {
    Room.updateOne(
      { _id: roomID },
      {
        $push: {
          messages: {
            sender: message.sender,
            receiver: message.receiver,
            message: message.message,
            date: message.date,
          },
        },
      }
    ).then((msg) => {
      console.log("msg to emit: ", msg);
      io.emit(msg);
    });
  });

  socket.on("hello", () => {
    console.log("HELLO :)");
  });

  socket.on("disconnect", () => {
    console.log("disconnected user: ", socket.id);
  });
});

server.listen(3001, () => {
  console.log("server running");
});
