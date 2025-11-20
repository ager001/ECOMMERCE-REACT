// Import the mongoose library
import mongoose from 'mongoose';

// Define an asynchronous function to connect to MongoDB
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(`${process.env.MONGODB_URI}/Ecommerce`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    });

    // Log a success message when connected
    console.log("✅ DB Connected — Tuko ndani bro");

    // Optional: handle disconnection events
    mongoose.connection.on('disconnected', () => {
      console.warn("⚠️ MongoDB disconnected");
    });

    mongoose.connection.on('error', (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

  } catch (error) {
    console.error("❌ Initial MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;