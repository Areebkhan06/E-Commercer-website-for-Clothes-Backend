import express from "express";

import upload from "../middleware/multer.js";
import {
  addProducts,
  fetchAllProducts,
  removeProduct,
  singleProduct,
} from "../Controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";
const productRouter = express.Router();

productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProducts
);

productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/list", fetchAllProducts);
productRouter.post("/product", singleProduct);

export default productRouter;
