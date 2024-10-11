import { Request, Response } from "express";
import db from "../models";
const Karir = db.Karir;
class KarirController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { image, end_date, title, description, email } = req.body;

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

      data.end_date = new Date(data.end_date);

      const karir = await Karir.create(data);
      res.status(201).json({ message: "Karir created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const karir = await Karir.findAll();

      const formattedKarir = karir.map((b: any) => {
        const formattedData = { ...b.dataValues };
        if (formattedData.end_date instanceof Date) {
          formattedData.end_date = formattedData.end_date.toDateString();
        }
        return formattedData;
      });

      res.status(200).json(formattedKarir);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const karir = await Karir.findByPk(req.params.id);
      karir.end_date = karir.end_date.toDateString();
      res.status(200).json(karir);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { image, end_date, title, description, email } = req.body;

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

      if (data.end_date) {
        data.end_date = new Date(data.end_date);
      }
      await Karir.update(
        data,
        { where: { id: req.params.id } }
      );
      res.status(200).json({ message: "Karir updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      await Karir.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Karir deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }
}

export default KarirController;
