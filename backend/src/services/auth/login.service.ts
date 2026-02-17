import { prisma } from '../../database/prisma';
import { comparePassword } from '../password.service';
import { generateToken } from './jwt.service';

interface LoginInput {
    email: string,
    password: string,
}

export async function login({ email, password }: LoginInput) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const passwordMatch = await comparePassword(password, user.passwordHash);

    if (!passwordMatch) {
        throw new Error('Invalid credentials');
    }

    const token = generateToken(user.id);

    return { user, token };
}