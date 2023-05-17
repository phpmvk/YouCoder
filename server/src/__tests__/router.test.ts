import request from 'supertest';
import { default as mocks } from './mocks'
import app from '../app';


// describe('ROUTES TESTING', () => {
  
//   describe('Unit', () => {
//     it('should return the output of executing the code received', async () => { 
//       const res = await request(app).post('/console').send(mocks.codeToExecuteData);
//       expect(res.body).toHaveProperty('stdout', 'Test number one')
//     })

//     test('should respond with status 200 when a good request is made', async () => { 
//       const res = await request(app).post('/console').send(mocks.codeToExecuteData);
//       expect(res.status).toBe(200);
//     })
  
//     test('should respond with a 400 status when an invalid request is made', async () => {
//       const res = await request(app).post('/console').send(mocks.badCodeToExecuteData);
//       expect(res.status).toBe(400);
//     })
  
//     test('should return status 404 when a request is made to inexistant endpoint', async () => { 
//       const res = await request(app).get('/inexistantendpoint');
//       expect(res.status).toBe(404);
//     })
//   })
  
//   // describe('Integration', () => {
//   //   test('should ...', () => { 

//   //    })
//   // })
  
// })


// consoleRouteLimiter test: Test that the console route limiter is working as expected and not allowing too many requests from a single IP address.

// getRecordingById test: Test that the authentication mechanism is working correctly and that only authorized users can access the private recording.

// getAllUserRecordings test: Test that the default limiter and authentication mechanisms are working correctly and that only authorized users can access the endpoint.

// uploadRecording test: Test that the endpoint can successfully upload a recording and that the file is saved in the correct location.

// updateRecording test: Test that the endpoint can successfully update a recording and that the updated information is saved correctly in the database.

// deleteRecording test: Test that the endpoint can successfully delete a recording and that the recording is removed from the database.

// creatorLogin test: Test that the creator login endpoint is working correctly and that authenticated creators are authorized to access the relevant parts of the application.

// updateCreator test: Test that the endpoint can successfully update the creator's information and that the updated information is saved correctly in the database.

// deleteCreator test: Test that the endpoint can successfully delete the creator's account and that all associated data is removed from the database.
