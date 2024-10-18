"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_1 = require("../helper/upload");
const excelController_1 = __importDefault(require("../controllers/excelController"));
const router = (0, express_1.Router)();
router.post("/alumni", upload_1.upload.single("file"), upload_1.uploadExcel, excelController_1.default.uploadAlumni);
router.get("/alumni", excelController_1.default.downloadAlumni);
exports.default = router;
//# sourceMappingURL=excelImport.js.map