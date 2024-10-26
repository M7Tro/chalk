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

Notice that the .html files inside the pages folder do not need to have the body or head tags. Just pure content. 


The routing method suggested by the guy on video uses the browser's history API. Let's see what it is about.

History API provides access to the browser's session history through the history global object. You can use it to naviage back and forth through the user's history and mainpulate the contents o hte history stack. 

Basic methods for navigating across the history stack are: back(), forward(), go().

Example is go(-1). -1 is current page's relative position. 

When the active history changes while the user navigates session history, popstate event is fired. It is fired when the user visits a new page or, as in our imlpementation, when history.pushState() is used.

pushState() and replaceState() accept the following arguments: state, title[, url]

state is an object that can represent the current page. You can pass null if you want, or things like theme.

Middle element, title, is often not used by the browsers so we just pass '' instead.

Url is an optional parameter. If we don't use it, current url will be used in the history array. 

Note that you can't just pass any url you want: you can't go outside of your domain. 

Again, you make the route function globally accessible by attaching it to a property in window: window.route = route. That way, you can attach the event listener to the <a> tags just by writing onClick="route()"

I had an issue with the router not working on reload. Issue was that when youreload the page on http://localhost:5500/signup, it gives you a 404 not found error. 

I don't really understand why. It might be because I am using the localhost. I should see if the error persits in deployment. Maybe I will just implement SSR later and don't sweat about Vanilla JS SPA.

Developing without proper SPA routing does not work well because on every change the Live Server crashes and I have to restart from the main page.

After doing some research, I found that this issue is common and can be fixed by configuring the index.html as a serving file or something. And it is not posibble for the Live Server. So I guess I will not overcomplicate my learning and make a vite react app.

No. Making a vite up does not let me use Vanilla JS for the drawing on canvas. WHich is even harder to fix tha poor routing. I am goint to restart this folder and pull code from github from my last commit.

I am watching a tutorial that implements vanilla JS routing using # instead of URL routing.

For example, instead of href='/about' we write href='#about'

Unbelievable. It now does not crash on reload. Why?

First, I should note the downside of using so-called "Hash Routing": it is not good for SEO. After all, you have this weird #login, #signup urls.

The core idea of hash routing is to represent the current state of your application with the hash fragment of URl.

It allows you to update the content of the page without triggering a full page refresh.

The reason you don't receive an error on page reload is that the hash fragment is not sent to the server as part of the URL. 

The hash is used solely by the browser to manage the state of the application on the client side. 

When the page is reloaded, the client sends a request without the hash fragment. The hash fragment is NOT a part of the server-side URL: to the server, /#login and /#signup and / look the same and so it server index.html in any case.

Added cors to make sure everything works. Just insert in app.use() with authRouter.

I got some strange thign with an OPTIONS request being sent on sign up fetch. 

It is a cors mechanism by browser. I had to set content-type to text/plan, add a express.text() parser and a JSON.parse inside signup controller to stop receiving the errors. 

I set up the login page and fixed the cookies problem. I had to add credentials:'include' on fetch requests and also add credentials: true to CORS options on backend. Amazing. 

Next step is to make sure that routing is done automatically. If you are logged in and have a session cookie, you are on the canvas page. If not, you can navigate between signup and login until you authenticate yourself.

I had problems with acessing the cookies. I did not realized that you can't access them when httpOnly is set to true. 

And then I realized that I don't really need them. I will simply send a request that automatically attaches the cookies and stores credentials in the local storage. This way, only if you have relevant data in local storage will you be able to access everything. 




Okay. What do I do now? I have the signup and login funcitnality working. But I did not implement the stuff that I actually want: if the user is logged in, he immediately sees the canvas. If not, he navigates between signup and login. How do I do that? 

We can't access the cookie: they are httpOnly. 

I am going to use sessionStorage: similar to localStorage, but expires if browser or tab is closed. It even persists over page reloads. 

Essentially, on every load of the window, we send a request to the server with out cookie. If server can authenticate us, we save the response in sesion storage and let the user see the canvas page. Otherwise, user can only view login and signup pages.


I am back. This week has been quite fast for me: I spent most of my time on assignments. I also woke up early. And for the last few days I did not overeat: just two meals. I am starting to think that I might have found a way to live my life. You might ask: "What kind of life would it be?" The thing is that I don't know. And I am starting feel okay about it. I can control some stuff and make choices. And certain things will or will not happen depending on my choices. But I don't think I will ever be 100% confident in everything: in what I know, in what I want, in what I do. And that does not bother me that much anymore. Still scary, but at least I have this feeling that there is no other way to live life other than walking through uncertainty. 

I also start noticing importance of keeping doing things even if it is not perfect. You should try to have a good day even if you slept through your alarms and feel weak; you should study even if you look fat in the reflection of the screen; you should work on assignments even if you don't know how to approach them.

There is never a perfect time for starting. Only now. 





Okay. Enough philosophy. What do I do next? On pageload, the client sends a GET request to the server. The get request contains a JWT cookie if the user previously registered. If we get a successful response from server, we save the contents of the response in localStorage. I thought I would use sessionStorage, but I want data to persis on the browser for some time. But I also do not want to make it permanent, so the localstorage data will contain expiration date: the client's script will read it and erase the JWT if it is too old. 


I keep ettnig probles with javascript when changing pages. This is because elements appear and re-appear. I have tried adding and removing script tags but it doesn't work. I will now try something fundamentally different: what if we keep all the html on the page and simply change stuff to display none until its time? Display:none removes the element from the page, while keeping it in the DOM. seems like a perfect candidate.


AMAZING! It seems to work. I change change display properties on hashchange event. And the script tags are all included in the index.html. I am able to send the requests. Nice.

Actually, I think I will use sessionStorage to make the state accessible from different js files that will update the session.


For some reason the dics do not take up the dimensions I want them to have. 


I fixed the canvas. Just had to use window.innerHeight instead of the other tags I used.


But now I also need to fix the look of the login page. 


Fixed.

Now I am trying to add a log out button. But for some reason, changes that I add to canvas.html do not reflect. hmmm. 


Oh. I forget that I added all the divs into index.html. Stupid. 



At this point, a user can login/signup to use the canvas and draw on it. I guess it means that I know must implement saving of the drawing into the database. And later I would load the picture from it into the browser. 


How do I do it?

From tutorials on internet:
Draw something => convert image to URL format (base64) with canvas.toDataURL() => send data to the server with fetch


How do you store a base64 image in MongoDB? 

You will have to create a schema for storing images. While it might have common fields like name, it must also have fields "type" and "data". Type is a required string that specifies the MIME type: "image/png". A MIME type indicates the nature/format of data.

The required "data" field has type Buffer. It stores a buffer object containing the binary image data. 

I have implemented endpoints for adding and retrieving images in mongodb.

Let's try to save image base64 URL in sessionStorage and upload it on refresh of the page.



....


The difficulty I am now facing is converting the buffer data stored in mongodb into an image that I can use upload on canvas.

I think I solved a problem by sending the base64 string from backend. I use toString() method of the Image object returned by the database. 

But for some reason, the image is not saved as intended on click of the save button.  

I see. I get this error when trying to save something to the database: "PayloadTooLargeError: request entity too large"


It seems to be a backend problem. I fixed it by adding a setting to express.text(): {limit: "50mb"}

....


October 20th. What should I do next? At this point, you can log in. Get your drawing saved. Log out. 

I should enable the sign up functionality. I already have the JS script for adding new users to database. But I do not have it properly implemented on the frontend. 

A logged out user should be able to see navbar that lets you either sign up or log in. 

There IS a  navbar right now. But it is ugly. 


I have a problem. A new user that I have created with the signup page. I can't really log in properly and save a drawing. I get a server error. 

I also noticed that the image is saved/loaded not as intended: it shows [object Object] in session storage. 


Okay. I see a few problems. The save button does not actually save the drawing. I get a 400 status response. Looking at the database, I can see that new images do not get added and old images are not updated. 

...

I am not sure whcih features I should add at this point. You can signup and login. You can draw with multiple  colors and different thickness of the pen. You can save the drawing in the database. And then the drawing is retrieved on your login. What is the next step?

Let's think about the end goal. What do I want? A game. I want to create a website that someone would want to join to have fun. 

Alright. A game. What kind of game? Obviously, one that uses drawing as its core mechanics. What can I do? How can I make something fast, lightweight and fun? How can I use the stuff that I implemented (drawing and storing it in database)?

    A guessig game: a player is given a random word. The rest of the players in the lobby must guess the word by looking at what is drawn at the canvas. 

    A lightweight graphical redactor? What if I make a website that lets you copy/paste image from a clipboard. And then do all kinds of stuff with it. Remove background, retrieve colors, change color scheme, etc. That would be pretty cool. Something that I would actually use: quite often I want to do something with a screenshot I mage. But all the editors on web are quite big and complex. It would be nice to have something lightweight. I might even try to integrate AI into the editor and add some fancy features? 

Alright. Then it is decided. I will make a graphical redactor.

But before I proceed with some significant features, I just realized that I missed some basic stuff. I want to add the "undo" button. 

Another feature would be to disable the save button when the latest changes were added. 

I also should add an eraser that removes similar to the way it works in goodnotes: jsut by touching the line, eraser removes the whole continuous line. 

Let's work on these two: undo button and save button disable. 

Undo Button:

    To implement the undo button, I shall store the drawing history. I can do it with an array of base64 strings. 

    An array will be appended for every "mousup" event on the Canvas. 

    I can use a const array (array is mutable, but reference is constant) and push the drawings.

    And for every press of the save button, the history gets erased.

    ...

    For some reason, I can't see the new button I added on the frontend. 

    I forgot that I don't use those separate pages anymore. All the html is in index.hmtl

    I thought I made it work, but something strange is happening. 

    The lower half of the canvas does not work properly. I can draw on it, but the changes do not reverse from there. 
    

I added the undo button. And made sure that save button is disabled while loading. 

I am not sure I should work on the eraser. WHat is the point? What am I building? 

I don't think I should make some stupid redactor. What about AI stuff?

What if I allow people to past object into a the canvas, then draw some objects on it, then run AI that turns the image into something cool using the drawings as sources for objects and original image as a tempalte for styling/colorscheme/etc. 

That would be cool. How do I do it?

I found some cool free Image to Image generative tool on the internet: LimeWire's API.

For free, I can get 10 images for free. 

To make a request to the API, I need to include an API key to the "Authorization" header of the request. 

Note that there is a certain format that I must adhere to: Authorization: Bearer <API KEY>

The API uses conventional HTTP response codes to indicate success or failure of a request:
    2xx - success
    4xx - error given the information provided 
    5xx - error with LimeWire's servers 

There are various API endpoints available to make various operations.

The reason I like this API, other than it having a free plan, is that I can send an existing image as a basis. 


Some image endpoints available:

    Generate Image 

        Prompt (required)

        Negative prompt - describe what should not be included in the image 
        
        image (binary string) - the image that should be used as inspiration for generation 

        Aspect ratio ( required ) - 1:1 by default 

        style - specify one of the predefined styles for generating the image (Photorealistic, Scifi, Landscape)

    Inpaint Image 

        You can use this endpoint to modify certain parts of an image based on a text prompt.

        You can provide a mask for a certain color that will be applied on the input image. The matching color will be replaced/manipulated.

    Upload Assset

        you can upload an asset for further processing by API. it will be accessible 24 hours after the upload. 

How should I implement everything? 

The API key should not be exposed to users. I shall store it on backend as an environment variablei inside .env.

I will send a request with an image to the server, and the server will send the request with an API key to the LimeWire API to do the 
necessary operations.

Now, the question arises. What are the operations? How would it work? 

On a high level, I want to add a text field on the frontend where users can input a prompt.

There will be a button that lets you send the image. 

And then you get the generated result back. 


Alright. It is Saturday, October 26th. 

What should I do? 

I want to make an app that lets you paste an image, draw some stuff, attach a prompt and get back some AI-generated content.

What and how should I do it? 

I have the drawing functionality. 

But I did not yet figure out the API. Well then let's think about that. 

Trying to understand documentation for the API is a bit intimidating.

The website has a lot of tabs/sections.

Not sure what to do and where to go. 

But perhaps I shall not try to understand everything. 

I should get a quick overview of how the website is set up and decide which sections I am interested in. Just like in today's C++ exam.

I am still not sure which of the AI services I want to use for my application.

Potential candidates are:

    Image inpainting - replacing objects on the image 

    Image to Image generation - generate image by passing prompts and an image

I think I should go for the second option. 

How should I work with the API? What are some good practices? ChatGPT says:

    Do not expose the API key on the client-side.

    Use the backend of your full stack application as a proxy. You send a request from frontend to the backend, while backend uses the necessary data (like API key) to send the request to the 3rd party API. 

    Ensure that communication is done with HTTPS connection.

    Use environment variables.

By the way, there is a difference between a VPN and a Proxy. VPN secures your data by encripting it. 