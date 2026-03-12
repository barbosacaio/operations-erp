export type WorkspaceSearchRequest = {
	search?: string;
};

export type WorkspaceCreateRequest = {
	name: string;
};

export type WorkspaceJoinQuitRequest = {
	id: string;
};

export type WorkspaceResponse = {
	id: string;
	name: string;
	createdAt: string;
};

export type WorkspaceJoinResponse = {
	id: string;
	userId: string;
	workspaceId: string;
	type: string;
	createdAt: string;
};

export type MyWorkspaceResponse = {
	workspace: WorkspaceResponse[];
};

export type WorkspaceListResponse = {
	myWorkspaces: MyWorkspaceResponse[];
	workspaces: WorkspaceResponse[];
};
