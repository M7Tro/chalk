const Image = require('../models/Image.js');

const saveImage = async (req, res) => {
    try{
        const {username, type, data} = req.body;
        const newImage = await Image.create(req.body);
        if(newImage){
            res.status(200).json({image: newImage});
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const loadImage = async (req, res) => {
    res.status(200).json({message: "loadImage reached"});
}

module.exports = {
    saveImage,
    loadImage
}