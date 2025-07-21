import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("✅ Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("❌ Invalid email or password");
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">🔐 Login</h2>
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
      <button type="submit" className="bg-green-600 text-white p-2 rounded w-full">
        Login
      </button>

      {/* 👉 New user prompt */}
      <p className="text-center text-sm text-gray-700">
        New user?{" "}
        <Link to="/register" className="text-blue-600 underline">
          Register here
        </Link>
      </p>
    </form>
  );
}

export default Login;
