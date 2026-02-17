import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;

interface TokenPayLoad {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Authorization token missing',
        });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, JWT_SECRET) as TokenPayLoad;

        req.user = {
            id: decoded.sub,
        };

        return next();
    } catch {
        return res.status(401).json({ message: 'Authorization token is invalid',});
    }
}