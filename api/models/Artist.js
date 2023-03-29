const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema({
    name: { type: String, required: true},
    picture: { type: String, default: "",},
},{timestamps: true });

module.exports = mongoose.model("Artist", ArtistSchema);