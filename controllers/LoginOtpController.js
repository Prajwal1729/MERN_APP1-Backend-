import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

export const sendOTP = async (req,res) => {
    try{
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        const user = await Users.findOne({email});
        if(!user){
            return res.status(404).json({
                "message": "An user with Email ID not found."
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);
        const otpExpiry = Date.now() + 1 * 60 * 1000;

        user.otp = hashedOtp;
        user.otpExpiry = otpExpiry;
        await user.save();

        //console.log("OTP: ",otp);

        await sendEmail(
           email,
          "Your OTP - LifePilot AI",
          `Your OTP is: ${otp}. It expires in 1 minute.`
        );

        return res.status(200).json({
            message: "OTP sent successfully",
            email,
            expires_in: 60
        });

    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Internal server error."
        });
    }
}


export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp) {
      return res.status(400).json({
        message: "OTP is required"
      });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    // Check expiry first
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({
        message: "OTP expired."
      });
    }

    // Compare OTP (hashed)
    const isMatch = await bcrypt.compare(otp, user.otp);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid OTP."
      });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "OTP verified successfully!",
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};