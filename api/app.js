import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


connectDB();

app.get('/', (req, res) => {
    res.send("Hello..!");
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

