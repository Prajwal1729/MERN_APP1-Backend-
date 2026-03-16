import express from "express";
import loginAdmin from "../controllers/authController.js";
import createUser from "../controllers/createAccount.js";

const router = express.Router();

router.post("/login",loginAdmin);
router.post("/createaccount",createUser);
export default router;

