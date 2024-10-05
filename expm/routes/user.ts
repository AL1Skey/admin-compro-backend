import UserController from '../controllers/userController';
import Auth from '../middleware/auth';
import { Router } from 'express';

const router = Router();
router.use(Auth.superAdmin);
router.post('/users', UserController.create);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.getById);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;