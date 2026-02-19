import { Router } from 'express';
import { WorkspaceController } from './workspace.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isOwner } from '../../middlewares/isOwner.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';

import { validate } from '../../middlewares/validation.middleware';
import {
	createWorkspaceSchema,
	deleteWorkspaceSchema,
	updateWorkspaceSchema,
} from './workspace.schema';

const workspaceRoutes = Router();
const workspaceController = new WorkspaceController();

workspaceRoutes.get(
	'/',
	ensureAuthenticated,
	ensureUserExists,
	workspaceController.listWorkspace,
);
workspaceRoutes.post(
	'/add',
	validate(createWorkspaceSchema),
	ensureAuthenticated,
	ensureUserExists,
	workspaceController.createWorkspace,
);
workspaceRoutes.put(
	'/edit',
	validate(updateWorkspaceSchema),
	isOwner,
	ensureAuthenticated,
	ensureUserExists,
	workspaceController.updateWorkspace,
);
workspaceRoutes.delete(
	'/delete',
	validate(deleteWorkspaceSchema),
	isOwner,
	ensureAuthenticated,
	ensureUserExists,
	workspaceController.deleteWorkspace,
);

export { workspaceRoutes };
