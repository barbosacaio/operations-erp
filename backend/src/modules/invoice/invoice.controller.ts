import { Request, Response } from 'express';
import { prisma } from '../../database/prisma';
import { AppError } from '../../errors/AppError';
import { InvoiceStatus, InvoiceTarget, InvoiceType } from '@prisma/client';

export class InvoiceController {
	async listInvoice(req: Request, res: Response) {
		const workspaceId = req.params.workspaceId as string;

		const invoices = await prisma.invoice.findMany({
			where: { workspaceId: workspaceId },
			select: {
				type: true,
				target: true,
				value: true,
				status: true,
				dueDate: true,
				paidDate: true,
			},
		});

		return res.status(200).json(invoices);
	}

	async addInvoice(req: Request, res: Response) {
		const { type, target, value, status, dueDate, paidDate } = req.body;
		const workspaceId = req.params.workspaceId as string;

		const data: {
			type: InvoiceType;
			target?: InvoiceTarget;
			value: number;
			status?: InvoiceStatus;
			dueDate?: Date;
			paidDate?: Date;
			workspaceId: string;
		} = {
			type: type,
			value: value,
			workspaceId: workspaceId,
		};

		if (target) {
			data.target = target;
		}
		if (status) {
			data.status = status;
		}
		if (dueDate) {
			data.dueDate = new Date(dueDate);
		}
		if (paidDate) {
			data.paidDate = new Date(paidDate);
		}

		const invoice = await prisma.invoice.create({ data });

		return res.status(201).json(invoice);
	}

	async updateInvoice(req: Request, res: Response) {
		const { type, target, value, status, dueDate, paidDate } = req.body;
		const invoiceId = req.params.invoiceId as string;
		const workspaceId = req.params.workspaceId as string;

		if (
			!(await prisma.invoice.findUnique({
				where: { id: invoiceId, workspaceId: workspaceId },
			}))
		) {
			throw new AppError(
				"This invoice doesn't belong to this workspace or it doesn't exist",
				404,
			);
		}

		const data: {
			type?: InvoiceType;
			target?: InvoiceTarget;
			value?: number;
			status?: InvoiceStatus;
			dueDate?: Date;
			paidDate?: Date;
			workspaceId: string;
		} = {
			workspaceId: workspaceId,
		};

		if (type) {
			data.type = type;
		}
		if (target) {
			data.target = target;
		}
		if (value) {
			data.value = value;
		}
		if (status) {
			data.status = status;
		}
		if (dueDate) {
			data.dueDate = new Date(dueDate);
		}
		if (paidDate) {
			data.paidDate = new Date(paidDate);
		}

		const invoice = await prisma.invoice.update({
			where: { id: invoiceId },
			data,
		});

		return res.status(200).json(invoice);
	}

	async deleteInvoice(req: Request, res: Response) {
		const invoiceId = req.params.invoiceId as string;
		const workspaceId = req.params.workspaceId as string;

		if (
			!(await prisma.invoice.findUnique({
				where: { id: invoiceId, workspaceId: workspaceId },
			}))
		) {
			throw new AppError(
				"This invoice doesn't belong to this workspace or it doesn't exist",
				404,
			);
		}

		await prisma.invoice.delete({ where: { id: invoiceId } });

		return res.status(204).send();
	}
}
