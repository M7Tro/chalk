const saveButton = document.querySelector(".save");
const color = document.querySelector('.color');
const lineWidth = document.querySelector('.lineWidth');
lineWidth.value = 10; //we want 1 to be displayed by default
const clearButton = document.querySelector('.clear');

const canvas = document.querySelector(".chalkboard");
let context;

let canvasX;
let canvasY;

let mousedown = false;

//Initial setup of the canvas on injection:
context = canvas.getContext("2d");

//This is necessary for proper function of the canvas. If width and height are specified only with CSS, canvas will be stretched

canvas.setAttribute("width", window.innerWidth / 4 * 3);
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
})

//The 'save' button:
saveButton.addEventListener("click", async () => {
    try{
        let canvasImage = canvas.toDataURL();
        sessionStorage.setItem("canvasImage", canvasImage);
        const res = await fetch("http://localhost:3000/api/image/save", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({username: "salam", type: "image/png", data: canvasImage})
        })
        if(res.ok){
            const json = await res.json();
            console.log("Json data:", json);
        }

    }catch(err){
        console.log("Error:", err.message);
    }
})