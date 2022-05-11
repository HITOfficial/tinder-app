const mongoose = require("mongoose");
import Message from "./Message";

const RoomSchema = new mongoose.Schema({
    roomID: {
        type: String,
        required: true
    },
    messages: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message',
    }]
})

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room