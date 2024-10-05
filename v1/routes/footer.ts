import { Router } from "express";
import FooterController from "../controllers/footerController";

const router = Router();

router.post("/footer", FooterController.create);
router.get("/footer", FooterController.getAll);
router.get("/footer/:id", FooterController.getById);
router.put("/footer/:id", FooterController.update);
router.delete("/footer/:id", FooterController.delete);

export default router;