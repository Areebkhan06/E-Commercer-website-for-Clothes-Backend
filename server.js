import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./Routes/userRoutes.js";
import productRouter from "./Routes/productRoute.js";
import cartRouter from "./Routes/cartRoutes.js";
import orderRouter from "./Routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 3089;

// Connect to database and cloudinary
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "https://e-commercer-website-for-clothes-frontend-iq9e.onrender.com", // user frontend
  "https://e-commercer-website-for-clothes-admin.onrender.com"          // admin panel
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // use this if you’re sending cookies/sessions
};

app.use(cors(corsOptions));


// API routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API working ✅");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
