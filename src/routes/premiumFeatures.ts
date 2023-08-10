import express from 'express';
import { Request, Response } from 'express';
import premiumFeatureController from '../controllers/premiumFeatures';
import authenticatemiddleware from '../middleware/auth';

const router = express.Router();

router.get('/showLeaderBoard', authenticatemiddleware.authenticate, (req: Request, res: Response) => {
  premiumFeatureController.getUserLeaderBoard(req, res);
});

export default router;