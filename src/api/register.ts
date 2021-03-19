import * as mysql from "mysql";
import { RegisterReturnPackage } from "../types/registerTypes";
import { Request, Response } from "express";
import { UserDataWithoutPassword, UserDataWithPassword } from "src/types/userTypes";
import { stringify } from "querystring";
import { UsersQueryReturn } from "src/types/queryReturnTypes";

mysql.createPool({
	user: 'root',
	password: 'parallel',
	database: 'btc'
});


export async function register(request: Request, response: Response, next: CallableFunction)
{
	let returnPackage: RegisterReturnPackage = {
		success: false,
		error: ""
	};
	let wallet;
	 const getAddress = async () => {

		 // Redo if this is correct, maybe change .env 
		//const args = [process.env.BTC_PY];

		const args = ['btc.py']
	  
		const p = new Promise(function (success, nosuccess) {

		  const { spawn } = require("child_process");
		  const pyprog = spawn("python3", args, {
			encoding: "utf-8",
		  });

		  pyprog.stdout.on("data", function (data: string) {
			success(data.toString());
		  });
	  
		  pyprog.stderr.on("data", (data: string) => {
			nosuccess(data.toString());
		  });
		});
		 
			 const newaddress: string | unknown = await p;
			 if (typeof newaddress === 'string') {
				 const parsed = JSON.parse(newaddress)
				 return {
					 WIF: parsed.WIF,
					 address: parsed.address
				 }
		 }
		 
		 throw new Error("Internal Error: btc.py script")

	}
	
	try {
		wallet = await getAddress();
	}
	catch (e) {
		returnPackage.error = e;
		response.json(returnPackage);
		response.status(500);
		response.send();
		return;
		
	}


	// parse in new user data
	let userData: UserDataWithPassword = {
		userID: request.body.userID,
		username: request.body.username,
		password: request.body.password,
		firstname: request.body.firstname,
		lastname: request.body.lastname,
		address: wallet.address,
		lastUpdate: 0,
		balance: 0.0,
		spent: 0.0
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
		let queryString: string = "SELECT * FROM Users WHERE username='" + userData.username + "';";

		// check if username is available
		connection.query(queryString, (error: string, rows: Array<Object>) => {
			if (error)
			{
				connection.end()
				returnPackage.error = error;
				response.json(returnPackage);
				response.status(500);
				response.send();
				return;
			}

			// return with error if username is already taken
			if (rows.length > 0)
			{
				connection.end();
				returnPackage.error = "Username unavailable";
				response.json(returnPackage);
				response.status(400);
				response.send();
				return;
			}

			// formulate query string to insert new user into database
			queryString = "INSERT INTO Users (username, password, firstname, lastname, address, lastUpdate, balance, spent)\n VALUES (";
			queryString = queryString.concat("'" + userData.username + "', '" + userData.password + "', '" + userData.firstname + "', ");
			queryString = queryString.concat("'" + userData.lastname + "', '" + userData.address + "', " + userData.lastUpdate + ", ");
			queryString = queryString.concat(userData.balance + ", " + userData.spent + ");");

			// insert the user into the database
			connection.query(queryString, (error: string, rows: Array<Object>) => {
				if (error)
				{
					connection.end()
					returnPackage.error = error;
					response.json(returnPackage);
					response.status(500);
					response.send();
					return;
				}

				// formulate query where we can look up the new user and ensure they were added
				let queryString: string = "SELECT * FROM Users WHERE username='" + userData.username + "';";

				// look up new user in database
				connection.query(queryString, (error: string, rows: Array<Object>) => {
					if (error)
					{
						connection.end()
						returnPackage.error = error;
						response.json(returnPackage);
						response.status(500);
						response.send();
						return;
					}

					// return with error if we failed to find user
					if (rows.length < 1)
					{
						connection.end();
						returnPackage.error = "Failed to register user";
						response.json(returnPackage);
						response.status(400);
						response.send();
						return;
					}

					let result: UsersQueryReturn = JSON.parse(JSON.stringify(rows[0]));

					connection.end();
					returnPackage.success = true;
					response.json(returnPackage);
					response.status(200);
					response.send();
					return;
				});
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
