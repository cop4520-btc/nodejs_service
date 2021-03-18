export interface UserDataWithoutPassword
{
	userID: number,
	username: string,
	firstname: string,
	lastname: string,
	address: string,
	lastUpdate: number,
	balance: number,
	spent: number
}

export interface UserDataWithPassword
{
	userID: number,
	username: string,
	password: string,
	firstname: string,
	lastname: string,
	address: string,
	lastUpdate: number,
	balance: number,
	spent: number
}

export interface UserInformationUpdate
{
	userID: number,
	firstname: string | null,
	lastname: string | null,
	lastUpate: number | null,
	balance: number | null,
	spent: number | null
}
