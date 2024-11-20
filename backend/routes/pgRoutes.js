// src/routes/pgRoutes.js

import express from 'express';
import { registerPG,getPGData ,fetchOwnerPGs} from '../controllers/pgController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to get PG data for the logged-in user
router.get('/pg-data', authMiddleware, getPGData);
router.post('/registerPg',authMiddleware,registerPG)
// Route to fetch PGs for a specific owner
router.get('/owner/:userId', authMiddleware, fetchOwnerPGs);

export default router;
