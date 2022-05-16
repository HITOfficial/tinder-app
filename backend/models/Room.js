const mongoose = require("mongoose");
const Message = require("./Message");

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

module.exports = mongoose.model("Room", RoomSchema);