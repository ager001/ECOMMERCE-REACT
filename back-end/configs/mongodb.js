import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/Ecommerce`);

    console.log("✅ DB Connected — Tuko ndani bro");

    mongoose.connection.on('disconnected', () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on('error', (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("❌ Initial MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;