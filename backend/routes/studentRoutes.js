import express from "express";
import { addStudent } from "../controllers/studentController.js";
import { getAllStudents } from '../controllers/studentController.js';
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addStudent);
router.get("/list", authMiddleware, getAllStudents);

export default router;
