import dotenv from "dotenv"
import multer, { Multer } from 'multer';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import sharp from 'sharp';
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

    if (files.length === 0) {
      next();
    }

    const cloudinaryUrls: string[] = [];
    for (const file of files) {
      const resizedBuffer: Buffer = await sharp(file.buffer)
        .resize({ width: 800, height: 600 })
        .toBuffer();

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
  } catch (error) {
    console.error('Error in uploadToCloudinary middleware:', error);
    return res.status(500).json({ message: 'Error uploading file', error });
  }
};