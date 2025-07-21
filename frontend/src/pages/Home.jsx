import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login"); // Always go to login first
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
        Smart Warranty Card Manager
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-2xl">
        Securely manage your product warranties, track expiration, and never miss a renewal. Search, view, and monitor your warranties — all in one place.
      </p>
      <button
        onClick={handleGetStarted}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
