import { Router } from 'express';
import JurusanController from '../controllers/jurusanController';

const router = Router();

router.post('/', JurusanController.create);
router.get('/', JurusanController.getAll);
router.get('/:id', JurusanController.getById);
router.put('/:id', JurusanController.update);
router.delete('/:id', JurusanController.delete);

export default router;