import {Router} from 'express';
const router = Router();

import userController from '../controllers/userController.js';

//For signing up:
router.post("/signup",  userController.signupUser);

//For loging in:
router.post("/login", userController.loginUser);

//For loging out:
router.post("/logout", userController.logoutUser);

//For authenticating using the cookie file:
router.get("/cookie", userController.cookie);

export default router;