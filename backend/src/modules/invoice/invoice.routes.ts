import { Router } from 'express';
import { InvoiceController } from './invoice.controller';

import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated.middleware';
import { isAdmin } from '../../middlewares/isAdmin.middleware';
import { ensureUserExists } from '../../middlewares/ensureUserExists.middleware';
import { apiLimiter } from '../../middlewares/rateLimiter';

import { validate } from '../../middlewares/validation.middleware';
import {
	listInvoiceSchema,
	addInvoiceSchema,
	updateInvoiceSchema,
	deleteInvoiceSchema,
} from './invoice.schema';

const invoiceRoutes = Router({ mergeParams: true });
const invoiceController = new InvoiceController();

invoiceRoutes.get(
	'/',
	validate(listInvoiceSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	invoiceController.listInvoice,
);
invoiceRoutes.post(
	'/add',
	validate(addInvoiceSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	invoiceController.addInvoice,
);
invoiceRoutes.put(
	'/:invoiceId/update',
	validate(updateInvoiceSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	invoiceController.updateInvoice,
);
invoiceRoutes.delete(
	'/:invoiceId/delete',
	validate(deleteInvoiceSchema),
	ensureAuthenticated,
	ensureUserExists,
	isAdmin,
	apiLimiter,
	invoiceController.deleteInvoice,
);

export default invoiceRoutes;
