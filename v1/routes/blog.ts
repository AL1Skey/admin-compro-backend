import { Router } from "express";
import BlogController from "../controllers/blogController";

const router = Router();

router.post("/", BlogController.create);
router.get("/", BlogController.getAll);
router.get("/:id", BlogController.getById);
router.put("/:id", BlogController.update);
router.delete("/:id", BlogController.delete);


export default router;