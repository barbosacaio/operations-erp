-- CreateEnum
CREATE TYPE "InvoiceType" AS ENUM ('EXPENSE', 'INCOME');

-- CreateEnum
CREATE TYPE "InvoiceTarget" AS ENUM ('AFFILIATE', 'CONTRACTOR', 'CUSTOMER', 'EMPLOYEE', 'PARTNER', 'SUBSIDIARY', 'SUPPLIER', 'TAX', 'VENDOR');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('UNPAID', 'PAID', 'EXPIRED', 'CANCELLED');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "type" "InvoiceType" NOT NULL,
    "value" INTEGER NOT NULL,
    "target" "InvoiceTarget",
    "status" "InvoiceStatus" NOT NULL DEFAULT 'UNPAID',
    "dueDate" TIMESTAMP(3),
    "paidDate" TIMESTAMP(3),
    "workspaceId" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
