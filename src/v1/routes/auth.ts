import AuthController from '../controllers/authController';
import { Router } from 'express';

const router = Router();

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/forgot-password', AuthController.forgotPassword);
router.get('/reset-password/:token', AuthController.getResetPassword);
router.post('/reset-password/:token', AuthController.resetPassword);

export default router;