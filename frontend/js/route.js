const links = document.querySelectorAll("nav a");

//Object that maps href's to html file paths:
const routes = {
    "/": "../pages/canvas.html",
    "/signup": "../pages/signup.html",
    "/login": "../pages/login.html",
    404: "../pages/404.html"
}

//Function that changes html content using window's url:
const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then(data => data.text());
    document.querySelector("#mainPage").innerHTML = html;
}

//Function to change the url of the browser on click:
const route = (event) => {
    event.preventDefault();
    window.history.pushState({}, '', event.target.href);
    handleLocation();
    console.log("Route works")
}

window.onpopstate = handleLocation();
links.forEach(link => {
    link.addEventListener('click', (event) => {
        route(event);
    });
})