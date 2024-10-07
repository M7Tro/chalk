const {Router} = require('express');
const router = Router();
const imageController = require('../controllers/imageController.js');

const Image = require('../models/Image.js');

router.post('/save', imageController.saveImage);

router.get("/load", imageController.loadImage);

module.exports = router;