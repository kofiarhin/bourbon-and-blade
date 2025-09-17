import request from 'supertest';
import { createApp } from '../src/app.js';
import { resetStore } from '../src/data/mockDb.js';

describe('Loyalty API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
    resetStore();
  });

  it('registers a new loyalty member', async () => {
    const response = await request(app)
      .post('/api/loyalty')
      .send({ name: 'Loyal Guest', email: 'loyal@guest.com' });

    expect(response.status).toBe(201);
    expect(response.body.memberId).toBeDefined();
  });

  it('blocks duplicate loyalty enrolment by email', async () => {
    const payload = { name: 'Repeat Guest', email: 'repeat@example.com' };
    const first = await request(app).post('/api/loyalty').send(payload);
    expect(first.status).toBe(201);

    const second = await request(app).post('/api/loyalty').send(payload);
    expect(second.status).toBe(409);
  });
});
