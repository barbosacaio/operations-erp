import { prisma } from '../../database/prisma';
import { AppError } from '../../errors/AppError';
import { hashPassword } from '../password.service';
import { generateToken } from './jwt.service';

interface RegisterInput {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export async function register({
	name,
	surname,
	email,
	password,
	confirmPassword,
}: RegisterInput) {
	name = name.trim();
	surname = surname.trim();
	email = email.trim().toLowerCase();
	password = password.trim();
	confirmPassword = confirmPassword.trim();

	const userAlreadyExists = await prisma.user.findUnique({
		where: { email },
	});

	if (userAlreadyExists) {
		throw new AppError(
			'This user already exists. Please use a different email address',
			409,
		);
	}

	if (password !== confirmPassword) {
		throw new AppError('The passwords do not match. Please try again', 400);
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
