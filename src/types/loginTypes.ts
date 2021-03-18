import { UserDataWithoutPassword } from "./userTypes";

export interface LoginData
{
	username: string,
	password: string
};

export interface LoginReturnPackage
{
	success: boolean,
	error: string,
	userData: UserDataWithoutPassword
};
