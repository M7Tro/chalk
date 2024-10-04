const User = require('../models/User.js');
const jwt  = require("jsonwebtoken");

const signupUser = async (req, res) => {
    try{
        const {username, password} = JSON.parse(req.body);
        console.log(username, password);
        const newUser = await User.create({username, password}); //It must be asynchronous. Otherwise, try-catch block won't work
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "1d"});
        res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true});
        res.status(200).json({username: username});  
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
const loginUser = async (req, res) => {
    try{
        const {username, password} = JSON.parse(req.body);
        const id = await User.login(username, password);
        const token = jwt.sign({id}, process.env.JWT_SECRET,{expiresIn:"1d"});
        res.cookie("jwt", token, {maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true})
        res.status(200).json({username});  
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
const logoutUser = (req, res) => {
    res.cookie("jwt", "", {maxAge: 1, httpOnly: true});
    res.status(200).json({message: "JWT cookie deleted"});
}

const cookie = async (req, res) => {
    try{   
        if(req.cookies.jwt){
            jwt.verify(req.cookies.jwt, process.env.JWT_SECRET, async(error, decoded) => {
                if(error){
                    res.status(400).json({message: "authentication is required"});
                }
                if(decoded){
                    const {id} = decoded;
                    const {username} = await User.findOne({_id: id}).select('-password').select('-_id').select('username');
                    res.status(200).json({username});    
                }else{
                    throw new Error("Could not decode the token");
                }
            })    
        }else{
            res.cookie("jwt", "", {maxAge: 1, httpOnly: true});
            res.status(400).json({message: "authentication is required"});    
        }
    }catch(err){
        res.cookie("jwt", "", {maxAge: 1, httpOnly: true});
        res.status(400).json({message: "authentication is required"});
    }
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    cookie
}