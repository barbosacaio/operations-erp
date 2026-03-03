import { Router } from 'express';
import { ProjectController } from './project.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isAdmin } from '../../middlewares/isAdmin.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';
import { isInWorkspace } from '../../middlewares/isInWorkspace.middleware';
import { apiLimiter } from '../../middlewares/rateLimiter';

import { validate } from '../../middlewares/validation.middleware';
import {
	createProjectSchema,
	updateProjectSchema,
	deleteProjectSchema,
} from './project.schema';

const projectRoutes = Router({ mergeParams: true });
const projectController = new ProjectController();

import taskRoutes from '../task/task.routes';
projectRoutes.use('/:projectId/task', taskRoutes);

projectRoutes.get(
	'/',
	ensureAuthenticated,
	ensureUserExists,
	isInWorkspace,
	apiLimiter,
	projectController.listProject,
);
projectRoutes.post(
	'/add',
	validate(createProjectSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	projectController.createProject,
);
projectRoutes.put(
	'/:projectId/update',
	validate(updateProjectSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	projectController.updateDepartment,
);
projectRoutes.delete(
	'/:projectId/delete',
	validate(deleteProjectSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	projectController.deleteProject,
);

export default projectRoutes;
