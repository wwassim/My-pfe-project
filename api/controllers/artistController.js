const Artist = require("../models/Artist")

//insert a new Artist
exports.addArtist = async(req, res) => {
   
    const artist = new Artist({
        name: req.body.name,
        picture:req.file.filename,
    })
    try {
        const addArtist = await artist.save();
        return res.status(200).json(addArtist)
    } catch (error) {
        res.status(500).json(error)
    }
}
//Update Artist
exports.updateArtist = async(req, res) => {
    try {
        const updateArtist = await Artist.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            picture:req.file.filename,
        }, { new: true });
        return res.status(200).json(updateArtist)
    } catch (error) {
        res.status(500).json(error)
    }
}

//delete Artist
exports.deleteArtist = async(req, res) => {
    try {
        const deleteArtist = await Artist.findByIdAndDelete(req.params.id);
        return res.status(200).json(deleteArtist)
    } catch (error) {
        res.status(500).json(error)
    }
}
//get all categories
exports.getArtists = async(req, res) => {
    try {
        const artists = await Artist.find();
        return res.status(200).json(artists)
    } catch (error) {   
        res.status(500).json(error)
    }
}
//get artist
exports.getArtist = async(req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        return res.status(200).json(artist)
    } catch (error) {
        res.status(500).json(error)
    }
}
