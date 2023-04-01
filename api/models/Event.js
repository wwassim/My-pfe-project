const mongoose = require("mongoose");

const EventSchema  = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId,ref:"User" ,required: true},
    eventTitle:{type: String, required: true},
    category:{type: String, required: true},
    artist:{type: String,},
    description:{type: String, required: true},
    eventpicture:{ type: String, default: "",required: true},
    ticketsNbr:{type: Number, required: true},
    ticketsPrice:{type: Number, required: true},
    },
    { timestamps: true }
);
module.exports = mongoose.model("Event",EventSchema)