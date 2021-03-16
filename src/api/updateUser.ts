import { Request, Response } from "express";
import * as mysql from "mysql";
import { UsersQueryReturn } from "src/types/queryReturnTypes";
import { UserDataWithoutPassword, UserDataWithPassword, UserInformationUpdate } from "../types/userTypes";

export interface UpdateUserReturnPackage
{
	success: boolean,
	error: string,
	userData: UserDataWithoutPassword
}

interface InformationToUpdate
{
	userID: number,
	columnNames: Array<string>,
	values: Array<string | number>
}

/**
 * parse informtion to weed out null types (means field does not need to be updated)
 */
function parseUpdateInput(info: UserInformationUpdate): InformationToUpdate
{
	let parsedInfo: InformationToUpdate = {
		userID: info.userID,
		columnNames: [],
		values: []
	}

	// parse firstname
	if (info.firstname !== null)
	{
		parsedInfo.columnNames.push("Users.firstname");
		parsedInfo.values.push("'" + info.firstname + "'");
	}

	// parse lastname
	if (info.lastname !== null)
	{
		parsedInfo.columnNames.push("Users.lastname");
		parsedInfo.values.push("'" + info.lastname + "'");
	}

	// parse lastUpdate
	if (info.lastUpate !== null)
	{
		parsedInfo.columnNames.push("Users.lastUpdate");
		parsedInfo.values.push(info.lastUpate);
	}

	// parse balance
	if (info.balance !== null)
	{
		parsedInfo.columnNames.push("Users.balance");
		parsedInfo.values.push(info.balance);
	}

	// parse spent
	if (info.spent !== null)
	{
		parsedInfo.columnNames.push("Users.spent");
		parsedInfo.values.push(info.spent);
	}

	return parsedInfo;
}

/**
 * Generates a query string to update the user info
 */
function generateUpdateQuery(info: InformationToUpdate): string
{
	let queryString = "UPDATE Users\nSET ";

	// formulate and join the set statements
	let i: number;
	for (i = 0; i < info.columnNames.length; i++)
	{
		queryString = queryString.concat(info.columnNames[i] + "=" + info.values[i]);

		if (i == info.columnNames.length - 1)
		{
			queryString = queryString.concat("\n");
		}
		else
		{
			queryString = queryString.concat(", ");
		}
	}

	queryString = queryString.concat("WHERE Users.id=" + info.userID + ";");

	return queryString;
}

export async function updateUser(request: Request, response: Response, next: CallableFunction)
{
	let returnPackage: UpdateUserReturnPackage = {
		success: false,
		error: "",
		userData: {
			userID: -1,
			username: "",
			firstname: "",
			lastname: "",
			address: "",
			lastUpdate: 0,
			balance: 0.0,
			spent: 0.0
		}
	};

	let input: UserInformationUpdate = {
		userID: request.body.userID,
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		lastUpate: request.body.lastUpdate,
		balance: request.body.balance,
		spent: request.body.spent
	};

	// configure mysql connection
	const connectionData: mysql.ConnectionConfig = {
		host: process.env.RDS_HOSTNAME,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		port: Number(process.env.RDS_PORT),
		database: process.env.RDS_DATABASE
	};

	const connection: mysql.Connection = mysql.createConnection(connectionData);

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
		let updateInfo: InformationToUpdate = parseUpdateInput(input);
		let queryString: string = generateUpdateQuery(updateInfo);

		connection.query(queryString, (error: string, rows: Array<Object>) => {
			if (error)
			{
				connection.end();
				returnPackage.error = error;
				response.json(returnPackage);
				response.status(500);
				response.send();
				return;
			}

			// formulate the query string to get all the new user information
			queryString = "SELECT * FROM Users WHERE Users.id=" + input.userID + ";";

			connection.query(queryString, (error: string, rows: Array<Object>) => {
				if (error)
				{
					connection.end();
					returnPackage.error = error;
					response.json(returnPackage);
					response.status(500);
					response.send();
					return;
				}

				let userData: UsersQueryReturn = JSON.parse(JSON.stringify(rows[0]));

				// transfer user data into the return package
				returnPackage.userData.userID = userData.id;
				returnPackage.userData.username = userData.username;
				returnPackage.userData.firstname = userData.firstname;
				returnPackage.userData.lastname = userData.lastname;
				returnPackage.userData.address = userData.address;
				returnPackage.userData.lastUpdate = userData.lastUpdate;
				returnPackage.userData.balance = userData.balance;
				returnPackage.userData.spent = userData.spent;

				connection.end();
				returnPackage.success = true;
				response.json(returnPackage);
				response.status(200);
				response.send();
				return;
			});
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
