import db from "../models";
import { Request, Response } from "express";

const Header = db.Header;
class HeaderController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const cloudinaryUrls = req.body.cloudinaryUrls;
      if (cloudinaryUrls.length === 0) {
        console.error("No Cloudinary URLs found.");
        res.status(500).send("Internal Server Error");
        return;
      }
      const image = cloudinaryUrls[0];
      console.log(req.body, "<<<<<<<<<<<<<<<<<<");
      const header = await Header.create({ image, title, description });
      res.status(201).json({ message: "Header created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const header = await Header.findAll();
      const filteredHeaders = header.map((h: any) => {
        return {
          id: h.id,
          image: h.image,
          title: h.title,
          description: h.description,
        };
      });
      console.log(header, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
      res.status(200).json(filteredHeaders);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const header = await Header.findByPk(req.params.id);
      res.status(200).json(header);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const data:{[key:string]:any} = { title, description }
      const cloudinaryUrls = req.body.cloudinaryUrls;
      if (cloudinaryUrls?.length === 0) {
        console.error("No Cloudinary URLs found.");
        res.status(500).send("Internal Server Error");
        return;
      }
      if(cloudinaryUrls){
       data["image"] = cloudinaryUrls[0];
      }
      console.log(req.params.id, "<<<<<<<<<<", data,"<<<<<<<<",req.body);
      await Header.update(
        data,
        { where: { id: req.params.id } }
      );
      res.status(200).json({ message: "Header updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      await Header.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Header deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }
}

export default HeaderController;
