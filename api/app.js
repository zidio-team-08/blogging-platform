import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { limiter } from "./config/rate.limiter.js";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());


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

