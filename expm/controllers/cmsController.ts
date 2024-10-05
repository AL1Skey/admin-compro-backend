import CMS from '../models/cms';
import { Request, Response } from 'express';

class CMSController{
    public static async create(req: Request, res: Response): Promise<void>{
        try{
            const { title, content } = req.body;
            const cms = new CMS({ title, content });
            await cms.save();
            res.status(201).json({ message: 'CMS created successfully' });
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void>{
        try{
            const cms = await CMS.find();
            res.status(200).json(cms);
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void>{
        try{
            const cms = await CMS.findById(req.params.id);
            res.status(200).json(cms);
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async update(req: Request, res: Response): Promise<void>{
        try{
            await CMS.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: 'CMS updated successfully' });
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void>{
        try{
            await CMS.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'CMS deleted successfully' });
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default CMSController;