
import { Request, Response } from 'express';
import db from '../models';
import { hashPassword } from '../helper/bcrypt';
const User = db.User;
class UserController{

    public static async create(req: Request, res: Response): Promise<void>{
        try {
            if (!req.body) {
                res.status(400).json({ message: 'Request body is empty' });
                return;
            }
            const { name, email, password, role } = req.body;
            console.log(req.body);
            const getUser = await User.findOne({ where: { email } });
            if (getUser) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }
            const user = User.create({ name, email, password:hashPassword(password), role });
            res.status(201).json({ message: 'User created successfully' });
            return;
        }
        catch (err) {
            res.status(500).json({ message: 'Internal server error' });
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

    public static async getOne(req: Request, res: Response): Promise<void>{
        try {
            let user:any;
            if(req.query.id){
                user = await User.findByPk(req.query.id);
            }
            else if(req.query.email){
            user = await User.findOne({ where: { email: req.query.email } });
            }
            else{
                res.status(400).json({ message: 'Invalid query parameter' });
                return;
            }
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