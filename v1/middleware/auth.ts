import {Request, Response, NextFunction} from 'express';
import { verifyToken } from '../helper/jwt';
import User from '../models/index';
import { JwtPayload } from 'jsonwebtoken';

// Extending the Request interface to include 'user'
interface AuthenticatedRequest extends Request {
    user?: any;
}

class Auth{
    
    public static async authenticate(token:string|undefined): Promise<any>{
        try{
            // Check if the user is authenticated
            // If the user is authenticated, call next()
            // If the user is not authenticated, return res.status(401).json({ message: 'Unauthenticated' });

            if(!token){
                return { status:false ,message: 'Unauthenticated' };
            }

            const {id} = verifyToken(token) as JwtPayload;
            const user = await User.findByPk(id);

            if(!user){
                return { status:false, message: 'User Not Found' };
            }

            return { status:true, user };

        }catch(err){
            return { status:false, message: 'Internal server error' };
        }
    }

    public static async authOnly(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any>{
        try{
            const token:string|undefined = req.headers.authorization;

            const data = await this.authenticate(token);
            
            if(!data.status){
                return res.status(401).json({ message: data.message });
            }

            req.user = data.user;

            next();
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }


    public static async superAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any>{
        try{
            const token = req.headers.authorization;

            const data = await this.authenticate(token);
            
            if(!data.status){
                return res.status(401).json({ message: data.message });
            }

            if(data.user.role !== 'superadmin'){
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = data.user;

            next();
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public static async admin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any>{
        try{
            const token = req.headers.authorization;

            const data = await this.authenticate(token);
            
            if(!data.status){
                return res.status(401).json({ message: data.message });
            }

            if(data.user.role !== 'admin'){
                return res.status(401).json({ message: 'Unauthorized' });
            }

            req.user = data.user;

            next();
        }catch(err){
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default Auth;