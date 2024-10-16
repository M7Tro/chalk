const Image = require('../models/Image.js');

const saveImage = async (req, res) => {
    try{
        const {username, type, data} = JSON.parse(req.body);
        const image = await Image.replaceOne({username}, {username, type, data});
        if(image.modifiedCount == 0){
            const newImage = await Image.create({username, type, data});
            res.status(200).json({savedImage: newImage});
        }else{
            res.status(200).json({savedImage: image});
        }
    }catch(err){
        console.log("Error while saving image:", err.message);
        res.status(400).json({error: err.message});
    }
}

const loadImage = async (req, res) => {
    try{
        const {username} = req.params;
        const imageDocument = await Image.findOne({username});
        res.status(200).json(imageDocument.data.toString()); 
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    saveImage,
    loadImage
} 