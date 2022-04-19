import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('endpoint image processing', () => {
  it('check image exist and already resized', async () => {
    const response = await request.get(
      '/image/resize?filename=abdo&width=600&height=755'
    );
    expect(response.status).toBe(200);
  });
  it('check image not exist', async () => {
    const response = await request.get(
      '/image/resize?filename=teest&width=1400&height=900'
    );
    expect(response.status).toBe(404);
  });
  it('check image exist and resizing was done now', async () => {
    const response = await request.get(
      '/image/resize?filename=test&width=400&height=400'
    );
    expect(response.status).toBe(201);
  });
});
