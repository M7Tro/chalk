const LogoutButton = document.querySelector(".logout");

//Remove the username from sessionStorage:
//Send a request to server that will delete the JWT cookie from our browser:
LogoutButton.addEventListener("click", async () => {
    const res = await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include"
    })
    if(res.ok){
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('canvasImage');
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);    
        window.location.hash = "#login";
    }
    return res.json();
})