import { Router } from "express";
import BlogController from "../controllers/blogController";

const router = Router();

router.post("/blog", BlogController.create);
router.get("/blog", BlogController.getAll);
router.get("/blog/:id", BlogController.getById);
router.put("/blog/:id", BlogController.update);
router.delete("/blog/:id", BlogController.delete);


export default router;