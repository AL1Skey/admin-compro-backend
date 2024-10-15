import express from 'express';
import userRoutes from './user';
import excelImport from './excelImport';
import authRoutes from './auth';
import Auth from '../middleware/auth';
import aboutUs from './aboutUs';
import alumni from './alumni';
import jurusan from './jurusan';
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
router.use('/excel',excelImport);


// Admin
router.use('/', authRoutes);
router.use('/alumni',Auth.authOnly,alumni);
router.use('/jurusan',Auth.authOnly,jurusan);
router.use('/blog',Auth.authOnly,blog);
router.use('/about-us',Auth.authOnly,aboutUs);
router.use('/dewan',Auth.authOnly,dewan);
router.use('/footer',Auth.authOnly,footer );
router.use('/header',Auth.authOnly,header );
router.use('/karir',Auth.authOnly,karir );
router.use('/pengurus',Auth.authOnly,pengurus );


// router.use('/', cmsRoutes);
router.use('/users',Auth.superAdmin, userRoutes);


export default router;