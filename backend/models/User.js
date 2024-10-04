const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        unique: true,
        required: true,
        type: String,
        
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
userSchema.statics.login = async function login(username, password){
    const user = await this.findOne({username});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user._id;
        }else{
            throw new Error("Password is incorrect");
        }
    }else{
        throw new Error("Username is not registered");
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;