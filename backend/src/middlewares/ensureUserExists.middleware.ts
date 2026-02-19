import { Request, Response, NextFunction } from 'express';
import { prisma } from '../database/prisma';
import { AppError } from '../errors/AppError'

export async function ensureUserExists(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        throw new AppError('Unauthorized. Please access your account', 403);
    }

    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
    });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    return next();
}