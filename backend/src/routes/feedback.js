import { Router } from 'express';
import { submitFeedbackController } from '../controllers/feedbackController.js';

const feedbackRouter = Router();

feedbackRouter.post('/', submitFeedbackController);

export { feedbackRouter };
