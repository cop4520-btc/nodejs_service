import { UserDataWithoutPassword } from "./UserTypes";

export interface LoginResponse
{
	success: boolean,
	error: string,
	userData: UserDataWithoutPassword
}
