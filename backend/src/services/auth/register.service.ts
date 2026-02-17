import { prisma } from '../../database/prisma';
import { hashPassword } from '../password.service';
import { generateToken } from './jwt.service';

interface RegisterInput {
	name: string;
	surname: string;
	email: string;
	password: string;
}

export async function register({
	name,
	surname,
	email,
	password,
}: RegisterInput) {
	const userAlreadyExists = await prisma.user.findUnique({
		where: { email },
	});

	if (userAlreadyExists) {
		throw new Error('User already exists');
	}

	const passwordHash = await hashPassword(password);

	const user = await prisma.user.create({
		data: {
			name,
			surname,
			email,
			passwordHash: passwordHash,
		},
	});

	const token = generateToken(user.id);

	return { user, token };
}
