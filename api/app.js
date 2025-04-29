import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json());

//database connection
connectDB();

app.get('/', (req, res) => {
    res.send("Hello..!");
});


//Routes
app.use("/", userRoutes);


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});

