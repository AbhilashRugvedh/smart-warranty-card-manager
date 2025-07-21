import React from "react";
import API from "../api";

function WarrantyCard({ warranty, fetchWarranties }) {
  const {
    _id,
    productName,
    serialNumber,
    purchaseDate,
    expiryDate,
    status,
    proofOfPurchase,
  } = warranty;

  const daysLeft = Math.ceil(
    (new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const handleDelete = async () => {
    if (window.confirm("Delete this warranty?")) {
      try {
        await API.delete(`/warranty/${_id}`);
        fetchWarranties();
      } catch (err) {
        alert("Failed to delete");
      }
    }
  };

  return (
    <div
      className={`border rounded-lg shadow-md p-4 bg-white relative ${
        daysLeft <= 7 && daysLeft >= 0 ? "border-red-500" : ""
      }`}
    >
      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700"
      >
        Delete
      </button>

      <h3 className="text-xl font-semibold text-blue-700 mb-2">{productName}</h3>
      <p className="text-sm"><strong>Serial:</strong> {serialNumber}</p>
      <p className="text-sm"><strong>Purchase:</strong> {new Date(purchaseDate).toLocaleDateString()}</p>
      <p className="text-sm"><strong>Expiry:</strong> {new Date(expiryDate).toLocaleDateString()}</p>

      <p
        className={`text-sm font-semibold mt-1 ${
          daysLeft < 0
            ? "text-red-600"
            : daysLeft <= 7
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        {daysLeft < 0
          ? "❌ Expired"
          : daysLeft <= 7
          ? `⚠️ Expires in ${daysLeft} day(s)`
          : `${daysLeft} day(s) left`}
      </p>

      {proofOfPurchase && (
        <a
          href={proofOfPurchase}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline text-sm mt-2 inline-block"
        >
          View Proof of Purchase
        </a>
      )}
    </div>
  );
}

export default WarrantyCard;
