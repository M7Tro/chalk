const {Router} = require('express');
const router = Router();
const imageController = require('../controllers/imageController.js');

router.post('/save', imageController.saveImage);

router.get("/load", imageController.loadImage);

module.exports = router;