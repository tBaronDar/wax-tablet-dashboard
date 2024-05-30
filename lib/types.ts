export interface UserProfile {
	username: string;
	password: string;
	database: string;
	collection: string;
	email: string;
	waxPassword: string;
	name: string;
}

export interface Message {
	name: string;
	email: string;
	message: string;
	id: string;
}
