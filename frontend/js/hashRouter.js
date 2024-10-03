let authenticated;

window.onload = () => {
    authenticated = sessionStorage.getItem("authenticated");
    if(!authenticated){
        window.location.hash = "#login";
    }else{
        window.location.hash = "";
    }
}

const links = document.querySelectorAll("nav a");

const urlPageTitle = "Chalkboard";

const routes = {
    404: {
        template: "/pages/404.html",
        title: "404 | " + urlPageTitle,
        description: "Page not found"
    },
    "/":{
        template: "/pages/canvas.html",
        title: urlPageTitle,
        description: "Draw",
        script: "../js/canvas.js"
    },
    signup:{
        template: "/pages/signup.html",
        description: "Sign Up",
        title: "Signup | " + urlPageTitle,
        script: "../js/signup.js"
    },
    login:{
        template: "/pages/login.html",
        description: "Log In",
        title: "Login | " + urlPageTitle,
        script: "../js/login.js"
    }
} 

const locationHandler = async () => {
    const location = window.location.hash.replace("#", "");
    let route;
    if(window.location.hash.length == 0){
        route = routes["/"];
    }else{
        route = routes[location] || routes[404];
    }
    const html = await fetch(route.template).then(data => data.text());
    document.querySelector("#mainPage").innerHTML = html;
    if(route.script){
        const scripts = document.body.getElementsByTagName("script");
        for(let i = 0; i < scripts.length; i++){
            if(scripts[i].src != );
        }
        const script = document.createElement('script');
        script.src = route.script;
        script.defer = true;
        document.body.appendChild(script);
    }
    document.title = route.title;
    document  
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
}  

window.addEventListener("hashchange", locationHandler); 
locationHandler(); //execute on pageload
