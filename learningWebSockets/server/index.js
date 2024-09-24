/* const express = require('express');
const app = express();
const http = require('http');
const {Server} = require("socket.io"); //grabbing  the Server class from socket.io
const cors = require('cors');
app.use(cors()); //middleware necessary to accept the cors settings


const server = http.createServer(app); //Creating an http server with an express app 
const io = new Server(server, { //This is what we use to implement the socket.io functionality
    cors: {
        origin: "http://localhost:3000", //where the frontend runs
        methods: ["POST", "GET"]
    }
}) 

server.listen(3001, ()=>{ //listening on a port other than the one used by the React app
    console.log("Server is running");
}) */


const express = require('express');
const cors = require('cors');
const http = require("http");
const {Server} = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

//Listening for the connection event from client:
io.on("connection", (socket) => {
    console.log("Someone connected:", socket.id);

    //listening for the custom event from the client:
    socket.on("sendMessage", ({message}) => {
        console.log("Received a message:", message);
    })
})

server.listen(3001, () => {
    console.log("Server listening on port", 3001);
})