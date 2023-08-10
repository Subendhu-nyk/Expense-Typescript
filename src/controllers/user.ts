import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

function isStringInvalid(str: string | undefined): boolean {
    return str === undefined || str.length === 0;
}

const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;

        if (isStringInvalid(email) || isStringInvalid(name) || isStringInvalid(phone) || isStringInvalid(password)) {
            return res.status(400).json({ message: "Bad parameter or something is missing" });
        }

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            try {
                const data = await User.create({
                    name,
                    email,
                    phone,
                    password: hash
                });

                res.status(201).json({ message: "new user created" });
            } catch (err) {
                res.status(500).json({ error: "some error", err });
            }
        });

    } catch (err) {
        res.status(500).json({ error: "some error", err });
    }
};

function generateAccessToken(id: number, name: string, ispremiumuser: boolean): string {
    return jwt.sign({ userId: id, name: name, ispremiumuser: ispremiumuser }, '98sh856ru454t45izklk');
}

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (isStringInvalid(email) || isStringInvalid(password)) {
            return res.status(400).json({ message: 'EMail id or password is missing ', success: false });
        }

        const user = await User.findAll({ where: { email } });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    throw new Error('Something went wrong');
                }
                if (result === true) {
                    const token = generateAccessToken(user[0].id, user[0].name, user[0].ispremiumuser);
                    return res.status(200).json({ success: true, message: "User logged in successfully", token });
                } else {
                    return res.status(400).json({ success: false, message: 'Password is incorrect' });
                }
            });
        } else {
            return res.status(404).json({ success: false, message: 'User Does not exist' });
        }
    } catch (err) {
        res.status(500).json({ message: err, success: false });
    }
};

export default {
    login,
    signup,
    generateAccessToken
};
