import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import Order from '../models/orders';
import userController from './user';
import { Op } from 'sequelize';

const purchasepremium = async (req: Request, res: Response): Promise<void> => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RZP_KEY,
            key_secret: process.env.RZP_SECRET
        });
        const amount = 2500;

        rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({ orderid: order.id, status: 'PENDING' }).then(() => {
                return res.status(201).json({ order, key_id: rzp.key_id });
            }).catch(err => {
                throw new Error(err);
            });
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: 'Something went wrong', error: err });
    }
};

const updateTransactionStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user.id;
        const { payment_id, order_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const promise1 = order.update({ paymentid: payment_id, status: 'SUCCESSFUL' });
        const promise2 = req.user.update({ ispremiumuser: true });

        Promise.all([promise1, promise2]).then(() => {
            return res.status(202).json({
                success: true,
                message: 'Transaction Successful',
                token: userController.generateAccessToken(userId, undefined, true)
            });
        }).catch((error) => {
            console.error('Error during Promise.all:', error);
            // return res.status(500).json({ message: "Something went wrong", error: error });
        });
    } catch (err) {
        console.error('Error in updateTransactionStatus:', err);
        res.status(403).json({ message: 'Something went wrong', error: err });
    }
};

export default {
    purchasepremium,
    updateTransactionStatus
};
