"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./user"));
const excelImport_1 = __importDefault(require("./excelImport"));
const auth_1 = __importDefault(require("./auth"));
const auth_2 = __importDefault(require("../middleware/auth"));
const aboutUs_1 = __importDefault(require("./aboutUs"));
const alumni_1 = __importDefault(require("./alumni"));
const jurusan_1 = __importDefault(require("./jurusan"));
const blog_1 = __importDefault(require("./blog"));
const dewan_1 = __importDefault(require("./dewan"));
const footer_1 = __importDefault(require("./footer"));
const karir_1 = __importDefault(require("./karir"));
const header_1 = __importDefault(require("./header"));
const pengurus_1 = __importDefault(require("./pengurus"));
const publicRoutes_1 = __importDefault(require("./publicRoutes"));
const userController_1 = __importDefault(require("../controllers/userController"));
// import cmsRoutes from './cms';
const router = express_1.default.Router();
// Public
router.use('/public', publicRoutes_1.default);
router.use('/excel', excelImport_1.default);
// Admin
router.use('/', auth_1.default);
router.get('/self', auth_2.default.authOnly, userController_1.default.getSelf);
router.put('/self', auth_2.default.authOnly, userController_1.default.updateSelf);
router.use('/alumni', auth_2.default.authOnly, alumni_1.default);
router.use('/jurusan', auth_2.default.authOnly, jurusan_1.default);
router.use('/blog', auth_2.default.authOnly, blog_1.default);
router.use('/about-us', auth_2.default.authOnly, aboutUs_1.default);
router.use('/dewan', auth_2.default.authOnly, dewan_1.default);
router.use('/footer', auth_2.default.authOnly, footer_1.default);
router.use('/header', auth_2.default.authOnly, header_1.default);
router.use('/karir', auth_2.default.authOnly, karir_1.default);
router.use('/pengurus', auth_2.default.authOnly, pengurus_1.default);
// router.use('/', cmsRoutes);
router.use('/users', auth_2.default.superAdmin, user_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map