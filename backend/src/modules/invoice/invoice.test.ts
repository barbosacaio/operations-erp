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
	describe('GET /workspace/:workspaceId/department', () => {
		it('Get department - should return with status 200', async () => {
			const res = await request(app)
				.get('/workspace/1/department')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /workspace/:workspaceId/department/add', () => {
		it('Create department - should return with status 201', async () => {
			const res = await request(app)
				.post('/workspace/1/department/add')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Department5' });
			expect(res.statusCode).toBe(201);
		});

		it('Create department without token - should return with status 401', async () => {
			const res = await request(app)
				.post('/workspace/1/department/add')
				.send({ name: 'Department5' });
			expect(res.statusCode).toBe(401);
		});

		it('Department already exists - should return with status 401', async () => {
			const res = await request(app)
				.post('/workspace/1/department/add')
				.send({ name: 'Department 1' });
			expect(res.statusCode).toBe(401);
		});
	});

	describe('PUT /workspace/:workspaceId/department/:departmentId/update', () => {
		it('Update department - should return with status 200', async () => {
			const res = await request(app)
				.put('/workspace/1/department/1/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated Workspace' });
			expect(res.statusCode).toBe(200);
		});

		it('Update department without access - should return with status 403', async () => {
			const res = await request(app)
				.put('/workspace/2/department/3/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'No Access' });
			expect(res.statusCode).toBe(403);
		});

		it('Update inexistent department - should return with status 404', async () => {
			const res = await request(app)
				.put('/workspace/1/department/10/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Workspace 10' });
			expect(res.statusCode).toBe(404);
		});
	});

	describe('DELETE /workspace/:workspaceId/department/:departmentId/delete', () => {
		it('Delete department - should return with status 204', async () => {
			const res = await request(app)
				.delete('/workspace/1/department/2/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(204);
		});

		it('Delete department without access - should return with status 403', async () => {
			const res = await request(app)
				.delete('/workspace/2/department/3/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(403);
		});

		it('Delete inexistent department/workspace - should return with status 404', async () => {
			const res = await request(app)
				.delete('/workspace/1/department/10/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(404);
		});
	});
});
