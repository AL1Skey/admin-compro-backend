import { Router } from "express";
import BlogController from "../controllers/blogController";
import { upload, uploadToCloudinary } from "../helper/upload";

const router = Router();

router.post("/",upload.single('image'),uploadToCloudinary, BlogController.create);
router.get("/", BlogController.getAll);
router.get("/:id", BlogController.getById);
router.put("/:id",upload.single('image'),uploadToCloudinary, BlogController.update);
router.delete("/:id", BlogController.delete);


export default router;