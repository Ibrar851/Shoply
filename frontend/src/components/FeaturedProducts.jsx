// src/components/FeaturedProducts.jsx
import { motion } from "framer-motion";
import SmartphoneX from "../assets/Smartphone.jpg";
import Headphones from "../assets/Headphones.jpg";
import SmartWatch from "../assets/SmartWatch.jpg";

export default function FeaturedProducts() {
  const products = [
    { id: 1, name: "Smartphone X", price: 599, image: SmartphoneX },
    { id: 2, name: "Wireless Headphones", price: 199, image: Headphones },
    { id: 3, name: "Smart Watch Pro", price: 149, image: SmartWatch },
  ];

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* background accent blur */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3)_0%,transparent_70%)]"></div>

      <div className="relative container mx-auto text-center px-6 z-10">
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-gray-900 dark:text-white"
        >
          Featured <span className="text-blue-600 dark:text-blue-400">Products</span>
        </motion.h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {products.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg dark:shadow-blue-900/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 transition-all duration-300"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-56 object-cover group-hover:opacity-90 transition-opacity duration-300"
              />
              <div className="p-5 text-left">
                <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {p.name}
                </h4>
                <p className="text-lg text-blue-600 dark:text-blue-400 font-bold mb-4">
                  ${p.price}
                </p>
                <button className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium tracking-wide transition-all">
                  Add to Cart
                </button>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
