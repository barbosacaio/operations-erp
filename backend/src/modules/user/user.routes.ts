import { Router } from 'express';
import { UserController } from './user.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isInWorkspace } from '../../middlewares/isInWorkspace.middleware';
import { isAdmin } from '../../middlewares/isAdmin.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';

import { validate } from '../../middlewares/validation.middleware';
import {
	listWorkspaceUserSchema,
	addWorkspaceUserSchema,
	editWorkspaceUserSchema,
	deleteWorkspaceUserSchema,
} from './user.schema';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get(
	'/',
	validate(listWorkspaceUserSchema),
	ensureAuthenticated,
	ensureUserExists,
	isInWorkspace,
	userController.listWorkspaceUsers,
);
userRoutes.post(
	'/add',
	validate(addWorkspaceUserSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	userController.addWorkspaceUser,
);
userRoutes.put(
	'/edit',
	validate(editWorkspaceUserSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	userController.editWorkspaceUser,
);
userRoutes.delete(
	'/delete',
	validate(deleteWorkspaceUserSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	userController.deleteWorkspaceUser,
);

export { userRoutes };
