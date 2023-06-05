const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], default: [], 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);