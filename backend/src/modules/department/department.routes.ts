import { Router } from 'express';
import { DepartmentController } from './department.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isAdmin } from '../../middlewares/isAdmin.middleware';

import { validate } from '../../middlewares/validation.middleware';
import {
	createDepartmentSchema,
	updateDepartmentSchema,
	deleteDepartmentSchema,
} from './department.schemas';

const departmentRoutes = Router();
const departmentController = new DepartmentController();

departmentRoutes.get(
	'/',
	ensureAuthenticated,
	departmentController.listDepartment,
);
departmentRoutes.post(
	'/add',
	validate(createDepartmentSchema),
	ensureAuthenticated,
	isAdmin,
	departmentController.createDepartment,
);
departmentRoutes.put(
	'/edit',
	validate(updateDepartmentSchema),
	ensureAuthenticated,
	isAdmin,
	departmentController.updateDepartment,
);
departmentRoutes.delete(
	'/delete',
	validate(deleteDepartmentSchema),
	ensureAuthenticated,
	isAdmin,
	departmentController.deleteDepartment,
);

export { departmentRoutes };
