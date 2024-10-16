const canvasHtml = document.querySelector("#canvas");
const signupHtml = document.querySelector("#signup");
const loginHtml = document.querySelector("#login");
sessionStorage.setItem("username", null);

//By default, we will show the login page:
window.location.hash = "none";
canvasHtml.style.display = 'none';
signupHtml.style.display = 'none';

function setDisplay(hash){
    if(hash == '#login'){
        canvasHtml.style.display = 'none';
        signupHtml.style.display = 'none';
        loginHtml.style.display = 'block';
    }else if(hash == '#signup'){
        canvasHtml.style.display = 'none';
        loginHtml.style.display = 'none';
        signupHtml.style.display = 'block';
    }else if (hash == '#canvas' && sessionStorage.getItem("username")) {
        canvasHtml.style.display = 'block';
        signupHtml.style.display = 'none';
        loginHtml.style.display = 'none';
        if(sessionStorage.getItem("canvasImage")){//This is where we load image if it is available in session storage:
            const canvasImage = new Image();
            canvasImage.src = sessionStorage.getItem("canvasImage");
            canvasImage.onload = () => {
                context.drawImage(canvasImage, 0, 0);
            }
        }
    }
}

window.addEventListener("hashchange", (e) => {
    const hash = window.location.hash;
    setDisplay(hash);
})

window.onload = async (event) => {
    try{
        const res = await fetch("http://localhost:3000/api/auth/cookie", {
            credentials: 'include'
        });
        const json = await res.json();
        if(json.message == "authentication is required"){
            throw new Error("JWT validation did not work");
        }else{
            sessionStorage.setItem("username", json.username);
            await fetchImage();
            window.location.hash = "#canvas";            
        }
    }catch(err){
        sessionStorage.setItem("username", null);
        window.location.hash = "#login";
    }
}

const fetchImage = async () => {
    const username = sessionStorage.getItem("username");
    if(username){
        const loadImageResponse = await fetch(`http://localhost:3000/api/image/load/${username}`, {
            credentials: 'include',
        })
        const loadImage= await loadImageResponse.json();
        console.log("loadImage:", loadImage);
    }

}