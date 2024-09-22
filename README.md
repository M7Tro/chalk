Finally, I am going to make a website without following any tutorial. I start with a high-level idea and try to implement it using knowledge that I have acquired (plus I WILL use documentation, articles and chatgpt: I don't consider that shameful).

I want to make a real-time app that lets people draw on a canvas. I will use Socket.io and React. For the rest, I am still not sure. I will have to make some research and figure out the architecture, necessary parts of the backend, etc. The web app is going to be called Chalk. Like a chalkboard where people can draw and leave it for someone else to add/erase.

Let's define the app more explicitly. There is a chalkboard that anyone can join. The drawing on the chalkboard is constantly visible. You can draw and erase on it. There is also the 'undo' button that cancels the actions you have done. Users can draw on it smultaneously. To save changes in the database, you press the save button. If the drawing is not saved, the button will show that the latest changes were not saved. You can also view the users that are conencted and see their pens/cursors drawing. 

I will use React for the frontend. This is what I know and what I want to use.

Right now, I am researching frameworks/libraries for drawing using React. Here are some options to consider: React Konva, React Art, React Canvas, vanilla Canvas, Fabric.js, React Three Fiber, SVG.js, WebGL. 

WebGL feels very cool and powerful. But I think it would be too much to try at once. 

To be honest, I am not sure that I should try to make this website. I am not sure that I am good enough. Perhaps I should rebeuild the chatApp website first to enhance my udnerstanding of React, Express, mongoDB and websockets. Or maybe I am just too cowardly? 

I read some reddit. People say that starting projects you don't know how to do is a good practice that increases the speed of learning. That is why I will at least try making this website. 

I might also use threeJS. Reddit guys say it might work for 2D animations quite well too. 

I stumbled upon a "canvas and HMTL 5" tutorial on youtube. I am going to check it. I created a folder learningCanvas for it.

My next step would be to learn Web Sockets. I want to make this simple onlien editor accessible to other people.

I have created a folder "learningWebSockets" to understand the basics. 

WebSockets is a bidirectional communication protocol. WebSockets is useful for real-time applications like chats, multiplayer games, etc.

First, some cool theory.

HTTP:

HTTP 1.0 was one of the first technologies for internet. Built on top of TCP. First version of HTTP was a request-response system. The client always sends a request and the server responds. The client must be the initiator. This is still used. But if you need to exchange a lot of data with the server, opening and closing a TCP connection for every request was slow and inefficient.

HTTP 1.1 is what web sockets protocol is built on. With the new protocol, once we establish a TCP connection, we leave it open. This is still used too. But it still does not cover use-cases when you need some real-time connection with the server. In such a connection, the server can send data without the client requesting it. 

WebSockets uses HTTP 1.1 as a vehicle to send data between server and client. The client and server are aware of each other. This is a "stateful" connection: the server maintains the client's session. HTTP in itself is 'awareless': it does not maintain awareness of connection between server and client. We establish the connection with a "websocket handshake". It is still an HTTP request. After that, anyone can send data to anyone. Both have access to the underlying TCP connection. 

The handshake needs more explanation. The first request we make for starting web sockets is a GET HTTP request. If its all good, the server responds with a status code 101 for switching protocols. It is crucial to use HTTP 1.1. 

Usecases of web sockets are: chatting, live feed, multiplayer gaming, showing client progress/logging. 

WebSocket is available on many browsers by default. To get a good understanding of web sockets, we will set up a socket-only server. And the client will be us sending stuff through the browser's console. 

