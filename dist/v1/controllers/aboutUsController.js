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
const models_1 = __importDefault(require("../models"));
const AboutUs = models_1.default.AboutUs;
class AboutUsController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description } = req.body;
                const aboutUs = yield AboutUs.create({ title, description });
                res.status(201).json({ message: "About Us created successfully", aboutUs });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const aboutUs = yield AboutUs.findOne();
                res.status(200).json({ data: aboutUs });
                return;
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, visi, misi } = req.body;
                const data = { title, description, visi, misi };
                const cloudinaryUrls = req.body.cloudinaryUrls;
                // Check if there are any Cloudinary URLs
                if ((cloudinaryUrls === null || cloudinaryUrls === void 0 ? void 0 : cloudinaryUrls.length) === 0) {
                    console.error("No Cloudinary URLs found.");
                    throw new Error("No Cloudinary URLs found.");
                }
                if (cloudinaryUrls) {
                    data["image"] = cloudinaryUrls[0];
                }
                const aboutUs = yield AboutUs.findOne();
                if (!aboutUs) {
                    yield AboutUs.create(data);
                    return res.status(201).json({ message: "About Us succesfully created" });
                    ;
                }
                else {
                    yield AboutUs.update(data, { where: { id: aboutUs.id } });
                    // return res.status(200).json({ message: "About Us updated successfully", aboutUs });
                    ;
                }
            }
            catch (error) {
                console.log(error);
                next(error);
                ;
            }
        });
    }
}
exports.default = AboutUsController;
