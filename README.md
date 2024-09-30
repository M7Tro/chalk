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

To test the application  written for NodeJS, go to the browser console. WebSockets are available on many browsers. So you can write javascript code that uses the WebSocket funcitonality. 

You need to establish a websocket connection with a client: let ws = new WebSocket("ws://localhost:3000")

You also should set up event listeners on the client: ws.onmessage = message => console.log(`Received a message from server: ${message}`)

After that, you can send messages from the server using the debug console in VS code. To get access to it, launch the code using Run > Start Debugging

You then send a message with connection.send()

I got stuck. The connection does not work. The guy in video uses a debugger. So now I am learning how to debug in VS code. 

Debuggers are mostly available in IDE's. 

A debugger is a tool to help you figure out what is going on in your programm.

Intuitively, people have been debugging without a debugging tool just using printing statements. Those printing statements would print values of variables and you would be able to understand the program flow/logic/etc this way. 

To avoid the mess of console.logs, you can use a debugger. In VS code, it shows you stuff like local and global variables in the variables section. 

A breakpoint is a moment/position in your code at which the debugger will 'freeze' and show you the variables/states ad that instant. 

The upper menu bar with different buttons lets you navigate the debugger through your code. 

There are step over, step into, step out. The step over moves the debugger to the next one. 

To access the VS code debugger, navigate to the PlayBug icon on the left vertical panel. You can view your breakpoints. 

Then you press "Run and Debug" and then you select the stuff you want to debug. 

Sections other than Variables are Watch and Callstack. 

Watch allows you to create custom values based on variables accessible to the debugger from the program. For example, you can view element of an array that is not explicitly shown by the debugger by default.

To run the debugger, there must be at least one breakpoint. That is because the debugger does not stop running the program until it sees a breakpoint. 

Step over moves you to the next lie of code. Step into goes deeper into the functions/methods/stuff on the current line. Step out does the opposite by returning you to the function that called the function you are looking at.

I don't know how he does it. I can't send any notifications with the debug console. I think I am going to try another tutorial. I am losing my mind.

I found a thirty minute tutorial for socket io. It has both a backend and a frontend package for bidirectional communication.

The essence of socket.io is in listening to or emitting events. You can send data with an event. 

To emit and listen to events on the client, you need to install socket.io-client npm package. 

You can define event listeners for a particular/custom event within the 'connection' event listener: that way every socket is set up. 

For some reasons, changes that I add to the website do not immediately reflect. Even if it looks like it refreshed, it doesn't work the way it should. 

I have deleted the whole client folder. I will use vite instead.

I had to change the address of the cors origin to localhost:5173. 

I am not able to send the message to the server from client. 

For some reason, I got the same problems. Nothing happened when I tried to receive the messageREceived event. 

The updates of the code are not immediately reflected. What the f?

Whatver. I more or less understand how socket.io works now.

WHen it comes to emitting events from client, we can only do it to the backend. So if we want to send something to other user, we will have to rely on the server as a layer. 

You can use socket.join(data) to join a certain room with id of {data}. That way you can isolate communication/exchange between certain users. You can make the backend listen for some custom event triggered by a click of button and then join the socket into the room. 

To later send the message to someone in the room, the frontend emits the event with a room data that contains the id/address of the room. And the server, instead of using broadcast, uses socket.to(data.room).emit(...)

I started doing the frontend. Lets see how it goes.

I was fruitlessly trying to center tha canvas tag with margins until chatGPT told me that it won't work on inline-block element unless I change it to block.

But then I couldn't center it vertically. 

So I just used absolute positioning with transform: traslateY("-50%") for vertical alignment

You draw in canvas using reactangles and paths (collections of dots).

I use getBoundingClientRect() to calculate the cursor position on the canvas. 

I deleted the whole script.js code. I tried to rewrite everything. I noticed that while I get correct coordinates,  they are not displayed correctly on canvas. There is a varying offset.

After reading some stackOverflow, I found that people have a problem of the canvas tag being stretched when its width and height are specified with css properties instead of tag attrbiutes width and height. 

In order to set the width and height of the canvas element dynamically, I retrieve the width and height with getBoundingClientRect() and set the width and height with canvas.setAttribute("width", ...);

Amazing! I fixed it! I am a genius!

And now it works. I added event listeners. You can draw!

Next step is to enable change of coler and linewidth by the user. First, I will set up event listeners for input fields.

Next thing would be to add a "clear" button. 

I guess the next thing is to build a backend that will be able to store the drawing on the canvas in the database. How do I do that?

Canvas lets you work with images. You can create an HTMLImageElement with the Image() constructor: const img = new Image(); img.src = ...;

You should add a 'load' event listener to the img object (or use .onload = () => {...}) When the image is loaded and available, you use context.drawImage(img, 0,0, width, height); Width and height let you scale the image onto canvas. 

I was able to insert and draw on an image on the canvas tag. Nice. Next step is to save the drawing on the canvas as an image. 

First, I will implement a 'save' button. toDataURL() saves in png by default. If you output the saved dataURL into console, you will see a bunch of base64 code. 


I think that the next step would actually be to set up the backend. 

We will authenticate the user. And when a user comes in, a session with JWT token is created. The login and password are stored in the database (password hashed). And for each user, there will be a drawing stored.

Alright. Now is the late evening of a Sunday. I haven't made any commits yet. Must fix that.

Next step for my app is to buld a backend that lets a user to log in. I think that the very first/basic version of the website that I must implement lets a user log in and see the drawing he/she saved.

I will set the backend up similarly to what I have done in the tutorials before. The npm packages insdide node_modules and package.json will be installed in the root directory and the server.js will be launched from the root directory. 

Signup functinoality is ready. The email and a hashed password are saved. 

Next, I will set up login functionality. For this, I will add a static login method to the userSchema that uses provided credentials to verify a user. 

Inside the static method of the userSchema, you can refer to the model and access methods like find() using the keyword "this".

I have implemented the login functionality on a basic level. Now I want to create JWT sessions.

I will start with creating a JWT on login. Then I will createa a JWT on sign up. 

How did it work? If your login/signup request is successful, a json web token is created and stored in the cookie labeled "jwt" on your browser. In the future, all the requests you make to the server will include the cookie with them and you will be able to log in the user immediately with some middleware. 

I installed jsonwebtoken and cookie-parser to make it all work. 

I read some documentation on cookie-parser. The way it works is we use the middleware cookieParser() inside app.use(). It parses the data contained in the "Cookie" header of the incoming request and makes it accessible through req.cookies. 

But that is for reading/accessing cookies from the incoming request. To set a cookie, just use res.cookie(name, value, [, options]) from express. I will use httpOnly and maxAge to create the cookie. 

I added cookie creation on signup.

Next step is to add middleware that checks the jwt cookie file and does not let you pass unless you have a valid token. Note that the middleware should be added after the authRouter: user does not need to have a valid token to login or signup. But the middleware should be before the router for stuff like drawing/saving/etc. Those pages are only accessible to those with tokens. 

I made a silly mistake by passing my custom middleware with () into app.use. I thought it was correct because that is how I did it with cookieParser(). But I guess I did not consider that it also returns a function. 

On successfuly JWT validation, I will attach the decoded userId to the res.locals.userId.

After adding the JWT-verifying middleware, next step is to implement the logout endpoint. 

The idea is simply that we delete the JWT cookie from the browser's storage.

What is next? 

I think it is time to connect the frontend and the backend together. For now it simply means launching both server and frontend as separate procesess and start making request from the client. 

Problem is that the closest things I think of implementing are login/signup pages. And I haven't done routing with vanilla js before. Need some time to see how it is done. 

There is a 4 minute tutorial that explains everything. Create a root div. Add a <nav> tag with <a> tags for links inside. And also add a main-page div. 

Create a file router.js. Create a function route() that handles location changes. It will listen for event. const route = (event) => {...}. Prevent the event's default behavior: when user presses the <a> tag to chagne page, we don't want automatic refresh. Then use the browser's history API: window.history.pushState({}, "", event.target.href). This will update the URL on the browser. After that, give global access to the route function: window.route = route

You add the script into the html file with <script> and src. And then you attach the route() function to the click event for the <a> tags: onClick="route()"

After that, clicking on links must update URL's. To actually change the location, create another function in route.js called handleLocation(). Get the path from the current location: const path = window.location.pathname. 

Define some routes for the paths with an object that has paths for keys and HTML files for values. routes = {"/":"/pages/index.html", "/about": "/pages/about.html", "/lorem": "/pages/lorem.html", 404: "/pages/404.html"}. For undefined paths, we have 404. 

Inside handleLocations, we get the file path: const route = routes[path] || routes[404]

Next you need to load in the html: const html = fetch(route).then((data) => data.text()); Fetch response is tranformed to text.

After that, you can assign the html text to the innerhtml of the main-page div: document.getElementById("main-page").innerHTML = html;

Last step is to implement browser routing functionality and first page load.  We simply need to attach handleLocation to popstate event of the window: window.onpopstate = handleLocation. This will handle cases when user presses forward and back buttons. 

Then make a call to handleLocation() at the end of route.js so that it executes on pageload. You also need to call it on every call to the route() function. 

