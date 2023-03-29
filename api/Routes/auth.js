    
const Router = require('express').Router();
const auth = require('../controllers/authController')

//Register
Router.post('/register',auth.registerUser)

//Login 
Router.post('/login',auth.loginUser)
 
module.exports = Router