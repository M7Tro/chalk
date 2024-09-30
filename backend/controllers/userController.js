const User = require('../models/User.js');
const jwt  = require("jsonwebtoken");

const signupUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const newUser = await User.create(req.body); //It must be asynchronous. Otherwise, try-catch block won't work
        res.status(200).json({user: newUser});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const id = await User.login(email, password);

        const token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true})

        res.status(200).json({message: "You are logged in"});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
const logoutUser = (req, res) => {
    res.status(200).send("logout");
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser
}