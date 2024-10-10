import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../helper/jwt';
import db from '../models';
import { JwtPayload } from 'jsonwebtoken';

const User = db.User;

interface AuthenticatedRequest extends Request {
    user?: any;
}

async function authenticate(token: string | undefined): Promise<any> {
    try {
        if (!token) {
            return { status: false, message: 'Unauthenticated' };
        }

        token = token.split(' ')[1];
        const { id } = verifyToken(token) as JwtPayload;
        const user = await User.findByPk(id);

        if (!user) {
            return { status: false, message: 'User Not Found' };
        }

        return { status: true, user };

    } catch (err) {
        console.log(err);
        return { status: false, message: 'Internal server error' };
    }
}

class Auth {
    public static async authOnly(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const token: string | undefined = req.headers.authorization;
            const data = await authenticate(token);

            if (!data.status) {
                // Return early, don't call next if an error occurred
                return res.status(401).json({ message: data.message });
            }

            req.user = data.user;
            next();

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal server error in Authentication Only', error: err });
        }
    }

    public static async superAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const token = req.headers.authorization;
            const data = await authenticate(token);

            if (!data.status) {
                return res.status(401).json({ message: data.message });
            }

            if (data.user.role !== 'superadmin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            req.user = data.user;
            next();

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal server error in Authentication Super Admin' });
        }
    }

    public static async admin(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<any> {
        try {
            const token = req.headers.authorization;
            const data = await authenticate(token);

            if (!data.status) {
                return res.status(401).json({ message: data.message });
            }

            if (data.user.role !== 'admin') {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            req.user = data.user;
            next();

        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Internal server error in Authentication Admin' });
        }
    }
}

export default Auth;
