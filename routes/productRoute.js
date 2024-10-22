import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductByCategory, updateProduct } from '../controllers/productController.js';
import { verifyTokenAndAdmin } from '../verifyToken.js';
import multer from 'multer';
import {storage} from '../cloudConfig.js'

const upload = multer({storage});

const router = express.Router();

router.post("/",verifyTokenAndAdmin, upload.single('img'), createProduct);
router.put("/:id",verifyTokenAndAdmin, updateProduct)
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);
router.get("/:id", getProduct);
router.get("/", getProductByCategory);

export default router;