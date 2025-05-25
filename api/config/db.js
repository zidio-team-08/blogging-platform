import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        // || "mongodb://localhost:27017/blog"
        await mongoose.connect('mongodb+srv://nileshkumar0815:0gke2PJhOmweQfKo@cluster0.1dvdw3s.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0');
        console.log("✅ MongoDB Connected to", mongoose.connection.name);
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);
    }
};

export default connectDB;
