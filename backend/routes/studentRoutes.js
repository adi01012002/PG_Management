import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addStudent } from "../controllers/studentController.js";
import { getAllStudents } from '../controllers/studentController.js';
import { deleteStudent } from '../controllers/studentController.js';
import { updateStudent } from '../controllers/studentController.js';
import { getStudentById ,loginStudent ,getStudentProfile} from '../controllers/studentController.js';
import { getStudentPayments } from '../controllers/studentController.js';
// import { getStudentProfile } from '../controllers/getStudentProfile.js';
import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();


// Used by pg owner 
router.post("/add", authMiddleware, addStudent);
router.get("/list", authMiddleware, getAllStudents);
router.get('/:id', authMiddleware, getStudentById);
router.put('/edit/:id', authMiddleware, updateStudent);
router.delete('/:id', authMiddleware, deleteStudent)


// used by student

// router.post('/register', registerStudent); // Route for student registration
router.post('/login', loginStudent); // Route for student login
// Profile Routes
router.get("/:id/profile",protect, getStudentProfile);
// Payments Routes
router.get("/:id/payments", protect,getStudentPayments);

// Profile Routes
// router.get('/profile', protect, getStudentProfile);

export default router;
