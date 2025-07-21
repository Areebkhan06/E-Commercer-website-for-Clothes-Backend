import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  allOrders,
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../Controllers/orderController.js";
import { authUser } from "../middleware/auth.js";

const orderRouter = express.Router();

//Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//payment features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRazorpay);

//user Features
orderRouter.post("/userorders", authUser, userOrders);

//Verify payment

orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
