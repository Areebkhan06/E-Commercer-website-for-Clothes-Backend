import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoute.js";
import upload from "./middleware/multer.js";
import cartRouter from "./Routes/cartRoutes.js";
import orderRouter from "./Routes/orderRoute.js";

// App config

const app = express();
const port = process.env.PORT || 3089;

connectDB();
connectCloudinary();

// middlewares

app.use(express.json());
const allowedOrigins = [
  "https://e-commercer-website-for-clothes-frontend-iq9e.onrender.com", // main site
  "https://your-admin-url.onrender.com" // admin panel
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// APi endpoints

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("APi working");
});

app.listen(port, () => {
  console.log(`Server address http://localhost:${port}`);
});
