// routes/adminRoutes.js
import express from "express";
import { createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect, admin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// product CRUD (admin)
router.post("/products", protect, admin, createProduct);
router.put("/products/:id", protect, admin, updateProduct);
router.delete("/products/:id", protect, admin, deleteProduct);

// orders
router.get("/orders", protect, admin, async (req, res) => {
  // delegated to controller: getAllOrders
  const orders = await (await import("../controllers/orderController.js")).getAllOrders(req, res);
});

// analytics (simple)
router.get("/analytics", protect, admin, async (req, res) => {
  const User = (await import("../models/User.js")).default;
  const Product = (await import("../models/Product.js")).default;
  const Order = (await import("../models/Order.js")).default;

  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();
  const revenueAgg = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalAmount" } } }]);
  const revenue = revenueAgg[0]?.total || 0;

  // dummy monthly
  const monthlySales = [
    { month: "Jan", sales: 0 }, { month: "Feb", sales: 0 }
  ];
  res.json({ summary: { users, products, orders, revenue }, monthlySales });
});

export default router;
