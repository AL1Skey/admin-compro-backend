import Dewan from "../models/index";
import { Request, Response } from "express";

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
      const dewan = await Dewan.create({
        image,
        name,
        position,
        description,
        phone,
        email,
        facebook,
        instagram,
        twitter,
      });
      res.status(201).json({ message: "Dewan created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
        const dewan = await Dewan.findAll();
        res.status(200).json(dewan);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
        const dewan = await Dewan.findByPk(req.params.id);
        res.status(200).json(dewan);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
        await Dewan.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ message: "Dewan updated successfully" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
        await Dewan.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Dewan deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        }
    }
    
}

export default DewanController;