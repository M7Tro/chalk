const mongoose = require('mongoose');
const ImageSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String, 
        unique: true
    }, 
    type: {
        required: true,
        type: String
    },
    data: {
        required: true,
        type: Buffer
    }
})

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;