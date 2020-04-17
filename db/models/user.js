const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    username:  String,
    r6Username: String,
    lang: String,
    platform: String,
    discordId: Number,
    channel: { type: Schema.Types.ObjectId, ref: 'Server' },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", user);