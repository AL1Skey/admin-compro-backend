import CMSController from '../controllers/cmsController';
import Auth from '../middleware/auth';
import { Router } from 'express';

const router = Router();

router.use(Auth.authOnly);
router.post('/cms', CMSController.create);
router.get('/cms', CMSController.getAll);
router.get('/cms/:id', CMSController.getById);
router.put('/cms/:id', CMSController.update);
router.delete('/cms/:id', CMSController.delete);

export default router;