const mongoose = require("mongoose");


// mongoDB connection
const mongoDB = "mongodb+srv://tinder-app:tinder-app@tinder-app.9fhqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const db = mongoose.connect(mongoDB).then( () => console.log("connected to mongoDB"))
