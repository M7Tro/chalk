//Once the window is loaded, we set up the context for canvas:
window.addEventListener("load", () => {
    const canvas = document.querySelector(".chalkboard");
    if(canvas.getContext){
        const context = canvas.getContext("2d");
    }
})
