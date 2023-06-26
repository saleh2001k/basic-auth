const { app } = require('../../server');
const supertest = require('supertest');
const request = supertest(app);
const { db, User } = require('../models/index');

describe('Auth Router', () => {
  beforeAll(async () => {
    await db.sync();
  });

  afterAll(async () => {
    await db.drop();
  });

  it('should sign up a new user', async () => {
    const response = await request
      .post('/signup')
      .send({ username: 'testuser', password: 'password' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('testuser');
  });

  it('should sign in a user with valid credentials', async () => {
    const response = await request
      .post('/signin')
      .set('Authorization', `Basic ${Buffer.from('testuser:password').toString('base64')}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('testuser');
  });

  it('should return 401 Unauthorized when signing in with invalid credentials', async () => {
    const response = await request
      .post('/signin')
      .set('Authorization', `Basic ${Buffer.from('testuser:wrongpassword').toString('base64')}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should return 401 Unauthorized when signing in without credentials', async () => {
    const response = await request.post('/signin');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Authorization header missing');
  });
});
