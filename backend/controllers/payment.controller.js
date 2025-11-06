import crypto from "crypto";
import { instance } from "../index.js"; // assuming Razorpay instance is created in index.js


export const Donation = {
  create: async (req, res) => {
    try {
      const options = {
        amount: Number(req.body.amount * 100), // amount in paise
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      res.status(201).json({ success: true, order });
    } catch (error) {
      console.error("Error creating donation:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create donation.",
      });
    }
  },
};


export const donationVerify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      return res.status(200).json({
        success: true,
        message: "Donation verified successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature, donation verification failed.",
      });
    }
  } catch (error) {
    console.error("Error verifying donation:", error);
    res.status(500).json({
      success: false,
      message: "Failed to verify donation.",
    });
  }
};
