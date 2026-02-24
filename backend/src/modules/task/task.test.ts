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

describe('Task routes', () => {
	describe('GET /workspace/:workspaceId/department/:departmentId/project/:projectId/task', () => {
		it('Get task - should return with status 200', async () => {
			const res = await request(app)
				.get('/workspace/1/department/1/project/1/task')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /workspace/:workspaceId/department/:departmentId/project/:projectId/task/add', () => {
		it('Create task - should return with status 201', async () => {
			const res = await request(app)
				.post('/workspace/1/department/1/project/1/task/add')
				.set('Authorization', `Bearer ${token}`)
				.send({
					name: 'Task 5',
					description: 'Finish task 5',
					status: 'ONGOING',
					priority: 'HIGH',
				});
			expect(res.statusCode).toBe(201);
		});

		it('Create task without token - should return with status 401', async () => {
			const res = await request(app)
				.post('/workspace/1/department/1/project/1/task/add')
				.send({
					name: 'Task 5',
					description: 'Finish task 5',
					status: 'ONGOING',
					priority: 'HIGH',
				});
			expect(res.statusCode).toBe(401);
		});
	});

	describe('PUT /workspace/:workspaceId/department/:departmentId/project/:projectId/task/:taskId/update', () => {
		it('Update task - should return with status 201', async () => {
			const res = await request(app)
				.put('/workspace/1/department/1/project/1/task/1/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ PRIORITY: 'LOW' });
			expect(res.statusCode).toBe(201);
		});

		it('Update inexistent task - should return with status 404', async () => {
			const res = await request(app)
				.put('/workspace/1/department/1/project/1/task/10/update')
				.set('Authorization', `Bearer ${token}`)
				.send({ priority: 'LOW' });
			expect(res.statusCode).toBe(404);
		});
	});

	describe('DELETE /workspace/:workspaceId/department/:departmentId/project/:projectId/task/:taskId/delete', () => {
		it('Delete task - should return with status 204', async () => {
			const res = await request(app)
				.delete('/workspace/1/department/1/project/1/task/1/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(204);
		});

		it('Delete inexistent task - should return with status 404', async () => {
			const res = await request(app)
				.delete('/workspace/1/department/1/project/1/task/10/delete')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(404);
		});
	});
});
