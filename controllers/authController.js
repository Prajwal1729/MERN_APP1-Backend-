import Users from "../models/Users.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginAdmin = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(200).json({
        message: "Admin not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    //console.log(isMatch,"ismatch");

    if (!isMatch) {
      return res.status(200).json({
        message: "Invalid credentials"
      });
    }

    const adminExist = await Admin.findOne({ email });

    if(!adminExist){
      await Admin.create({ email });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    // console.log(token);
    res.status(200).json({
      message: "User Logged in Successfully!.",
      token,
      admin: {
        id: user._id,
        email: user.email,
        password: isMatch
      }
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

};

export default loginAdmin;