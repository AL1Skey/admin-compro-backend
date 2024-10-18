import { log } from 'console';
import { comparePassword, hashPassword } from '../helper/bcrypt';
import { generateToken } from '../helper/jwt';
import sendResetEmail from '../helper/mailer';
import db from '../models';
import { Request, Response } from 'express';

const User = db.User;
const Role = db.Role;
const ForgotPassword = db.ForgotPassword;

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
            const [role,created] = await Role.findOrCreate({ where: { value: user.role },
                defaults: {
                    name: req?.body?.role?.name,
                    value: req?.body?.role?.value,
                  },
                 });
            const token = generateToken({ id: user.id, name:user.name, email: user.email, role: role?.value });
            res.status(200).json({ message: 'Login successful',token });
            return
        } catch (err) {
            res.status(500).json({ message: 'Internal server error',err });
            return;
        }
    }

    public static async register(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body) {
                res.status(400).json({ message: 'Request body is empty' });
                return;
            }
            console.log(req.body);
            const { name, email, password, role } = req.body;
            const data:{[key:string]:any} = req.body;
            console.log(data.role);
            const dataRole = await Role.findOne({ where: { value: Object.values(data.role)[0] } });
            if(!dataRole){
                await Role.create({ value: Object.values(role)[0] });
                data.role = Object.values(role)[0];
            }
           else{
                data.role = dataRole.value;
           }
            console.log(req.body);
            const getUser = await User.findOne({ where: { email } });
            if (getUser) {
                res.status(409).json({ message: 'User already exists' });
                return;
            }
            const user = User.create({ name, email, password:hashPassword(password), role:data.role });
            res.status(201).json({ message: 'User created successfully' });
            return;
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async forgotPassword(req: Request, res: Response): Promise<void>{
        try {
            console.log(req.body,"forgot password");
            const { email } = req.body;
            const user = await User.findOne({ where: { email } });
            console.log("user",user);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const token = Math.random().toString(36).substring(7);

            const [forgot, created] = await ForgotPassword.findOrCreate({ where: { email }, defaults: { email,token } });
            console.log(forgot,created,"ASSSSSSSSSSSSSS");
            // await sendResetEmail(email, forgot.token);
            console.log("email sent");
            res.status(200).json({ message: 'Password reset link sent to email',token: forgot.token });
            return
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }

    public static async getResetPassword(req: Request, res: Response): Promise<void>{
        try {
            const { token } = req.params;
            const forgot = await ForgotPassword.findOne({ where: { token } });
            if (!forgot) {
                res.status(404).json({ message: 'Invalid token' });
                return;
            }
            console.log(forgot);
            res.status(200).json({ message: 'Token verified', email: forgot.email });
            return
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error',err });
            return;
        }
    }

    public static async resetPassword(req: Request, res: Response): Promise<void>{
        try {
            let { email, token, password } = req.body;
            token = req.params.token;
            
            const user = await User.findOne({ where: { email } });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const forgot = await ForgotPassword.findOne({ where: { email, token } });
            if (!forgot) {
                res.status(404).json({ message: 'Invalid token' });
                return;
            }
            await User.update({ password: hashPassword(password) }, { where: { email } });
            await ForgotPassword.destroy({ where: { email, token } });
            res.status(200).json({ message: 'Password reset successful' });
            return
        } catch (err) {
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
    }
}

export default AuthController;