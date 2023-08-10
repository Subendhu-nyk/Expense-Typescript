import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        const user = jwt.verify(token, '98sh856ru454t45izklk') as { userId: number };
        console.log(user);
        console.log('userID >>>> ', user.userId);

        try {
            const foundUser = await User.findByPk(user.userId);
            if (foundUser) {
                console.log('user>>', foundUser.toJSON());
                req.user = foundUser;
                next();
            } else {
                throw new Error('User not found');
            }
        } catch (err) {
            throw new Error(err);
        }
    } catch (err) {
        console.log('error' + err);
        res.status(401).json({ success: false });
    }
};

export default {
    authenticate
};
