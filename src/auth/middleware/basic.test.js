const { app } = require('../../server');
const supertest = require('supertest');
const request = supertest(app);
const bcrypt = require('bcrypt');
const { db, User } = require('../models/index');

describe('Auth Router', () => {
  beforeAll(async () => {
    await db.sync();
  });

  afterAll(async () => {
    await db.drop();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should sign up a new user', async () => {
    const createMock = jest.spyOn(User, 'create').mockImplementationOnce((user) => {
      return Promise.resolve({
        id: 1,
        username: user.username,
        password: bcrypt.hashSync(user.password, 10), 
      });
    });
  
    const response = await request.post('/signup').send({
      username: 'testuser',
      password: 'password',
    });
  
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('testuser');
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({
      username: 'testuser',
      password: expect.any(String), // Change the expectation to match any string
    });
  });

  it('should sign in a user with valid credentials', async () => {
    const findOneMock = jest.spyOn(User, 'findOne').mockResolvedValueOnce({
      id: 1,
      username: 'testuser',
      password: bcrypt.hashSync('password', 10), // Store the hashed password as a string
    });
  

    const response = await request
      .post('/signin')
      .set('Authorization', `Basic ${Buffer.from('testuser:password').toString('base64')}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('testuser');
    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith({
      where: { username: 'testuser' },
    });
  });

  it('should return 401 Unauthorized when signing in with invalid credentials', async () => {
    const findOneMock = jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);

    const response = await request
      .post('/signin')
      .set('Authorization', `Basic ${Buffer.from('testuser:wrongpassword').toString('base64')}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
    expect(findOneMock).toHaveBeenCalledTimes(1);
    expect(findOneMock).toHaveBeenCalledWith({
      where: { username: 'testuser' },
    });
  });

  it('should return 401 Unauthorized when signing in without credentials', async () => {
    const response = await request.post('/signin');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Authorization header missing');
  });
});
