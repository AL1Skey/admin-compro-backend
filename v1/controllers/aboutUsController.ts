import { Request, Response } from "express";
import db from "../models";

const AboutUs = db.aboutUs;

class AboutUsController{
    static async create(req: Request, res: Response){
        try {
        const { title, description } = req.body;
        const aboutUs = await AboutUs.create({ title, description });
        res.status(201).json({ message: "About Us created successfully", aboutUs });
        } catch (error:any) {
        res.status(500).json({ message: error.message });
        }
        finally {
            return;
        }
    }
    
    static async get(req: Request, res: Response){
        try {
        const aboutUs = await AboutUs.findOne();
        res.status(200).json({ aboutUs });
        } catch (error:any) {
        res.status(500).json({ message: error.message });
        }
        finally {
            return;
        }
    }
    
    static async update(req: Request, res: Response){
        try {
        const { title, description, visi, misi } = req.body;
        const data:{[key:string]:any} = { title, description, visi, misi }
        const cloudinaryUrls = req.body.cloudinaryUrls;
        
        // Check if there are any Cloudinary URLs
        if (cloudinaryUrls?.length === 0) {
            console.error("No Cloudinary URLs found.");
            res.status(500).send("Internal Server Error");
            return;
          }
        if(cloudinaryUrls){
           data["image"] = cloudinaryUrls[0];
        }
        
        const aboutUs = await AboutUs.findOne();
        if (!aboutUs) {
            await AboutUs.create(data);
            res.status(201).json({ message: "About Us succesfully created" });
        } else {
            await AboutUs.update(data, { where: { id: aboutUs.id } });
            res.status(200).json({ message: "About Us updated successfully", aboutUs });
        }
        } catch (error:any) {
            res.status(500).json({ message: error.message });
        }
        finally {
            return;
        }
    }
}

export default AboutUsController;