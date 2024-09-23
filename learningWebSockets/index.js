//Getting the http module
const http = require('http');
//global variable for the connection:
let connection = null;
//Getting a class from the websocket module:
const WebSocketServer = require('websocket').server;

//creating an http server:
const server = http.createServer((req, res) => {
    console.log("Received a request");
});

//Creating a new web socket server. Takes in a json with the http server:
const websocket = new WebSocketServer({
    "httpServer": server,
})

//Setting up an event listener:
websocket.on("request", (request) => {
    connection = request.accept(null, request.origin); //we accept anything so null;
    //After accepting the request, set up the event listeners:
    connection.on("onopen", () => {
        console.log("Opened!!")
    })
    connection.on("onclose", () => {
        console.log("Closed!")
    })
    connection.on("onmessage", message => {
        console.log(`Received message: ${message}`)
    })
})

//listening on the server:
server.listen(3000, () => {
    console.log("Listening on port 3000");
});