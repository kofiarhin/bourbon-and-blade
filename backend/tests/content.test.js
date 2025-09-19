import request from 'supertest';
import { createApp } from '../src/app.js';
import { getContent, getSection } from '../src/data/contentRepository.js';

describe('Content API', () => {
  const app = createApp();

  it('returns the full site content with business metadata', async () => {
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

  it('returns 404 for non-existent sections', async () => {
    const response = await request(app).get('/api/content/nonexistent');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(
      "Content section 'nonexistent' not found"
    );
  });

  it('returns business section correctly', async () => {
    const response = await request(app).get('/api/content/business');

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Blade & Bourbon');
    expect(response.body.owner).toBe('Marcus Johnson');
  });

  it('returns services section correctly', async () => {
    const response = await request(app).get('/api/content/services');

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Services & Pricing');
    expect(response.body.addOns).toHaveLength(2);
  });
});

describe('Content Repository', () => {
  it('can load content from file', async () => {
    const content = await getContent();
    expect(content).toBeDefined();
    expect(content.business).toBeDefined();
    expect(content.business.name).toBe('Blade & Bourbon');
  });

  it('can get existing sections', async () => {
    const homeSection = await getSection('home');
    expect(homeSection).toBeDefined();
    expect(homeSection.hero).toBeDefined();

    const businessSection = await getSection('business');
    expect(businessSection).toBeDefined();
    expect(businessSection.name).toBe('Blade & Bourbon');
  });

  it('returns null for non-existent sections', async () => {
    const result = await getSection('nonexistent');
    expect(result).toBeNull();
  });
});
