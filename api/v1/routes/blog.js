"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blogController_1 = __importDefault(require("../controllers/blogController"));
const upload_1 = require("../helper/upload");
const router = (0, express_1.Router)();
router.post("/", upload_1.upload.single('image'), upload_1.uploadToCloudinary, blogController_1.default.create);
router.get("/", blogController_1.default.getAll);
router.get("/:id", blogController_1.default.getById);
router.put("/:id", upload_1.upload.single('image'), upload_1.uploadToCloudinary, blogController_1.default.update);
router.delete("/:id", blogController_1.default.delete);
exports.default = router;
//# sourceMappingURL=blog.js.map