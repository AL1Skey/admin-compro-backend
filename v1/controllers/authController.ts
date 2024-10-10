import { comparePassword, hashPassword } from '../helper/bcrypt';
import { generateToken } from '../helper/jwt';
import db from '../models';
import { Request, Response } from 'express';

const User = db.User;

class AuthController {
    public static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const compare = comparePassword(password, user.password);
            if (!compare) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
            const token = generateToken({ id: user.id, email: user.email, role: user.role });
            res.status(200).json({ message: 'Login successful',token });
            return
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async register(req: Request, res: Response): Promise<void> {
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

    public static async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.status(200).json({ message: 'Password reset link sent to email' });
            return
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
            return
        }
    }

    public static async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            user.password = password;
            await user.save();
            res.status(200).json({ message: 'Password reset successful' });
            return
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
            return
        }
    }
}

export default AuthController;