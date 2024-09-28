const canvas = document.querySelector(".chalkboard");
let context;

let canvasX;
let canvasY;

window.addEventListener("load", () =>{
    context = canvas.getContext("2d");

    let rect = canvas.getBoundingClientRect();
    canvas.setAttribute("width", rect.width);
    canvas.setAttribute("height", rect.height);

    if(context){
        context.beginPath();
        context.moveTo(50, 50);
        context.lineTo(100, 100);
        context.stroke();
    }
})

canvas.addEventListener('click', (e) =>{
    e.preventDefault();
    canvasX = e.clientX - canvas.getBoundingClientRect().x;
    canvasY = e.clientY - canvas.getBoundingClientRect().y;
    console.log(canvasX, canvasY);
})