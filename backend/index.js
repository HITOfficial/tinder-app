const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");



app.use(cors());

//MongoDB
const mongoose = require("mongoose");
const db = require("./connection");
// Mongo Schema
const Room = require("./models/Room");
const Message = require("./models/Message");
const Rooms = mongoose.model("Room");


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    }
})


io.on("connection", (socket) => {
    console.log("connected user: ",socket.id);
    Message.find().then( result => {
        socket.emit("output_messages", result)
    })
    // const Rooms = mongoose.model("Room",Room);
    //
    // Rooms.find({roomID: '1235easd'}, (err, data) => {
    //     console.log(err, data, data.length)
    // })

    Rooms.find({}, (err, data) => {
        console.log(err,data)
    })
    // const room = new Room({roomID:"1235easd", messages: []})
    // room.save().then(() => console.log("saved"))

    // const room = new Room({roomID:"1235easd", messages: []})
    // room.save().then(() => console.log("saved"))



    socket.on("open_chat", (chatId) => {
    })

    socket.on("new_message", (user1,user2, msg) => {

    })

    socket.on("disconnect", () => {
        console.log("disconnected user: ", socket.id)
    })
})


server.listen(3001, () => {
    console.log("server running")
})