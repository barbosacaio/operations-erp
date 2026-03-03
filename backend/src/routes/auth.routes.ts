import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

import { validate } from '../middlewares/validation.middleware';
import { authLimiter } from '../middlewares/rateLimiter';
import { registerSchema } from '../schemas/auth.schema';
import { loginSchema } from '../schemas/auth.schema';

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post(
	'/register',
	validate(registerSchema),
	authLimiter,
	authController.register,
);
authRoutes.post(
	'/login',
	validate(loginSchema),
	authLimiter,
	authController.login,
);

export { authRoutes };
