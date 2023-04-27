    
const Router = require('express').Router();
const auth = require('../controllers/authController')

//Register
Router.post('/register',auth.registerUser)

//Login 
Router.post('/login',auth.loginUser)

//

Router.post("/reset-password-link", auth.sendResetPasswordLinkCtrl);
//
Router.get("/reset-password/:id",auth.getResetPasswordLinkCtrl)
Router.post("/reset-password/:id",auth.resetPasswordCtrl)

module.exports = Router