import { Router } from "express";
import PengurusController from "../controllers/pengurusController";
import { upload, uploadToCloudinary } from "../helper/upload";

const router = Router();

router.post("/",upload.single('image'),uploadToCloudinary, PengurusController.create);
router.get("/", PengurusController.getAll);
router.get("/:id", PengurusController.getById);
router.put("/:id",upload.single('image'),uploadToCloudinary, PengurusController.update);
router.delete("/:id", PengurusController.delete);

export default router;
