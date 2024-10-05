import { Router } from "express";
import KarirController from "../controllers/karirController";

const router = Router();

router.post("/karir", KarirController.create);
router.get("/karir", KarirController.getAll);
router.get("/karir/:id", KarirController.getById);
router.put("/karir/:id", KarirController.update);
router.delete("/karir/:id", KarirController.delete);

export default router;