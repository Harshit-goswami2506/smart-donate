import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "noreply7456@gmail.com",
    pass: "ogvz tngo xyoe xhyu", // ⚠️ Use an App Password, not your real Gmail password
  },
});


const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const info = await transporter.sendMail({
      from: '"Smart Donation" <noreply7456@gmail.com>',
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
