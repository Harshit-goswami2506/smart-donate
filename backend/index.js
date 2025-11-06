import express from 'express';
import dotenv from 'dotenv';
import connectDB from './libs/db.js';
import authRouter from './routes/isAuth.js';
import cors from 'cors';
import razorpay from 'razorpay';

export const instance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors(
  {
    origin: 'http://localhost:5173', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }
));
app.use(express.json());
app.use("/auth",authRouter)
app.get('/auth/getkey', (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});