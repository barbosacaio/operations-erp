import { Router } from 'express';
import { MainController } from './main.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';
import { apiLimiter } from '../../middlewares/rateLimiter';

const mainRoutes = Router();
const mainController = new MainController();

mainRoutes.get(
	'/invites',
	ensureAuthenticated,
	ensureUserExists,
	apiLimiter,
	mainController.listInvites,
);
mainRoutes.get(
	'/requests',
	ensureAuthenticated,
	ensureUserExists,
	apiLimiter,
	mainController.listRequests,
);

export { mainRoutes };
