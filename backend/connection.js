const mongoose = require("mongoose");
const {Room} = require("./models/Room");

// mongoDB connection
const mongoDB = "mongodb+srv://tinder-app:tinder-app@tinder-app.9fhqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
db = mongoose.connect(mongoDB).then( () => console.log("connected to mongoDB"));

