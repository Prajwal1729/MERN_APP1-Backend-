import express from "express";
// const mongoose = require("mongoose");
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import reminderRoutes from "./routes/reminderRoutes.js";
import verifyToken from "./middleware/authMiddleware.js";

dotenv.config();  // load the env variables
const app = express();
// console.log(app,"app");
// console.log("base url",process.env.BASE_URL);

// app.use(cors());
app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}));

app.use(express.json());

// app.use((req,res,next)=>{
//   console.log("Incoming request:", req.method, req.url);
//   next();
// });


connectDB();

app.use('/admin',authRoutes);
app.use("/reminder", verifyToken, reminderRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});