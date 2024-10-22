import express from "express";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../verifyToken.js";
import { createOrder, deleteOrder, getAllOrders, getIncome, getOrder, updateOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/:id", verifyTokenAndAuthorization, getOrder);
router.get("/", verifyTokenAndAdmin, getAllOrders);
router.get("/income", verifyTokenAndAdmin, getIncome);

export default router;