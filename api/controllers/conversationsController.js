const Conversation = require("../models/Conversation");

//new conv

exports.addConv=async (req, res) => {
  console.log(req.body)
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conv of a user

exports.getConv=async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).populate("members");
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

// get conv includes two userId

exports.getTwoConv= async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    }).populate("members");
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
};

