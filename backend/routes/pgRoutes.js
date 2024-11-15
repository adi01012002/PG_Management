// src/routes/pgRoutes.js

import express from 'express';
import { registerPG,getPGData } from '../controllers/pgController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get PG data for the logged-in user
router.get('/pg-data', authMiddleware, getPGData);
router.post('/registerPg',authMiddleware,registerPG)

export default router;
