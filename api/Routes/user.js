const Router = require('express').Router();
const userController = require("../controllers/userContoller")
const {verifyToken,verfiyTokenAndAuthorization} = require("./verifyToken")
const multer = require('multer');


/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`);
    },
  });
  const upload = multer({ storage:storage });
  Router.put('/:id',upload.fields([{ name: 'frontcin'},{ name: 'backcin', maxCount: 1 }]),userController.updateUser)

//get All users
Router.get('/',userController.getAllUsers)
//get a user
Router.get('/:id',userController.getUser)
//updateUser 

//delete profile
Router.delete('/:id',userController.deleteUser)
//follow user
Router.put("/:id/follow",userController.followUser);
//unfollow a user 
Router.put("/:id/unfollow", userController.unfollowUser);
//get getYourEvents
Router.get("/:id/myevent",userController.getYourEvents)
 
module.exports = Router