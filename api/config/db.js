import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // || "mongodb://localhost:27017/blog"
        await mongoose.connect("mongodb://localhost:27017/blog");
        console.log("✅ MongoDB Connected to", mongoose.connection.name);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;
