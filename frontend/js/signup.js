const signupForm = document.querySelector(".signup form");

signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try{
        const response = await fetch("http://localhost:3000/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type":"text/plain"},
            body: JSON.stringify({email, password}),
            credentials: 'include'
        })
        const json = await response.json();
        console.log("Response from serevr:", json);
    }catch(err){
        console.log("Error from server during signup:", err.message);
    }
})