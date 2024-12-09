import db from "../models";
import { query, Request, Response } from "express";

const Dewan = db.Dewan;
class DewanController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const {
        image,
        name,
        position,
        description,
        phone,
        email,
        facebook,
        instagram,
        twitter,
      } = req.body;

      const data: { [key: string]: any } = req.body;
      const cloudinaryUrls = req.body.cloudinaryUrls;

      // Check if there are any Cloudinary URLs
      if (cloudinaryUrls?.length === 0) {
        console.error("No Cloudinary URLs found.");
        throw new Error("No Cloudinary URLs found.");
      }
      if (cloudinaryUrls) {
        data["image"] = cloudinaryUrls[0];
      }

      const dewan = await Dewan.create(data);
      //RESPONSE NEEED TO BE 203
      res.status(201).json({ message: "Dewan created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      let condition: { [key: string]: any } = {};
      if(req.query){
        let query:any[] = [];
        if(req.query.name){
          query.push({"name":req.query.name});
        }
        
        condition["where"] = query;
    }
      
      const dewan = await Dewan.findAll(condition);
      res.status(200).json(dewan);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const dewan = await Dewan.findByPk(req.params.id);
      res.status(200).json(dewan);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const data: { [key: string]: any } = req.body;
      const cloudinaryUrls = req.body.cloudinaryUrls;

      // Check if there are any Cloudinary URLs
      if (cloudinaryUrls?.length === 0) {
        console.error("No Cloudinary URLs found.");
        throw new Error("No Cloudinary URLs found.");
      }
      if (cloudinaryUrls) {
        data["image"] = cloudinaryUrls[0];
      }
      console.log(data);
      await Dewan.update(data, { where: { id: req.params.id } });
      res.status(203).json({ message: "Dewan updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      await Dewan.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Dewan deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }
}

export default DewanController;
