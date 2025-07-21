import WarrantyCard from "../models/WarrantyCard.js";

// ✅ Create Warranty (with manual purchase + expiry date)
export const createWarranty = async (req, res) => {
  try {
    const {
      productName,
      serialNumber,
      purchaseDate,
      expiryDate,
      proofOfPurchase,
    } = req.body;

    const warranty = await WarrantyCard.create({
      productName,
      serialNumber,
      purchaseDate,
      expiryDate,
      proofOfPurchase,
      userId: req.user.id,
    });

    res.json({ message: "Warranty card created", warranty });
  } catch (err) {
    res.status(500).json({ message: "Error creating warranty", error: err.message });
  }
};

// ✅ Get all warranties for the logged-in user
export const getMyWarranties = async (req, res) => {
  try {
    const warranties = await WarrantyCard.find({ userId: req.user.id });
    res.json(warranties);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch warranties", error: err.message });
  }
};

// ✅ Delete warranty manually
export const deleteWarranty = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await WarrantyCard.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!deleted) return res.status(404).json({ message: "Warranty not found" });

    res.json({ message: "Warranty deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting warranty", error: err.message });
  }
};

// ✅ Auto-delete expired warranties (optional cleanup route)
export const autoDeleteExpiredWarranties = async (req, res) => {
  try {
    const now = new Date();

    const result = await WarrantyCard.deleteMany({
      expiryDate: { $lt: now },
    });

    res.json({
      message: "Expired warranties deleted",
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ message: "Error auto-deleting warranties", error: err.message });
  }
};
