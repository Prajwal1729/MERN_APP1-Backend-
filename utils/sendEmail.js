import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// console.log("Email transporter configured with user:", process.env.EMAIL_USER);
// console.log("Email transporter configured with pass:", process.env.EMAIL_PASS);
export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: `"LifePilot AI" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};