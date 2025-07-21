import React, { useEffect, useState } from "react";
import API from "../api";
import WarrantyCard from "../components/WarrantyCard";

function Dashboard() {
  const [warranties, setWarranties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    productName: "",
    serialNumber: "",
    purchaseDate: "",
    expiryDate: "",
    proofOfPurchase: "",
  });

  const fetchWarranties = async () => {
    try {
      const res = await API.get("/warranty/my");
      setWarranties(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWarranties();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/warranty", form);
      alert("Warranty added!");
      setForm({
        productName: "",
        serialNumber: "",
        purchaseDate: "",
        expiryDate: "",
        proofOfPurchase: "",
      });
      fetchWarranties();
    } catch (err) {
      alert("Failed to add warranty.");
    }
  };

  const filtered = warranties.filter((w) =>
    w.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">📦 Smart Warranty Dashboard</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border px-3 py-2 rounded mb-6 w-full shadow-sm"
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white shadow p-6 rounded-lg mb-8"
      >
        <input
          type="text"
          placeholder="Product Name"
          value={form.productName}
          onChange={(e) => setForm({ ...form, productName: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Serial Number"
          value={form.serialNumber}
          onChange={(e) => setForm({ ...form, serialNumber: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={form.purchaseDate}
          onChange={(e) => setForm({ ...form, purchaseDate: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={form.expiryDate}
          onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="url"
          placeholder="Proof of Purchase (URL)"
          value={form.proofOfPurchase}
          onChange={(e) =>
            setForm({ ...form, proofOfPurchase: e.target.value })
          }
          className="border p-2 rounded col-span-1 md:col-span-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-1 md:col-span-2 hover:bg-blue-700 transition"
        >
          ➕ Add Warranty
        </button>
      </form>

      {/* Display */}
      {filtered.length === 0 ? (
        <p className="text-gray-600">No warranties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((w) => (
            <WarrantyCard
              key={w._id}
              warranty={w}
              fetchWarranties={fetchWarranties}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
