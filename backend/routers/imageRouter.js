import {Router} from 'express';
import bodyParser from 'body-parser';
const router = Router();
import express from 'express';
import imageController from "../controllers/imageController.js";



router.post('/save',express.json({limit: "50mb"}), imageController.saveImage);//adding middleware to avoid payload error

router.get("/load/:username", imageController.loadImage);

router.post("/generate", imageController.generateImage);

export default router;