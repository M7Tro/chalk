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
    /* try{
        const {data} = JSON.parse(req.body);
        const API_KEY = process.env.API_KEY;
        res.status(200).json({message: `generateImage endpoint works.`})
    }catch(err){
        res.status(400).send("Some kind of problem on generateImage endpoint");
    } */
    try{
        const {canvasImage, prompt} = JSON.parse(req.body);
        const API_KEY = process.env.API_KEY;
        //console.log("received Prompt:", prompt, " and image:", canvasImage);
        const resp = await fetch(
        `https://api.limewire.com/api/image/generation`,
        {
            method: 'POST',
            headers: {
            'Content-Type': 'multipart/form-data',
            'X-Api-Version': 'v1',
            Accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
            prompt: prompt,
            image: canvasImage,
            aspect_ratio: '1:1'
            })
        }
        ); 
        const json = await resp.json();
        console.log("json: ", json);
        res.status(200).json(json);
    }catch(err){
        console.log(err);
        res.status(400).json({error: err.message})
    }    
}

module.exports = {
    saveImage,
    loadImage,
    generateImage
} 