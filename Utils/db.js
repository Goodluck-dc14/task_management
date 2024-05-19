const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URI;

mongoose.connect(url).then(() => {
    console.log("Connected to DataBase");
}).catch((error) => {
    console.log(error);
});

module.exports = mongoose;