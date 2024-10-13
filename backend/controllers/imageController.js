const Image = require('../models/Image.js');

const saveImage = async (req, res) => {
    try{
        const {username, type, data} = JSON.parse(req.body);
        const image = await Image.findOne({username});
        if(image){
            const newImage = await Image.
        }
    }catch(err){
        console.log("Error while saving image:", err.message);
        res.status(400).json({error: err.message});
    }
}

const loadImage = async (req, res) => {
    try{
        const {username} = req.params;
        const image = await Image.find({username}).select("-type").select("-username");
        res.status(200).json({image}); 
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    saveImage,
    loadImage
} 