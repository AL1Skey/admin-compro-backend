import { Router } from "express";
import HeaderController from "../controllers/headerController";

const router = Router();

router.post("/header", HeaderController.create);
router.get("/header", HeaderController.getAll);
router.get("/header/:id", HeaderController.getById);
router.put("/header/:id", HeaderController.update);
router.delete("/header/:id", HeaderController.delete);

export default router;