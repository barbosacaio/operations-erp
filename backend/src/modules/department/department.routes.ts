import { Router } from 'express';
import { DepartmentController } from './department.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isAdmin } from '../../middlewares/isAdmin.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';

import { validate } from '../../middlewares/validation.middleware';
import {
	createDepartmentSchema,
	updateDepartmentSchema,
	deleteDepartmentSchema,
} from './department.schema';

const departmentRoutes = Router();
const departmentController = new DepartmentController();

departmentRoutes.get(
	'/',
	ensureAuthenticated,
	ensureUserExists,
	departmentController.listDepartment,
);
departmentRoutes.post(
	'/add',
	validate(createDepartmentSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	departmentController.createDepartment,
);
departmentRoutes.put(
	'/edit',
	validate(updateDepartmentSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	departmentController.updateDepartment,
);
departmentRoutes.delete(
	'/delete',
	validate(deleteDepartmentSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	departmentController.deleteDepartment,
);

export { departmentRoutes };
