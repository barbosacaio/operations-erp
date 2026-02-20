import { Router } from 'express';
import { ProjectController } from './project.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isAdmin } from '../../middlewares/isAdmin.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';

import { validate } from '../../middlewares/validation.middleware';
import {
	createProjectSchema,
	updateProjectSchema,
	deleteProjectSchema
} from './project.schema';

const projectRoutes = Router();
const projectController = new ProjectController();

projectRoutes.get(
	'/',
	ensureAuthenticated,
	ensureUserExists,
	projectController.listProject,
);
projectRoutes.post(
	'/add',
	validate(createProjectSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	projectController.createProject,
);
projectRoutes.put(
	'/edit',
	validate(updateProjectSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	projectController.updateDepartment,
);
projectRoutes.delete(
	'/delete',
	validate(deleteProjectSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	projectController.deleteProject,
);

export { projectRoutes };
