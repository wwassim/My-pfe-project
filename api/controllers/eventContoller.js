const Event = require("../models/Event");
const User = require("../models/User")

//Post event 
exports.addEvent = async(req,res)=>{
   
    const event = new Event({
        user :req.body.user ,
        eventTitle:req.body.eventTitle,
        category:req.body.category,
        artist:req.body.artist,
        description:req.body.description,
        eventpicture:req.file.filename,
        ticketsNbr:req.body.ticketsNbr,
        ticketsPrice:req.body.ticketsPrice,
        participant:req.body.participant,
    })
    try {
        const addEvent = await event.save();
        return res.status(200).json(addEvent)
    } catch (error) {
        res.status(500).json(error)
    }
}
//Edit event
//delete event
exports.deleteEvent = async(req, res) => {
    try {
        const deleteEvent = await Event.findByIdAndDelete(req.params.id);
        return res.status(200).json(deleteEvent)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get event 
exports.getEvent = async(req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("user");
        return res.status(200).json(event)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get all events
exports.getEvents = async(req, res) => {
    try {
        const events = await Event.find().populate("user");
        return res.status(200).json(events)
    } catch (error) {
        res.status(500).json(error)
    }
}

// buy ticket for event
exports.buyTicket= async(req,res)=>{
    try {
      const event = await Event.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!event.participant.includes(req.body.userId)) {
        await currentUser.updateOne({ $push: { participationEvent: req.params.id } });
        await event.updateOne({ $push: { participant: req.body.userId } });
        res.status(200).json(currentUser._id);
    } else {
        res.status(403).json("you dont buy this tickets");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
//get users in event 
exports.getUsersEvent = async(req, res)=>{
    try {
      const event = await Event.findById(req.params.id).populate("participant")
      const users=event.participant
      const userList = users.map(user => {
        const { participationEvent, ...others } = user._doc;
        return others;
      });
      return res.status(200).json(userList);
    } catch (error) {
      res.status(500).json(error);
    }
  }