const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//CORS config:
const corsOptions = {
    origin: "http://localhost:5501",
    optionsSuccessStatus: 200,
    credentials: true
}

//Routers:
const authRouter = require("./routers/authRouter.js");
const imageRouter = require("./routers/imageRouter.js");

const app = express();
dotenv.config();//To be able to use the .env fil

//Launch the server on connection to the database:
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {console.log("Seerver launched on port", PORT)});
    })

//middleware: outputting requests, parsing json, cors, parsing text
app.use((req, res, next) => {
    console.log("Received request:", req.method, req.path);
    next();
})
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.text());


//Implementing API endpoints:
app.use("/api/auth", cors(corsOptions), authRouter);
app.use("/api/image", imageRouter);