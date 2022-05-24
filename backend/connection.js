const mongoose = require("mongoose");
const {Room} = require("./models/Room");
const routes = require("./routes/routes");
const express = require("express");
// mongoDB connection
const mongoDB = "mongodb+srv://tinder-app:tinder-app@tinder-app.9fhqw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoDB).then( () => {
    const app = express();
    app.use("/api", routes);
});

