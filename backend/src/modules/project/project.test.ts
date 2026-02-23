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

describe('Project routes', () => {
	describe('GET /workspace/:workspaceId/department/:departmentId/project', () => {
		it('Get project - should return with status 200', async () => {
			const res = await request(app)
				.get('/workspace/1/department/1/project')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /workspace/:workspaceId/department/:departmentId/project/add', () => {
		it('Create project - should return with status 201', async () => {
			const res = await request(app)
				.post('/workspace/1/department/1/project/add')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: 'Project5',
					description: 'Finish project 5',
					status: 'ONGOING',
				});
			expect(res.statusCode).toBe(201);
		});

		it('Create project without token - should return with status 401', async () => {
			const res = await request(app)
				.post('/workspace/1/department/1/project/add')
				.send({
					name: 'Project5',
					description: 'Finish project 5',
					status: 'ONGOING',
				});
			expect(res.statusCode).toBe(401);
		});
	});

	describe('PUT /workspace/:workspaceId/department/:departmendId/project/:projectId/update', () => {
		it('Update project - should return with status 200', async () => {
			const res = await request(app)
				.put('/workspace/1/department/1/project/1/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated project' });
			expect(res.statusCode).toBe(200);
		});

		it('Update project without access - should return with status 403', async () => {
			const res = await request(app)
				.put('/workspace/2/department/3/project/3/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated project' });
			expect(res.statusCode).toBe(403);
		});

		it('Update inexistent project - should return with status 404', async () => {
			const res = await request(app)
				.put('/workspace/1/department/1/project/10/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated project' });
			expect(res.statusCode).toBe(404);
		});
	});

	describe('DELETE /workspace/:workspaceId/department/:departmentId/project/:projectId/delete', () => {
		it('Delete project - should return with status 204', async () => {
			const res = await request(app)
				.delete('/workspace/1/department/1/project/2/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(204);
		});

		it('Delete project without access - should return with status 403', async () => {
			const res = await request(app)
				.delete('/workspace/2/department/3/project/3/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(403);
		});
	});
});
