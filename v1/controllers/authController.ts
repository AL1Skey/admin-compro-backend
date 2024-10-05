import User from "../models/index";

import { Request, Response } from 'express';

class AuthController {
    public static async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            if (user.password !== password) {
                res.status(401).json({ message: 'Invalid credentials' });
            }
            res.status(200).json({ message: 'Login successful' });
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    public static async register(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email, password, role } = req.body;
            const user = User.create({ firstName, lastName, email, password, role });
            res.status(201).json({ message: 'User created successfully' });
        }
        catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    public static async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json({ message: 'Password reset link sent to email' });
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    public static async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            user.password = password;
            await user.save();
            res.status(200).json({ message: 'Password reset successful' });
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default AuthController;