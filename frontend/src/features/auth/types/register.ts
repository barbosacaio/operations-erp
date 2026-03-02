export type RegisterRequest = {
	name: string;
	surname: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export type RegisterResponse = {
	token: string;
	user: {
		id: string;
		name: string;
		surname: string;
		email: string;
	};
};
