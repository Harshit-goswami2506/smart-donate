import nodemailer from "nodemailer";
import dotenv from 'dotenv'
dotenv.config()

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Gmail address
    pass: process.env.EMAIL_PASS, // App Password (NOT normal password)
  },
});


const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: `"Smart Donation" <${process.env.EMAIL}>`,
      to: email,
      subject: "Smart Donation - Verify your email",
      text: `Your verification code is: ${verificationCode}`,
      html: `<h3>Your verification code is:</h3><h2>${verificationCode}</h2>`,
    });
    console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};


export default sendVerificationEmail;
