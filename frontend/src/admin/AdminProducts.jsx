import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { FaPlusCircle, FaSearch, FaUpload, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // 🧠 Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Upload image
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm({ ...form, image: res.data.imageUrl });
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Add or Update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/products/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/products", form);
      }
      setForm({ name: "", price: "", category: "", image: "", stock: "" });
      fetchProducts();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save product");
    }
  };

  // 🔹 Edit product
  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      price: p.price,
      category: p.category,
      image: p.image,
      stock: p.stock,
    });
  };

  // 🔹 Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product");
    }
  };

  // 🔎 Filtered products
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow transition-colors duration-300">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">🛍️ Manage Products</h2>

        {/* Search Bar */}
        <div className="relative w-64">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 🧾 Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-8"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />
        <input
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="p-2 rounded bg-gray-800 border border-gray-700"
        />

        {/* File Upload */}
        <label className="flex items-center justify-center gap-2 cursor-pointer bg-gray-800 border border-gray-700 rounded p-2 hover:bg-gray-700">
          <FaUpload />
          <span className="text-sm">Upload</span>
          <input type="file" onChange={handleImageUpload} className="hidden" />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 p-2 rounded text-white"
        >
          {editId ? <FaEdit /> : <FaPlusCircle />}
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {uploading && (
        <p className="flex items-center gap-2 text-yellow-400 mb-2">
          <FaSpinner className="animate-spin" /> Uploading image...
        </p>
      )}

      {/* 📋 Product Table */}
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="text-gray-400 border-b border-gray-700">
            <th className="py-2">Image</th>
            <th className="py-2">Name</th>
            <th className="py-2">Price</th>
            <th className="py-2">Category</th>
            <th className="py-2">Stock</th>
            <th className="py-2 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id} className="border-b border-gray-800 hover:bg-gray-800/40">
              <td className="py-2">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded object-cover"
                />
              </td>
              <td className="py-2">{p.name}</td>
              <td className="py-2">${p.price}</td>
              <td className="py-2">{p.category}</td>
              <td className="py-2">{p.stock}</td>
              <td className="py-2 text-right space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white flex items-center gap-1 inline-flex"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white flex items-center gap-1 inline-flex"
                >
                  <FaTrash /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
