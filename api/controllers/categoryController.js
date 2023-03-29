const Category = require("../models/Category")

//insert a new category
exports.addCategory = async(req, res) => {
   
    const category = new Category({
        name: req.body.name,
        picture:req.file.filename,
    })
    try {
        const addCategory = await category.save();
        return res.status(200).json(addCategory)
    } catch (error) {
        res.status(500).json(error)
    }
}
//Update category
exports.updateCategory = async(req, res) => {
     console.log(req.file.originalname)
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            picture:req.file.filename,
        }, { new: true });
        return res.status(200).json(updateCategory)
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete category
exports.deleteCategory = async(req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json(deleteCategory)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get all categories
exports.getCategories = async(req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json(categories)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get category
exports.getCategory = async(req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        return res.status(200).json(category)
    } catch (error) {
        res.status(500).json(error)
    }
}
