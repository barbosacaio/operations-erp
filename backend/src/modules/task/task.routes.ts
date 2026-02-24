import { Router } from 'express';
import { TaskController } from './task.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';

import { validate } from '../../middlewares/validation.middleware';
import {
	createTaskSchema,
	updateTaskSchema,
	deleteTaskSchema,
} from './task.schema';
import { isInWorkspace } from '../../middlewares/isInWorkspace.middleware';

const taskRoutes = Router({ mergeParams: true });
const taskController = new TaskController();

taskRoutes.get(
	'/',
	ensureAuthenticated,
	ensureUserExists,
	isInWorkspace,
	taskController.listTask,
);
taskRoutes.post(
	'/add',
	validate(createTaskSchema),
	ensureAuthenticated,
	ensureUserExists,
	isInWorkspace,
	taskController.createTask,
);
taskRoutes.put(
	'/:taskId/update',
	validate(updateTaskSchema),
	ensureAuthenticated,
	ensureUserExists,
	isInWorkspace,
	taskController.updateTask,
);
taskRoutes.delete(
	'/:taskId/delete',
	validate(deleteTaskSchema),
	ensureAuthenticated,
	ensureUserExists,
	isInWorkspace,
	taskController.deleteTask,
);

export default taskRoutes;
