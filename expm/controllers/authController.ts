import User from '../models/user';
import { comparePassword } from '../helper/bcrypt';
import { Request, Response } from 'express';

class AuthController{
    public static async register(req: Request, res: Response): Promise<any>{
        try{
            const { name, email, password, role } = req.body;
            const user = new User({ name, email, password, role });
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async login(req: Request, res: Response): Promise<any>{
        try{
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({ message: 'User not found' });
            }
            if(!(await comparePassword(password, user.password))){
                return res.status(400).json({ message: 'Invalid password' });
            }
            res.status(200).json({ message: 'User logged in successfully' });
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default AuthController;
