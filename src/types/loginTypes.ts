export interface LoginData
{
	username: string,
	password: string
};

export interface LoginReturnPackage
{
	success: boolean,
	error: string,
	userID: number,
	username: string,
	firstname: string,
	lastname: string,
	address: string,
	lastUpdate: number,
	balance: number,
	spent: number
};

export interface UserData
{
	ID: number,
	username: string,
	password: string,
	firstname: string,
	lastname: string,
	address: string,
	lastUpdate: number,
	balance: number,
	spent: number
};
