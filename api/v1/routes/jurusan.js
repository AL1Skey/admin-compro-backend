"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jurusanController_1 = __importDefault(require("../controllers/jurusanController"));
const router = (0, express_1.Router)();
router.post('/', jurusanController_1.default.create);
router.get('/', jurusanController_1.default.getAll);
router.get('/:id', jurusanController_1.default.getById);
router.put('/:id', jurusanController_1.default.update);
router.delete('/:id', jurusanController_1.default.delete);
exports.default = router;
//# sourceMappingURL=jurusan.js.map