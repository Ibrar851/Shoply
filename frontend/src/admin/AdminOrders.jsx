import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Loader2, Search, RefreshCw } from "lucide-react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // ✅ Fetch Orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await api.get("/admin/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
        setFilteredOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔍 Filter Orders by Search
  useEffect(() => {
    const filtered = orders.filter(
      (o) =>
        o._id?.toLowerCase().includes(search.toLowerCase()) ||
        o.customer?.name?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [search, orders]);

  // 🌀 Loading State
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 transition-colors">
        <Loader2 className="animate-spin w-8 h-8 mb-3 text-blue-500" />
        <p>Loading orders...</p>
      </div>
    );
  }

  // ❌ Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-red-600 dark:text-red-400 transition-colors">
        <RefreshCw className="w-8 h-8 mb-3" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-xl p-6 shadow-md transition-colors duration-300">
      {/* Header + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          🧾 Orders Management
        </h2>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search by ID or Customer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* Table */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-10">
          No matching orders found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <th className="py-3 px-2 text-left">Order ID</th>
                <th className="py-3 px-2 text-left">Customer</th>
                <th className="py-3 px-2 text-left">Total</th>
                <th className="py-3 px-2 text-left">Date</th>
                <th className="py-3 px-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o, i) => (
                <tr
                  key={o._id || i}
                  className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    i % 2 === 0 ? "bg-gray-50 dark:bg-gray-800/40" : ""
                  }`}
                >
                  <td className="py-2 px-2 font-medium">{o._id || "—"}</td>
                  <td className="py-2 px-2">{o.customer?.name || o.customerName}</td>
                  <td className="py-2 px-2 font-semibold text-green-600 dark:text-green-400">
                    ${o.total || o.amount || "0"}
                  </td>
                  <td className="py-2 px-2 text-gray-600 dark:text-gray-400">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        o.status === "Delivered"
                          ? "bg-green-100 dark:bg-green-600/20 text-green-700 dark:text-green-400"
                          : o.status === "Shipped"
                          ? "bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400"
                          : "bg-yellow-100 dark:bg-yellow-600/20 text-yellow-700 dark:text-yellow-400"
                      }`}
                    >
                      {o.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
