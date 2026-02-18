import { Router } from 'express';
import { WorkspaceController } from './workspace.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isOwner } from '../../middlewares/isOwner.middleware';

import { validate } from '../../middlewares/validation.middleware';
import {
	createWorkspaceSchema,
	deleteWorkspaceSchema,
	updateWorkspaceSchema,
} from './workspace.schemas';

const workspaceRoutes = Router();
const workspaceController = new WorkspaceController();

workspaceRoutes.get(
	'/',
	ensureAuthenticated,
	workspaceController.listWorkspace,
);
workspaceRoutes.post(
	'/add',
	validate(createWorkspaceSchema),
	ensureAuthenticated,
	workspaceController.createWorkspace,
);
workspaceRoutes.put(
	'/edit',
	validate(updateWorkspaceSchema),
	isOwner,
	ensureAuthenticated,
	workspaceController.updateWorkspace,
);
workspaceRoutes.delete(
	'/delete',
	validate(deleteWorkspaceSchema),
	isOwner,
	ensureAuthenticated,
	workspaceController.deleteWorkspace,
);

export { workspaceRoutes };
