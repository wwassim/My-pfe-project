const User = require("../models/User")
const Event = require("../models/Event");
const Cryptojs = require("crypto-js")


//get all users
exports.getAllUsers = async(req,res)=>{
    try {
        const users=await User.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error);
    }
}

//get user
exports.getUser = async(req,res)=>{
    try {
        
        const user=await User.findById(req.params.id)
        const{password,...other}=user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error);
    }
}

//upade user information
exports.updateUser = async(req,res)=>{
    if (req.body.password){
        req.body.password=Cryptojs.AES.encrypt(req.body.password,process.env.PASS_SECRET).toString();
    }
    try {
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updateUser)
    } catch (error) {
        res.status(500).json(error);
    }
}

//delete profile
exports.deleteUser = async(req,res)=>{
    try {
        const deleteUser=await User.findByIdAndDelete(req.params.id)
        res.status(200).json(deleteUser)
    } catch (error) {
        res.status(500).json(error);
    }
}

//Follow User
exports.followUser =  async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json(currentUser._id);
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  }

//unfollow a user
exports.unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json(currentUser._id);
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  }

  //get your events
  exports.getYourEvents = async(req, res)=>{
    try {
      const user = await User.findById(req.params.id).populate("participationEvent")
      const events=user.participationEvent
      const eventList = events.map(event => {
        const { participant, ...others } = event._doc;
        return others;
      });
      return res.status(200).json(eventList);
    } catch (error) {
      res.status(500).json(error);
    }
  }

