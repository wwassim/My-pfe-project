const Router = require("express").Router();
const conversationsController= require("../controllers/conversationsController")


Router.post("/",conversationsController.addConv)
Router.get("/:userId",conversationsController.getConv)
Router.get("/find/:firstUserId/:secondUserId",conversationsController.getTwoConv)
module.exports = Router