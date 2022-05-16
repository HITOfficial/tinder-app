const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    senderAvatar: {
        type: String,
        required: true
    },
    receiverAvatar: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

module.exports =  mongoose.model("Message", MessageSchema);