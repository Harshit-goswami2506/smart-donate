import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// ✅ Configure transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Gmail address
    pass: process.env.EMAIL_PASS, // App Password (NOT normal password)
  },
});

// ✅ Send verification email
const sendVerificationEmail = async (email, verificationCode) => {
  try {
    // Debug log (to verify env variables load correctly)
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
    console.error("❌ Error sending email:", error.message);
  }
};

export default sendVerificationEmail;
