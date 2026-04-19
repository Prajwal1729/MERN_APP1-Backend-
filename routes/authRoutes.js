import express from "express";
import loginAdmin from "../controllers/authController.js";
import createUser from "../controllers/createAccount.js";
import getleftMenu from "../controllers/leftMenuController.js";
import { sendOTP,verifyOTP} from "../controllers/loginOTPController.js";

const router = express.Router();

// include all the routes //
router.post("/login", loginAdmin);
router.post("/createaccount", createUser);
router.get('/menu', getleftMenu);
router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);
export default router;

