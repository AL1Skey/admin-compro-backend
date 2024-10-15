import { Router } from "express";
import { upload,uploadExcel } from "../helper/upload";
import ExcelController from "../controllers/excelController";
const router = Router();

router.post("/alumni", upload.single("file"), uploadExcel,ExcelController.uploadAlumni);
router.get("/alumni", ExcelController.downloadAlumni);
export default router