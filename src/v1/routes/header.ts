import { Router } from "express";
import HeaderController from "../controllers/headerController";
import { upload, uploadToCloudinary } from "../helper/upload";
const router = Router();

router.post("/",upload.single('image'),  uploadToCloudinary, HeaderController.create);
router.get("/", HeaderController.getAll);
router.get("/:id", HeaderController.getById);
router.put("/:id",upload.single('image'),  uploadToCloudinary, HeaderController.update);
router.delete("/:id", HeaderController.delete);

export default router;