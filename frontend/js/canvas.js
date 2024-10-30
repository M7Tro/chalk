const loadAI = document.querySelector(".loadAI");

const saveButton = document.querySelector(".save");
const color = document.querySelector('.color');
const lineWidth = document.querySelector('.lineWidth');
const promptField = document.querySelector('textarea');
lineWidth.value = 10; //we want 1 to be displayed by default
const clearButton = document.querySelector('.clear');
//Array for storing history of the drawings:
const canvasHistory = [];
const undoButton = document.querySelector(".undo");
const sendButton = document.querySelector   (".send");

const canvas = document.querySelector(".chalkboard");
let context;

let canvasX;
let canvasY;

let mousedown = false;

//Initial setup of the canvas on injection:
context = canvas.getContext("2d");

//This is necessary for proper function of the canvas. If width and height are specified only with CSS, canvas will be stretched

canvas.setAttribute("width", window.innerWidth);
canvas.setAttribute("height", window.innerHeight);

//Drawing functionality:
canvas.addEventListener("mousedown", (e) => {
    mousedown = true;
    
    context.lineWidth = lineWidth.value;

    canvasX = e.clientX - canvas.getBoundingClientRect().x;
    canvasY = e.clientY - canvas.getBoundingClientRect().y;
    
    context.beginPath();
    context.moveTo(canvasX, canvasY);
})

canvas.addEventListener("mousemove", (e) => {
    if(mousedown){
        canvasX = e.clientX - canvas.getBoundingClientRect().x;
        canvasY = e.clientY - canvas.getBoundingClientRect().y;

        context.lineTo(canvasX, canvasY);
        context.stroke();
    }
})



window.addEventListener("mouseup", (e) => {
    if(mousedown){
        let canvasImage = canvas.toDataURL();
        canvasHistory.push(canvasImage);
    }
    mousedown = false;
    context.closePath();
})

//Changing color and line width with user input:
color.addEventListener("change", (e) => {
    context.strokeStyle = e.target.value;
})

lineWidth.addEventListener("change", (e) => {
    context.lineWidth = e.target.value;
})

//Clear button:
clearButton.addEventListener('click', () => {
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let canvasImage = canvas.toDataURL();
    canvasHistory.push(canvasImage);
})
//The 'save' button:
saveButton.addEventListener("click", async () => {
    try{
        saveButton.disabled = true;
        let canvasImage = canvas.toDataURL();
        sessionStorage.setItem("canvasImage", canvasImage);
        //clearing the history:
        canvasHistory.splice(0, canvasHistory.length);
        canvasHistory.push(canvasImage); //saving for the undo history
        const username = sessionStorage.getItem("username");
        if(!username){
            window.location.hash = "#login";
        }
        const res = await fetch("http://localhost:3000/api/image/save", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({username, type: "image/png", data: canvasImage})
        })
        saveButton.disabled = false;
    }catch(err){
        console.log("Error:", err.message);
    }
})

//Undo button functionality:
undoButton.addEventListener("click", async(e) => {
    if(canvasHistory.length > 1){
        undoButton.disabled = true;
        const previousImage = canvasHistory[canvasHistory.length - 2];
        const canvasImage = new Image();
        canvasImage.src = previousImage;
        canvasImage.onload = () => {
            context.drawImage(canvasImage, 0, 0);
            console.log("popped:",canvasHistory.pop());
            undoButton.disabled = false;
        }
    } 
})

//Prompt textarea code: 
sendButton.addEventListener("click", async (e) => {
    try{
        const res = await fetch("http://localhost:3000/api/image/generate", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({canvasImage: canvas.toDataURL(), prompt: promptField.value})
        })
        const json = await res.json();
        console.log("Json from server on send:", json);
        sessionStorage.setItem("generatedImage", json);
    }catch(err){

    }
}) 

//Loading an image from API. I will delete later:
loadAI.addEventListener("click", () => {
    console.log("Load button pressed");
    const canvasImage = new Image();
    canvasImage.src = sessionStorage.getItem("generatedImage");
    canvasImage.onload = () => {
        context.drawImage(canvasImage, 0, 0);   
    }
})

/*
self: 'https://api.limewire.com/api/assets/c3ea7553-3d28-4ef5-a228-453ec4759272',
asset_url: 'https://ai-studio-assets.limewire.media/u/dedd26d6-845d-437a-9f2a-59ec63e0e228/image/ce842bf6-69c3-451f-9618-98a9e7e9bfe6?Expires=1730129415&Signature=Obw3I~P7l~Re4w9pDFNJVlbwAJk2U-rmbHSenaanIhbkFhH5zDGc9QLS5EBeA4QlSc-dtQ9nXBwXzEA~7cNC8NyaqtdpIs2gQ5I0gRSZPmwsC-L7nACkG0lmVRekCdWLmHzC6XfujS0cTmUsVf1kmGJd2k6sODPP90dZEFThRiY8aZuCAeQqBhHq5B30ecL18Q3vRoDyhUxHmPzX6h3jhg7~Zn2CJC0Ju9A39zeTeYOclGqvZL~ZRcOguKm2HIHMF8-JwLY0QKdGjekTrDam-ecY-yxEaCS653h6W82Iq9KZ6uzdmm89abgVY8x3ec9JzEBucsfL4jw-GDkPYgjchQ__&Key-Pair-Id=K1U52DHN9E92VT',
type: 'image/png',
width: 1024,
height: 1024
*/