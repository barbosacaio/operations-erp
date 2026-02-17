import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as jwt.Secret;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? "1d") as jwt.SignOptions['expiresIn'];

export function generateToken(userId: string): string {
    return jwt.sign(
        { sub: userId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN },
    );
}