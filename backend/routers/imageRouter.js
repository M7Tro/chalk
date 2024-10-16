const {Router} = require('express');
const bodyParser = require('body-parser');
const router = Router();
const imageController = require('../controllers/imageController.js');



router.post('/save', require('express').json({limit: "50mb"}), imageController.saveImage);//adding middleware to avoid payload error

router.get("/load/:username", imageController.loadImage);

module.exports = router;