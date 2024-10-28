import mongoose from 'mongoose';
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

export default Image;