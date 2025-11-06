import sendVerificationEmail from "../middleware/email.js";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    
    const user = await User.findOneAndUpdate(
      { email },
      { verificationCode },
      { upsert: true, new: true } // upsert = update or insert
    );

    // Send the OTP
    sendVerificationEmail(user.email, verificationCode);

    res.status(201).json({
      message: "Verification code sent successfully",
      verificationCode,
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { verificationCode } = req.body;

    // Check if code was provided
    if (!verificationCode) {
      return res.status(400).json({ message: "Verification code is required" });
    }

    // Find user by code
    const user = await User.findOne({ verificationCode });

    // If no matching user
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification code" });
    }

    // Mark as verified
    user.isVerified = true;
    user.verificationCode = undefined;

    // Save changes
    await user.save();

    // Respond success
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

