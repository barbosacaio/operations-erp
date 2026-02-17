import { Request, Response } from 'express';
import { register } from '../services/auth/register.service';
import { login } from '../services/auth/login.service';

export class AuthController {
    async register(req: Request, res: Response) {
        const { name, surname, email, password } = req.body;
        const result = await register({
            name,
            surname,
            email,
            password,
        });

        return res.status(201).json(result);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await login({
            email,
            password,
        });

        return res.status(200).json(result);
    }
}