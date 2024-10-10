import { Router } from "express";
import KarirController from "../controllers/karirController";

const router = Router();

router.post("/", KarirController.create);
router.get("/", KarirController.getAll);
router.get("/:id", KarirController.getById);
router.put("/:id", KarirController.update);
router.delete("/:id", KarirController.delete);

export default router;