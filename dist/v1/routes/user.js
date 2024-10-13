"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = __importDefault(require("../controllers/userController"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/', userController_1.default.create);
router.get('/', userController_1.default.getAll);
router.get('/:id', userController_1.default.getById);
router.put('/:id', userController_1.default.update);
router.delete('/:id', userController_1.default.delete);
exports.default = router;
//# sourceMappingURL=user.js.map