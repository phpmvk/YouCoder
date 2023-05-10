import request from 'supertest';
import { default as mocks } from './mocks'
import { app } from '../index';

describe('ROUTES TESTING', () => {
  
  describe('Unit', () => {
    test('should return the output of executing the code received', async () => { 
      const res = await request(app).post('/console').send(mocks.codeToExecuteData);
      expect(res.body).toHaveProperty('stdout', 'Test number one')
    })

    test('should respond with status 200 when a good request is made', async () => { 
      const res = await request(app).post('/console').send(mocks.codeToExecuteData);
      expect(res.status).toBe(200);
    })
  
    test('should respond with a 400 status when an invalid request is made', async () => {
      const res = await request(app).post('/console').send(mocks.badCodeToExecuteData);
      expect(res.status).toBe(400);
    })
  
    test('should return status 404 when a request is made to inexistant endpoint', async () => { 
      const res = await request(app).get('/inexistantendpoint');
      expect(res.status).toBe(404);
    })
  })
  
  describe('Integration', () => {
    test('should ...', () => { 

     })
  })
  
})

