const User = require('../models/User.js');
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next){
    try{
        const {id} = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        const user = await User.findById(id);
        res.locals.userId = user._id;
        next();
    }catch(err){
        res.status(400).json({err: err.message});
    }
}

module.exports = authMiddleware;