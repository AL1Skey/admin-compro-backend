"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aboutUsController_1 = __importDefault(require("../controllers/aboutUsController"));
const express_1 = require("express");
const upload_1 = require("../helper/upload");
const router = (0, express_1.Router)();
router.get("/", aboutUsController_1.default.get);
router.put("/", upload_1.upload.single('image'), upload_1.uploadToCloudinary, aboutUsController_1.default.update);
exports.default = router;
//# sourceMappingURL=aboutUs.js.map