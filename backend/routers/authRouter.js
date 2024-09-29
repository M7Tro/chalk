const {Router} = require("express");
const router = Router();

//For signing up:
router.post("/signup", (req, res) => {
    res.send("signup");
})

//For loging in:
router.post("/login", (req, res) => {
    res.send("login");
})

//For loging out:
router.post("/logout", (req, res) => {
    res.send("logout");
})

module.exports = router;