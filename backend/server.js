const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware.js');

//Routers:
const authRouter = require("./routers/authRouter.js");

const app = express();
dotenv.config();//To be able to use the .env fil

//Launch the server on connection to the database:
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {console.log("Seerver launched on port", PORT)});
    })

//middleware: outputting requests, parsing json, 
app.use((req, res, next) => {
    console.log("Received request:", req.method, req.path);
    next();
})
app.use(express.json());
app.use(cookieParser());


//Implementing API endpoints:
app.use("/api/auth", authRouter);
app.use(authMiddleware);