// routes/paymentRoutes.js
import express from "express";
import { createPayment } from "../controllers/paymentController.js";

const router = express.Router();

// ✅ Create payment (Stripe or COD)
router.post("/create-payment", createPayment);

export default router;

