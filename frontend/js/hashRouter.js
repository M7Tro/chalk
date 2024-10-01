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
        description: "Draw"
    },
    signup:{
        template: "/pages/signup.html",
        description: "Sign Up",
        title: "Signup | " + urlPageTitle
    },
    login:{
        template: "/pages/login.html",
        description: "Log In",
        title: "Login | " + urlPageTitle
    }
} 

const urlRoute = (event) => {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
}

links.forEach(link => {
    link.addEventListener("click", ()=>{console.log("Clicked")});
})

const locationHandler = async () => {
    let location = window.location.hash.replace("#", "");
    if(location.length == 0){
        location = '/';
    }

    const route = routes[location] || routes[404];
    const html = await fetch(route.template).then(data => data.text());
    document.querySelector("#mainPage").innerHTML = html;
    document.title = route.title;
    document  
        .querySelector('meta[name="description"]')
        .setAttribute("content", route.description);
}  

window.addEventListener("hashchange", locationHandler); 
locationHandler(); //execute on pageload

