import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';

import sequelize from '../models/expense';
import postExpenseController from '../controllers/expense';
import userauthentication from '../middleware/auth';

const router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static(path.join(__dirname, '..', 'views')));

router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.post('/user/add-expense', userauthentication.authenticate, postExpenseController.postExpense);
router.get('/user/get-expense', userauthentication.authenticate, postExpenseController.getExpense);
router.delete('/user/delete-expense/:id', userauthentication.authenticate, postExpenseController.deleteExpense);
router.get('/download', userauthentication.authenticate, postExpenseController.downloadExpenses);

export default router;