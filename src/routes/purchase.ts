import express from 'express';
import { Request, Response } from 'express';
import purchaseController from '../controllers/purchase';
import authenticatemiddleware from '../middleware/auth';

const router = express.Router();

router.get('/premiummembership', authenticatemiddleware.authenticate, (req: Request, res: Response) => {
  purchaseController.purchasepremium(req, res);
});

router.post('/updatetransactionstatus', authenticatemiddleware.authenticate, (req: Request, res: Response) => {
  purchaseController.updateTransactionStatus(req, res);
});

export default router;