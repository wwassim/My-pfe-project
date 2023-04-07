const Router = require("express").Router();
const messagesController= require("../controllers/messagesController")
Router.post("/",messagesController.addMess)
Router.get("/:conversationId",messagesController.getMess)
module.exports = Router