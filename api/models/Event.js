const mongoose = require("mongoose");

const EventSchema  = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId,ref:"User" ,required: true},
    eventTitle:{type: String, required: true},
    category:{type: String, required: true},
    artist:{type: String,},
    location:{type: String, required: true},
    description:{type: String, required: true},
    eventpicture:{ type: String, default: "",required: true},
    ticketsNbr:{type: Number, required: true},
    ticketsPrice:{type: Number, required: true},
    participant:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [], },
    remboursement:{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [], },
    time:{type: String, required: true},
    startDate:{type: String, required: true},
    endDate:{type: String, required: true},
    startTime:{type: String, required: true},
    endTime:{type: String, required: true},    
},
    { timestamps: true }
);
module.exports = mongoose.model("Event",EventSchema)