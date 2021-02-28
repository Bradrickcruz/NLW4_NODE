import request from 'supertest';
import { app } from '../app';
import createConnection from '../database';

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });
  it('Should create a new survey', async () => {
    const res = await request(app).post('/surveys').send({
      title: 'exemplo de pesquisa',
      description: 'essa é uma linda descrição de uma pesquisa maravilhosa.',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('Should show all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'exemplo 2 de titulo',
      description: 'uma bela descrição',
    });
    const res = await request(app).get('/surveys');

    expect(res.body.length).toBe(2);
  });
});
