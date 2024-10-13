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
    try{
        const {username} = req.params;
        const image = await Image.find({username}).select("-type").select("-username");
        res.status(200).json({image}); 
    }catch(err){
        console.log("Error while saving image:", err.message);
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    saveImage,
    loadImage
} 