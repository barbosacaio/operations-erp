import request from 'supertest';
import { app } from '../../app';

let token: string;

beforeAll(async () => {
	const loginRes = await request(app).post('/auth/login').send({
		email: 'admin1@example.com',
		password: 'admin123',
	});

	token = loginRes.body.token;
	console.log(token);
});

describe('Department routes', () => {
	describe('GET /department', () => {
		it('Get department - should return with status 200', async () => {
			const res = await request(app)
				.get('/department')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /department/add', () => {
		it('Create department - should return with status 201', async () => {
			const res = await request(app)
				.post('/department/add?workspaceId=1')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Department5' });
			expect(res.statusCode).toBe(201);
		});

		it('Create department without token - should return with status 401', async () => {
			const res = await request(app)
				.post('/department/add?workspaceId=1')
				.send({ name: 'Department5' });
			expect(res.statusCode).toBe(401);
		});

		it('Department already exists - should return with status 401', async () => {
			const res = await request(app)
				.post('/department/add?workspaceId=1')
				.send({ name: 'Department1' });
			expect(res.statusCode).toBe(401);
		});
	});

	describe('PUT /department/edit', () => {
		it('Update department without access - should return with status 403', async () => {
			const res = await request(app)
				.put('/department/edit?workspaceId=2&id=4')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated Workspace' });
			expect(res.statusCode).toBe(403);
		});

		it('Update inexistent department/workspace - should return with status 404', async () => {
			const res = await request(app)
				.put('/department/edit?workspaceId=10&id=10')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Workspace1' });
			expect(res.statusCode).toBe(404);
		});
	});

	describe('DELETE /department/delete', () => {
		it('Delete department without access - should return with status 403', async () => {
			const res = await request(app)
				.delete('/department/delete?workspaceId=2&&id=4')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(403);
		});

		it('Delete inexistent department/workspace - should return with status 404', async () => {
			const res = await request(app)
				.delete('/department/delete?workspaceId=10&id=10')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(404);
		});
	});
});
