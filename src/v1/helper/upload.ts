import dotenv from "dotenv"
import multer, { Multer } from 'multer';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
// import sharp from 'sharp';
import * as XLSX from 'xlsx';
import { Request, Response, NextFunction } from "express";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

interface CloudinaryFile extends Express.Multer.File {
  buffer: Buffer;
}

const storage = multer.memoryStorage();
export const upload: Multer = multer({ storage: storage });

export const uploadToCloudinary = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let files: CloudinaryFile[] = [];
    
    if (req.file) {
      // Single file upload
      files = [req.file as CloudinaryFile];
    } else if (req.files) {
      // Multiple file upload
      files = req.files as CloudinaryFile[];
    }
    else{
      console.log("No files found");
      next()
      return
    }

    const cloudinaryUrls: string[] = [];
    for (const file of files) {
      const resizedBuffer: Buffer = file.buffer;

      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'auto',
            folder: 'iaajofficial',
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result as UploadApiResponse);
          }
        );
        uploadStream.end(resizedBuffer);
      });

      cloudinaryUrls.push(result.secure_url);
    }

    req.body.cloudinaryUrls = cloudinaryUrls;
    next();
    return;
  } catch (error) {
    console.error('Error in uploadToCloudinary middleware:', error);
    return res.status(500).json({ message: 'Error uploading file', error });
  }
};

export const uploadExcel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) {
      console.log("No file uploaded");
      return res.status(400).json({ message: 'No file uploaded' });
    }

    if (req.file.mimetype !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      console.log("Invalid file type");
      return res.status(400).json({ message: 'Invalid file type' });
    }
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[1];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 'A' });
    // console.log(data); 
    req.body.data = data
    next();
  } catch (error) {
    console.error('Error in uploadExcel middleware:', error);
    return res.status(500).json({ message: 'Error uploading file', error });
  }
};