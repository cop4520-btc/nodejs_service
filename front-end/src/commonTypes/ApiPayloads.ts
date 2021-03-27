export interface LoginApiPayload
{
	username: string,
	password: string
}

export interface MakeTransactionApiPayload
{
	userID: number,
	amountUSD: number
}

export interface RegisterApiPayload
{
	username: string,
	password: string,
	firstname: string,
	lastname: string,
	address: string
}

export interface GetTransactionsPayload
{
	userID: number,
	transactionID: string | null // non-null when we want to get a specific transaction
}
