import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import api from "../utils/api";

// 🖼️ Local fallback images (all lowercase filenames)
import smartphone from "../assets/smartphone.jpg";
import headphones from "../assets/headphones.jpg";
import gaminglaptop from "../assets/gaminglaptop.jpg";
import smartwatch from "../assets/smartwatch.jpg";
import bluetoothspeaker from "../assets/bluetoothspeaker.jpg";

export default function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const localProducts = [
    { id: "local1", name: "Smartphone X", price: 599, category: "Phones", image: smartphone },
    { id: "local2", name: "Headphones", price: 199, category: "Audio", image: headphones },
    { id: "local3", name: "Gaming Laptop", price: 1299, category: "Laptops", image: gaminglaptop },
    { id: "local4", name: "Smart Watch", price: 149, category: "Wearables", image: smartwatch },
    { id: "local5", name: "Bluetooth Speaker", price: 89, category: "Audio", image: bluetoothspeaker },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const backendProducts = res.data || [];
        setProducts([...localProducts, ...backendProducts]);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setProducts(localProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = ["All", "Phones", "Audio", "Laptops", "Wearables"];

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold dark:text-white mb-2">
            Our Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore premium tech at unbeatable prices.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full border text-sm font-medium transition ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white dark:bg-gray-800 dark:text-gray-300 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-full md:w-64 rounded-full border dark:bg-gray-800 dark:text-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
          </div>
        ) : (
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
              >
                {filteredProducts.map((p, index) => (
                  <motion.div
                    key={p._id || p.id}
                    layout
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition transform"
                  >
                    <Link to={`/product/${p._id || p.id}`}>
                      <div className="relative group">
                        <img
                          src={p.image || smartphone}
                          alt={p.name}
                          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition"></div>
                      </div>
                    </Link>

                    <div className="p-5 text-center">
                      <h4 className="text-lg font-semibold mb-2 dark:text-white truncate">
                        {p.name}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400 font-bold mb-4">
                        ${p.price}
                      </p>
                      <button
                        onClick={() => addToCart(p)}
                        className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Try adjusting your filters or search query.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
