-- CreateEnum
CREATE TYPE "WorkspaceInviteRequestType" AS ENUM ('INVITE', 'REQUEST');

-- CreateTable
CREATE TABLE "WorkspaceInviteRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "type" "WorkspaceInviteRequestType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkspaceInviteRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkspaceInviteRequest" ADD CONSTRAINT "WorkspaceInviteRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkspaceInviteRequest" ADD CONSTRAINT "WorkspaceInviteRequest_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
