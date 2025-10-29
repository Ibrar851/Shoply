// src/pages/Contact.jsx
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black py-20 px-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl grid md:grid-cols-2 gap-10 p-10"
      >
        {/* Left: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            Get in Touch
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50/70 dark:bg-gray-700/70 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50/70 dark:bg-gray-700/70 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50/70 dark:bg-gray-700/70 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Order Inquiry</option>
                <option>Product Question</option>
                <option>Feedback</option>
                <option>General Trust</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50/70 dark:bg-gray-700/70 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-800 transition-all shadow-md"
            >
              <FaPaperPlane />
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Right: Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <h3 className="text-2xl font-semibold mb-4 dark:text-white text-gray-900">
            Or Connect With Us
          </h3>

          <ul className="space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600 dark:text-blue-400 text-lg" />
              <span>support@shoply.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600 dark:text-blue-400 text-lg" />
              <span>123 Commerce St, Suite A8, Anytown, CA 11334</span>
            </li>
          </ul>

          <div className="flex gap-4 mb-6">
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="#"
              className="text-blue-600 dark:text-blue-400 text-xl"
            >
              <FaFacebookF />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: -5 }}
              href="#"
              className="text-blue-600 dark:text-blue-400 text-xl"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2, rotate: 5 }}
              href="#"
              className="text-blue-600 dark:text-blue-400 text-xl"
            >
              <FaInstagram />
            </motion.a>
          </div>

          <div>
            <h4 className="font-medium mb-1 dark:text-white text-gray-900">
              FAQs
            </h4>
            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Find quick answers here →
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
