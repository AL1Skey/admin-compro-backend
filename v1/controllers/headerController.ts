import Header from "../models/index";
import { Request, Response } from "express";

class HeaderController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { image, title, description } = req.body;
      const header = await Header.create({ image, title, description });
      res.status(201).json({ message: "Header created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
        const header = await Header.findAll();
        res.status(200).json(header);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
        const header = await Header.findByPk(req.params.id);
        res.status(200).json(header);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
        await Header.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ message: "Header updated successfully" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
        await Header.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Header deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default HeaderController;
