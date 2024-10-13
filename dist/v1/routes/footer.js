"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const footerController_1 = __importDefault(require("../controllers/footerController"));
const router = (0, express_1.Router)();
router.post("/", footerController_1.default.create);
router.get("/", footerController_1.default.getAll);
router.get("/:id", footerController_1.default.getOne);
router.put("/:id", footerController_1.default.updateOne);
router.delete("/:id", footerController_1.default.delete);
router.get("/one", footerController_1.default.getOne);
// router.put("/one", FooterController.updateOne);
exports.default = router;
//# sourceMappingURL=footer.js.map