import { Router } from 'express';
import { healthRouter } from './health.js';
import { contentRouter } from './content.js';
import { bookingRouter } from './booking.js';
import { loyaltyRouter } from './loyalty.js';
import { feedbackRouter } from './feedback.js';
import { socialRouter } from './social.js';

const registerRoutes = (app) => {
  const apiRouter = Router();

  apiRouter.use('/health', healthRouter);
  apiRouter.use('/content', contentRouter);
  apiRouter.use('/bookings', bookingRouter);
  apiRouter.use('/loyalty', loyaltyRouter);
  apiRouter.use('/feedback', feedbackRouter);
  apiRouter.use('/social', socialRouter);

  app.use('/api', apiRouter);
};

export { registerRoutes };
