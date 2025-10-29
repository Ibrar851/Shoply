// controllers/orderController.js
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { orderItems, totalAmount, paymentMethod, shippingAddress } = req.body;
    if (!orderItems || orderItems.length === 0) return res.status(400).json({ message: "No items" });

    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === "Stripe" ? "Paid" : "Pending",
      shippingAddress
    });

    // reduce stock (optional)
    // for (const item of orderItems) { await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty }}) }

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("orderItems.product");
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "Not found" });
  order.status = req.body.status || order.status;
  if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
  await order.save();
  res.json(order);
};
