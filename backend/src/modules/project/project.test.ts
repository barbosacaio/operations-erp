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
	describe('GET /project', () => {
		it('Get project - should return with status 200', async () => {
			const res = await request(app)
				.get('/project')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(200);
		});
	});

	describe('POST /project/add', () => {
		it('Create project - should return with status 201', async () => {
			const res = await request(app)
				.post('/project/add?workspaceId=1&departmentId=1')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Project5', description: 'Finish project 5', status: 'ONGOING' });
			expect(res.statusCode).toBe(201);
		});

		it('Create project without token - should return with status 401', async () => {
			const res = await request(app)
				.post('/project/add?workspaceId=1&departmentId=1')
				.send({ name: 'Project5', description: 'Finish project 5', status: 'ONGOING' });
			expect(res.statusCode).toBe(401);
		});
	});

	describe('PUT /project/edit', () => {
		it('Update project without access - should return with status 403', async () => {
			const res = await request(app)
				.put('/project/edit?workspaceId=2&projectId=1')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated project' });
			expect(res.statusCode).toBe(403);
		});

		it('Update inexistent project - should return with status 404', async () => {
			const res = await request(app)
				.put('/project/edit?workspaceId=1&projectId=15')
				.set('Authorization', `Bearer ${token}`)
				.send({ name: 'Updated project' });
			expect(res.statusCode).toBe(404);
		});
	});

	describe('DELETE /project/delete', () => {
		it('Delete project without access - should return with status 403', async () => {
			const res = await request(app)
				.delete('/project/delete?workspaceId=2&&projectId=4')
				.set('Authorization', `Bearer ${token}`);
			expect(res.statusCode).toBe(403);
		});
	});
});
