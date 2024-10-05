import db from "../models";
import { Request, Response } from "express";

const Footer = db.Footer;
class FooterController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { address, phone, email, facebook, instagram, twitter } = req.body;
      const footer = await Footer.create({
        address,
        phone,
        email,
        facebook,
        instagram,
        twitter,
      });
      res.status(201).json({ message: "Footer created successfully" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    } finally {
      return;
    }
  }

    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
        const footer = await Footer.findAll();
        res.status(200).json(footer);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        } finally{
            return;
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
        const footer = await Footer.findByPk(req.params.id);
        res.status(200).json(footer);
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        } finally{
            return;
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
        await Footer.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({ message: "Footer updated successfully" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        } finally{
            return;
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
        await Footer.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Footer deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        } finally{
            return;
        }
    }
}

export default FooterController;