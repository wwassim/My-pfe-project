const Router = require('express').Router();
const artistController = require("../controllers/artistController")
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


//insert a new artist
Router.post('/',upload.single('nn'),artistController.addArtist)
//Update artist
Router.put('/:id',upload.single("nn"),artistController.updateArtist)
//delete artist
Router.delete('/:id',artistController.deleteArtist)
//get all artist
Router.get("/",artistController.getArtists)
//get artist
Router.get('/:id',artistController.getArtist)

module.exports = Router