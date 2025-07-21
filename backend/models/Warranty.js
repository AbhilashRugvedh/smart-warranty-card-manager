// backend/models/Warranty.js
import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productName: String,
  serialNumber: String,
  purchaseDate: Date,
  warrantyPeriodMonths: Number,
  proofOfPurchase: String,
  expiryDate: Date,
});

export default mongoose.model("Warranty", warrantySchema);
