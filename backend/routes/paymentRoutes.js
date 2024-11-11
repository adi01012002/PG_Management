// routes/paymentRoutes.js
import express from 'express';
import { getPaymentsByStudent, addPayment,getPaymentsByUser } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all payments for a student
router.get('/:id/history', authMiddleware, getPaymentsByStudent);

// Get all payment history created by user
router.get('/history', authMiddleware, getPaymentsByUser);

// Add a payment for a student
router.post('/:id/add', authMiddleware, addPayment);
// router.post('/:id/add-payment', authMiddleware, addPayment);

export default router;
