const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true},
    lastname: { type: String, required: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean,default: false,},
    followers: {type:Array,default:[],},
    followings: {type:Array,default:[],},
    participationEvent :{ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }], default: [], },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);