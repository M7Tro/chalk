const mongoose = require('mongoose');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        unique: true,
        required: true,
        type: String,
        validate: {
            validator: isEmail
        }
    },
    password: {
        required: true,
        type: String,
        minLength: 6,
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;