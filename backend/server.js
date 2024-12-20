import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

//CORS config:
const corsOptions = {
    origin: function(origin, callback){
        if(origin.includes("http://localhost:")){
            callback(null, true)
        }else{
            callback(new Error(`Unidentified URL: ${origin}`));
        }
    },
    optionsSuccessStatus: 200,
    credentials: true
}

//Routers:
import authRouter from './routers/authRouter.js';
import imageRouter from './routers/imageRouter.js';

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
app.use(express.text({limit: '50mb'}));

//Implementing API endpoints:
app.use("/api/auth", cors(corsOptions), authRouter);
app.use("/api/image", cors(corsOptions), imageRouter);