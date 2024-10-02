const loginForm = document.querySelector(".login form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    try{
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: {"Content-Type":"text/plain"},
            body: JSON.stringify({email, password})
        })
        const json = await response.json();
        console.log("Responce from server:", json);
    }catch(err){
        console.log("Error from server during login:", err.message);
    }
})