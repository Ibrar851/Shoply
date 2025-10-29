// routes/productRoutes.js
import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin Routes
router.post("/", createProduct);     // Add product
router.put("/:id", updateProduct);   // Update product
router.delete("/:id", deleteProduct); // Delete product

export default router;
