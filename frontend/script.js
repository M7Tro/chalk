const canvas = document.querySelector(".chalkboard");
let context;

let canvasX;
let canvasY;

let mousedown = false;

window.addEventListener("load", () =>{
    context = canvas.getContext("2d");

    //This is necessary for proper function of the canvas. If width and height are specified only with CSS, canvas will be stretched
    let rect = canvas.getBoundingClientRect();
    canvas.setAttribute("width", rect.width);
    canvas.setAttribute("height", rect.height);
})

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