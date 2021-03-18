import { Request, Response } from "express";
import * as mysql from "mysql";

interface Transaction
{
	transactionID: string,
	userID: number,
	priceUSD: number,
	priceBTC: number,
	successful: boolean
}

interface getTransactionsReturn
{
	success: boolean,
	error: string,
	numTransactions: number,
	transactions: Array<Transaction>
}

interface EndpointInput
{
	userID: number,
	transactionID: string | null // non-null when we want to get a specific transaction
}

interface TrasactionsQueryReturn
{
	id: string,
	userId: number,
	priceUsd: number,
	priceBtc: number,
	successful: boolean
}

export async function getTransactions(request: Request, response: Response, next: CallableFunction)
{
	let returnPackage: getTransactionsReturn = {
		success: false,
		error: "",
		numTransactions: 0,
		transactions: []
	};

	let input: EndpointInput = {
		userID: request.body.userID,
		transactionID: request.body.transactionID
	};

	// configure mysql connection data
	const connectionData: mysql.ConnectionConfig = {
		host: process.env.RDS_HOSTNAME,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		port: Number(process.env.RDS_PORT),
		database: process.env.RDS_DATABASE
	};

	const connection:	mysql.Connection = mysql.createConnection(connectionData);

	try
	{
		connection.connect();
	}
	catch (e)
	{
		returnPackage.error = e;
		response.json(returnPackage);
		response.status(500);
		response.send();
		return;
	}

	try
	{
		let queryString: string = "SELECT * FROM Transactions WHERE Transactions.userId=" + input.userID;

		// add transaction id if it is not null
		if ((input.transactionID !== null) && (input.transactionID !== ""))
		{
			queryString = queryString.concat(" AND Transactions.id='" + input.transactionID + "'");
		}

		// terminate the query with a semicolon
		queryString = queryString.concat(";");

		connection.query(queryString, (error: string, rows: Array<TrasactionsQueryReturn>) => {
			if (error)
			{
				connection.end();
				returnPackage.error = error;
				response.json(returnPackage);
				response.status(500);
				response.send();
				return;
			}

			returnPackage.numTransactions = rows.length;

			// extract the records from the query result
			let i: number;
			for (i = 0; i < rows.length; i++)
			{
				let parsedRecord: TrasactionsQueryReturn = JSON.parse(JSON.stringify(rows[i]));

				let currentRecord: Transaction = {
					transactionID: parsedRecord.id,
					userID: parsedRecord.userId,
					priceUSD: parsedRecord.userId,
					priceBTC: parsedRecord.priceBtc,
					successful: parsedRecord.successful
				};

				returnPackage.transactions.push(currentRecord);
			}

			connection.end();
			returnPackage.success = true;
			response.json(returnPackage);
			response.status(200);
			response.send();
			return;
		});
	}
	catch (e)
	{
		connection.end();
		returnPackage.error = e;
		response.json(returnPackage);
		response.status(500);
		response.send();
		return;
	}
}
