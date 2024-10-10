import { Router } from "express";
import PengurusController from "../controllers/pengurusController";

const router = Router();

router.post("/", PengurusController.create);
router.get("/", PengurusController.getAll);
router.get("/:id", PengurusController.getById);
router.put("/:id", PengurusController.update);
router.delete("/:id", PengurusController.delete);

export default router;