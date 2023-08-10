import express from 'express';
import { Request, Response } from 'express';
import resetpasswordController from '../controllers/resetpassword';

const router = express.Router();

router.get('/updatepassword/:resetpasswordid', (req: Request, res: Response) => {
  resetpasswordController.updatepassword(req, res);
});

router.get('/resetpassword/:id', (req: Request, res: Response) => {
  resetpasswordController.resetpassword(req, res);
});

router.post('/forgotpassword', (req: Request, res: Response) => {
  resetpasswordController.forgotpassword(req, res);
});

export default router;