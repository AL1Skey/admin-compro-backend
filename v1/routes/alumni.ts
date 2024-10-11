import AlumniController from "../controllers/alumniController";
import { Router } from "express";
import { upload, uploadToCloudinary } from "../helper/upload";

const router = Router();

router.post("/",upload.single('image'),uploadToCloudinary, AlumniController.create);
router.get("/", AlumniController.getAll);
router.get("/:id", AlumniController.getById);
router.put("/:id",upload.single('image'),uploadToCloudinary, AlumniController.update);
router.delete("/:id", AlumniController.delete);

export default router;