import request from 'supertest';
import { app } from '../app';

describe('Auth routes', () => {
	describe('POST /auth/register', () => {
		it('Create user - should return with status 201', async () => {
			const res = await request(app).post('/auth/register').send({
				name: 'Admin',
				surname: 'Four',
				email: 'admin4@example.com',
				password: 'admin012',
			});
			expect(res.statusCode).toBe(201);
		});

		it('User already exists - should return with status 500', async () => {
			const res = await request(app).post('/auth/register').send({
				name: 'Admin',
				surname: 'One',
				email: 'admin1@example.com',
				password: 'admin123',
			});
			expect(res.statusCode).toBe(500);
		});

		it('Short name/surname/password - should return with status 400', async () => {
			const res = await request(app).post('/auth/register').send({
				name: 'Ex',
				surname: '1',
				email: 'example@example.com',
				password: 'ex1',
			});
			expect(res.statusCode).toBe(400);
		});

		it('Invalid email - should return with status 400', async () => {
			const res = await request(app).post('/auth/register').send({
				name: 'Admin',
				surname: 'One',
				email: 'admin1example.com',
				password: 'admin123',
			});
			expect(res.statusCode).toBe(400);
		});
	});

	describe('POST /auth/login', () => {
		it('Login - should return with status 200', async () => {
			const res = await request(app).post('/auth/login').send({
				email: 'admin1@example.com',
				password: 'admin123',
			});
			expect(res.statusCode).toBe(200);
		});

		it('Wrong password - should return with status 401', async () => {
			const res = await request(app).post('/auth/login').send({
				email: 'wrongemail@example.com',
				password: 'wrongpassword',
			});
			expect(res.statusCode).toBe(401);
		});

		it('Short password - should return with status 400', async () => {
			const res = await request(app).post('/auth/login').send({
				email: 'wrongemail@example.com',
				password: 'wrong',
			});
			expect(res.statusCode).toBe(400);
		});

		it('Invalid email - should return with status 400', async () => {
			const res = await request(app).post('/auth/login').send({
				email: 'wrongemailexample.com',
				password: 'wrongpassword',
			});
			expect(res.statusCode).toBe(400);
		});
	});
});
