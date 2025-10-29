import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // --- Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  // --- Error or Not Found ---
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
        <h2 className="text-2xl font-semibold mb-4">
          {error || "Product not found"}
        </h2>
        <Link
          to="/shop"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Back to Shop
        </Link>
      </div>
    );
  }

  // --- Add to Cart Handler ---
  const handleAddToCart = async () => {
    try {
      await api.post("/cart", { productId: product._id || product.id });
      alert("🛒 Product added to cart!");
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("Failed to add product to cart.");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Product Image */}
        <motion.img
          src={product.image || "https://via.placeholder.com/500x500?text=No+Image"}
          alt={product.name}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-2xl shadow-xl object-cover"
        />

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {product.name}
          </h1>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {product.desc || "No description available for this product."}
          </p>

          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ${product.price?.toFixed(2) || "0.00"}
          </p>

          <div className="flex gap-4 items-center">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition duration-200"
            >
              <FaShoppingCart className="text-lg" /> Add to Cart
            </button>

            <Link
              to="/shop"
              className="px-6 py-3 border border-gray-400 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              Back to Shop
            </Link>
          </div>

          <hr className="my-8 border-gray-300 dark:border-gray-700" />

          {/* Additional Info (Optional Future Section) */}
          <div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              Product Details
            </h3>
            <ul className="text-gray-600 dark:text-gray-300 space-y-2 list-disc ml-5">
              <li>High-quality build and materials</li>
              <li>Fast delivery within 3-5 business days</li>
              <li>1-year warranty included</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
