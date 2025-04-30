import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import { limiter } from "./config/rate.limiter.js";
import helmet from "helmet";
import cors from "cors";
 
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: process.env.CLIENT_URI,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(cors(corsOptions));

//database connection
connectDB();
//Routes
app.use("/api/auth", limiter, authRoute);

app.get('/', (req, res) => {
    res.send("Hello..!");
});

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

