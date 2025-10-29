// src/pages/Cart.jsx
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Cart() {
  const { items, removeFromCart, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold mb-10 text-center text-gray-900 dark:text-white flex justify-center items-center gap-3"
        >
          <FaShoppingCart className="text-blue-600" /> Your Cart
        </motion.h2>

        <AnimatePresence>
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center bg-white/50 dark:bg-gray-800/60 p-12 rounded-2xl shadow-md backdrop-blur-md"
            >
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
                Your cart is currently empty.
              </p>
              <Link
                to="/shop"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Continue Shopping
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Cart Items */}
              <motion.div
                key="cart"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-x-auto bg-white/70 dark:bg-gray-800/70 rounded-2xl shadow-xl backdrop-blur-md"
              >
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-200/70 dark:bg-gray-700 text-gray-800 dark:text-gray-300 uppercase text-sm tracking-wide">
                      <th className="p-4">Product</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Total</th>
                      <th className="p-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.tr
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                          <td className="p-4 flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-lg object-cover shadow-md"
                            />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </span>
                          </td>
                          <td className="p-4 text-gray-800 dark:text-gray-300">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="p-4 text-gray-800 dark:text-gray-300">
                            {item.quantity}
                          </td>
                          <td className="p-4 text-gray-800 dark:text-gray-300">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="p-4 text-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFromCart(item.id)}
                              className="bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition"
                            >
                              Remove
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </motion.div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-white/70 dark:bg-gray-800/70 p-8 rounded-2xl shadow-lg backdrop-blur-md"
              >
                <p className="text-2xl font-semibold dark:text-white">
                  Total:{" "}
                  <span className="text-blue-600 dark:text-blue-400">
                    ${total.toFixed(2)}
                  </span>
                </p>

                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={clearCart}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition shadow-md"
                  >
                    Clear Cart
                  </motion.button>

                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Link
                      to="/checkout"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
                    >
                      Proceed to Checkout
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
