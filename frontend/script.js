const saveButton = document.querySelector(".save");
let img = new Image(); //Global image variable;

const color = document.querySelector('.color');
const lineWidth = document.querySelector('.lineWidth');
lineWidth.value = 1; //we want 1 to be displayed by default
const clearButton = document.querySelector('.clear');

const canvas = document.querySelector(".chalkboard");
let context;

let canvasX;
let canvasY;

let mousedown = false;

//Initial setup of the canvas on load:
window.addEventListener("load", () =>{
    context = canvas.getContext("2d");

    //This is necessary for proper function of the canvas. If width and height are specified only with CSS, canvas will be stretched
    let rect = canvas.getBoundingClientRect();
    canvas.setAttribute("width", rect.width);
    canvas.setAttribute("height", rect.height);
})

//Drawing functionality:
canvas.addEventListener("mousedown", (e) => {
    mousedown = true;

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

canvas.addEventListener("mouseup", (e) => {
    mousedown = false;
    context.closePath();
})

//Changing color abd line width with user input:
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
})

//The 'save' button:
saveButton.addEventListener("click", () => {
    console.log("Save button clicked");
})