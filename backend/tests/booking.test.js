import request from 'supertest';
import { createApp } from '../src/app.js';
import { resetStore } from '../src/data/mockDb.js';

describe('Booking API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
    resetStore();
  });

  it('creates a booking and assigns a barber when none selected', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        serviceId: 'signature-haircut',
        barberId: 'any',
        date: '2025-09-20',
        time: '12:00',
        clientName: 'Test Guest'
      });

    expect(response.status).toBe(201);
    expect(response.body.assignedBarber).toBeDefined();
    expect(response.body.service.id).toBe('signature-haircut');
  });

  it('prevents double-booking a barber for the same slot', async () => {
    const payload = {
      serviceId: 'signature-haircut',
      barberId: 'marcus-johnson',
      date: '2025-09-21',
      time: '10:30',
      clientName: 'First Guest'
    };

    const first = await request(app).post('/api/bookings').send(payload);
    expect(first.status).toBe(201);

    const second = await request(app)
      .post('/api/bookings')
      .send({ ...payload, clientName: 'Second Guest' });

    expect(second.status).toBe(409);
  });

  it('rejects requests for unknown services', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        serviceId: 'invalid-service',
        barberId: 'any',
        date: '2025-09-25',
        time: '11:00',
        clientName: 'Guest'
      });

    expect(response.status).toBe(404);
  });
});
