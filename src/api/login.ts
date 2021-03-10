import * as mysql from "mysql";
import { LoginData, LoginReturnPackage } from "../types/loginTypes";
import { Request, Response } from "express";

export async function login(request: Request, response: Response, next: CallableFunction): Promise<void>
{
	let returnPackage: LoginReturnPackage = {
		success: false,
		error: "",
		userID: -1,
		username: "",
		firstname: "",
		lastname: "",
		address: "",
		lastUpdate: 0,
		balance: 0.0,
		spent: 0.0
	};

	// configure mysql connection data
	const connectionData: mysql.ConnectionConfig = {
		host: process.env.RDS_HOSTNAME,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		port: Number(process.env.RDS_PORT)
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

	// login data received by client
	const loginData: LoginData = {
		username: request.body.username,
		password: request.body.password
	};

	let queryString: string = "SELECT * FROM User WHERE User.user_name == '" + loginData.username + "'";
	queryString.concat(" AND User.password == '" + loginData.password + "';")

	console.log(queryString);

	connection.end();
}
