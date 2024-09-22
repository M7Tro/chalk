const canvas = document.querySelector("#drawing-board");
const toolbar = document.querySelector("#toolbar");

//Getting the drawing context of the canvas. It takes in the type of rendering context you want to get as an argument.
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

//We want the canvas to take all the remaining width and height
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

//Some global variables:
let isPainting = false;
let lineWidth = 5; 

let startX;
let startY;

//Function defined for the mousemove event:
function draw (e) {
    if(!isPainting){
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    //Drawing the line:
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    //colorizing the line:
    ctx.stroke();
}

toolbar.addEventListener('click', e => {
    if(e.target.id == 'clear'){ //it listens for the click of the 'clear' button.
        ctx.clearRect(0, 0, canvas.width, canvas.height); //Set the whole canvas to a white rectangle 
    }
})

toolbar.addEventListener('change', e => { 
    if(e.target.id == 'stroke'){ //it listens for the change of the stroke/color input field.
        ctx.strokeStyle = e.target.value;
    }
    if(e.target.id == 'lineWidth') {
        lineWidth = e.target.value;
    }
}) 

canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
    startX = e.clientX; 
    startY = e.clientY;
})

canvas.addEventListener("mouseup", e => {
    isPainting = false;
    ctx.stroke(); //this method colors the line
    ctx.beginPath(); //needed to close the path we were drawing. The next path we will draw will be a new one. 

})

canvas.addEventListener('mousemove', draw);

