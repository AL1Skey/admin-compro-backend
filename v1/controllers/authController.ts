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
            if (user.password !== password) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }
            res.status(200).json({ message: 'Login successful' });
            return
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async register(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password, role } = req.body;
            const user = User.create({ name, email, password, role });
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