import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const createUser = async (req,res)=>{
    try{
        const { email, password } = req.body;
        const existingUser = await Users.findOne({email});

        if(existingUser){
            return res.status(200).json({
                message: "User Already exist.",
                existing_user: existingUser.email
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new Users({
            email,
            password: hashedPassword
        });
        //console.log(newUser,"userdata")
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d"}
        );

        res.status(200).json({
           message: "User Created Sucessfully",
           token,
           user:{
             id: newUser._id,
             email: newUser.email
           }
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            "message": "Internal Server Error"
        });

    }
};


export default createUser;
