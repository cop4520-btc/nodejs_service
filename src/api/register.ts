import * as mysql from "mysql";
import { RegisterReturnPackage } from "../types/registerTypes";
import { Request, Response } from "express";

export async function register(request: Request, response: Response, next: CallableFunction)
{
	let returnPackage: RegisterReturnPackage = {
		success: false,
		error: ""
	};

	// configure mysql connection data
	const connectionData: mysql.ConnectionConfig = {
		host: process.env.RDS_HOSTNAME,
		user: process.env.RDS_USERNAME,
		password: process.env.RDS_PASSWORD,
		port: Number(process.env.RDS_PORT),
		database: "btc"
	};

	const connection: mysql.Connection = mysql.createConnection(connectionData);
}
