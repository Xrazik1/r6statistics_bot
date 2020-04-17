const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let server = new Schema({
    discordId: String,
    users: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Server", server);