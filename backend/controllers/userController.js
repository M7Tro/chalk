const User = require('../models/User.js');

const signupUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const newUser = await User.create(req.body); //It must be asynchronous. Otherwise, try-catch block won't work
        res.status(200).json({user: newUser});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
const loginUser = (req, res) => {
    res.status(200).send("login");
}
const logoutUser = (req, res) => {
    res.status(200).send("logout");
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser
}