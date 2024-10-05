
import { Request, Response } from 'express';
import db from '../models';
const User = db.User;
class UserController{

    public static async create(req: Request, res: Response): Promise<void>{
        try {
            const { firstName, lastName, email, password, role } = req.body;
            const user = await User.create({ firstName, lastName, email, password, role});
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally{
            return;
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void>{
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally{
            return;
        }
    }

    public static async getById(req: Request, res: Response): Promise<void>{
        try {
            const user = await User.findByPk(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally{
            return;
        }
    }

    public static async update(req: Request, res: Response): Promise<void>{
        try {
            await User.update(req.body, { where: { id: req.params.id } });
            res.status(200).json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally{
            return;
        }
    }

    public static async delete(req: Request, res: Response): Promise<void>{
        try {
            await User.destroy({ where: { id: req.params.id } });
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        } finally{
            return;
        }
    }
}

export default UserController;