import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

import { validate } from '../middlewares/validation.middleware';
import { registerSchema } from '../schemas/auth.schema';
import { loginSchema } from '../schemas/auth.schema';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post('/register', validate(registerSchema), authController.register);
authRoutes.post('/login', validate(loginSchema), authController.login);

export { authRoutes };
