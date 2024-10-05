import User from '../models/user';
import { Request, Response } from 'express';
class UserController{
    public static async create(req: Request, res: Response): Promise<void>{
        try{
            const { name, email, password, role } = req.body;
            const user = new User({ name, email, password, role });
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async getAll(req: Request, res: Response): Promise<void>{
        try{
            const users = await User.find();
            res.status(200).json(users);
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async getById(req: Request, res: Response): Promise<void>{
        try{
            const user
            = await User.findById(req.params.id);
            res.status(200).json(user);
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async update(req: Request, res: Response): Promise<void>{
        try{
            await User.findByIdAndUpdate(req
            .params.id, req.body);
            res.status(200).json({ message: 'User updated successfully' });
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async delete(req: Request, res: Response): Promise<void>{
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'User deleted successfully' });
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default UserController;