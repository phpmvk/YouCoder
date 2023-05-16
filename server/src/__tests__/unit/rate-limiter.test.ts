import request from 'supertest'
import app from '../../app'


test('GET /api/users should return a list of users', async () => {
  const response = await request(app).get('/api/users');
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('users');
});