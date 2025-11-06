import express from 'express';
import { register, verifyEmail } from '../controllers/auth.js';
import { Donation, donationVerify } from '../controllers/payment.controller.js';
import { geminiController } from '../controllers/gemini.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', register);
authRouter.post('/verify', verifyEmail);
authRouter.route('/donation').post(Donation.create);
authRouter.route('/donationVerify').post(donationVerify);
authRouter.post('/gemini',geminiController)

export default authRouter;
