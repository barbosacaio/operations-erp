import { z } from 'zod';

export const listInvoiceSchema = z.object({
	params: z.object({
		workspaceId: z.string().min(1),
	}),
});

export const addInvoiceSchema = z.object({
	body: z.object({
		type: z.enum(['INCOME', 'EXPENSE']),
		target: z
			.enum([
				'AFFILIATE',
				'CONTRACTOR',
				'CUSTOMER',
				'EMPLOYEE',
				'PARTNER',
				'SUBSIDIARY',
				'SUPPLIER',
				'TAX',
				'VENDOR',
			])
			.optional(),
		value: z.int(),
		status: z
			.enum(['UNPAID', 'PAID', 'EXPIRED', 'CANCELLED'])
			.default('UNPAID')
			.optional(),
		dueDate: z.coerce.date().optional(),
		paidDate: z.coerce.date().optional(),
	}),
	params: z.object({
		workspaceId: z.string().min(1),
	}),
});

export const updateInvoiceSchema = z.object({
	body: z.object({
		type: z.enum(['INCOME', 'EXPENSE']).optional(),
		target: z
			.enum([
				'AFFILIATE',
				'CONTRACTOR',
				'CUSTOMER',
				'EMPLOYEE',
				'PARTNER',
				'SUBSIDIARY',
				'SUPPLIER',
				'TAX',
				'VENDOR',
			])
			.optional(),
		value: z.int().optional(),
		status: z
			.enum(['UNPAID', 'PAID', 'EXPIRED', 'CANCELLED'])
			.default('UNPAID')
			.optional(),
		dueDate: z.coerce.date().optional(),
		paidDate: z.coerce.date().optional(),
	}),
	params: z.object({
		workspaceId: z.string().min(1),
		invoiceId: z.string().min(1),
	}),
});

export const deleteInvoiceSchema = z.object({
	params: z.object({
		invoiceId: z.string().min(1),
		workspaceId: z.string().min(1),
	}),
});
