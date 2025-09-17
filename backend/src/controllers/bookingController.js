import { createBooking, getBookings } from '../services/bookingService.js';

const createBookingController = async (req, res, next) => {
  try {
    const booking = await createBooking(req.body || {});
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

const getBookingsController = (req, res) => {
  const bookings = getBookings();
  res.json(bookings);
};

export { createBookingController, getBookingsController };
