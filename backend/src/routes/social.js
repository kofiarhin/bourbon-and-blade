import { Router } from 'express';
import { getSocialFeedController } from '../controllers/socialController.js';

const socialRouter = Router();

socialRouter.get('/', getSocialFeedController);

export { socialRouter };
