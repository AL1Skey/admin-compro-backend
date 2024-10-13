import AboutUsController from "../controllers/aboutUsController";
import { Router } from "express";
import { upload, uploadToCloudinary } from "../helper/upload";

const router = Router();

router.get("/", AboutUsController.get);
router.put("/",upload.single('image'),uploadToCloudinary, AboutUsController.update);

export default router;