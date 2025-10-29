import Stripe from "stripe";

// ✅ Load Stripe safely (won’t crash if key missing)
let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });
  console.log("✅ Stripe initialized successfully");
} else {
  console.warn("⚠️ STRIPE_SECRET_KEY not found — Stripe disabled (COD mode only).");
}

// ✅ Create a payment intent (Stripe or COD)
export const createPayment = async (req, res) => {
  try {
    const { amount, currency, method } = req.body;

    // If user selected Cash on Delivery
    if (method === "COD" || !stripe) {
      return res.status(200).json({
        success: true,
        message: "COD order placed successfully",
        paymentMethod: "COD",
      });
    }

    // Otherwise, process Stripe payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: currency || "usd",
      automatic_payment_methods: { enabled: true },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentMethod: "Stripe",
    });
  } catch (error) {
    console.error("❌ Payment Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
