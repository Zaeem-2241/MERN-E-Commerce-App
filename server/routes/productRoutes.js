import express from "express";
const router = express.Router();
import getProduct from "../controllers/productControllers.js";
import { getProductById } from "../controllers/productControllers.js";

router.get("/", getProduct);
router.get("/:id", getProductById);

export default router;
