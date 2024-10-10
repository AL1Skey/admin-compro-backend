import { Router } from "express";
import FooterController from "../controllers/footerController";

const router = Router();

router.post("/", FooterController.create);
router.get("/", FooterController.getAll);
router.get("/:id", FooterController.getOne);
router.put("/:id", FooterController.updateOne);
router.delete("/:id", FooterController.delete);

router.get("/one", FooterController.getOne);
// router.put("/one", FooterController.updateOne);

export default router;