import db from '../models';
import sequelize from 'sequelize';
import { Request, Response } from 'express';
const Jurusan = db.Jurusan;

class JurusanController{
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const data:{[key:string]:any} = req.body;
            const jurusan = await Jurusan.create(data);
            res.status(201).json({ message: 'Jurusan created successfully' });
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }
    public static async getAll(req: Request, res: Response): Promise<void> {
        try {
            if (!Jurusan) {
                throw new Error('Jurusan model is not defined');
            }
            const jurusan = await Jurusan.findAll();
            if(jurusan.length === 0 || jurusan === null) {
                res.status(404).json([]);
                return;
            }
            res.status(200).json(jurusan);
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }

    public static async getById(req: Request, res: Response): Promise<void> {
        try {
            if (!Jurusan) {
                throw new Error('Jurusan model is not defined');
            }
            const jurusan = await Jurusan.findByPk(req.params.id);
            if(jurusan === null) {
                res.status(404).json({message: 'Jurusan not found'});
                return;
            }
            res.status(200).json(jurusan);
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }

    public static async update(req: Request, res: Response): Promise<void> {
        try {
            if (!Jurusan) {
                throw new Error('Jurusan model is not defined');
            }
            const data:{[key:string]:any} = req.body;
            const jurusan = await Jurusan.findByPk(req.params.id);
            if(jurusan === null) {
                res.status(404).json({message: 'Jurusan not found'});
                return;
            }
            await Jurusan.update(data, {where: {id: req.params.id}});
            res.status(200).json({message: 'Jurusan updated successfully'});
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }

    public static async delete(req: Request, res: Response): Promise<void> {
        try {
            if (!Jurusan) {
                throw new Error('Jurusan model is not defined');
            }
            await Jurusan.destroy({where: {id: req.params.id}});
            res.status(200).json({message: 'Jurusan deleted successfully'});
            return;
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
            return;
        }
    }

}

export default JurusanController;