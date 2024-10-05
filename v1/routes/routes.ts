import express from 'express';
import userRoutes from './user';
import authRoutes from './auth';
import Auth from '../middleware/auth';
import alumni from './alumni';
import blog from './blog';
import dewan from './dewan';
import footer from './footer';
import karir from './karir';
import header from './header';
import pengurus from './pengurus';
import publicRoutes from './publicRoutes';
// import cmsRoutes from './cms';

const router = express.Router();

// Public
router.use('/public',publicRoutes);


// Admin
router.use('/', authRoutes);
router.use('/',Auth.superAdmin, userRoutes);
router.use('/',Auth.authOnly,alumni);
router.use('/',Auth.authOnly,blog);
router.use('/',Auth.authOnly,dewan);
router.use('/',Auth.authOnly,footer );
router.use('/',Auth.authOnly,header );
router.use('/',Auth.authOnly,karir );
router.use('/',Auth.authOnly,pengurus );

// router.use('/', cmsRoutes);

export default router;