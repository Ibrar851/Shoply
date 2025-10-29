import dotenv from "dotenv";
dotenv.config(); // must come first

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import connectDB from "./config/db.js";

// 🧩 Models
import User from "./models/userModel.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

// 🧭 Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// ✅ Connect to DB
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// 🧹 DEV-ONLY AUTO CLEAR FUNCTION
const clearCollectionsOnStart = async () => {
  try {
    if (process.env.RESET_DB_ON_START === "true") {
      const userResult = await User.deleteMany({});
      const productResult = await Product.deleteMany({});
      const orderResult = await Order.deleteMany({});

      console.log(
        `🧹 Database cleared (dev mode): 
         ${userResult.deletedCount} users, 
         ${productResult.deletedCount} products, 
         ${orderResult.deletedCount} orders.`
      );
    }
  } catch (err) {
    console.error("❌ Error clearing collections:", err.message);
  }
};

// ✅ Wait for DB connection before clearing
mongoose.connection.once("open", async () => {
  console.log("✅ MongoDB connected successfully");
  await clearCollectionsOnStart();
});

// 🧭 Routes
console.log("🧭 Mounting routes...");
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => res.send("Shoply API running 🚀"));

// 🧪 Test route (for debugging)
app.post("/api/auth/test", (req, res) => {
  res.json({ message: "Auth route working fine ✅" });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
