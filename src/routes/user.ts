import express from 'express';
import { Request, Response } from 'express';
import path from 'path';
import userController from '../controllers/user';
import Sequelize from '../models/expense';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cors());
router.use(express.static(path.join(__dirname, 'public')));
router.use(express.static(path.join(__dirname, '..', 'views')));

router.post('/signup', (req: Request, res: Response) => {
  userController.signup(req, res);
});

router.post('/login', (req: Request, res: Response) => {
  userController.login(req, res);
});

export default router;
