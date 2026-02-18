import { prisma } from '../src/database/prisma';
import { hashPassword } from '../src/services/password.service';
import { WorkspaceRole } from '@prisma/client';

async function main() {
	const hashedPassword1 = await hashPassword('admin123');
	const hashedPassword2 = await hashPassword('admin456');

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
		],
	});

	const workspaces = await prisma.workspace.createMany({
		data: [
			{
				id: '1',
				name: 'Workspace1',
			},
			{
				id: '2',
				name: 'Workspace2',
			},
		],
	});

	const workspaceUsers = await prisma.workspaceUser.createMany({
		data: [
			{
				id: '1',
				role: WorkspaceRole.OWNER,
				userId: '1',
				workspaceId: '1',
			},
			{
				id: '2',
				role: WorkspaceRole.MEMBER,
				userId: '2',
				workspaceId: '1',
			},
			{
				id: '3',
				role: WorkspaceRole.ADMIN,
				userId: '1',
				workspaceId: '2',
			},
			{
				id: '4',
				role: WorkspaceRole.OWNER,
				userId: '2',
				workspaceId: '2',
			},
		],
	});

	console.log({ users, workspaces, workspaceUsers });
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
