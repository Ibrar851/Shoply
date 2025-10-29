import React, { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaSun,
  FaMoon,
  FaSearch,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

export default function Topbar() {
  const { theme, toggleTheme } = useTheme();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-6 py-3 shadow transition-colors duration-300">

      <div className="flex items-center gap-3 bg-gray-800/70 px-3 py-2 rounded-md w-1/2 focus-within:ring-2 ring-cyan-500 transition">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="bg-transparent outline-none text-sm w-full text-gray-200 placeholder-gray-500"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-6 relative">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition"
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {theme === "dark" ? (
            <FaSun className="text-yellow-400" />
          ) : (
            <FaMoon className="text-gray-300" />
          )}
        </button>

        {/* Notification bell */}
        <div className="relative cursor-pointer">
          <FaBell className="text-xl hover:text-cyan-400 transition" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User avatar dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="flex items-center gap-2 hover:text-cyan-400 transition"
          >
            <FaUserCircle className="text-2xl" />
          </button>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-44 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                Signed in as <br />
                <span className="font-medium text-cyan-400">Admin</span>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center gap-2">
                <FaUser /> Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-700 flex items-center gap-2 text-red-400">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
