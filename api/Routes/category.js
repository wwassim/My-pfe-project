const Router = require('express').Router();
const categoryController = require("../controllers/categoryController")
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


//insert a new category
Router.post('/',upload.single('nn'),categoryController.addCategory)
//Update category
Router.put('/:id',upload.single("nn"),categoryController.updateCategory)
//delete category
Router.delete('/:id',categoryController.deleteCategory)
//get all categories
Router.get("/",categoryController.getCategories)
//get category
Router.get('/:id',categoryController.getCategory)

module.exports = Router