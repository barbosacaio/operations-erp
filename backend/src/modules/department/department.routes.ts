import { Router } from 'express';
import { DepartmentController } from './department.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isAdmin } from '../../middlewares/isAdmin.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';
import { isInWorkspace } from '../../middlewares/isInWorkspace.middleware';

import { validate } from '../../middlewares/validation.middleware';
import {
	listDepartmentSchema,
	addDepartmentSchema,
	updateDepartmentSchema,
	deleteDepartmentSchema,
} from './department.schema';

const departmentRoutes = Router({ mergeParams: true });
const departmentController = new DepartmentController();

import projectRoutes from '../project/project.routes';
departmentRoutes.use('/:departmentId/project', projectRoutes);

departmentRoutes.get(
	'/',
	validate(listDepartmentSchema),
	ensureAuthenticated,
	ensureUserExists,
	isInWorkspace,
	departmentController.listDepartment,
);
departmentRoutes.post(
	'/add',
	validate(addDepartmentSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	departmentController.addDepartment,
);
departmentRoutes.put(
	'/:departmentId/update',
	validate(updateDepartmentSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	departmentController.updateDepartment,
);
departmentRoutes.delete(
	'/:departmentId/delete',
	validate(deleteDepartmentSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	departmentController.deleteDepartment,
);

export default departmentRoutes;
