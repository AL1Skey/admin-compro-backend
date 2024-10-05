import express from 'express';
import AlumniController from '../controllers/alumniController';
import BlogController from '../controllers/blogController';
import DewanController from '../controllers/dewanController';
import FooterController from '../controllers/footerController';
import HeaderController from '../controllers/headerController';
import KarirController from '../controllers/karirController';
import PengurusController from '../controllers/pengurusController';

// import cmsRoutes from './cms';

const router = express.Router();

// Public routes
router.get('/alumni', AlumniController.getAll);
router.get('/alumni/:id', AlumniController.getById);

router.get('/blog', BlogController.getAll);
router.get('/blog/:id', BlogController.getById);

router.get('/dewan', DewanController.getAll);
router.get('/dewan/:id', DewanController.getById);

router.get('/footer', FooterController.getAll);
router.get('/footer:id', FooterController.getById);

router.get('/header', HeaderController.getAll);
router.get('/header/:id', HeaderController.getById);

router.get('/karir', KarirController.getAll);
router.get('/karir/:id', KarirController.getById);

router.get('/pengurus', PengurusController.getAll);
router.get('/pengurus/:id', PengurusController.getById);

// router.use('/', cmsRoutes);

export default router;