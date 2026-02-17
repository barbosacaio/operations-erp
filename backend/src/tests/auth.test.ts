import request from 'supertest';
import { app } from '../app';

describe('Auth routes', () => {
    describe('POST /auth/register', () => {
        it('Create user - should return with status 201', async () => {
            const res = await request(app)
            .post('/auth/register')
            .send({
                name: 'Admin',
                surname: '1',
                email: 'admin1@example.com',
                password: 'admin123',
            });
            expect(res.statusCode).toBe(201);
        });

        it('User already exists - should return with status 500', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    name: 'Admin',
                    surname: '1',
                    email: 'admin1@example.com',
                    password: 'admin123',
                });
            expect(res.statusCode).toBe(500);
        });
    });

    describe('POST /auth/login', () => {
        it('Login - should return with status 200', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'admin1@example.com',
                    password: 'admin123',
                });
            expect(res.statusCode).toBe(200);
        })

        it('Wrong password - should return with status 500', async() => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'wrongemail@example.com',
                    password: 'wrongpassword',
                });
            expect(res.statusCode).toBe(500);
        })
    });
});