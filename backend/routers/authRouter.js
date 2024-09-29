const {Router} = require("express");
const router = Router();

const userController = require('../controllers/userController.js');

//For signing up:
router.post("/signup",  userController.signupUser);

//For loging in:
router.post("/login", userController.loginUser);

//For loging out:
router.post("/logout", userController.logoutUser);

module.exports = router;