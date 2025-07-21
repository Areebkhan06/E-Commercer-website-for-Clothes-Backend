import { v2 as cloudinary } from "cloudinary";
import productModel from "../Models/productModels.js";

export const addProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // Handle uploaded images
    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    // Upload images to Cloudinary
    const imageUrl = await Promise.all(
      images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        console.log(item);
        return result.secure_url;
      })
    );

    // Parse sizes (handle both JSON and space-separated strings)
    let parsedSizes;
    try {
      parsedSizes = JSON.parse(sizes); // Expects a JSON array string like '["S","M","L"]'
    } catch {
      parsedSizes = sizes.split(" "); // Fallback for strings like "S M L"
    }

    // Construct product data
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: bestseller === "true" ? true : false,
      image: imageUrl,
      date: Date.now(),
    };

    // Save product
    const newProduct = new productModel(productData);
    await newProduct.save();

    res.json({ success: true, message: "Product data added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const fetchAllProducts = async (req, res) => {
  try {
    const products = await productModel.find(); 
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

