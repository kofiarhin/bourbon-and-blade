import { Router } from 'express';
import { createBookingController, getBookingsController } from '../controllers/bookingController.js';

const bookingRouter = Router();

bookingRouter.post('/', createBookingController);
bookingRouter.get('/', getBookingsController);

export { bookingRouter };
