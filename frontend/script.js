//Once the window is loaded, we set up the context for canvas:
let context;
let canvasWidth;
let canvasHeight;
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
    const canvasX = e.clientX - canvas.getBoundingClientRect().x;
    const canvasY = e.clientY - canvas.getBoundingClientRect().y;

})
canvas.addEventListener("mousemove", (e) => {
    e.preventDefault();
    const canvasX = e.clientX - canvas.getBoundingClientRect().x;
    const canvasY = e.clientY - canvas.getBoundingClientRect().y;
})
canvas.addEventListener("mouseup", (e) => {
    e.preventDefault();
    const canvasX = e.clientX - canvas.getBoundingClientRect().x;
    const canvasY = e.clientY - canvas.getBoundingClientRect().y;
})