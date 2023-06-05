const Event = require("../models/Event");
const User = require("../models/User")

//Post event 
exports.addEvent = async(req,res)=>{
    const event = new Event({
        user :req.body._id ,
        eventTitle:req.body.eventtitle,
        category:req.body.eventcategory,
         location:req.body.location,
         time:req.body.time,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        startTime:req.body.startTime,
        endTime:req.body.startTime,   
        // artist:req.body.artist,
        // date
        description:req.body.description,
        eventpicture:req.file.filename,
        ticketsNbr:req.body.ticketnumber,
        ticketsPrice:req.body.ticketprice,
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
exports.updateEvent = async(req,res)=>{
        try {
             const updateFields = { ...req.body };
    
            if (req.file) {
            updateFields.eventpicture = req.file.filename;
            }
        const updateEvent = await Event.findByIdAndUpdate(req.params.id,
          { $set: updateFields },{ new: true }
        );
              res.status(200).json(updateEvent)
          } catch (error) {
              res.status(500).json(error);
          }
}
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
        currentUser.point += 10;
        event.ticketsNbr -= 1;
        await currentUser.save();
        await event.save();
    
        res.status(200).json(currentUser._id);
    } else {
        res.status(403).json("You haven't bought this ticket.");
      }
    } catch (error) {
      res.status(500).json(error);
    }
}
  
//get users in event 
exports.getUsersEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate("participant").populate("remboursement");
      const users = event.participant;
    //   const userList = users.map(user => {
    //     const { participationEvent, ...others } = user._doc;
    //     return others;
    //   });
      return res.status(200).json( event); // Return users with password
    } catch (error) {
      res.status(500).json(error);
    }
  }
  //get all events for specified user
exports.getorgEvents = async(req, res) => {
    try {
        const user = req.query.id
        const events = await Event.find({user:user}).populate("participant");
        return res.status(200).json(events)
    } catch (error) {
        res.status(500).json(error)
    }
}

