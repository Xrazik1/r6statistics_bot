const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

let disconnect = () => { mongoose.disconnect() };

module.exports.disconnect = disconnect;