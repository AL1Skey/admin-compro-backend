import AlumniController from "../controllers/alumniController";
import { Router } from "express";

const router = Router();

router.post("/alumni", AlumniController.create);
router.get("/alumni", AlumniController.getAll);
router.get("/alumni/:id", AlumniController.getById);
router.put("/alumni/:id", AlumniController.update);
router.delete("/alumni/:id", AlumniController.delete);

export default router;