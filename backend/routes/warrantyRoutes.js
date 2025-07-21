import express from "express";
import {
  createWarranty,
  getMyWarranties,
  deleteWarranty,
  autoDeleteExpiredWarranties,
} from "../controllers/warrantyController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createWarranty);
router.get("/my", protect, getMyWarranties);
router.delete("/:id", protect, deleteWarranty);
router.delete("/auto/expired", protect, autoDeleteExpiredWarranties); // optional route

export default router;
