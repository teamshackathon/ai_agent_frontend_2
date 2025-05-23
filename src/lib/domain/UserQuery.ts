import { createAxiosClient } from "@/lib/infrastructure/AxiosClient";

export class User {
	constructor(
		public id: string,
		public displayName: string,
		public email: string,
		public photoURL: string,
	) {}
}

export interface UserResponse {
	id: string;
	display_name: string;
	email: string;
	photo_url: string;
}

function createUser(res: UserResponse): User {
	return new User(res.id, res.display_name, res.email, res.photo_url);
}

export async function getUser(): Promise<User> {
	const axiosClient = createAxiosClient();
	const response = await axiosClient.get<UserResponse>("/auth/me");
	return createUser(response.data);
}
