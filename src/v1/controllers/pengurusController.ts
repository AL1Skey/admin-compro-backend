import { Request, Response } from 'express';
import db from '../models';
const Pengurus = db.Pengurus;
class PengurusController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { image, name, position, description, phone, email, facebook, instagram, twitter } = req.body;
      const data:{[key:string]:any} = req.body;

      const cloudinaryUrls = req.body.cloudinaryUrls;

      // Check if there are any Cloudinary URLs
      if (cloudinaryUrls?.length === 0) {
        console.error("No Cloudinary URLs found.");
        throw new Error("No Cloudinary URLs found.");
      }
      if (cloudinaryUrls) {
        data["image"] = cloudinaryUrls[0];
      }

      const pengurus = await Pengurus.create(data);
      res.status(201).json({ message: 'Pengurus created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    } finally{
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
      const pengurus = await Pengurus.findAll(condition);
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
      const data:{[key:string]:any} = req.body;

      const cloudinaryUrls = req.body.cloudinaryUrls;

      // Check if there are any Cloudinary URLs
      if (cloudinaryUrls?.length === 0) {
        console.error("No Cloudinary URLs found.");
        throw new Error("No Cloudinary URLs found.");
      }
      if (cloudinaryUrls) {
        data["image"] = cloudinaryUrls[0];
      }
      await Pengurus.update(data, { where: { id: req.params.id } });
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