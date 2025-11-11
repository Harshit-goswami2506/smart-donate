import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// ✅ Create transporter manually (more stable than using `service: "gmail"`)
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 465 for SSL
  secure: true, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL, // your Gmail address
    pass: process.env.EMAIL_PASS, // your 16-digit App Password
  },
});

// ✅ Function to send verification email
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    console.log("📧 Sending email from:", process.env.EMAIL);

    const info = await transporter.sendMail({
      from: `"Smart Donation" <${process.env.EMAIL}>`,
      to: email,
      subject: "Smart Donation - Verify your email",
      html: `
        <div style="font-family:sans-serif; line-height:1.5;">
          <h2>Smart Donation Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="color:#2b6cb0;">${verificationCode}</h1>
          <p>If you didn’t request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully:", info.response);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

export default sendVerificationEmail;
