// config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI?.trim();
    if (!uri) {
      console.error("❌ No MONGO_URI found in .env");
      process.exit(1);
    }

    console.log("🔍 Connecting to MongoDB at:", uri);

    const conn = await mongoose.connect(uri, {
      dbName: "shoply",
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
