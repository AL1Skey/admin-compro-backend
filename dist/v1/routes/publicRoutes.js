"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const alumniController_1 = __importDefault(require("../controllers/alumniController"));
const blogController_1 = __importDefault(require("../controllers/blogController"));
const dewanController_1 = __importDefault(require("../controllers/dewanController"));
const footerController_1 = __importDefault(require("../controllers/footerController"));
const headerController_1 = __importDefault(require("../controllers/headerController"));
const karirController_1 = __importDefault(require("../controllers/karirController"));
const pengurusController_1 = __importDefault(require("../controllers/pengurusController"));
const userController_1 = __importDefault(require("../controllers/userController"));
const aboutUsController_1 = __importDefault(require("../controllers/aboutUsController"));
// import cmsRoutes from './cms';
const router = express_1.default.Router();
// Public routes
router.get('/user', userController_1.default.getOne);
router.get("/about-us", aboutUsController_1.default.get);
router.get('/alumni', alumniController_1.default.getAll);
router.get('/alumni/:id', alumniController_1.default.getById);
router.get('/blog', blogController_1.default.getAll);
router.get('/blog/:id', blogController_1.default.getById);
router.get('/dewan', dewanController_1.default.getAll);
router.get('/dewan/:id', dewanController_1.default.getById);
router.get('/footer', footerController_1.default.getAll);
router.get('/footer:id', footerController_1.default.getById);
router.get('/header', headerController_1.default.getAll);
router.get('/header/:id', headerController_1.default.getById);
router.get('/karir', karirController_1.default.getAll);
router.get('/karir/:id', karirController_1.default.getById);
router.get('/pengurus', pengurusController_1.default.getAll);
router.get('/pengurus/:id', pengurusController_1.default.getById);
// router.use('/', cmsRoutes);
exports.default = router;
//# sourceMappingURL=publicRoutes.js.map