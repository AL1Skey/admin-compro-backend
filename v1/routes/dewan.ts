import { Router } from "express";
import DewanController from "../controllers/dewanController";
import { upload, uploadToCloudinary } from "../helper/upload";

const router = Router();

router.post("/",upload.single('image'),uploadToCloudinary, DewanController.create);
router.get("/", DewanController.getAll);
router.get("/:id", DewanController.getById);
router.put("/:id",upload.single('image'),uploadToCloudinary, DewanController.update);
router.delete("/:id", DewanController.delete);

export default router;