const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean,default: false,},
    followers: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [], },
    followings: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [], },
    point: {type: Number,default: 0},
    participationEvent :{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], default: [], },
    backcin:{ type: String, default: "",},
    frontcin:{ type: String, default: "",},
    phonenumber:{ type: String,default: ""  },
    ribNumber:{ type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);