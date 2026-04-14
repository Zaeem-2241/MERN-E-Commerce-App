import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { getUserProfile } from "../controllers/userControllers.js";

router.get("/profile", protect, getUserProfile);

export default router;
