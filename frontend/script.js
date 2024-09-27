//Once the window is loaded, we set up the context for canvas:
let context;
let canvasWidth;
let canvasHeight;

let mouseIsDown = false;
let canvasX;
let canvasY;

const canvas = document.querySelector(".chalkboard");

window.addEventListener("load", () => {
    if(canvas.getContext){
        context = canvas.getContext("2d");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    }
})

canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();

    mouseIsDown = true;
    canvasX = e.clientX - canvas.getBoundingClientRect().left;
    canvasY = e.clientY - canvas.getBoundingClientRect().top;

    context.beginPath();
    context.moveTo(canvasX, canvasY);
})
canvas.addEventListener("mousemove", (e) => {
    e.preventDefault();

    if(mouseIsDown){
        canvasX = e.clientX - canvas.getBoundingClientRect().left;
        canvasY = e.clientY - canvas.getBoundingClientRect().top;
        
        context.lineTo(canvasX, canvasY);
        context.stroke();    
    }   

})
canvas.addEventListener("mouseup", (e) => {
    e.preventDefault();

    mouseIsDown = false;
})