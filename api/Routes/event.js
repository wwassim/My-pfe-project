const Router = require('express').Router();
const eventController = require('../controllers/eventContoller');
const { upload } = require('./multer');


//postevent
Router.post('/',upload.single('eventpicture'),eventController.addEvent)
//update event
//Router.put('/:id',upload.single("nn"),eventController.)
// delete event 
Router.delete('/:id',eventController.deleteEvent)
//get event 
Router.get('/:id',eventController.getEvent)
//get all events 
Router.get("/",eventController.getEvents)

module.exports = Router