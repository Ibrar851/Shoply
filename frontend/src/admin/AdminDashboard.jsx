// src/admin/AdminDashboard.jsx
import React from "react";
import { FaBox, FaUsers, FaChartBar, FaShoppingCart } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useTheme } from "../context/ThemeContext";

export default function AdminDashboard() {
  const { theme } = useTheme();

  // 📊 Chart Data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [1200, 2500, 3000, 4200, 3800, 5100, 6200],
        fill: true,
        backgroundColor:
          theme === "dark"
            ? "rgba(59, 130, 246, 0.1)"
            : "rgba(59, 130, 246, 0.2)",
        borderColor: "rgb(59,130,246)",
        pointBackgroundColor: "rgb(59,130,246)",
        tension: 0.4,
      },
    ],
  };

  const salesOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: theme === "dark" ? "#fff" : "#1f2937",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: theme === "dark" ? "#d1d5db" : "#4b5563" },
        grid: { color: theme === "dark" ? "#374151" : "#e5e7eb" },
      },
      y: {
        ticks: { color: theme === "dark" ? "#d1d5db" : "#4b5563" },
        grid: { color: theme === "dark" ? "#374151" : "#e5e7eb" },
      },
    },
  };

  const stats = [
    { title: "Total Products", value: "120", icon: <FaBox />, color: "bg-blue-500" },
    { title: "Registered Users", value: "58", icon: <FaUsers />, color: "bg-green-500" },
    { title: "Monthly Sales", value: "$12,430", icon: <FaChartBar />, color: "bg-purple-500" },
    { title: "Orders Today", value: "34", icon: <FaShoppingCart />, color: "bg-orange-500" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-10 text-center">
        Admin Dashboard
      </h1>

      {/* 🔹 Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((card, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-800 hover:scale-105 transition-transform duration-300 group"
          >
            <div
              className={`absolute top-0 right-0 w-24 h-24 ${card.color} opacity-10 rounded-bl-full`}
            ></div>

            <div className="flex items-center justify-between relative z-10">
              <div
                className={`text-4xl ${card.color.replace(
                  "bg-",
                  "text-"
                )} dark:text-blue-400`}
              >
                {card.icon}
              </div>
              <div className="text-right">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {card.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {card.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📈 Sales Chart */}
      <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          Sales Overview
        </h2>
        <Line data={salesData} options={salesOptions} />
      </div>
    </div>
  );
}
