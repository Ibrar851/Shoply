import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  try {
    const exists = await User.findOne({ email: "admin@shoply.com" });
    if (exists) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    const admin = await User.create({
      name: "Admin",
      email: "admin@shoply.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created:", admin.email);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();
