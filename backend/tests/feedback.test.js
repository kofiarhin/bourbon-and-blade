import request from 'supertest';
import { createApp } from '../src/app.js';
import { resetStore } from '../src/data/mockDb.js';

describe('Feedback API', () => {
  let app;

  beforeEach(() => {
    app = createApp();
    resetStore();
  });

  it('stores client feedback with rating', async () => {
    const response = await request(app)
      .post('/api/feedback')
      .send({ name: 'Reviewing Guest', experience: 'Outstanding shave', rating: 5 });

    expect(response.status).toBe(201);
    expect(response.body.feedbackId).toBeDefined();
    expect(response.body.rating).toBe(5);
  });

  it('requires experience details', async () => {
    const response = await request(app)
      .post('/api/feedback')
      .send({ name: 'Guest', rating: 4 });

    expect(response.status).toBe(400);
  });
});
