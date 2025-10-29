// controllers/productController.js
import Product from "../models/Product.js";

// Get all products (public)
export const getProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};

// Get single product
export const getProductById = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Product not found" });
  res.json(p);
};

// Admin: create product
export const createProduct = async (req, res) => {
  const { name, description, price, category, image, stock } = req.body;
  const p = await Product.create({ name, description, price, category, image, stock });
  res.status(201).json(p);
};

// Admin: update
export const updateProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  Object.assign(p, req.body);
  await p.save();
  res.json(p);
};

// Admin: delete
export const deleteProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  await p.deleteOne();
  res.json({ message: "Product deleted" });
};
