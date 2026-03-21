import express from "express";
import loginAdmin from "../controllers/authController.js";
import createUser from "../controllers/createAccount.js";
import getleftMenu from "../controllers/leftMenuController.js";

const router = express.Router();

// inclue all the routes //
router.post("/login",loginAdmin);
router.post("/createaccount",createUser);
router.get('/menu',getleftMenu);
export default router;

