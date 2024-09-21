Finally, I am going to make a website without following any tutorial. I start with a high-level idea and try to implement it using knowledge that I have acquired (plus I WILL use documentation, articles and chatgpt: I don't consider that shameful).

I want to make a real-time app that lets people draw on a canvas. I will use Socket.io and React. For the rest, I am still not sure. I will have to make some research and figure out the architecture, necessary parts of the backend, etc. The web app is going to be called Chalk. Like a chalkboard where people can draw and leave it for someone else to add/erase.

Let's define the app more explicitly. There is a chalkboard that anyone can join. The drawing on the chalkboard is constantly visible. You can draw and erase on it. There is also the 'undo' button that cancels the actions you have done. Users can draw on it smultaneously. To save changes in the database, you press the save button. If the drawing is not saved, the button will show that the latest changes were not saved. You can also view the users that are conencted and see their pens/cursors drawing. 

I will use React for the frontend. This is what I know and what I want to use.

Right now, I am researching frameworks/libraries for drawing using React. Here are some options to consider: React Konva, React Art, React Canvas, vanilla Canvas, Fabric.js, React Three Fiber, SVG.js, WebGL. 

WebGL feels very cool and powerful. But I think it would be too much to try at once. 

