import { UserDataWithoutPassword } from "./UserTypes";

export interface LoginResponse
{
	success: boolean,
	error: string,
	userData: UserDataWithoutPassword
}

export interface RegisterResponse
{
	success: boolean,
	error: string
}
