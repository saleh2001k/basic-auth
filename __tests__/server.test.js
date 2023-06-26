const request = require('supertest');
const { app } = require('../src/server');

describe('Server', () => {
  it('should respond with "Welcome to the server!" on GET "/"', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Welcome to the server!');
  });

  it('should respond with 404 Not Found on invalid routes', async () => {
    const response = await request(app).get('/invalid');
    expect(response.status).toBe(404);
  });

  // Add more test cases for other routes and functionality as needed
});
