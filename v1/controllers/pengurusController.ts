import { Request, Response } from 'express';
import db from '../models';
const Pengurus = db.Pengurus;
class PengurusController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { image, name, position, description, phone, email, facebook, instagram, twitter } = req.body;
      const pengurus = await Pengurus.create({
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
      res.status(201).json({ message: 'Pengurus created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    } finally{
        return;
    }
  }

  public static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const pengurus = await Pengurus.findAll();
      res.status(200).json(pengurus);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    } finally{
        return;
    }
  }

  public static async getById(req: Request, res: Response): Promise<void> {
    try {
      const pengurus = await Pengurus.findByPk(req.params.id);
      res.status(200).json(pengurus);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    } finally{
        return;
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      await Pengurus.update(req.body, { where: { id: req.params.id } });
      res.status(200).json({ message: 'Pengurus updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    } finally{
        return;
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      await Pengurus.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: 'Pengurus deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    } finally{
        return;
    }
  }
}

export default PengurusController;