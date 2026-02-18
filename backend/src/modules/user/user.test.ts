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

describe('WorkspaceUser routes', () => {
	describe('GET /user', () => {
		it('List users of a specific workspace - should return with status 200', async () => {
			const res = await request(app)
				.get('/user?workspaceId=1')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /user/add', () => {
		it('Create workspace user - should return with status 200', async () => {
			const res = await request(app)
				.post('/user/add?workspaceId=1')
				.set('Authorization', `Bearer ${token}`)
				.send({
					email: 'admin3@example.com',
					role: 'ADMIN',
				});
			expect(res.statusCode).toBe(200);
		});
	});

	describe('PUT /user/edit', () => {
		it('Update workspace user - should return with status 200', async () => {
			const res = await request(app)
				.put('/user/edit?workspaceId=1&userId=3')
				.set('Authorization', `Bearer ${token}`)
				.send({ role: 'MEMBER' });
			expect(res.statusCode).toBe(200);
		});
	});

	describe('DELETE /user/delete', () => {
		it('Delete workspace user - should return with status 204', async () => {
			const res = await request(app)
				.delete('/user/delete?workspaceId=1&userId=3')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(204);
		});
	});
});
