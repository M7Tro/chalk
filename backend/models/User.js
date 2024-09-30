const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

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

userSchema.pre("save", async function(next){
    const document = this; //The document being saved 
    const salt = await bcrypt.genSalt(10);
    document.password = await bcrypt.hash(this.password, salt);
    next();
})

//Static method for login:
userSchema.statics.login = async function login(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return true;
        }else{
            throw new Error("Password is incorrect");
        }
    }else{
        throw new Error("Email is not registered");
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;