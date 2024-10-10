import { Router } from "express";
import DewanController from "../controllers/dewanController";

const router = Router();

router.post("/", DewanController.create);
router.get("/", DewanController.getAll);
router.get("/:id", DewanController.getById);
router.put("/:id", DewanController.update);
router.delete("/:id", DewanController.delete);

export default router;