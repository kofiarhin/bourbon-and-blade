import { Router } from 'express';
import { registerLoyaltyController } from '../controllers/loyaltyController.js';

const loyaltyRouter = Router();

loyaltyRouter.post('/', registerLoyaltyController);

export { loyaltyRouter };
