import { transporter } from "./email.config.js";
import { Verification_Email_Template } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Smart Donation" <noreply7456@gmail.com>',
      to: email,
      subject: "Email Verification",
      text: `Your verification code is: ${verificationCode}`,
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
    });
    console.log("email send successfully");
  } catch (error) {
    console.error("Error sending in email.js email:", error);
  }
};
export default sendVerificationEmail;