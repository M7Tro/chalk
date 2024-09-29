const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();//To be able to use the .env file

//middleware: outputting requests, parsing json, 
app.use((req, res, next) => {
    console.log("Received request:". req.method, req.path);
    next();
})

app.use(express.json());

//Launcing the server once we are connected to the database:
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {console.log("Listing on port", PORT)});
    })