import { Router } from 'express';
import { UserController } from './user.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isInWorkspace } from '../../middlewares/isInWorkspace.middleware';
import { isAdmin } from '../../middlewares/isAdmin.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';
import { apiLimiter } from '../../middlewares/rateLimiter';

import { validate } from '../../middlewares/validation.middleware';
import {
	listWorkspaceUserSchema,
	addWorkspaceUserSchema,
	updateWorkspaceUserSchema,
	deleteWorkspaceUserSchema,
} from './user.schema';

const userRoutes = Router({ mergeParams: true });
const userController = new UserController();

userRoutes.get(
	'/',
	validate(listWorkspaceUserSchema),
	ensureAuthenticated,
	ensureUserExists,
	isInWorkspace,
	apiLimiter,
	userController.listWorkspaceUsers,
);
userRoutes.post(
	'/add',
	validate(addWorkspaceUserSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	userController.addWorkspaceUser,
);
userRoutes.put(
	'/:userId/update',
	validate(updateWorkspaceUserSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	userController.updateWorkspaceUser,
);
userRoutes.delete(
	'/:userId/delete',
	validate(deleteWorkspaceUserSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	userController.deleteWorkspaceUser,
);

export default userRoutes;
