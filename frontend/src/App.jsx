// frontend/src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/"; // Hide Navbar only on Home

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white text-gray-800 font-inter transition-all duration-300">
      {/* Navbar */}
      {!hideNavbar && (
        <div className="shadow-md bg-white z-10 sticky top-0">
          <Navbar />
        </div>
      )}

      {/* Main content area with visual depth */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-10 transition duration-300 ease-in-out">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm py-4 text-gray-500">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-blue-700">Smart Warranty Card Manager</span>. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
