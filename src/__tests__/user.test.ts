import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });
  it('Should create a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'exemplo', email: 'example@example.com' });
    expect(res.status).toBe(201)
  })

  it('Should not create a new user with an email that already exists on DB', async () => {
    const res = await request(app)
      .post('/users')
      .send({ name: 'exemplo', email: 'example@example.com' });
    expect(res.status).toBe(400)
  })
});
