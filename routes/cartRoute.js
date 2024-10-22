import express from 'express';
import { createCart, deleteCartAfterOrder, deleteCartProduct, getAllCart, getCart, updateCart } from '../controllers/cartController.js';
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from '../verifyToken.js';

const router = express.Router();

router.post("/", verifyToken, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id/product", verifyTokenAndAuthorization, deleteCartProduct);
router.delete("/:id", verifyTokenAndAuthorization, deleteCartAfterOrder);
router.get("/:id", verifyTokenAndAuthorization, getCart);
router.get("/", verifyTokenAndAdmin, getAllCart);

export default router;