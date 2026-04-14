import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
console.log(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "usd",
    });
    // console.log(paymentIntent);
    
    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log("erroe",error.message);
    
    res.status(500).json({ message: error.message });
  }
};

export default createPaymentIntent;
