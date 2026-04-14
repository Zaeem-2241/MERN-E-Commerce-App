import { createOrder, getAllOrders, updateOrderStatus } from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/authMiddleware.js";
import express from "express";
const router = express.Router();

router.post("/", protect, createOrder);
router.get("/admin/orders", protect, admin, getAllOrders);
router.put("/admin/orders/:id", protect, admin, updateOrderStatus);

export default router;