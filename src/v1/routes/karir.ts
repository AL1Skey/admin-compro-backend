import { Router } from "express";
import KarirController from "../controllers/karirController";
import { upload, uploadToCloudinary } from "../helper/upload";

const router = Router();

router.post("/",upload.single('image'),uploadToCloudinary, KarirController.create);
router.get("/", KarirController.getAll);
router.get("/:id", KarirController.getById);
router.put("/:id",upload.single('image'),uploadToCloudinary, KarirController.update);
router.delete("/:id", KarirController.delete);

export default router;