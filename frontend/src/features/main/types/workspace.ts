export type WorkspaceSearchRequest = {
	search?: string;
};

export type WorkspaceResponse = {
	id: string;
	name: string;
	createdAt: string;
};

export type MyWorkspaceResponse = {
	workspace: WorkspaceResponse[];
};

export type WorkspaceListResponse = {
	myWorkspaces: MyWorkspaceResponse[];
	workspaces: WorkspaceResponse[];
};
