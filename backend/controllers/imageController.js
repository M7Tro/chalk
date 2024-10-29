import Image from '../models/Image.js';
import FormData from 'form-data';
import fetch from 'node-fetch';

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
            const {canvasImage, prompt} = JSON.parse(req.body); //retrieve the base64 image
            const API_KEY = process.env.API_KEY; //get the API key from .env file 

            const form = new FormData(); //create new form object 
            form.append('prompt', prompt); //attach the promp from the request 
            //form.append('negative_prompt','darkness, fog');
            //form.append('image', canvasImage);
            //form.append('samples','2');
            form.append('quality','LOW');
            //form.append('guidance_scale','50');
            form.append('aspect_ratio','1:1');
            form.append('style','PHOTOREALISTIC');
        
            const resp = await fetch(
            `https://api.limewire.com/api/image/generation`,
            {
                method: 'POST',
                headers: {
                'X-Api-Version': 'v1',
                Accept: 'application/json',
                Authorization: `Bearer ${API_KEY}`
                },
                body: form
            }
            );
        
            const json = await resp.json();
            console.log(json); 
        }catch(err){

        }

        

}

const imageController = {
    saveImage,
    loadImage,
    generateImage
} 

export default imageController;