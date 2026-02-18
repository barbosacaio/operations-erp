import { prisma } from '../../database/prisma';
import { comparePassword } from '../password.service';
import { generateToken } from './jwt.service';
import { AppError } from '../../errors/AppError';

interface LoginInput {
	email: string;
	password: string;
}

export async function login({ email, password }: LoginInput) {
	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		throw new AppError('Invalid credentials', 401);
	}

	const passwordMatch = await comparePassword(password, user.passwordHash);

	if (!passwordMatch) {
		throw new AppError('Invalid credentials', 401);
	}

	const token = generateToken(user.id);

	return { user, token };
}
