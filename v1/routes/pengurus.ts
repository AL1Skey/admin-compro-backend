import { Router } from "express";
import PengurusController from "../controllers/pengurusController";

const router = Router();

router.post("/pengurus", PengurusController.create);
router.get("/pengurus", PengurusController.getAll);
router.get("/pengurus/:id", PengurusController.getById);
router.put("/pengurus/:id", PengurusController.update);
router.delete("/pengurus/:id", PengurusController.delete);

export default router;