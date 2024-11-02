import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addStudent } from "../controllers/studentController.js";
import { getAllStudents } from '../controllers/studentController.js';
import { deleteStudent } from '../controllers/studentController.js';
import { updateStudent } from '../controllers/studentController.js';
import { getStudentById } from '../controllers/studentController.js';

const router = express.Router();

router.post("/add", authMiddleware, addStudent);
router.get("/list", authMiddleware, getAllStudents);
router.delete('/:id', authMiddleware, deleteStudent)
router.put('/edit/:id', authMiddleware, updateStudent);
router.get('/:id', authMiddleware, getStudentById);

export default router;
