const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true },
    profileImg:{ type: String, default: "defaultUser.png",},
    password: { type: String, required: true },
    isAdmin: {type: Boolean,default: false,},
    followers: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [], },
    followings: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [], },
    point: {type: Number,default: 0},
    stars: {type: Array,default: [],},
    participationEvent :{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], default: [], },
    backcin:{ type: String, default: "",},
    frontcin:{ type: String, default: "",},
    phonenumber:{ type: String,default: ""  },
    ribNumber:{ type: String, default: "" },
    acceptaion:{ type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);