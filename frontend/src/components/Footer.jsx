import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-300 mt-20 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-3">
            Shoply
          </h3>
          <p className="text-sm">
            Your trusted store for premium tech products at affordable prices.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-blue-600 dark:hover:text-blue-400">
                Shop
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-gray-200 dark:border-gray-800 text-sm">
        © {new Date().getFullYear()} Shoply. All rights reserved.
      </div>
    </footer>
  );
}
