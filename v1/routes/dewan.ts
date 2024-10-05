import { Router } from "express";
import DewanController from "../controllers/dewanController";

const router = Router();

router.post("/dewan", DewanController.create);
router.get("/dewan", DewanController.getAll);
router.get("/dewan/:id", DewanController.getById);
router.put("/dewan/:id", DewanController.update);
router.delete("/dewan/:id", DewanController.delete);

export default router;