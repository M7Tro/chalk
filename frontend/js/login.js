const loginForm = document.querySelector(".login form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    try{
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type":"text/plain"},
            body: JSON.stringify({username, password}),
            credentials: "include"
        })
        const json = await response.json();
        if(response.ok){
            e.target.username.value = "";
            e.target.password.value = "";
            sessionStorage.setItem("username", json.username);
            window.location.hash = "#canvas";
        }
    }catch(err){
        console.log("Error from server during login:", err.message);
    }
})