import { Router } from 'express';
import { MainController } from './main.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';
import { apiLimiter } from '../../middlewares/rateLimiter';
// import {
//     listWorkspaceUserSchema,
//     addWorkspaceUserSchema,
//     updateWorkspaceUserSchema,
//     deleteWorkspaceUserSchema,
// } from './user.schema';

const mainRoutes = Router();
const mainController = new MainController();

mainRoutes.get(
	'/requests',
	ensureAuthenticated,
	ensureUserExists,
	apiLimiter,
	mainController.listRequests,
);

export { mainRoutes };
