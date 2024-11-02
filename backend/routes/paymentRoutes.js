// routes/paymentRoutes.js
import express from 'express';
import { getPaymentsByStudent, addPayment } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all payments for a student
router.get('/:id', authMiddleware, getPaymentsByStudent);

// Add a payment for a student
router.post('/:id', authMiddleware, addPayment);

export default router;
