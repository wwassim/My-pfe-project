const Router = require("express").Router();
const payment= require("../controllers/payment")

Router.post("/",payment.add)
Router.post("/:id",payment.verify)

module.exports = Router