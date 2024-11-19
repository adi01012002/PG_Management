import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addStudent } from "../controllers/studentController.js";
import { getAllStudents } from '../controllers/studentController.js';
import { deleteStudent } from '../controllers/studentController.js';
import { updateStudent } from '../controllers/studentController.js';
import { getStudentById ,loginStudent } from '../controllers/studentController.js';

const router = express.Router();

router.post("/add", authMiddleware, addStudent);
router.get("/list", authMiddleware, getAllStudents);
router.get('/:id', authMiddleware, getStudentById);
router.put('/edit/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent)

// router.post('/register', registerStudent); // Route for student registration
router.post('/login', loginStudent); // Route for student login

export default router;
