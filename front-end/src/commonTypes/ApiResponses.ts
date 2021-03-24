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

export interface Transaction
{
	transactionID: string,
	userID: number,
	priceUSD: number,
	priceBTC: number,
	successful: boolean
}

export interface GetTransactionsResponse
{
	success: boolean,
	error: string,
	numTransactions: number,
	transactions: Array<Transaction>
}
