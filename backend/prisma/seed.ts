import { prisma } from '../src/database/prisma';
import { hashPassword } from '../src/services/password.service';
import {
	InvoiceStatus,
	InvoiceTarget,
	InvoiceType,
	ProjectStatus,
	TaskPriority,
	TaskStatus,
	WorkspaceRole,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

async function main() {
	const users = [
		{
			id: 'user1',
			name: faker.person.firstName(),
			surname: faker.person.lastName(),
			email: faker.internet.email(),
			passwordHash: await hashPassword(faker.internet.password()),
		},
		{
			id: 'user2',
			name: faker.person.firstName(),
			surname: faker.person.lastName(),
			email: faker.internet.email(),
			passwordHash: await hashPassword(faker.internet.password()),
		},
		{
			id: 'user3',
			name: faker.person.firstName(),
			surname: faker.person.lastName(),
			email: faker.internet.email(),
			passwordHash: await hashPassword(faker.internet.password()),
		},
	];

	const workspaces = [
		{
			id: 'workspace1',
			name: faker.company.name(),
		},
		{
			id: 'workspace2',
			name: faker.company.name(),
		},
		{
			id: 'workspace3',
			name: faker.company.name(),
		},
		{
			id: 'workspace4',
			name: faker.company.name(),
		},
	];

	const departments = [
		{
			id: 'department1',
			name: faker.lorem.word(),
			workspaceId: 'workspace1',
		},
		{
			id: 'department2',
			name: faker.lorem.word(),
			workspaceId: 'workspace1',
		},
		{
			id: 'department3',
			name: faker.lorem.word(),
			workspaceId: 'workspace2',
		},
		{
			id: 'department4',
			name: faker.lorem.word(),
			workspaceId: 'workspace2',
		},
		{
			id: 'department5',
			name: faker.lorem.word(),
			workspaceId: 'workspace3',
		},
		{
			id: 'department6',
			name: faker.lorem.word(),
			workspaceId: 'workspace3',
		},
		{
			id: 'department7',
			name: faker.lorem.word(),
			workspaceId: 'workspace4',
		},
		{
			id: 'department8',
			name: faker.lorem.word(),
			workspaceId: 'workspace4',
		},
	];

	const workspaceUsers = [
		{
			id: 'workspaceuser1',
			role: WorkspaceRole.OWNER,
			userId: 'user1',
			departmentId: 'department1',
			workspaceId: 'workspace1',
		},
		{
			id: 'workspaceuser2',
			role: WorkspaceRole.MEMBER,
			userId: 'user1',
			departmentId: 'department3',
			workspaceId: 'workspace2',
		},
		{
			id: 'workspaceuser3',
			role: WorkspaceRole.ADMIN,
			userId: 'user2',
			departmentId: 'department2',
			workspaceId: 'workspace1',
		},
		{
			id: 'workspaceuser4',
			role: WorkspaceRole.OWNER,
			userId: 'user2',
			departmentId: 'department4',
			workspaceId: 'workspace2',
		},
	];

	const projects = [
		{
			id: 'project1',
			name: faker.lorem.word(),
			description: faker.lorem.sentence(),
			departmentId: 'department1',
			status: ProjectStatus.ONGOING,
		},
		{
			id: 'project2',
			name: faker.lorem.word(),
			description: faker.lorem.sentence(),
			departmentId: 'department2',
			status: ProjectStatus.FINISHED,
		},
		{
			id: 'project3',
			name: faker.lorem.word(),
			description: faker.lorem.sentence(),
			departmentId: 'department4',
			status: ProjectStatus.BACKLOG,
		},
	];

	const tasks = [
		{
			name: faker.lorem.words(),
			description: faker.lorem.sentences(),
			assigneeId: 'workspaceuser1',
			projectId: 'project1',
			dueDate: faker.date.future(),
			priority: TaskPriority.HIGH,
			status: TaskStatus.ONGOING,
		},
		{
			name: faker.lorem.words(),
			description: faker.lorem.sentences(),
			assigneeId: 'workspaceuser3',
			projectId: 'project2',
			dueDate: faker.date.future(),
			priority: TaskPriority.LOW,
			status: TaskStatus.BACKLOG,
		},
		{
			name: faker.lorem.words(),
			description: faker.lorem.sentences(),
			assigneeId: 'workspaceuser2',
			projectId: 'project3',
			dueDate: faker.date.future(),
			priority: TaskPriority.MEDIUM,
			status: TaskStatus.PAUSED,
		},
	];

	const invoices = [
		{
			type: InvoiceType.INCOME,
			value: faker.number.int({ min: 1, max: 100000 }),
			target: InvoiceTarget.CUSTOMER,
			status: InvoiceStatus.PAID,
			dueDate: new Date(2026, 12, 20),
			paidDate: new Date(2026, 10, 18),
			workspaceId: 'workspace1',
		},
		{
			type: InvoiceType.EXPENSE,
			value: faker.number.int({ min: 1, max: 100000 }),
			target: InvoiceTarget.AFFILIATE,
			status: InvoiceStatus.CANCELLED,
			dueDate: new Date(2025, 8, 12),
			workspaceId: 'workspace1',
		},
		{
			type: InvoiceType.INCOME,
			value: faker.number.int({ min: 1, max: 100000 }),
			target: InvoiceTarget.VENDOR,
			status: InvoiceStatus.EXPIRED,
			dueDate: new Date(2025, 1, 12),
			workspaceId: 'workspace2',
		},
		{
			type: InvoiceType.INCOME,
			value: faker.number.int({ min: 1, max: 100000 }),
			target: InvoiceTarget.PARTNER,
			status: InvoiceStatus.UNPAID,
			dueDate: new Date(2026, 2, 10),
			paidDate: new Date(2026, 1, 18),
			workspaceId: 'workspace3',
		},
	];

	await prisma.user.createMany({ data: users });
	await prisma.workspace.createMany({ data: workspaces });
	await prisma.department.createMany({ data: departments });
	await prisma.workspaceUser.createMany({ data: workspaceUsers });
	await prisma.project.createMany({ data: projects });
	await prisma.task.createMany({ data: tasks });
	await prisma.invoice.createMany({ data: invoices });
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
