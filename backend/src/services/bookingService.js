import { randomUUID } from 'node:crypto';
import { getContent } from '../data/contentRepository.js';
import { addBooking, listBookings } from '../data/mockDb.js';
import { createHttpError } from '../utils/httpError.js';
import { assertString, assertDate, assertTime, assertEmail, composeDateTime } from '../utils/validators.js';

const isSlotTaken = (barberId, date, time) =>
  listBookings().some((booking) => booking.barberId === barberId && booking.date === date && booking.time === time);

const selectBarber = (barbers, requestedBarberId, date, time) => {
  if (requestedBarberId && requestedBarberId !== 'any') {
    const preferred = barbers.find((barber) => barber.id === requestedBarberId);

    if (!preferred) {
      throw createHttpError(400, 'Selected barber does not exist');
    }

    if (isSlotTaken(preferred.id, date, time)) {
      throw createHttpError(409, 'Selected barber is unavailable for the chosen slot');
    }

    return preferred;
  }

  const available = barbers.filter((barber) => !isSlotTaken(barber.id, date, time));

  if (!available.length) {
    throw createHttpError(409, 'All barbers are booked for that time. Please choose another slot.');
  }

  const index = Math.floor(Math.random() * available.length);
  return available[index];
};

const createBooking = async ({
  serviceId,
  barberId = 'any',
  date,
  time,
  clientName = 'Guest',
  clientEmail = ''
}) => {
  const trimmedServiceId = assertString(serviceId, 'Service');
  const trimmedDate = assertDate(date, 'Date');
  const trimmedTime = assertTime(time, 'Time');
  const trimmedName = assertString(clientName, 'Client name');

  if (clientEmail) {
    assertString(clientEmail, 'Client email');
  }

  const content = await getContent();
  const service = content?.services?.find((item) => item.id === trimmedServiceId);

  if (!service) {
    throw createHttpError(404, 'Requested service could not be found');
  }

  const assignedBarber = selectBarber(content?.barbers || [], barberId, trimmedDate, trimmedTime);
  const booking = {
    id: randomUUID(),
    serviceId: service.id,
    serviceName: service.name,
    barberId: assignedBarber.id,
    barberName: assignedBarber.name,
    date: trimmedDate,
    time: trimmedTime,
    clientName: trimmedName,
    clientEmail,
    status: 'pending',
    createdAt: new Date().toISOString(),
    datetime: composeDateTime(trimmedDate, trimmedTime)
  };

  addBooking(booking);

  return {
    bookingId: booking.id,
    datetime: booking.datetime,
    status: booking.status,
    assignedBarber: {
      id: booking.barberId,
      name: booking.barberName
    },
    service: {
      id: booking.serviceId,
      name: booking.serviceName,
      price: service.price
    }
  };
};

const getBookings = () => listBookings();

export { createBooking, getBookings };
