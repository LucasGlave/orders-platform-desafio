import request from 'supertest';
import app from '../src/index';
import db from '../src/config/database';

describe('Test app.ts', () => {
  let server: any;

  beforeAll(async () => {
    server = app.listen(3000, () => {
      global.server = server;
    });
    await db.sync({ force: true });
  }, 30000);

  afterAll(async () => {
    await server.close();
  }, 30000);

  test('Cruce challenge.', async () => {
    const res = await request(app).get('/');
    console.log('Cruce challenge.', res.body);
    expect(res.body).toEqual({ message: 'Cruce challenge.' });
  }, 30000);
});