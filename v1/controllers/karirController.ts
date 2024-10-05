import Karir from "../models/index";
import { Request, Response } from "express";

class KarirController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { image, end_date, title, description, link } = req.body;
      const karir = await Karir.create({
        image,
        end_date: new Date(end_date),
        title,
        description,
        link,
      });
      res.status(201).json({ message: "Karir created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const karir = await Karir.findAll();
      res.status(200).json(karir);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const karir = await Karir.findByPk(req.params.id);
      res.status(200).json(karir);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
        const { image, end_date, title, description, link } = req.body;
      await Karir.update({ image, end_date, title, description, link }, { where: { id: req.params.id } });
      res.status(200).json({ message: "Karir updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      await Karir.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Karir deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default KarirController;
