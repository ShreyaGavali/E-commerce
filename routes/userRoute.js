import express from "express";
import { deleteUser, getAllUser, getUser, getUserStat, updateUser } from "../controllers/userController.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../verifyToken.js";

const router = express.Router();

router.put('/:id',verifyTokenAndAuthorization, updateUser);
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);
router.get('/', getAllUser);
router.get('/stats',verifyTokenAndAdmin, getUserStat);
router.get('/:id',verifyTokenAndAdmin, getUser);

export default router;