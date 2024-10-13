import { Request, Response, NextFunction } from "express";
import db from "../models";

const AboutUs = db.AboutUs;

class AboutUsController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description } = req.body;
            const aboutUs = await AboutUs.create({ title, description });
            res.status(201).json({ message: "About Us created successfully", aboutUs });
            return;
        } catch (error: any) {
            next(error);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const aboutUs = await AboutUs.findOne();
            res.status(200).json({ data: aboutUs });
            return;
        } catch (error: any) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, visi, misi } = req.body;
            const data: { [key: string]: any } = { title, description, visi, misi };
            const cloudinaryUrls = req.body.cloudinaryUrls;

            // Check if there are any Cloudinary URLs
            if (cloudinaryUrls?.length === 0) {
                console.error("No Cloudinary URLs found.");
                throw new Error("No Cloudinary URLs found.");
            }
            if (cloudinaryUrls) {
                data["image"] = cloudinaryUrls[0];
            }

            const aboutUs = await AboutUs.findOne();
            if (!aboutUs) {
                await AboutUs.create(data);
                return res.status(201).json({ message: "About Us succesfully created" });
                ;
            } else {
                await AboutUs.update(data, { where: { id: aboutUs.id } });
                // return res.status(200).json({ message: "About Us updated successfully", aboutUs });
                ;
            }
        } catch (error: any) {
            console.log(error);
            next(error);
            ;
        }
    }
}

export default AboutUsController;
