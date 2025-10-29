import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaUsers,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/admin" },
    { name: "Products", icon: <FaBox />, path: "/admin/products" },
    { name: "Orders", icon: <FaShoppingCart />, path: "/admin/orders" },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
  ];

  return (
    <aside
  className={`${
    collapsed ? "w-20" : "w-64"
  } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen p-5 transition-all duration-300 border-r border-gray-200 dark:border-gray-700`}
>
  {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-10">
          {!collapsed && (
            <motion.h2
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-cyan-400 tracking-wide"
            >
              Admin Panel
            </motion.h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-cyan-400 transition"
            title={collapsed ? "Expand" : "Collapse"}
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-3 py-2 rounded-lg transition group ${
                  active
                    ? "bg-cyan-600 text-white shadow-md"
                    : "hover:bg-gray-800/70"
                }`}
              >
                {/* Active indicator bar */}
                {active && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 h-full w-[3px] bg-cyan-400 rounded-r"
                  />
                )}
                <span className="text-lg">{item.icon}</span>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="text-sm font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}

                {/* Tooltip when collapsed */}
                {collapsed && (
                  <span className="absolute left-16 bg-gray-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer (optional) */}
      <div className="absolute bottom-4 left-0 w-full text-center text-gray-500 text-xs">
        {!collapsed && <p>© 2025 Shoply Admin</p>}
      </div>
    </aside>
  );
}
