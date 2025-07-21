import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "customer" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("✅ Registered successfully!");
      navigate("/login");
    } catch (error) {
      alert("❌ Registration failed");
      console.error("Register error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">📝 Register</h2>
      <input
        type="text"
        placeholder="Name"
        className="input"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        className="input"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="input"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="input"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded w-full">
        Register
      </button>

      {/* 🔁 Existing user prompt */}
      <p className="text-center text-sm text-gray-700">
        Already registered?{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login here
        </Link>
      </p>
    </form>
  );
}

export default Register;
