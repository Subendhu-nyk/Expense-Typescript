import { Request, Response } from 'express';
import { User } from '../models/user';
import sequelize from '../util/expense';

const getUserLeaderBoard = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll(
            {
                // attributes: ['id', 'name', [sequelize.fn('sum', sequelize.col('expenses.price')), 'total_cost']],
                // include: [
                //     {
                //         model: Expense,
                //         attributes: []
                //     }
                // ],
                // group: ['user.id'],
                order: [[('totalExpense'), 'DESC']]
            }
        );

        // const userAggregatedExpenses: { [key: number]: number } = {};
        // expenses.forEach((expense) => {
        //     if (userAggregatedExpenses[expense.userId]) {
        //         userAggregatedExpenses[expense.userId] += expense.price;
        //     } else {
        //         userAggregatedExpenses[expense.userId] = expense.price;
        //     }
        // });

        // const UserLeaderBoardDetails: { name: string; total_cost: number }[] = [];
        // users.forEach((user) => {
        //     UserLeaderBoardDetails.push({ name: user.name, total_cost: userAggregatedExpenses[user.id] || 0 });
        // });

        // UserLeaderBoardDetails.sort((a, b) => b.total_cost - a.total_cost);

        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

export default {
    getUserLeaderBoard
};
