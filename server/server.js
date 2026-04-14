import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// import productByIdRoutes from "./routes/productRoutes.js";
// import Stripe from "stripe";
import cors from "cors";


connectDB();
// console.log("jwt", process.env.STRIPE_SECRET_KEY);


const app = express();
app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}))
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("api running...");
});

app.listen(5000, ()=> {
    console.log("server is running on port 5000");
    
});