import express from "express";

const router = express.Router();

router.post('/create',(req,res)=>{
    res.json({
       message: "Reminder Created.",
       user: req.user
    });
});

export default router;