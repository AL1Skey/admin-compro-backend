import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import cmsRoutes from './cms';

const router = express.Router();

router.use('/', authRoutes);
router.use('/', userRoutes);
router.use('/', cmsRoutes);

export default router;