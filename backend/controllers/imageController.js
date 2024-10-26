const Image = require('../models/Image.js');

const saveImage = async (req, res) => {
    try{
        const {username, type, data} = JSON.parse(req.body);
        const image = await Image.findOne({username});
        if(image){
            //console.log("Reached replaceImage. Image:", image);
            await Image.findOneAndUpdate({username}, {data});
            res.status(200).json({message: "successfully changed the image data"});
        }else{
            await Image.create({username, type, data});
            res.status(200).json({message:"successfully added new image"});
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const loadImage = async (req, res) => {
    try{
        const {username} = req.params;
        const imageDocument = await Image.findOne({username});
        //console.log("Inside load image. Username:", username, "Image:", imageDocument);
        res.status(200).json(imageDocument.data.toString()); 
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const generateImage = async (req, res) => {
    try{
        const {data} = JSON.parse(req.body);
        const API_KEY = process.env.API_KEY;
        res.status(200).json({message: `generateImage endpoint works.`})
    }catch(err){
        res.status(400).send("Some kind of problem on generateImage endpoint");
    }
}

module.exports = {
    saveImage,
    loadImage,
    generateImage
} 