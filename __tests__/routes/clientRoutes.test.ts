
import request from 'supertest';
import app from '../../src/index';
import db from '../../src/config/database';

describe('Client routes', () => {
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

  test('Create a new client', async () => {
    const newClient = { nombre: 'Test Client', direccion: 'Test Address' };
    const res = await request(app).post('/api/clients').send(newClient);
    console.log('Create a new client', res.body);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  }, 30000);

  test('Get all clients', async () => {
    const res = await request(app).get('/api/clients');
    console.log('Get all clients', res.body);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 30000);

  test('Get client by ID', async () => {
    const newClient = { nombre: 'Test Client', direccion: 'Test Address' };
    const createRes = await request(app).post('/api/clients').send(newClient);
    const clientId = createRes.body.id;

    const res = await request(app).get(`/api/clients/${clientId}`);
    console.log('Get client by ID', res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', clientId);
  }, 30000);

  test('Update client', async () => {
    const newClient = { nombre: 'Test Client', direccion: 'Test Address' };
    const createRes = await request(app).post('/api/clients').send(newClient);
    const clientId = createRes.body.id;

    const updatedClient = { nombre: 'Updated Client', direccion: 'Updated Address' };
    const updateRes = await request(app).put(`/api/clients/${clientId}`).send(updatedClient);
    console.log('Update client', updateRes.body);
    expect(updateRes.status).toBe(200);
    expect(updateRes.body).toHaveProperty('nombre', 'Updated Client');
  }, 30000);

  test('Delete client', async () => {
    const newClient = { nombre: 'Test Client', direccion: 'Test Address' };
    const createRes = await request(app).post('/api/clients').send(newClient);
    const clientId = createRes.body.id;

    const deleteRes = await request(app).delete(`/api/clients/${clientId}`);
    console.log('Delete client', deleteRes.body);
    expect(deleteRes.status).toBe(200);
  }, 30000);

  test('Get client orders', async () => {
    const newClient = { nombre: 'Test Client', direccion: 'Test Address' };
    const createRes = await request(app).post('/api/clients').send(newClient);
    const clientId = createRes.body.id;

    const res = await request(app).get(`/api/clients/${clientId}/orders`);
    console.log('Get client orders', res.body);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 30000);
});
