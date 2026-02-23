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

describe('Workspace routes', () => {
	describe('GET /workspace', () => {
		it('Get workspace - should return with status 200', async () => {
			const res = await request(app)
				.get('/workspace')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /workspace/add', () => {
		it('Create workspace - should return with status 201', async () => {
			const res = await request(app)
				.post('/workspace/add')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Workspace3' });
			expect(res.statusCode).toBe(201);
		});

		it('Create workspace without token - should return with status 401', async () => {
			const res = await request(app)
				.post('/workspace/add')
				.send({ name: 'Workspace4' });
			expect(res.statusCode).toBe(401);
		});

		it('Workspace already exists - should return with status 401', async () => {
			const res = await request(app)
				.post('/workspace/add')
				.send({ name: 'Workspace1' });
			expect(res.statusCode).toBe(401);
		});
	});

	describe('PUT /workspace/:workspaceId/update', () => {
		it('Update workspace name - should return with status 200', async () => {
			const res = await request(app)
				.put('/workspace/1/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated Workspace' });
			expect(res.statusCode).toBe(200);
		});

		it('Update workspace without ownership - should return with status 403', async () => {
			const res = await request(app)
				.put('/workspace/2/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated Workspace' });
			expect(res.statusCode).toBe(403);
		});

		it('Update inexistent workspace - should return with status 404', async () => {
			const res = await request(app)
				.put('/workspace/10/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Workspace1' });
			expect(res.statusCode).toBe(404);
		});
	});

	describe('DELETE /workspace/:workspaceId/delete', () => {
		it('Delete workspace without ownership - should return with status 403', async () => {
			const res = await request(app)
				.delete('/workspace/2/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(403);
		});

		it('Delete inexistent workspace - should return with status 404', async () => {
			const res = await request(app)
				.delete('/workspace/10/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(404);
		});
	});
});
