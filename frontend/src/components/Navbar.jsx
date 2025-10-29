import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSun, FaMoon, FaShoppingCart, FaUserShield } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { items } = useCart();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 🔹 Brand */}
        <Link to="/" className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          Shoply
        </Link>

        {/* 🔹 Navbar Links */}
        <div className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          >
            Shop
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 dark:text-blue-400"
                : "hover:text-blue-600 dark:hover:text-blue-400"
            }
          >
            Contact
          </NavLink>
        </div>

        {/* 🔹 Right-side Controls */}
        <div className="flex items-center gap-6">
          {/* 🛒 Cart */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {items.length}
              </span>
            )}
          </Link>

          {/* 👤 Auth Buttons (Always visible) */}
          <div className="hidden md:flex gap-4">
            <Link
              to="/login"
              className="px-4 py-1 rounded-md border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Signup
            </Link>
          </div>

          {/* 🧩 Always show Admin Dashboard button for demo */}
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FaUserShield />
            <span>Dashboard</span>
          </Link>

          {/* 🌗 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
