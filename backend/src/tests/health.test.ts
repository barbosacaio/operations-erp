import request from 'supertest';
import { app } from '../app';

describe('Health check', () => {
    it('Should return with status 200 on /health route', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
    });
});