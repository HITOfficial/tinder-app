const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

app.use(cors());

//MongoDB
require("./connection");
// Message Mongo Schema
const Message = require("./models/Message");

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

    socket.on("open_chat", (user1,user2) => {
    })

    socket.on("new_message", (user1,user2, msg) => {
        const message = new Message({msg})
        message.save().then( () => {
            io.emit("message",msg);
        })
    })

    socket.on("disconnect", () => {
        console.log("disconnected user: ", socket.id)
    })
})


server.listen(3001, () => {
    console.log("server running")
})