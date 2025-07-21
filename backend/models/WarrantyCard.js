import mongoose from "mongoose";

const warrantyCardSchema = new mongoose.Schema({
  productName: String,
  serialNumber: String,
  purchaseDate: Date,
  warrantyPeriodMonths: Number,
  expiryDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  proofOfPurchase: String,
  status: { type: String, enum: ["active", "expired", "revoked"], default: "active" },
});

export default mongoose.model("WarrantyCard", warrantyCardSchema);
