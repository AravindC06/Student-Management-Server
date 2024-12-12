import request from 'supertest';
import app from '../src/index';
import mongoose from 'mongoose';

describe('Test the root path', () => {
  it('should respond to the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});