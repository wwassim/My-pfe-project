const Event = require("../models/Event");

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
        const event = await Event.findById(req.params.id);
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