import db from '../models';
import { Request, Response } from 'express';

const sequelize = db.sequelize;
const Alumni = db.Alumni;

class AlumniController {
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const {name, email, image, phone, jobs, angkatan, jurusan} = req.body;
            const approval = false;
            const alumni = await Alumni.create({name, email, image, phone, jobs, angkatan, jurusan, approval});
            res.status(201).json({ message: 'Alumni created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void> {
        const alumni = await Alumni.findAll();
        try {
            res.status(200).json(alumni);
        } catch (error:any) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const alumni = await Alumni.findByPk(req.params.id);
            res.status(200).json(alumni);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.update(req.body, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async approve(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.update({ approval: true }, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni approved successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async reject(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.update({ approval: false }, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni rejected successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}

export default AlumniController;