//@ts-nocheck
import request from 'supertest';
import app from '../../app';
import { default as mocks } from '../mocks'

describe('UNIT - RATE LIMITER', () => {

  describe('Code-Execution Route Limiter', () => {
    let lastResponse;

    beforeAll(async () => {
      const makeRequest = async () => {
        const response = await request(app).post('/code-execution/console').send(mocks.codeToExecuteData);
        lastResponse = response;
      };

      await Promise.all([
        makeRequest(),
        new Promise((resolve) => setTimeout(() => resolve(makeRequest()), 1000)),
        new Promise((resolve) => setTimeout(() => resolve(makeRequest()), 2000)),
        new Promise((resolve) => setTimeout(() => resolve(makeRequest()), 3000)),
        new Promise((resolve) => setTimeout(() => resolve(makeRequest()), 4000)),
      ]);
    }, 10000);

    test('should allow 5 requests within 30 seconds', () => {
      expect(lastResponse.status).toBe(200);
    });

    test('should respond with status code 429 on subsequent request', async () => {
      const response = await request(app).post('/code-execution/console').send(mocks.codeToExecuteData);
      expect(response.status).toBe(429);
    });
  });


  describe('Default Limiter', ()=> {
    let lastResponse;

    beforeAll(async () => {
      const {recording_id} = await request(app).post('/recording/upload').send(mocks.goodRecording)

      const makeRequest = async () => {
        const response = await request(app).post('/recording/update/' + recording_id).send(mocks.codeToExecuteData);
        lastResponse = response;
      };
      
      await Promise.all([
        makeRequest(),
        new Promise((resolve) => setTimeout(() => resolve(makeRequest()), 1000)),
        new Promise((resolve) => setTimeout(() => resolve(makeRequest()), 2000)),
        new Promise((resolve) => setTimeout(() => resolve(makeRequest()), 3000)),
        new Promise((resolve) => setTimeout(() => resolve(makeRequest()), 4000)),
      ]);
    }, 10000);

    test('should allow 5 requests within 30 seconds', () => {
      expect(lastResponse.status).toBe(200);
    });

    test('should respond with status code 429 on subsequent request', async () => {
      const response = await request(app).post('/code-execution/console').send(mocks.codeToExecuteData);
      expect(response.status).toBe(429);
    });

    test('should allow 10 request within 60 seconds', async () => {
      // const response = await request(app).get('/api/users');
      // expect(response.status).toBe(200);
      // expect(response.body).toHaveProperty('users');
    });
  
    test('should return error if more than 10 requests within 60 seconds', async () => {
      // const response = await request(app).get('/api/users');
      // expect(response.status).toBe(200);
      // expect(response.body).toHaveProperty('users');
    });
  })

  describe('Like Recording Limiter', ()=> {
    test('should allow 1 request', async () => {
      // const response = await request(app).get('/api/users');
      // expect(response.status).toBe(200);
      // expect(response.body).toHaveProperty('users');
    });
  
    test('should return error if more than 1 request', async () => {
      // const response = await request(app).get('/api/users');
      // expect(response.status).toBe(200);
      // expect(response.body).toHaveProperty('users');
    });
  })


})