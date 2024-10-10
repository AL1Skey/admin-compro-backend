import AlumniController from "../controllers/alumniController";
import { Router } from "express";

const router = Router();

router.post("/", AlumniController.create);
router.get("/", AlumniController.getAll);
router.get("/:id", AlumniController.getById);
router.put("/:id", AlumniController.update);
router.delete("/:id", AlumniController.delete);

export default router;