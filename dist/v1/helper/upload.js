"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = exports.upload = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
dotenv_1.default.config();
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage: storage });
const uploadToCloudinary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let files = [];
        if (req.file) {
            // Single file upload
            files = [req.file];
        }
        else if (req.files) {
            // Multiple file upload
            files = req.files;
        }
        else {
            console.log("No files found");
            next();
        }
        const cloudinaryUrls = [];
        for (const file of files) {
            const resizedBuffer = file.buffer;
            const result = yield new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: 'auto',
                    folder: 'iaajofficial',
                }, (err, result) => {
                    if (err)
                        reject(err);
                    else
                        resolve(result);
                });
                uploadStream.end(resizedBuffer);
            });
            cloudinaryUrls.push(result.secure_url);
        }
        req.body.cloudinaryUrls = cloudinaryUrls;
        next();
    }
    catch (error) {
        console.error('Error in uploadToCloudinary middleware:', error);
        return res.status(500).json({ message: 'Error uploading file', error });
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
//# sourceMappingURL=upload.js.map