import { prisma } from '../src/database/prisma';
import { hashPassword } from '../src/services/password.service';
import { ProjectStatus, WorkspaceRole } from '@prisma/client';

async function main() {
	const hashedPassword1 = await hashPassword('admin123');
	const hashedPassword2 = await hashPassword('admin456');
	const hashedPassword3 = await hashPassword('admin789');

	const users = await prisma.user.createMany({
		data: [
			{
				id: '1',
				name: 'Admin',
				surname: 'One',
				email: 'admin1@example.com',
				passwordHash: hashedPassword1,
			},
			{
				id: '2',
				name: 'Admin',
				surname: 'Two',
				email: 'admin2@example.com',
				passwordHash: hashedPassword2,
			},
			{
				id: '3',
				name: 'Admin',
				surname: 'Three',
				email: 'admin3@example.com',
				passwordHash: hashedPassword3,
			},
		],
	});

	const workspaces = await prisma.workspace.createMany({
		data: [
			{
				id: '1',
				name: 'Workspace 1',
			},
			{
				id: '2',
				name: 'Workspace 2',
			},
		],
	});

	const departments = await prisma.department.createMany({
		data: [
			{
				id: '1',
				name: 'Department 1',
				workspaceId: '1',
			},
			{
				id: '2',
				name: 'Department 2',
				workspaceId: '1',
			},
			{
				id: '3',
				name: 'Department 3',
				workspaceId: '2',
			},
			{
				id: '4',
				name: 'Department 4',
				workspaceId: '2',
			},
		],
	});

	const workspaceUsers = await prisma.workspaceUser.createMany({
		data: [
			{
				id: '1',
				role: WorkspaceRole.OWNER,
				userId: '1',
				departmentId: '1',
				workspaceId: '1',
			},
			{
				id: '2',
				role: WorkspaceRole.MEMBER,
				userId: '2',
				departmentId: '2',
				workspaceId: '1',
			},
			{
				id: '3',
				role: WorkspaceRole.MEMBER,
				userId: '1',
				departmentId: '3',
				workspaceId: '2',
			},
			{
				id: '4',
				role: WorkspaceRole.OWNER,
				userId: '2',
				departmentId: '4',
				workspaceId: '2',
			},
		],
	});

	const projects = await prisma.project.createMany({
		data: [
			{
				id: '1',
				name: 'Project 1',
				description: 'Finish project 1',
				departmentId: '1',
				status: ProjectStatus.ONGOING,
			},
			{
				id: '2',
				name: 'Project 2',
				description: 'Finish project 2',
				departmentId: '1',
				status: ProjectStatus.BACKLOG,
			},
			{
				id: '3',
				name: 'Project 3',
				description: 'Finish project 3',
				departmentId: '3',
				status: ProjectStatus.FINISHED,
			},
		],
	});

	const tasks = await prisma.task.createMany({
		data: [
			{
				id: '1',
				name: 'Task 1',
				description: 'Finish task 1',
				assigneeId: '1',
				projectId: '1',
				dueDate: new Date(2026, 12, 12),
				priority: 'HIGH',
				status: 'ONGOING',
			},
			{
				id: '2',
				name: 'Task 2',
				description: 'Finish task 2',
				assigneeId: '2',
				projectId: '2',
				dueDate: new Date(2026, 12, 12),
				priority: 'CRITICAL',
				status: 'PAUSED',
			},
			{
				id: '3',
				name: 'Task 3',
				description: 'Finish task 3',
				assigneeId: '3',
				projectId: '3',
				dueDate: new Date(2026, 12, 12),
				priority: 'LOW',
				status: 'CANCELLED',
			},
		],
	});

	console.log({
		users,
		workspaces,
		departments,
		workspaceUsers,
		projects,
		tasks,
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
