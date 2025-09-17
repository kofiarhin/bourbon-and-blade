import request from 'supertest';
import { createApp } from '../src/app.js';

describe('Content API', () => {
  const app = createApp();

  it('returns the site content with business metadata', async () => {
    const response = await request(app).get('/api/content');

    expect(response.status).toBe(200);
    expect(response.body.business.name).toBe('Blade & Bourbon');
    expect(response.body.services).toHaveLength(5);
  });

  it('returns individual sections when requested', async () => {
    const response = await request(app).get('/api/content/home');

    expect(response.status).toBe(200);
    expect(response.body.hero).toBeDefined();
    expect(response.body.sections).toBeDefined();
  });
});
