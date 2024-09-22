//Getting the http module
const http = require('http');
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
websocket.on("request", request => {
    //Accepting an incoming reuqest:
    request.accept();
})

//listening on the server:
server.listen(3000, () => {
    console.log("Listening on port 3000");
});