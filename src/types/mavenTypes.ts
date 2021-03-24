export interface MavenApiOptions
{
	url: string, // uri and port
	request: string
}

export interface MavenPurchaseInput
{
	id: number,
	amount: number // in USD
}

export interface MavenPurchaseReturn
{
	id: number,
	priceBtc: number,
	userId: number,
	successful: number,
	status: string
}
