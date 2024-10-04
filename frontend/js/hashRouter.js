const canvasHtml = document.querySelector("#canvas");
const signupHtml = document.querySelector("#signup");
const loginHtml = document.querySelector("#login");

//By default, we will show the login page:
window.location.hash = "#login";
canvasHtml.style.display = 'none';
signupHtml.style.display = 'none';

window.addEventListener("hashchange", (e) => {
    const hash = window.location.hash.replace("#","");
    if(hash == 'login'){
        canvasHtml.style.display = 'none';
        signupHtml.style.display = 'none';
        loginHtml.style.display = 'block';
    }else if(hash == 'signup'){
        canvasHtml.style.display = 'none';
        loginHtml.style.display = 'none';
        signupHtml.style.display = 'block';
    }else {
        canvasHtml.style.display = 'block';
        signupHtml.style.display = 'none';
        loginHtml.style.display = 'none';
    }
})