const Router = require('express').Router();
const eventController = require('../controllers/eventContoller');
const { upload } = require('./multer');


//postevent
Router.post('/',upload.single('eventimage'),eventController.addEvent)
//update event
//Router.put('/:id',upload.single("nn"),eventController.)
// delete event 
Router.delete('/:id',eventController.deleteEvent)
//get all events for orgs
Router.get("/organisateur",eventController.getorgEvents)///fama mochkel ki nhoutha baad get event taamel error
//get event
Router.get('/:id',eventController.getEvent)
//get all events 
Router.get("/",eventController.getEvents)

// Router.get("/organisateur",eventController.getorgEvents)
//buy tickets event
Router.put('/:id/buy',eventController.buyTicket)
// get users in event
Router.get("/:id/participant",eventController.getUsersEvent)
module.exports = Router