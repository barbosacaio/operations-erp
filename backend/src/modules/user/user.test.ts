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
				.get('/workspace/1/user')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /workspace/:workspaceId/user/add', () => {
		it('Create workspace user - should return with status 200', async () => {
			const res = await request(app)
				.post('/workspace/1/user/add')
				.set('Authorization', `Bearer ${token}`)
				.send({
					email: 'admin3@example.com',
					role: 'ADMIN',
				});
			expect(res.statusCode).toBe(200);
		});
	});

	describe('PUT /workspace/:workspaceId/user/:userId/update', () => {
		it('Update workspace user - should return with status 200', async () => {
			const res = await request(app)
				.put('/workspace/1/user/3/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ role: 'MEMBER' });
			expect(res.statusCode).toBe(200);
		});
	});

	describe('DELETE /workspace/:workspaceId/user/:userId/delete', () => {
		it('Delete workspace user - should return with status 204', async () => {
			const res = await request(app)
				.delete('/workspace/1/user/3/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(204);
		});
	});
});
