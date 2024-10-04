const loginForm = document.querySelector(".login form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log(email, password);
    try{
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type":"text/plain"},
            body: JSON.stringify({username, password}),
            credentials: "include"
        })
        const json = await response.json();
    }catch(err){
        console.log("Error from server during login:", err.message);
    }
})