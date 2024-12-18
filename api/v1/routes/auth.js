"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authController_1 = __importDefault(require("../controllers/authController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/login', authController_1.default.login);
router.post('/register', authController_1.default.register);
router.post('/forgot-password', authController_1.default.forgotPassword);
router.get('/reset-password/:token', authController_1.default.getResetPassword);
router.post('/reset-password/:token', authController_1.default.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.js.map