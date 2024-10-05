import exp from 'constants';
import User from '../models/index';

import { Request, Response } from 'express';

class UserController{

    public static async create(req: Request, res: Response): Promise<void>{
        try {
            const { firstName, lastName, email, password, role } = req.body;
            const user = await User.create({ firstName, lastName, email, password, role});
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void>{
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void>{
        try {
            const user = await User.findByPk(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async update(req: Request, res: Response): Promise<void>{
        try {
            await User.update(req.body, { where: { id: req.params.id } });
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void>{
        try {
            await User.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default UserController;