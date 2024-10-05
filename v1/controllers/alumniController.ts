import db from '../models';
import { Request, Response } from 'express';
const Alumni = db.Alumni;

class AlumniController {
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const {name, email, image, phone, jobs, angkatan, jurusan} = req.body;
            const approval = false;
            const alumni = await Alumni.create({name, email, image, phone, jobs, angkatan, jurusan, approval});
            res.status(201).json({ message: 'Alumni created successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            if (!Alumni) {
                throw new Error('Alumni model is not defined');
            }
            const alumni = await Alumni.findAll();
            if(alumni.length === 0 || alumni === null) {
                res.status(404).json({ message: 'Alumni not found' });
                return;
            }
            res.status(200).json(alumni);
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            const alumni = await Alumni.findByPk(req.params.id);
            res.status(200).json(alumni);
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.update(req.body, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni updated successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni deleted successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async approve(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.update({ approval: true }, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni approved successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async reject(req: Request, res: Response): Promise<void> {
        try {
            await Alumni.update({ approval: false }, { where: { id: req.params.id } });
            res.status(200).json({ message: 'Alumni rejected successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

}

export default AlumniController;