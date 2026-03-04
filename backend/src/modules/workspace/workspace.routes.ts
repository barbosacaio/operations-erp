import { Router } from 'express';
import { WorkspaceController } from './workspace.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isOwner } from '../../middlewares/isOwner.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';
import { apiLimiter } from '../../middlewares/rateLimiter';

import { validate } from '../../middlewares/validation.middleware';
import {
	listWorkspaceSchema,
	createWorkspaceSchema,
	deleteWorkspaceSchema,
	updateWorkspaceSchema,
} from './workspace.schema';

const workspaceRoutes = Router();
const workspaceController = new WorkspaceController();

import userRoutes from '../user/user.routes';
workspaceRoutes.use('/:workspaceId/user', userRoutes);
import departmentRoutes from '../department/department.routes';
workspaceRoutes.use('/:workspaceId/department', departmentRoutes);
import invoiceRoutes from '../invoice/invoice.routes';
workspaceRoutes.use('/:workspaceId/invoice', invoiceRoutes);

workspaceRoutes.get(
	'/',
	validate(listWorkspaceSchema),
	ensureAuthenticated,
	ensureUserExists,
	apiLimiter,
	workspaceController.listWorkspace,
);
workspaceRoutes.post(
	'/add',
	validate(createWorkspaceSchema),
	ensureAuthenticated,
	ensureUserExists,
	apiLimiter,
	workspaceController.createWorkspace,
);
workspaceRoutes.put(
	'/:workspaceId/update',
	validate(updateWorkspaceSchema),
	isOwner,
	ensureAuthenticated,
	ensureUserExists,
	apiLimiter,
	workspaceController.updateWorkspace,
);
workspaceRoutes.delete(
	'/:workspaceId/delete',
	validate(deleteWorkspaceSchema),
	isOwner,
	ensureAuthenticated,
	ensureUserExists,
	apiLimiter,
	workspaceController.deleteWorkspace,
);

export { workspaceRoutes };
